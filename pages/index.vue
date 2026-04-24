<template>
  <div v-if="isMoneyManagerHost">
    <MoneyManagerLanding />
  </div>
  <div v-else-if="isDinkBoardHost">
    <DinkBoardLanding />
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
import DinkBoardLanding from '~/components/dinkboard/DinkBoardLanding.vue'

const profile = useProfile()
const { isMoneyManagerHost, isDinkBoardHost } = useHostRouting()
const { content: moneyManagerContent } = useMoneyManagerSiteContent(isMoneyManagerHost)
const { content: dinkBoardContent } = useDinkBoardSiteContent()

useSeoMeta(() => {
  if (isMoneyManagerHost.value) {
    return {
      title: moneyManagerContent.value.pageTitle,
      description: moneyManagerContent.value.heroSubtitle,
      ogTitle: moneyManagerContent.value.pageTitle,
      ogDescription: moneyManagerContent.value.heroSubtitle,
      twitterTitle: moneyManagerContent.value.pageTitle,
      twitterDescription: moneyManagerContent.value.heroSubtitle
    }
  }

  if (isDinkBoardHost.value) {
    return {
      title: dinkBoardContent.value.pageTitle,
      description: dinkBoardContent.value.heroSubtitle,
      ogTitle: dinkBoardContent.value.pageTitle,
      ogDescription: dinkBoardContent.value.heroSubtitle,
      twitterTitle: dinkBoardContent.value.pageTitle,
      twitterDescription: dinkBoardContent.value.heroSubtitle
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
