<template>
  <section class="relative overflow-hidden border-b border-[#1f4f49]/40" id="overview">
    <div
      class="pointer-events-none absolute inset-0 bg-[radial-gradient(550px_at_14%_14%,rgba(43,232,198,0.24),transparent_60%),radial-gradient(660px_at_85%_10%,rgba(94,160,144,0.26),transparent_60%),linear-gradient(180deg,#02100d_0%,#041513_55%,#051917_100%)]"
      aria-hidden="true"
    />
    <div class="relative mx-auto grid max-w-6xl gap-10 px-6 pb-14 pt-12 lg:grid-cols-[1.02fr_0.98fr] lg:items-center">
      <div class="animate-mm-rise space-y-6">
        <p class="font-mono text-[11px] uppercase tracking-[0.28em] text-[#76afa7]">Smart Wealth Tracking</p>
        <h1 class="text-4xl font-semibold leading-tight text-[#e7fbf7] sm:text-5xl lg:text-6xl">{{ content.heroTitle }}</h1>
        <p class="max-w-2xl text-lg leading-relaxed text-[#b7d7d2] sm:text-xl">{{ content.heroSubtitle }}</p>
        <p class="max-w-2xl text-sm leading-relaxed text-[#9ac0ba] sm:text-base">{{ content.heroDescription }}</p>

        <div class="flex flex-wrap gap-2">
          <span
            v-for="chip in content.statChips"
            :key="chip"
            class="inline-flex items-center rounded-full border border-[#2a6f67]/60 bg-[#0a2a25]/70 px-3 py-1 text-xs font-medium text-[#9bd0c9]"
          >
            {{ chip }}
          </span>
        </div>

        <div class="flex flex-wrap items-center gap-3">
          <a
            class="inline-flex items-center justify-center rounded-full border border-[#31dbc2]/45 bg-[#31dbc2] px-5 py-2.5 text-sm font-semibold text-[#09332d] shadow-[0_0_26px_rgba(49,219,194,0.3)] transition hover:-translate-y-0.5 hover:brightness-105"
            :href="content.playStoreUrl"
            target="_blank"
            rel="noreferrer"
          >
            Install on Google Play
          </a>
          <NuxtLink
            class="inline-flex items-center justify-center rounded-full border border-[#366f68]/70 bg-[#0e2924]/80 px-5 py-2.5 text-sm font-semibold text-[#c6e6e1] transition hover:border-[#56c9bb]/65 hover:text-white"
            :to="supportPath"
          >
            Contact Support
          </NuxtLink>
        </div>
      </div>

      <div class="animate-mm-rise [animation-delay:120ms]">
        <div class="relative mx-auto max-w-[540px]">
          <img
            v-if="heroBanner"
            class="w-full rounded-[2rem] border border-[#2d5f5a]/75 object-cover shadow-[0_28px_70px_rgba(0,0,0,0.5)]"
            :src="heroBanner.src"
            :alt="heroBanner.alt"
            loading="eager"
            decoding="async"
          />
          <img
            v-if="homeScreenshot"
            class="absolute -bottom-8 right-4 hidden w-[42%] rounded-[1.6rem] border border-[#335f58]/80 shadow-[0_24px_55px_rgba(0,0,0,0.55)] md:block"
            :src="homeScreenshot.src"
            :alt="homeScreenshot.alt"
            loading="lazy"
            decoding="async"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { MoneyManagerSiteContent } from '~/data/moneyManagerSite'

const props = defineProps<{
  content: MoneyManagerSiteContent
  supportPath: string
}>()

const heroBanner = computed(() => props.content.screenshots.find((shot) => shot.id === 'hero-banner') ?? null)
const homeScreenshot = computed(() => props.content.screenshots.find((shot) => shot.id === 'home') ?? null)
</script>

<style scoped>
.animate-mm-rise {
  animation: mm-rise 0.65s ease-out both;
}

@keyframes mm-rise {
  0% {
    opacity: 0;
    transform: translateY(14px);
  }

  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (prefers-reduced-motion: reduce) {
  .animate-mm-rise {
    animation: none;
  }
}
</style>
