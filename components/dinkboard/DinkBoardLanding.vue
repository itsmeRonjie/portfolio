<template>
  <div class="min-h-screen bg-[#07100a] text-[#eefbdf]">
    <DinkBoardNav
      :play-store-url="content.playStoreUrl"
      :app-icon-path="content.appIconPath"
      :home-path="homePath"
      :support-path="supportPath"
      :section-base-path="homePath"
    />
    <DinkBoardHero :content="content" :support-path="supportPath" />
    <DinkBoardFeatureGrid :features="content.features" :play-store-url="content.playStoreUrl" />
    <DinkBoardTrustSection
      :trust-bullets="content.trustBullets"
      :privacy-path="privacyPath"
      :support-path="supportPath"
      :support-email="content.supportEmail"
    />
    <section class="mx-auto max-w-6xl px-6 pb-16 pt-10">
      <div class="rounded-xl border border-[#2d4622]/85 bg-[linear-gradient(140deg,#16240f_0%,#101b0d_62%,#10140f_100%)] p-8 shadow-[0_28px_65px_rgba(0,0,0,0.42)]">
        <div class="grid gap-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div>
            <p class="font-mono text-[11px] uppercase tracking-[0.24em] text-[#a8c98f]">Get Started</p>
            <h2 class="mt-2 text-3xl font-semibold leading-tight text-[#f4ffec]">Keep the score moving from the first serve</h2>
            <p class="mt-3 max-w-2xl text-sm leading-relaxed text-[#b7cda5]">
              Open DinkBoard at the table, start a match, and keep the host device authoritative from setup through match history.
            </p>
          </div>
          <div class="flex flex-wrap gap-3 lg:justify-end">
            <a
              class="inline-flex items-center justify-center rounded-lg border border-[#ff7a2e]/50 bg-[#ff7a2e] px-5 py-2.5 text-sm font-semibold text-[#170905] transition hover:-translate-y-0.5 hover:brightness-105"
              :href="content.playStoreUrl"
              target="_blank"
              rel="noreferrer"
            >
              View on Google Play
            </a>
            <NuxtLink
              class="inline-flex items-center justify-center rounded-lg border border-[#466731]/70 bg-[#14210f] px-5 py-2.5 text-sm font-semibold text-[#d7edc4] transition hover:border-[#8bca1e]/70 hover:text-white"
              :to="supportPath"
            >
              Support
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import DinkBoardNav from '~/components/dinkboard/DinkBoardNav.vue'
import DinkBoardHero from '~/components/dinkboard/DinkBoardHero.vue'
import DinkBoardFeatureGrid from '~/components/dinkboard/DinkBoardFeatureGrid.vue'
import DinkBoardTrustSection from '~/components/dinkboard/DinkBoardTrustSection.vue'

const { content } = useDinkBoardSiteContent()
const { isDinkBoardFallbackPath } = useHostRouting()

const homePath = computed(() => (isDinkBoardFallbackPath.value ? '/dinkboard' : '/'))
const supportPath = computed(() => (isDinkBoardFallbackPath.value ? '/dinkboard/support' : content.value.supportPath))
const privacyPath = computed(() =>
  isDinkBoardFallbackPath.value ? '/dinkboard/privacy-policy' : content.value.privacyPath
)
</script>
