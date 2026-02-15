<template>
  <div class="min-h-screen bg-[#041310] text-[#e6f8f5]">
    <MoneyManagerNav :play-store-url="content.playStoreUrl" home-path="/money-manager" support-path="/money-manager/support" />
    <MoneyManagerSupportContent :content="content" privacy-path="/money-manager/privacy-policy" />
  </div>
</template>

<script setup lang="ts">
import MoneyManagerNav from '~/components/money-manager/MoneyManagerNav.vue'
import MoneyManagerSupportContent from '~/components/money-manager/MoneyManagerSupportContent.vue'
import { moneyManagerSite } from '~/data/moneyManagerSite'

const content = moneyManagerSite

useSeoMeta({
  title: `Support | ${content.appName}`,
  description: `Support and FAQ for ${content.shortName}.`,
  ogTitle: `Support | ${content.appName}`,
  ogDescription: `Support and FAQ for ${content.shortName}.`,
  twitterTitle: `Support | ${content.appName}`,
  twitterDescription: `Support and FAQ for ${content.shortName}.`
})
</script>
