<template>
  <section class="mx-auto max-w-6xl px-6 py-14" id="features">
    <div class="flex flex-wrap items-end justify-between gap-4">
      <div>
        <p class="font-mono text-[11px] uppercase tracking-[0.24em] text-[#a8c98f]">Feature Set</p>
        <h2 class="mt-2 text-3xl font-semibold text-[#f3ffec]">Everything needed for a clean pickleball score table</h2>
      </div>
      <a
        class="inline-flex items-center rounded-lg border border-[#4a6b34]/70 bg-[#14210f]/80 px-4 py-2 text-xs font-semibold text-[#d5eac3] transition hover:border-[#8bca1e]/70 hover:text-white"
        :href="playStoreUrl"
        target="_blank"
        rel="noreferrer"
      >
        See Google Play
      </a>
    </div>

    <div class="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <article
        v-for="feature in features"
        :key="feature.id"
        class="rounded-lg border border-[#2d4622]/85 bg-[linear-gradient(155deg,rgba(18,31,13,0.96)_0%,rgba(9,17,9,0.94)_100%)] p-5 shadow-[0_18px_44px_rgba(0,0,0,0.34)]"
      >
        <h3 class="text-lg font-semibold text-[#f3ffec]">{{ feature.title }}</h3>
        <p class="mt-3 text-sm leading-relaxed text-[#a9bf99]">{{ feature.description }}</p>
        <ul class="mt-4 space-y-2">
          <li
            v-for="point in feature.highlights"
            :key="point"
            class="flex gap-2 text-sm text-[#d9efc6]"
          >
            <span class="mt-1 h-1.5 w-1.5 rounded-full bg-[#ff7a2e]" aria-hidden="true" />
            <span>{{ point }}</span>
          </li>
        </ul>
      </article>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { DinkBoardFeature } from '~/data/dinkBoardSite'

defineProps<{
  features: DinkBoardFeature[]
  playStoreUrl: string
}>()
</script>
