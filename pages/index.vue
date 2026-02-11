<template>
  <div>
    <SiteNav />
    <main>
      <SectionHero />
      <SectionTechnologies />
      <SectionPlayStore />
      <SectionWork />
      <SectionToolbox />
      <SectionFooterCTA />
    </main>
  </div>
</template>

<script setup lang="ts">
import SiteNav from '~/components/SiteNav.vue'
import SectionHero from '~/components/SectionHero.vue'
import SectionTechnologies from '~/components/SectionTechnologies.vue'
import SectionPlayStore from '~/components/SectionPlayStore.vue'
import SectionWork from '~/components/SectionWork.vue'
import SectionToolbox from '~/components/SectionToolbox.vue'
import SectionFooterCTA from '~/components/SectionFooterCTA.vue'

const profile = useProfile()

const title = `${profile.name} | Software Engineer`
const description = `${profile.name} is a software engineer and mobile application developer specializing in Android and iOS products.`

useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: description,
  twitterTitle: title,
  twitterDescription: description
})
</script>
