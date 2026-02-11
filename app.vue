<template>
  <div class="min-h-screen text-slate-100">
    <NuxtPage />
  </div>
</template>

<script setup lang="ts">
const profile = useProfile()
const route = useRoute()
const config = useRuntimeConfig()
const siteTitle = `${profile.name} | ${profile.title}`
const description = profile.summary
const siteUrl = computed(() => config.public.siteUrl.replace(/\/$/, ''))
const ogImage = computed(() => `${siteUrl.value}/og-image.svg`)
const canonicalUrl = computed(() => `${siteUrl.value}${route.path}`)

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
  titleTemplate: (titleChunk) => (titleChunk ? `${titleChunk} - ${profile.name}` : profile.name),
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
