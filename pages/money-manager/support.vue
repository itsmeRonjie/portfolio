<template>
  <div class="min-h-screen bg-[#041310] text-[#e6f8f5]">
    <MoneyManagerNav
      :play-store-url="content.playStoreUrl"
      home-path="/money-manager"
      support-path="/money-manager/support"
      section-base-path="/money-manager"
    />
    <MoneyManagerSupportContent :content="content" privacy-path="/money-manager/privacy-policy" />
  </div>
</template>

<script setup lang="ts">
import MoneyManagerNav from '~/components/money-manager/MoneyManagerNav.vue'
import MoneyManagerSupportContent from '~/components/money-manager/MoneyManagerSupportContent.vue'

const { content } = useMoneyManagerSiteContent()

useSeoMeta(() => ({
  title: `Support | ${content.value.appName}`,
  description: `Support and FAQ for ${content.value.appName}.`,
  ogTitle: `Support | ${content.value.appName}`,
  ogDescription: `Support and FAQ for ${content.value.appName}.`,
  twitterTitle: `Support | ${content.value.appName}`,
  twitterDescription: `Support and FAQ for ${content.value.appName}.`
}))
</script>
