<template>
  <div v-if="isMoneyManagerHost" class="min-h-screen bg-[#041310] text-[#e6f8f5]">
    <MoneyManagerNav :play-store-url="content.playStoreUrl" home-path="/" support-path="/support" section-base-path="/" />
    <MoneyManagerSupportContent :content="content" privacy-path="/privacy-policy" />
  </div>
  <div v-else>
    <SiteNav />
    <main class="mx-auto max-w-3xl px-6 py-16 text-slate-300">
      <p class="ui-eyebrow">Support</p>
      <h1 class="mt-3 text-3xl font-semibold text-white">MoneyManager support lives on the app subdomain.</h1>
      <p class="mt-4 text-sm leading-relaxed text-slate-300">
        Open the official support page at
        <a class="ui-link" href="https://moneymanager.ronjiemanon.com/support">moneymanager.ronjiemanon.com/support</a>
        or email
        <a class="ui-link" :href="`mailto:${content.supportEmail}`">{{ content.supportEmail }}</a>.
      </p>
      <div class="mt-6 flex flex-wrap gap-3">
        <a class="ui-cta-primary" :href="content.playStoreUrl" target="_blank" rel="noreferrer">Install on Google Play</a>
        <NuxtLink class="ui-cta-secondary" to="/money-manager">Open fallback app page</NuxtLink>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import SiteNav from '~/components/SiteNav.vue'
import MoneyManagerNav from '~/components/money-manager/MoneyManagerNav.vue'
import MoneyManagerSupportContent from '~/components/money-manager/MoneyManagerSupportContent.vue'

const { content } = useMoneyManagerSiteContent()
const { isMoneyManagerHost } = useHostRouting()

useSeoMeta(() => {
  if (isMoneyManagerHost.value) {
    return {
      title: `Support | ${content.value.appName}`,
      description: `Support and FAQ for ${content.value.appName}.`,
      robots: 'index,follow'
    }
  }

  return {
    title: 'MoneyManager Support',
    description: `Support details for ${content.value.appName}.`,
    robots: 'noindex,follow'
  }
})
</script>
