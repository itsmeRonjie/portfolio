<template>
  <section class="relative overflow-hidden border-b border-[#253c1b]/70 bg-[linear-gradient(180deg,#07100a_0%,#0c160c_52%,#10140f_100%)]" id="overview">
    <div
      class="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(139,202,30,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(139,202,30,0.06)_1px,transparent_1px)] bg-[size:42px_42px]"
      aria-hidden="true"
    />

    <div class="relative mx-auto grid max-w-6xl gap-10 px-6 pb-14 pt-12 lg:grid-cols-[1.04fr_0.96fr] lg:items-center">
      <div class="space-y-6">
        <p class="font-mono text-[11px] uppercase tracking-[0.28em] text-[#aacb91]">Court-side scoring</p>
        <h1 class="text-4xl font-semibold leading-tight text-[#f4ffec] sm:text-5xl lg:text-6xl">{{ content.heroTitle }}</h1>
        <p class="max-w-2xl text-lg leading-relaxed text-[#cfe3bf] sm:text-xl">{{ content.heroSubtitle }}</p>
        <p class="max-w-2xl text-sm leading-relaxed text-[#a9bf99] sm:text-base">{{ content.heroDescription }}</p>

        <div class="flex flex-wrap gap-2">
          <span
            v-for="chip in content.statChips"
            :key="chip"
            class="inline-flex items-center rounded-lg border border-[#3f5e2a]/70 bg-[#14210f]/80 px-3 py-1 text-xs font-medium text-[#d7edc4]"
          >
            {{ chip }}
          </span>
        </div>

        <div class="flex flex-wrap items-center gap-3">
          <a
            class="inline-flex items-center justify-center rounded-lg border border-[#ff7a2e]/50 bg-[#ff7a2e] px-5 py-2.5 text-sm font-semibold text-[#170905] transition hover:-translate-y-0.5 hover:brightness-105"
            :href="content.playStoreUrl"
            target="_blank"
            rel="noreferrer"
          >
            View on Google Play
          </a>
          <NuxtLink
            class="inline-flex items-center justify-center rounded-lg border border-[#4a6b34]/70 bg-[#172410]/85 px-5 py-2.5 text-sm font-semibold text-[#d2e8c0] transition hover:border-[#8bca1e]/65 hover:text-white"
            :to="supportPath"
          >
            Contact Support
          </NuxtLink>
        </div>
      </div>

      <div class="rounded-xl border border-[#385726]/80 bg-[#101b0e]/92 p-5 shadow-[0_28px_70px_rgba(0,0,0,0.45)] sm:p-6">
        <div class="mb-5 flex items-start justify-between gap-3">
          <div>
            <p class="font-mono text-[10px] uppercase tracking-[0.24em] text-[#a8c98f]">Live Score</p>
            <h2 class="mt-2 text-xl font-semibold text-[#f2ffe9]">Host view preview</h2>
          </div>
          <img
            class="h-12 w-12 rounded-lg border border-[#8bca1e]/45 bg-[#081008]"
            :src="content.appIconPath"
            alt=""
            loading="eager"
            decoding="async"
          />
        </div>

        <div class="rounded-lg border border-[#2e4b21] bg-[#071008] p-4">
          <div class="grid grid-cols-[1fr_auto_1fr] items-center gap-3">
            <div>
              <p class="font-mono text-[10px] uppercase tracking-[0.18em] text-[#9fbd86]">Home</p>
              <p class="mt-1 text-lg font-semibold text-[#f6ffe9]">North End</p>
            </div>
            <div class="rounded-lg border border-[#314a24] bg-[#101c0d] px-3 py-1 text-xs font-semibold text-[#d9efc6]">
              Rally 11
            </div>
            <div class="text-right">
              <p class="font-mono text-[10px] uppercase tracking-[0.18em] text-[#9fbd86]">Away</p>
              <p class="mt-1 text-lg font-semibold text-[#f6ffe9]">South Line</p>
            </div>
          </div>

          <div class="mt-6 grid grid-cols-[1fr_auto_1fr] items-center gap-3">
            <div class="rounded-lg border border-[#8bca1e]/40 bg-[#17240f] p-5 text-center">
              <p class="text-6xl font-semibold leading-none text-[#8bca1e]">8</p>
              <p class="mt-2 text-xs font-semibold text-[#cce8b2]">Serving</p>
            </div>
            <div class="font-mono text-sm font-semibold text-[#ff7a2e]">:</div>
            <div class="rounded-lg border border-[#3053c8]/45 bg-[#0e1430] p-5 text-center">
              <p class="text-6xl font-semibold leading-none text-[#6f8aff]">6</p>
              <p class="mt-2 text-xs font-semibold text-[#c2ccff]">Receiver</p>
            </div>
          </div>

          <div class="mt-5 grid gap-3 sm:grid-cols-3">
            <div class="rounded-lg border border-[#2d4622] bg-[#0f180d] p-3">
              <p class="text-xs text-[#a9bf99]">Server</p>
              <p class="mt-1 font-semibold text-[#f1ffe7]">1</p>
            </div>
            <div class="rounded-lg border border-[#2d4622] bg-[#0f180d] p-3">
              <p class="text-xs text-[#a9bf99]">Undo</p>
              <p class="mt-1 font-semibold text-[#f1ffe7]">Available</p>
            </div>
            <div class="rounded-lg border border-[#2d4622] bg-[#0f180d] p-3">
              <p class="text-xs text-[#a9bf99]">Nearby</p>
              <p class="mt-1 font-semibold text-[#f1ffe7]">#321 Public</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { DinkBoardSiteContent } from '~/data/dinkBoardSite'

defineProps<{
  content: DinkBoardSiteContent
  supportPath: string
}>()
</script>
