<template>
  <div class="min-h-screen bg-[#041310] text-[#e6f8f5]">
    <MoneyManagerNav
      :play-store-url="content.playStoreUrl"
      :home-path="homePath"
      :support-path="supportPath"
      :section-base-path="homePath"
    />
    <MoneyManagerHero :content="content" :support-path="supportPath" />
    <MoneyManagerFeatureGrid :features="content.features" :play-store-url="content.playStoreUrl" />
    <MoneyManagerScreenshotGallery :screenshots="content.screenshots" :hero-screenshot-id="content.heroScreenshotId" />
    <MoneyManagerTrustSection
      :trust-bullets="content.trustBullets"
      :privacy-path="privacyPath"
      :support-path="supportPath"
      :support-email="content.supportEmail"
    />
    <MoneyManagerFinalCta :play-store-url="content.playStoreUrl" :support-path="supportPath" />
  </div>
</template>

<script setup lang="ts">
import MoneyManagerNav from '~/components/money-manager/MoneyManagerNav.vue'
import MoneyManagerHero from '~/components/money-manager/MoneyManagerHero.vue'
import MoneyManagerFeatureGrid from '~/components/money-manager/MoneyManagerFeatureGrid.vue'
import MoneyManagerScreenshotGallery from '~/components/money-manager/MoneyManagerScreenshotGallery.vue'
import MoneyManagerTrustSection from '~/components/money-manager/MoneyManagerTrustSection.vue'
import MoneyManagerFinalCta from '~/components/money-manager/MoneyManagerFinalCta.vue'

const { content } = useMoneyManagerSiteContent()
const { isMoneyManagerFallbackPath } = useHostRouting()

const homePath = computed(() => (isMoneyManagerFallbackPath.value ? '/money-manager' : '/'))
const supportPath = computed(() => (isMoneyManagerFallbackPath.value ? '/money-manager/support' : content.supportPath))
const privacyPath = computed(() =>
  isMoneyManagerFallbackPath.value ? '/money-manager/privacy-policy' : content.privacyPath
)
</script>
