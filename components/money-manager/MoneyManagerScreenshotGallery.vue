<template>
  <section class="mx-auto max-w-6xl px-6 py-14" id="screenshots">
    <div class="space-y-3">
      <p class="font-mono text-[11px] uppercase tracking-[0.24em] text-[#70a59e]">Product Preview</p>
      <h2 class="text-3xl font-semibold text-[#e6faf6]">Screens that keep your numbers clear</h2>
      <p class="max-w-3xl text-sm text-[#99beb8]">
        Built around a readable dark theme with high-contrast cards, trend charts, and focused finance actions.
      </p>
    </div>

    <div class="mt-8 overflow-x-auto pb-2">
      <div class="grid min-w-[940px] grid-cols-4 gap-4 lg:min-w-0 lg:grid-cols-4">
        <article
          v-for="(shot, index) in galleryShots"
          :key="shot.id"
          class="animate-mm-slide rounded-3xl border border-[#255850]/70 bg-[linear-gradient(180deg,rgba(12,38,33,0.92)_0%,rgba(6,20,18,0.92)_100%)] p-3"
          :style="{ animationDelay: `${index * 50}ms` }"
        >
          <img
            class="h-[380px] w-full rounded-2xl object-cover object-top"
            :src="shot.src"
            :alt="shot.alt"
            loading="lazy"
            decoding="async"
          />
          <h3 class="mt-3 text-sm font-semibold text-[#e4f8f4]">{{ shot.title }}</h3>
          <p class="mt-1 text-xs text-[#8eb5af]">{{ shot.note }}</p>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { MoneyManagerScreenshot } from '~/data/moneyManagerSite'

const props = defineProps<{
  screenshots: MoneyManagerScreenshot[]
}>()

const galleryShots = computed(() => props.screenshots.filter((shot) => shot.id !== 'hero-banner'))
</script>

<style scoped>
.animate-mm-slide {
  animation: mm-slide 0.55s ease-out both;
}

@keyframes mm-slide {
  0% {
    opacity: 0;
    transform: translateX(10px);
  }

  100% {
    opacity: 1;
    transform: translateX(0);
  }
}

@media (prefers-reduced-motion: reduce) {
  .animate-mm-slide {
    animation: none;
  }
}
</style>
