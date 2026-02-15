<template>
  <div v-if="isMoneyManagerHost">
    <MoneyManagerLanding />
  </div>
  <div v-else>
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
import MoneyManagerLanding from '~/components/money-manager/MoneyManagerLanding.vue'
import { moneyManagerSite } from '~/data/moneyManagerSite'

const profile = useProfile()
const { isMoneyManagerHost } = useHostRouting()

useSeoMeta(() => {
  if (isMoneyManagerHost.value) {
    return {
      title: moneyManagerSite.pageTitle,
      description: moneyManagerSite.heroDescription,
      ogTitle: moneyManagerSite.pageTitle,
      ogDescription: moneyManagerSite.heroDescription,
      twitterTitle: moneyManagerSite.pageTitle,
      twitterDescription: moneyManagerSite.heroDescription
    }
  }

  const title = `${profile.name} | Mobile App Developer`
  const description =
    `${profile.name} builds Android apps with Kotlin/Jetpack Compose and iOS apps with Swift/SwiftUI, focused on fast and reliable user experiences.`

  return {
    title,
    description,
    ogTitle: title,
    ogDescription: description,
    twitterTitle: title,
    twitterDescription: description
  }
})
</script>
