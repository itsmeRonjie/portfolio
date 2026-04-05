import gplay from 'google-play-scraper'
import { createError, getQuery } from 'h3'
import { defineCachedEventHandler } from 'nitropack/runtime'

type PlayStoreAppDetail = {
  id: string
  title: string
  summary: string
  description: string
}

const CACHE_VERSION = 'v1'
const PLAY_STORE_LANG = 'en'
const PLAY_STORE_COUNTRY = 'us'

const normalizeLine = (value: string) => value.replace(/\s+/g, ' ').trim()

const normalizeDescription = (value: string) =>
  value
    .split(/\n{2,}/)
    .map((paragraph) =>
      paragraph
        .split(/\n+/)
        .map((line) => normalizeLine(line))
        .filter(Boolean)
        .join('\n')
    )
    .filter(Boolean)
    .join('\n\n')

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

export default defineCachedEventHandler(
  async (event) => {
    const query = getQuery(event)
    const appId = typeof query.appId === 'string' ? query.appId.trim() : ''

    if (!appId) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Missing Play Store appId.'
      })
    }

    const app = await gplay.app({
      appId,
      lang: PLAY_STORE_LANG,
      country: PLAY_STORE_COUNTRY
    })

    return {
      id: app.appId,
      title: normalizeLine(app.title),
      summary: normalizeLine(app.summary ?? ''),
      description: normalizeDescription(app.description ?? '')
    } satisfies PlayStoreAppDetail
  },
  {
    maxAge: 60 * 60,
    shouldInvalidateCache: (event) => {
      const query = getQuery(event)
      return isTruthyQuery(query.refresh)
    },
    getKey: (event) => {
      const query = getQuery(event)
      const appId = typeof query.appId === 'string' ? query.appId.trim() : ''
      return `play-store-app:${CACHE_VERSION}:${appId}`
    }
  }
)
