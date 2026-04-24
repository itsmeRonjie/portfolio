<template>
  <div class="min-h-screen text-slate-100">
    <NuxtPage />
  </div>
</template>

<script setup lang="ts">
const profile = useProfile()
const route = useRoute()
const config = useRuntimeConfig()

const {
  isMoneyManagerRoute,
  isMoneyManagerPrivacyRoute,
  isMoneyManagerSupportRoute,
  isMoneyManagerFallbackPath,
  isDinkBoardRoute,
  isDinkBoardPrivacyRoute,
  isDinkBoardSupportRoute,
  isDinkBoardFallbackPath,
  isAlarmClockPrivacyRoute,
  moneyManagerCanonicalUrl,
  dinkBoardCanonicalUrl,
  alarmClockCanonicalUrl,
  moneyManagerBaseUrl,
  dinkBoardBaseUrl
} = useHostRouting()

const { content: moneyManagerContent } = useMoneyManagerSiteContent(isMoneyManagerRoute)
const { content: dinkBoardContent } = useDinkBoardSiteContent()

const siteUrl = computed(() => config.public.siteUrl.replace(/\/$/, ''))

const defaultTitle = computed(() => {
  if (isMoneyManagerPrivacyRoute.value) {
    return `${moneyManagerContent.value.appName} Privacy Policy`
  }

  if (isMoneyManagerSupportRoute.value) {
    return `Support | ${moneyManagerContent.value.appName}`
  }

  if (isMoneyManagerRoute.value) {
    return moneyManagerContent.value.pageTitle
  }

  if (isDinkBoardPrivacyRoute.value) {
    return `${dinkBoardContent.value.appName} Privacy Policy`
  }

  if (isDinkBoardSupportRoute.value) {
    return `Support | ${dinkBoardContent.value.appName}`
  }

  if (isDinkBoardRoute.value) {
    return dinkBoardContent.value.pageTitle
  }

  return `${profile.name} | ${profile.title}`
})

const defaultDescription = computed(() => {
  if (isMoneyManagerPrivacyRoute.value) {
    return `Privacy policy for ${moneyManagerContent.value.appName}.`
  }

  if (isMoneyManagerSupportRoute.value) {
    return `Support and FAQ for ${moneyManagerContent.value.appName}.`
  }

  if (isMoneyManagerRoute.value) {
    return moneyManagerContent.value.heroSubtitle
  }

  if (isDinkBoardPrivacyRoute.value) {
    return `Privacy policy for ${dinkBoardContent.value.appName}.`
  }

  if (isDinkBoardSupportRoute.value) {
    return `Support and FAQ for ${dinkBoardContent.value.appName}.`
  }

  if (isDinkBoardRoute.value) {
    return dinkBoardContent.value.heroSubtitle
  }

  return profile.summary
})

const canonicalUrl = computed(() => {
  if (isMoneyManagerRoute.value && moneyManagerCanonicalUrl.value) {
    return moneyManagerCanonicalUrl.value
  }

  if (isDinkBoardRoute.value && dinkBoardCanonicalUrl.value) {
    return dinkBoardCanonicalUrl.value
  }

  if (isAlarmClockPrivacyRoute.value && alarmClockCanonicalUrl.value) {
    return alarmClockCanonicalUrl.value
  }

  return `${siteUrl.value}${route.path}`
})

const moneyManagerHeroScreenshotPath = computed(() => {
  const heroScreenshot =
    moneyManagerContent.value.screenshots.find((shot) => shot.id === moneyManagerContent.value.heroScreenshotId) ??
    moneyManagerContent.value.screenshots[0]

  return heroScreenshot?.src ?? '/og-image.svg'
})

const ogImage = computed(() => {
  if (isMoneyManagerRoute.value) {
    return `${moneyManagerBaseUrl}${moneyManagerHeroScreenshotPath.value}`
  }

  if (isDinkBoardRoute.value) {
    return `${dinkBoardBaseUrl}${dinkBoardContent.value.appIconPath}`
  }

  if (isAlarmClockPrivacyRoute.value) {
    return 'https://alarmclock.ronjiemanon.com/og-image.svg'
  }

  return `${siteUrl.value}/og-image.svg`
})

const robots = computed(() =>
  isMoneyManagerFallbackPath.value || isDinkBoardFallbackPath.value ? 'noindex,follow' : 'index,follow'
)

const personSchema = computed(() => ({
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: profile.name,
  url: siteUrl.value,
  jobTitle: profile.title,
  sameAs: [profile.links.linkedin, profile.links.github]
}))

const websiteSchema = computed(() => ({
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: `${profile.name} Portfolio`,
  url: siteUrl.value
}))

const moneyManagerSchema = computed(() => {
  if (!isMoneyManagerRoute.value) {
    return null
  }

  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: moneyManagerContent.value.appName,
    applicationCategory: 'FinanceApplication',
    operatingSystem: 'Android',
    description: moneyManagerContent.value.longDescription,
    url: canonicalUrl.value,
    downloadUrl: moneyManagerContent.value.playStoreUrl,
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD'
    }
  }
})

const dinkBoardSchema = computed(() => {
  if (!isDinkBoardRoute.value) {
    return null
  }

  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: dinkBoardContent.value.appName,
    applicationCategory: 'SportsApplication',
    operatingSystem: 'Android, iOS, watchOS',
    description: dinkBoardContent.value.longDescription,
    url: canonicalUrl.value,
    downloadUrl: dinkBoardContent.value.playStoreUrl,
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD'
    }
  }
})

useHead(() => {
  const scripts = [
    {
      id: 'ld-person',
      type: 'application/ld+json',
      children: JSON.stringify(personSchema.value)
    },
    {
      id: 'ld-website',
      type: 'application/ld+json',
      children: JSON.stringify(websiteSchema.value)
    }
  ]

  if (moneyManagerSchema.value) {
    scripts.push({
      id: 'ld-money-manager',
      type: 'application/ld+json',
      children: JSON.stringify(moneyManagerSchema.value)
    })
  }

  if (dinkBoardSchema.value) {
    scripts.push({
      id: 'ld-dinkboard',
      type: 'application/ld+json',
      children: JSON.stringify(dinkBoardSchema.value)
    })
  }

  return {
    title: defaultTitle.value,
    titleTemplate: (titleChunk) => titleChunk || profile.name,
    htmlAttrs: { lang: 'en' },
    link: [{ rel: 'canonical', href: canonicalUrl.value }],
    meta: [
      { name: 'description', content: defaultDescription.value },
      { property: 'og:title', content: defaultTitle.value },
      { property: 'og:description', content: defaultDescription.value },
      { property: 'og:type', content: 'website' },
      { property: 'og:url', content: canonicalUrl.value },
      { property: 'og:image', content: ogImage.value },
      { name: 'twitter:title', content: defaultTitle.value },
      { name: 'twitter:description', content: defaultDescription.value },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:image', content: ogImage.value },
      { name: 'robots', content: robots.value }
    ],
    script: scripts
  }
})
</script>
