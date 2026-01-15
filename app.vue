<template>
  <div class="min-h-screen text-slate-100">
    <NuxtPage />
  </div>
</template>

<script setup lang="ts">
const profile = useProfile()
const route = useRoute()
const siteTitle = `${profile.name} | ${profile.title}`
const description = profile.summary
const siteUrl = 'https://portfolio-rdmanon.vercel.app'
const ogImage = `${siteUrl}/og-image.svg`
const canonicalUrl = computed(() => `${siteUrl}${route.fullPath === '/' ? '' : route.fullPath}`)

useHead(() => ({
  titleTemplate: (titleChunk) => (titleChunk ? `${titleChunk} - ${profile.name}` : profile.name),
  htmlAttrs: { lang: 'en' },
  link: [{ rel: 'canonical', href: canonicalUrl.value }]
}))

useSeoMeta({
  title: siteTitle,
  description,
  ogTitle: siteTitle,
  ogDescription: description,
  ogType: 'website',
  ogUrl: canonicalUrl.value,
  ogImage,
  twitterTitle: siteTitle,
  twitterDescription: description,
  twitterCard: 'summary_large_image',
  twitterImage: ogImage
})
</script>
