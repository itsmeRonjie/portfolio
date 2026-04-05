<template>
  <MoneyManagerLanding />
</template>

<script setup lang="ts">
import MoneyManagerLanding from '~/components/money-manager/MoneyManagerLanding.vue'
const { content } = useMoneyManagerSiteContent()

useSeoMeta(() => ({
  title: content.value.pageTitle,
  description: content.value.heroSubtitle,
  ogTitle: content.value.pageTitle,
  ogDescription: content.value.heroSubtitle,
  twitterTitle: content.value.pageTitle,
  twitterDescription: content.value.heroSubtitle
}))
</script>
