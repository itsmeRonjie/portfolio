<template>
  <section class="mx-auto max-w-6xl px-6 py-14" id="features">
    <div class="flex flex-wrap items-end justify-between gap-4">
      <div>
        <p class="font-mono text-[11px] uppercase tracking-[0.24em] text-[#70a59e]">Feature Set</p>
        <h2 class="mt-2 text-3xl font-semibold text-[#e6faf6]">Everything you need to run your monthly plan</h2>
      </div>
      <a
        class="inline-flex items-center rounded-full border border-[#2d6f66]/65 bg-[#0d2924]/75 px-4 py-2 text-xs font-semibold text-[#a8d2cb] transition hover:border-[#4bbcae]/70 hover:text-[#e5faf7]"
        :href="playStoreUrl"
        target="_blank"
        rel="noreferrer"
      >
        See full listing
      </a>
    </div>

    <div class="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <article
        v-for="(feature, index) in features"
        :key="feature.id"
        class="animate-mm-rise rounded-3xl border border-[#285f58]/70 bg-[linear-gradient(155deg,rgba(15,41,36,0.95)_0%,rgba(8,24,21,0.92)_100%)] p-5 shadow-[0_18px_44px_rgba(0,0,0,0.34)]"
        :style="{ animationDelay: `${index * 60}ms` }"
      >
        <div class="flex items-center justify-between gap-2">
          <h3 class="text-lg font-semibold text-[#e7faf7]">{{ feature.title }}</h3>
          <span
            v-if="feature.premium"
            class="inline-flex items-center rounded-full border border-[#6f5dd4]/45 bg-[#4f408a]/25 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#d3ccff]"
          >
            Premium
          </span>
        </div>
        <p class="mt-3 text-sm leading-relaxed text-[#9dc3bd]">{{ feature.description }}</p>
        <ul class="mt-4 space-y-2">
          <li
            v-for="point in feature.highlights"
            :key="point"
            class="flex gap-2 text-sm text-[#cce9e4]"
          >
            <span class="mt-1 h-1.5 w-1.5 rounded-full bg-[#30d8c0]" aria-hidden="true" />
            <span>{{ point }}</span>
          </li>
        </ul>
      </article>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { MoneyManagerFeature } from '~/data/moneyManagerSite'

defineProps<{
  features: MoneyManagerFeature[]
  playStoreUrl: string
}>()
</script>

<style scoped>
.animate-mm-rise {
  animation: mm-rise 0.6s ease-out both;
}

@keyframes mm-rise {
  0% {
    opacity: 0;
    transform: translateY(10px);
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
