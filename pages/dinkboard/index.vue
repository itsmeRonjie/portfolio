<template>
  <DinkBoardLanding />
</template>

<script setup lang="ts">
import DinkBoardLanding from '~/components/dinkboard/DinkBoardLanding.vue'

const { content } = useDinkBoardSiteContent()

useSeoMeta(() => ({
  title: content.value.pageTitle,
  description: content.value.heroSubtitle,
  ogTitle: content.value.pageTitle,
  ogDescription: content.value.heroSubtitle,
  twitterTitle: content.value.pageTitle,
  twitterDescription: content.value.heroSubtitle
}))
</script>
