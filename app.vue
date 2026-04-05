<template>
  <div class="min-h-screen text-slate-100">
    <NuxtPage />
  </div>
</template>

<script setup lang="ts">
const profile = useProfile()
const route = useRoute()
const config = useRuntimeConfig()
const { content: moneyManagerContent } = useMoneyManagerSiteContent()

const {
  isMoneyManagerRoute,
  isMoneyManagerFallbackPath,
  isAlarmClockPrivacyRoute,
  moneyManagerCanonicalUrl,
  alarmClockCanonicalUrl,
  moneyManagerBaseUrl
} = useHostRouting()

const siteUrl = computed(() => config.public.siteUrl.replace(/\/$/, ''))

const defaultTitle = computed(() =>
  isMoneyManagerRoute.value ? moneyManagerContent.value.pageTitle : `${profile.name} | ${profile.title}`
)

const defaultDescription = computed(() =>
  isMoneyManagerRoute.value ? moneyManagerContent.value.heroSubtitle : profile.summary
)

const canonicalUrl = computed(() => {
  if (isMoneyManagerRoute.value && moneyManagerCanonicalUrl.value) {
    return moneyManagerCanonicalUrl.value
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

  if (isAlarmClockPrivacyRoute.value) {
    return 'https://alarmclock.ronjiemanon.com/og-image.svg'
  }

  return `${siteUrl.value}/og-image.svg`
})

const robots = computed(() => (isMoneyManagerFallbackPath.value ? 'noindex,follow' : 'index,follow'))

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

  return {
    titleTemplate: (titleChunk) => titleChunk || profile.name,
    htmlAttrs: { lang: 'en' },
    link: [{ rel: 'canonical', href: canonicalUrl.value }],
    script: scripts
  }
})

useSeoMeta(() => ({
  title: defaultTitle.value,
  description: defaultDescription.value,
  ogTitle: defaultTitle.value,
  ogDescription: defaultDescription.value,
  ogType: 'website',
  ogUrl: canonicalUrl.value,
  ogImage: ogImage.value,
  twitterTitle: defaultTitle.value,
  twitterDescription: defaultDescription.value,
  twitterCard: 'summary_large_image',
  twitterImage: ogImage.value,
  robots: robots.value
}))
</script>
