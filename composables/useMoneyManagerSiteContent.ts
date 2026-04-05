import { computed } from 'vue'
import { moneyManagerSite } from '~/data/moneyManagerSite'
import type { MoneyManagerSiteContent } from '~/data/moneyManagerSite'

type PlayStoreAppDetail = {
  id: string
  title: string
  summary: string
  description: string
}

const truncateAtWord = (value: string, maxLength: number) => {
  if (value.length <= maxLength) {
    return value
  }

  const sliced = value.slice(0, maxLength)
  const boundary = sliced.lastIndexOf(' ')
  const trimmed = (boundary > Math.floor(maxLength * 0.6) ? sliced.slice(0, boundary) : sliced).trimEnd()
  return `${trimmed}...`
}

const toHeroDescription = (value: string) => {
  const paragraphs = value
    .split(/\n{2,}/)
    .map((paragraph) => paragraph.replace(/\s+/g, ' ').trim())
    .filter(Boolean)
    .filter((paragraph) => !/^key features:/i.test(paragraph))

  if (paragraphs.length === 0) {
    return ''
  }

  return truncateAtWord(paragraphs.slice(0, 2).join(' '), 320)
}

export const useMoneyManagerSiteContent = () => {
  const { data, pending, error, refresh } = useFetch<PlayStoreAppDetail>('/api/play-store-app', {
    key: 'money-manager-play-store-content-v1',
    query: {
      appId: moneyManagerSite.playStoreAppId
    },
    default: () => null
  })

  const content = computed<MoneyManagerSiteContent>(() => {
    const detail = data.value
    const title = detail?.title?.trim()
    const summary = detail?.summary?.trim()
    const description = detail?.description?.trim()
    const heroDescription = description ? toHeroDescription(description) : ''

    return {
      ...moneyManagerSite,
      appName: title || moneyManagerSite.appName,
      pageTitle: title || moneyManagerSite.pageTitle,
      heroTitle: title || moneyManagerSite.heroTitle,
      heroSubtitle: summary || moneyManagerSite.heroSubtitle,
      heroDescription: heroDescription || moneyManagerSite.heroDescription,
      longDescription: description || moneyManagerSite.longDescription
    }
  })

  return {
    content,
    pending,
    error,
    refresh
  }
}
