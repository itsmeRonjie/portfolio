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

const encodeDeveloperIdForProfileUrl = (value: string) => {
  const normalized = normalizeDeveloperId(value)
  return normalized ? encodeURIComponent(normalized).replace(/%20/g, '+') : ''
}

/** The configured Google Play developer, its public profile URL, and its live app listings. */
export const usePlayStoreDeveloper = () => {
  const playStore = usePlayStore()

  const developerId = computed(() => normalizeDeveloperId(playStore.developerId))
  const hasDeveloper = computed(() => developerId.value.length > 0)
  const developerUrl = computed(() =>
    hasDeveloper.value
      ? `https://play.google.com/store/apps/developer?id=${encodeDeveloperIdForProfileUrl(developerId.value)}`
      : ''
  )
  const { apps, pending, error, refresh } = usePlayStoreApps(developerId, computed(() => playStore.limit))
  const skeletons = Array.from({ length: Math.min(playStore.limit || 3, 3) }, (_, index) => index)

  return { hasDeveloper, developerUrl, apps, pending, error, refresh, skeletons }
}
