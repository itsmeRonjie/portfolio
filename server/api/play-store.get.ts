import { createError, getQuery } from 'h3'
import { defineCachedEventHandler } from 'nitropack/runtime'
import { playStore } from '~/data/playStore'

type PlayStoreApp = {
  id: string
  title: string
  summary: string
  icon: string | null
  link: string
  category?: string
  rating?: number
  reviewCount?: number
}

const PLAY_STORE_BASE = 'https://play.google.com/store/apps'
const DEFAULT_LIMIT = 6
const MAX_LIMIT = 24
const CACHE_VERSION = 'v6'
const REQUEST_HEADERS = {
  'user-agent':
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
  'accept-language': 'en-US,en;q=0.9'
}

const parseLimit = (value: unknown, fallback: number) => {
  const parsed = Number.parseInt(String(value ?? ''), 10)
  if (!Number.isFinite(parsed)) {
    return fallback
  }
  return Math.min(Math.max(parsed, 1), MAX_LIMIT)
}

const normalizeText = (value: string) => value.replace(/\s+/g, ' ').trim()

const truncateText = (value: string, maxLength: number) => {
  if (value.length <= maxLength) {
    return value
  }
  return `${value.slice(0, Math.max(0, maxLength - 3)).trimEnd()}...`
}

const stripPlayStoreSuffix = (value: string) => {
  const trimmed = value.trim()
  const suffix = 'Apps on Google Play'
  if (!trimmed.endsWith(suffix)) {
    return trimmed
  }
  const withoutSuffix = trimmed.slice(0, -suffix.length).trim()
  return withoutSuffix.replace(/[-:]+$/g, '').trim()
}

const normalizeDeveloperId = (value: string) => {
  const trimmed = value.trim()
  if (!trimmed) {
    return ''
  }
  try {
    return decodeURIComponent(trimmed).replace(/\+/g, ' ').trim()
  } catch {
    return trimmed.replace(/\+/g, ' ').trim()
  }
}

