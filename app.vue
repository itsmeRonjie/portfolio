<template>
  <div class="min-h-screen text-slate-100">
    <NuxtPage />
  </div>
</template>

<script setup lang="ts">
const profile = useProfile()
const route = useRoute()
const config = useRuntimeConfig()
const requestUrl = useRequestURL()
const siteTitle = `${profile.name} | ${profile.title}`
const description = profile.summary
const siteUrl = computed(() => config.public.siteUrl.replace(/\/$/, ''))
const requestHost = computed(() => requestUrl.hostname.toLowerCase())
const isMoneyManagerPolicyRoute = computed(
  () =>
    route.path === '/money-manager/privacy-policy' ||
    (route.path === '/privacy-policy' && requestHost.value === 'moneymanager.ronjiemanon.com')
)
const isAlarmClockPolicyRoute = computed(
  () =>
    route.path === '/alarm-clock/privacy-policy' ||
    (route.path === '/privacy-policy' && requestHost.value === 'alarmclock.ronjiemanon.com')
)
const canonicalUrl = computed(() => {
  if (isMoneyManagerPolicyRoute.value) {
    return 'https://moneymanager.ronjiemanon.com/privacy-policy'
  }

  if (isAlarmClockPolicyRoute.value) {
    return 'https://alarmclock.ronjiemanon.com/privacy-policy'
  }

  return `${siteUrl.value}${route.path}`
})

const ogImage = computed(() => {
  if (isMoneyManagerPolicyRoute.value) {
    return 'https://moneymanager.ronjiemanon.com/og-image.svg'
  }

  if (isAlarmClockPolicyRoute.value) {
    return 'https://alarmclock.ronjiemanon.com/og-image.svg'
  }

  return `${siteUrl.value}/og-image.svg`
})

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

useHead(() => ({
  titleTemplate: (titleChunk) => titleChunk || profile.name,
  htmlAttrs: { lang: 'en' },
  link: [{ rel: 'canonical', href: canonicalUrl.value }],
  script: [
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
}))

useSeoMeta(() => ({
  title: siteTitle,
  description,
  ogTitle: siteTitle,
  ogDescription: description,
  ogType: 'website',
  ogUrl: canonicalUrl.value,
  ogImage: ogImage.value,
  twitterTitle: siteTitle,
  twitterDescription: description,
  twitterCard: 'summary_large_image',
  twitterImage: ogImage.value
}))
</script>
