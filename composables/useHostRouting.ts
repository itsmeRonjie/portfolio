const MONEY_MANAGER_HOST = 'moneymanager.ronjiemanon.com'
const DINKBOARD_HOST = 'dinkboard.ronjiemanon.com'
const ALARM_CLOCK_HOST = 'alarmclock.ronjiemanon.com'
const MONEY_MANAGER_BASE_URL = `https://${MONEY_MANAGER_HOST}`
const DINKBOARD_BASE_URL = `https://${DINKBOARD_HOST}`
const ALARM_CLOCK_BASE_URL = `https://${ALARM_CLOCK_HOST}`
const MONEY_MANAGER_FALLBACK_PREFIX = '/money-manager'
const DINKBOARD_FALLBACK_PREFIX = '/dinkboard'
const MONEY_MANAGER_CANONICAL_PATHS = new Set(['/', '/support', '/privacy-policy'])
const DINKBOARD_CANONICAL_PATHS = new Set(['/', '/support', '/privacy-policy'])

const normalizeHost = (value: string) => value.trim().toLowerCase()

const normalizePath = (value: string) => {
  const trimmed = value.trim()
  if (!trimmed || trimmed === '/') {
    return '/'
  }
  const normalized = trimmed.replace(/\/+$/, '')
  return normalized || '/'
}

const toQueryHost = (value: unknown) => {
  if (typeof value === 'string') {
    return normalizeHost(value)
  }
  if (Array.isArray(value) && typeof value[0] === 'string') {
    return normalizeHost(value[0])
  }
  return ''
}

const toMoneyManagerCanonicalPath = (path: string) => {
  const normalized = normalizePath(path)
  if (normalized === MONEY_MANAGER_FALLBACK_PREFIX) {
    return '/'
  }
  if (normalized.startsWith(`${MONEY_MANAGER_FALLBACK_PREFIX}/`)) {
    const stripped = normalized.slice(MONEY_MANAGER_FALLBACK_PREFIX.length)
    return stripped || '/'
  }
  if (MONEY_MANAGER_CANONICAL_PATHS.has(normalized)) {
    return normalized
  }
  return null
}

const toDinkBoardCanonicalPath = (path: string) => {
  const normalized = normalizePath(path)
  if (normalized === DINKBOARD_FALLBACK_PREFIX) {
    return '/'
  }
  if (normalized.startsWith(`${DINKBOARD_FALLBACK_PREFIX}/`)) {
    const stripped = normalized.slice(DINKBOARD_FALLBACK_PREFIX.length)
    return stripped || '/'
  }
  if (DINKBOARD_CANONICAL_PATHS.has(normalized)) {
    return normalized
  }
  return null
}

export const useHostRouting = () => {
  const route = useRoute()
  const requestUrl = useRequestURL()

  const queryHost = computed(() => toQueryHost(route.query.host))
  const requestHost = computed(() => normalizeHost(requestUrl.hostname))
  const host = computed(() => queryHost.value || requestHost.value)

  const isMoneyManagerHost = computed(() => host.value === MONEY_MANAGER_HOST)
  const isDinkBoardHost = computed(() => host.value === DINKBOARD_HOST)
  const isAlarmClockHost = computed(() => host.value === ALARM_CLOCK_HOST)

  const isMoneyManagerFallbackPath = computed(() => {
    const path = normalizePath(route.path)
    return path === MONEY_MANAGER_FALLBACK_PREFIX || path.startsWith(`${MONEY_MANAGER_FALLBACK_PREFIX}/`)
  })

  const isDinkBoardFallbackPath = computed(() => {
    const path = normalizePath(route.path)
    return path === DINKBOARD_FALLBACK_PREFIX || path.startsWith(`${DINKBOARD_FALLBACK_PREFIX}/`)
  })

  const moneyManagerCanonicalPath = computed(() => {
    if (isMoneyManagerFallbackPath.value) {
      return toMoneyManagerCanonicalPath(route.path)
    }

    if (isMoneyManagerHost.value) {
      const normalized = normalizePath(route.path)
      if (MONEY_MANAGER_CANONICAL_PATHS.has(normalized)) {
        return normalized
      }
    }

    return null
  })

  const dinkBoardCanonicalPath = computed(() => {
    if (isDinkBoardFallbackPath.value) {
      return toDinkBoardCanonicalPath(route.path)
    }

    if (isDinkBoardHost.value) {
      const normalized = normalizePath(route.path)
      if (DINKBOARD_CANONICAL_PATHS.has(normalized)) {
        return normalized
      }
    }

    return null
  })

  const isMoneyManagerRoute = computed(() => moneyManagerCanonicalPath.value !== null)
  const isMoneyManagerPrivacyRoute = computed(() => moneyManagerCanonicalPath.value === '/privacy-policy')
  const isMoneyManagerSupportRoute = computed(() => moneyManagerCanonicalPath.value === '/support')
  const isDinkBoardRoute = computed(() => dinkBoardCanonicalPath.value !== null)
  const isDinkBoardPrivacyRoute = computed(() => dinkBoardCanonicalPath.value === '/privacy-policy')
  const isDinkBoardSupportRoute = computed(() => dinkBoardCanonicalPath.value === '/support')

  const moneyManagerCanonicalUrl = computed(() =>
    moneyManagerCanonicalPath.value ? `${MONEY_MANAGER_BASE_URL}${moneyManagerCanonicalPath.value}` : null
  )
  const dinkBoardCanonicalUrl = computed(() =>
    dinkBoardCanonicalPath.value ? `${DINKBOARD_BASE_URL}${dinkBoardCanonicalPath.value}` : null
  )

  const isAlarmClockPrivacyRoute = computed(() => {
    const normalizedPath = normalizePath(route.path)
    return normalizedPath === '/alarm-clock/privacy-policy' || (normalizedPath === '/privacy-policy' && isAlarmClockHost.value)
  })

  const alarmClockCanonicalUrl = computed(() =>
    isAlarmClockPrivacyRoute.value ? `${ALARM_CLOCK_BASE_URL}/privacy-policy` : null
  )

  return {
    host,
    isMoneyManagerHost,
    isDinkBoardHost,
    isAlarmClockHost,
    isMoneyManagerRoute,
    isMoneyManagerPrivacyRoute,
    isMoneyManagerSupportRoute,
    isMoneyManagerFallbackPath,
    isDinkBoardRoute,
    isDinkBoardPrivacyRoute,
    isDinkBoardSupportRoute,
    isDinkBoardFallbackPath,
    isAlarmClockPrivacyRoute,
    moneyManagerCanonicalPath,
    dinkBoardCanonicalPath,
    moneyManagerCanonicalUrl,
    dinkBoardCanonicalUrl,
    alarmClockCanonicalUrl,
    moneyManagerBaseUrl: MONEY_MANAGER_BASE_URL,
    dinkBoardBaseUrl: DINKBOARD_BASE_URL,
    alarmClockBaseUrl: ALARM_CLOCK_BASE_URL
  }
}
