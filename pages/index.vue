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
</script>
