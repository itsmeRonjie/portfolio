import { computed, unref } from 'vue'
import type { Ref } from 'vue'

export type PlayStoreApp = {
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

export const usePlayStoreApps = (
  developerId: string | Ref<string>,
  limit: number | Ref<number> = 6
) => {
  const cacheVersion = 'v7'
  const developer = computed(() => unref(developerId).trim())
  const max = computed(() => {
    const value = Number(unref(limit))
    if (!Number.isFinite(value)) {
      return 6
    }
    return Math.min(Math.max(Math.round(value), 1), 24)
  })

  if (!developer.value) {
    const apps = computed<PlayStoreApp[]>(() => [])
    const pending = computed(() => false)
    const error = computed(() => null)
    const refresh = () => Promise.resolve()
    return { apps, pending, error, refresh }
  }

  const { data, pending, error, refresh } = useFetch<PlayStoreApp[]>('/api/play-store', {
    key: computed(() => `play-store-${cacheVersion}-${developer.value}-${max.value}`),
    server: false,
    default: () => [],
    watch: [developer, max],
    query: computed(() => ({
      developerId: developer.value,
      limit: max.value
    }))
  })

  const apps = computed(() => data.value ?? [])
  return { apps, pending, error, refresh }
}
