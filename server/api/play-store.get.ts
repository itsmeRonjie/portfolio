import gplay from 'google-play-scraper'
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
  installs?: string
}

const DEFAULT_LIMIT = 6
const MAX_LIMIT = 24
const CACHE_VERSION = 'v8'
const PLAY_STORE_LANG = 'en'
const PLAY_STORE_COUNTRY = 'us'

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

const toPositiveNumber = (value: unknown) => {
  const parsed = Number(value)
  if (!Number.isFinite(parsed) || parsed <= 0) {
    return undefined
  }
  return parsed
}

const getRatingStats = async (appId: string, score?: number, reviewCount?: number) => {
  const resolvedScore = toPositiveNumber(score)
  const resolvedReviewCount = toPositiveNumber(reviewCount)

  if (resolvedScore !== undefined && resolvedReviewCount !== undefined) {
    return {
      rating: resolvedScore,
      reviewCount: resolvedReviewCount
    }
  }

  const reviewResponse = await gplay.reviews({
    appId,
    lang: PLAY_STORE_LANG,
    country: PLAY_STORE_COUNTRY,
    num: 200,
    sort: gplay.sort.NEWEST
  })

  const reviews = Array.isArray(reviewResponse?.data)
    ? reviewResponse.data.filter((review) => Number.isFinite(review.score))
    : []

  if (reviews.length === 0) {
    return {
      rating: resolvedScore,
      reviewCount: resolvedReviewCount
    }
  }

  const derivedScore = reviews.reduce((total, review) => total + review.score, 0) / reviews.length

  return {
    rating: resolvedScore ?? derivedScore,
    reviewCount: resolvedReviewCount ?? reviews.length
  }
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

    const apps = await gplay.developer({
      devId: developerId,
      lang: PLAY_STORE_LANG,
      country: PLAY_STORE_COUNTRY,
      num: limit,
      fullDetail: true
    })

    return Promise.all(
      apps.map(async (app) => {
        const { rating, reviewCount } = await getRatingStats(app.appId, app.score, app.reviews)
        const summarySource =
          typeof app.summary === 'string' && app.summary.trim().length > 0
            ? app.summary
            : app.description

        return {
          id: app.appId,
          title: app.title,
          summary: summarySource ? truncateText(normalizeText(summarySource), 160) : '',
          icon: app.icon ?? null,
          link: app.url,
          category: app.genre || app.categories?.[0]?.name || undefined,
          rating,
          reviewCount,
          installs: app.installs || undefined
        } satisfies PlayStoreApp
      })
    )
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