const normalizePlayStorePublisherId = (value: string) => value.replace(/'/g, '’')

const encodeDeveloperIdForPlayStore = (value: string) =>
  encodeURIComponent(normalizePlayStorePublisherId(value)).replace(/%20/g, '+')

const isTruthyQuery = (value: unknown) => {
  if (Array.isArray(value)) {
    return value.some(isTruthyQuery)
  }
  if (typeof value === 'boolean') {
    return value
  }
  if (typeof value === 'number') {
    return value !== 0
  }
  if (typeof value === 'string') {
    return ['1', 'true', 'yes', 'on'].includes(value.toLowerCase())
  }
  return false
}

const extractMetaTags = (html: string) => {
  const metaTags = html.match(/<meta\b[^>]*>/gi) ?? []
  const entries: Record<string, string> = {}

  for (const tag of metaTags) {
    const readAttr = (attrName: string) => {
      const regex = new RegExp(`${attrName}\\s*=\\s*(?:\"([^\"]*)\"|'([^']*)'|([^\\s\"'>]+))`, 'i')
      const match = tag.match(regex)
      return (match?.[1] ?? match?.[2] ?? match?.[3] ?? '').trim()
    }
    const key = readAttr('property') || readAttr('name') || readAttr('itemprop')
    if (!key) {
      continue
    }
    const normalizedKey = key.toLowerCase()
    if (!entries[normalizedKey]) {
      const content = readAttr('content')
      if (content) {
        entries[normalizedKey] = content
      }
    }
  }

  return entries
}

const extractAppIds = (html: string) => {
  const ids = new Set<string>()
  const regex = /\/store\/apps\/details\?id=([A-Za-z0-9._-]+)/g
  let match: RegExpExecArray | null = null
  while ((match = regex.exec(html)) !== null) {
    ids.add(match[1])
  }
  return Array.from(ids)
}

const isAppSchema = (value: unknown) => {
  if (!value || typeof value !== 'object') {
    return false
  }
  const record = value as Record<string, unknown>
  const typeValue = record['@type']
  if (Array.isArray(typeValue)) {
    return typeValue.includes('SoftwareApplication') || typeValue.includes('MobileApplication')
  }
  if (typeof typeValue === 'string') {
    return typeValue === 'SoftwareApplication' || typeValue === 'MobileApplication'
  }
  return false
}

const findAppSchema = (value: unknown): Record<string, unknown> | null => {
  if (Array.isArray(value)) {
    for (const entry of value) {
      const match = findAppSchema(entry)
      if (match) {
        return match
      }
    }
    return null
  }
  if (value && typeof value === 'object') {
    const record = value as Record<string, unknown>
    if (isAppSchema(record)) {
      return record
    }
    const graph = record['@graph']
    if (Array.isArray(graph)) {
      return findAppSchema(graph)
    }
  }
  return null
}

const extractJsonLd = (html: string) => {
  const regex = /<script type="application\/ld\+json">([\s\S]*?)<\/script>/g
  let match: RegExpExecArray | null = null
  while ((match = regex.exec(html)) !== null) {
    try {
      const parsed = JSON.parse(match[1])
      const schema = findAppSchema(parsed)
      if (schema) {
        return schema
      }
    } catch {
      // Ignore invalid JSON blocks.
    }
  }
  return null
}

const toNumber = (value: unknown) => {
  const parsed = Number(value)
  if (!Number.isFinite(parsed)) {
    return undefined
  }
  return parsed
}

export default defineCachedEventHandler(
  async (event) => {
    const query = getQuery(event)
    const developerId = normalizeDeveloperId(
      typeof query.developerId === 'string' ? query.developerId : playStore.developerId
    )
    if (!developerId) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Missing Play Store developerId. Update data/playStore.ts.'
      })
    }

    const limit = parseLimit(query.limit ?? playStore.limit, playStore.limit || DEFAULT_LIMIT)
    const developerUrl = `${PLAY_STORE_BASE}/developer?id=${encodeDeveloperIdForPlayStore(developerId)}&hl=en&gl=US`

    const developerResponse = await $fetch.raw<string>(developerUrl, {
      responseType: 'text',
      headers: REQUEST_HEADERS
    })
    const developerHtml = developerResponse._data ?? ''

    const appIds = extractAppIds(developerHtml).slice(0, limit)
    if (appIds.length === 0) {
      return []
    }

    const apps = await Promise.all(
      appIds.map(async (appId) => {
        const detailsUrl = `${PLAY_STORE_BASE}/details?id=${encodeURIComponent(appId)}&hl=en&gl=US`
        try {
          const detailsResponse = await $fetch.raw<string>(detailsUrl, {
            responseType: 'text',
            headers: REQUEST_HEADERS
          })
          const detailsHtml = detailsResponse._data ?? ''
          const schema = extractJsonLd(detailsHtml)
          const meta = extractMetaTags(detailsHtml)
          const metaTitle = meta['og:title'] || meta['title']
          const metaDescription = meta['og:description'] || meta['description']
          const metaImage = meta['og:image'] || meta['image']

          const titleValue = typeof schema?.name === 'string' ? schema.name : metaTitle
          const title = titleValue ? stripPlayStoreSuffix(titleValue) : appId
          const description =
            typeof schema?.description === 'string' ? schema.description : metaDescription ?? ''
          const summary = description ? truncateText(normalizeText(description), 160) : ''
          const imageValue = schema?.image
          const iconFromSchema =
            typeof imageValue === 'string'
              ? imageValue
              : Array.isArray(imageValue)
                ? (imageValue.find((entry) => typeof entry === 'string') as string | undefined) ?? null
                : null

          const icon = iconFromSchema ?? metaImage ?? null
          const aggregateRating = schema?.aggregateRating as Record<string, unknown> | undefined

          return {
            id: appId,
            title,
            summary,
            icon,
            link: detailsUrl,
            category: typeof schema?.applicationCategory === 'string' ? schema.applicationCategory : undefined,
            rating: toNumber(aggregateRating?.ratingValue),
            reviewCount: toNumber(aggregateRating?.ratingCount ?? aggregateRating?.reviewCount)
          } satisfies PlayStoreApp
        } catch {
          return null
        }
      })
    )

    return apps.filter((app): app is PlayStoreApp => Boolean(app))
  },
  {
    maxAge: 60 * 60,
    shouldInvalidateCache: (event) => {
      const query = getQuery(event)
      return isTruthyQuery(query.refresh)
    },
    getKey: (event) => {
      const query = getQuery(event)
      const developerId = normalizeDeveloperId(
        typeof query.developerId === 'string' ? query.developerId : playStore.developerId
      )
      const limit = parseLimit(query.limit ?? playStore.limit, playStore.limit || DEFAULT_LIMIT)
      return `play-store:${CACHE_VERSION}:${developerId}:${limit}`
    }
  }
)
