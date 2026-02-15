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
        <div class="rounded-[2rem] border border-[#2b625b]/70 bg-[#08211d]/70 p-5 shadow-[0_28px_70px_rgba(0,0,0,0.45)] sm:p-6">
          <div class="mb-5 flex items-start justify-between gap-3">
            <div>
              <p class="font-mono text-[10px] uppercase tracking-[0.24em] text-[#7fb3ab]">Mobile Mock</p>
              <h2 class="mt-2 text-xl font-semibold text-[#e3f9f5]">Live app preview</h2>
            </div>
            <span class="inline-flex rounded-full border border-[#30d8c0]/45 bg-[#30d8c0]/20 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#8ff4e3]">
              UI Live
            </span>
          </div>

          <div class="relative mx-auto w-full max-w-[360px]">
            <div class="pointer-events-none absolute -left-5 top-16 h-28 w-28 rounded-full bg-[#2de6c8]/18 blur-3xl" aria-hidden="true" />
            <div class="pointer-events-none absolute -right-4 bottom-16 h-32 w-32 rounded-full bg-[#67d8c5]/14 blur-3xl" aria-hidden="true" />

            <div class="relative rounded-[2.6rem] bg-gradient-to-b from-slate-200/35 via-slate-300/12 to-slate-700/35 p-[2px] shadow-[0_24px_60px_rgba(2,8,16,0.65)]">
              <div class="absolute -left-[3px] top-24 h-11 w-[3px] rounded-r-full bg-slate-300/35" aria-hidden="true" />
              <div class="absolute -left-[3px] top-40 h-14 w-[3px] rounded-r-full bg-slate-300/35" aria-hidden="true" />
              <div class="absolute -right-[3px] top-32 h-20 w-[3px] rounded-l-full bg-slate-300/35" aria-hidden="true" />

              <div class="relative rounded-[2.45rem] border border-white/10 bg-[#050c0b] p-[7px]">
                <div class="relative aspect-[430/932] overflow-hidden rounded-[2.08rem] border border-white/10 bg-[#081815]">
                  <div
                    class="absolute left-1/2 top-2 z-10 h-8 w-[126px] -translate-x-1/2 rounded-full border border-white/10 bg-black/80"
                    aria-hidden="true"
                  />
                  <div class="absolute left-1/2 top-[18px] z-10 h-2 w-2 -translate-x-1/2 rounded-full bg-slate-500/70" aria-hidden="true" />

                  <img
                    v-if="heroScreenshot"
                    class="h-full w-full object-cover object-top"
                    :src="heroScreenshot.src"
                    :alt="heroScreenshot.alt"
                    loading="eager"
                    decoding="async"
                  />
                  <div
                    v-else
                    class="flex h-full w-full items-center justify-center bg-gradient-to-b from-[#0f2c28] via-[#091d1a] to-[#071412] text-xs font-semibold text-[#99c4bd]"
                  >
                    Replace hero screenshot
                  </div>

                  <div class="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/12 to-transparent" aria-hidden="true" />
                  <div class="absolute inset-x-0 bottom-3 flex justify-center" aria-hidden="true">
                    <div class="h-1.5 w-28 rounded-full bg-white/25" />
                  </div>
                </div>
              </div>
            </div>
          </div>
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

const heroScreenshot = computed(
  () =>
    props.content.screenshots.find((shot) => shot.id === props.content.heroScreenshotId) ??
    props.content.screenshots[0] ??
    null
)
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
