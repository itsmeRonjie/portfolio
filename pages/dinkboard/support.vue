<template>
  <div class="min-h-screen bg-[#07100a] text-[#eefbdf]">
    <DinkBoardNav
      :play-store-url="content.playStoreUrl"
      :app-icon-path="content.appIconPath"
      home-path="/dinkboard"
      support-path="/dinkboard/support"
      section-base-path="/dinkboard"
    />
    <DinkBoardSupportContent :content="content" privacy-path="/dinkboard/privacy-policy" />
  </div>
</template>

<script setup lang="ts">
import DinkBoardNav from '~/components/dinkboard/DinkBoardNav.vue'
import DinkBoardSupportContent from '~/components/dinkboard/DinkBoardSupportContent.vue'

const { content } = useDinkBoardSiteContent()

useSeoMeta(() => ({
  title: `Support | ${content.value.appName}`,
  description: `Support and FAQ for ${content.value.appName}.`,
  ogTitle: `Support | ${content.value.appName}`,
  ogDescription: `Support and FAQ for ${content.value.appName}.`,
  twitterTitle: `Support | ${content.value.appName}`,
  twitterDescription: `Support and FAQ for ${content.value.appName}.`
}))
</script>
