<template>
  <MoneyManagerLanding />
</template>

<script setup lang="ts">
import MoneyManagerLanding from '~/components/money-manager/MoneyManagerLanding.vue'
import { moneyManagerSite } from '~/data/moneyManagerSite'

useSeoMeta({
  title: moneyManagerSite.pageTitle,
  description: moneyManagerSite.heroDescription,
  ogTitle: moneyManagerSite.pageTitle,
  ogDescription: moneyManagerSite.heroDescription,
  twitterTitle: moneyManagerSite.pageTitle,
  twitterDescription: moneyManagerSite.heroDescription
})
</script>
