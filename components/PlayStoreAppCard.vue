<template>
  <article class="ui-panel justify-self-start !rounded-2xl !p-5 transition hover:border-accent-2/45 flex h-full max-w-full flex-col" :style="cardWidthStyle">
    <div ref="topRowRef" class="inline-flex w-max max-w-full items-start gap-4">
      <div
        class="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-border/60 bg-surface-strong"
      >
        <img
          v-if="app.icon"
          class="h-full w-full object-cover"
          :src="app.icon"
          :alt="`${app.title} icon`"
          loading="lazy"
          decoding="async"
        />
        <div v-else class="h-full w-full rounded-xl bg-white/10" />
      </div>
      <div class="min-w-0">
        <div class="flex w-fit max-w-full flex-nowrap items-start gap-3">
          <h3 class="whitespace-nowrap text-lg font-semibold text-white">
            {{ app.title }}
          </h3>
          <span
            v-if="app.installs"
            class="ui-chip shrink-0 whitespace-nowrap border-accent-2/35 bg-accent-2/10 !px-2.5 !py-1 !text-[10px] font-mono text-accent-2"
          >
            {{ app.installs }} downloads
          </span>
        </div>
        <div
          v-if="hasRating(app)"
          class="mt-2 flex flex-wrap items-center gap-2 text-xs text-slate-300"
        >
          <span class="flex items-center gap-1 font-mono text-amber-200">
            <svg
              aria-hidden="true"
              class="h-3.5 w-3.5 fill-current"
              viewBox="0 0 20 20"
            >
              <path
                d="M10 1.5l2.63 5.34 5.89.86-4.26 4.15 1.01 5.87L10 15.02 4.73 17.72l1.01-5.87L1.48 7.7l5.89-.86L10 1.5z"
              />
            </svg>
            {{ formatRating(app.rating ?? 0) }}
          </span>
          <span
            v-if="hasReviewCount(app)"
            class="font-mono text-slate-400"
          >
            {{ formatReviews(app.reviewCount ?? 0) }} {{ app.reviewCount === 1 ? 'review' : 'reviews' }}
          </span>
        </div>
      </div>
    </div>

    <div class="mt-4 flex-1" :style="contentWidthStyle">
      <p class="text-sm leading-relaxed text-slate-300">
        {{ app.summary || 'No description available.' }}
      </p>
    </div>

    <div class="mt-auto flex flex-wrap items-center gap-3 pt-4 text-xs text-slate-400" :style="contentWidthStyle">
      <span
        v-if="app.category"
        class="ui-chip font-mono !px-2.5 !py-1 !text-[10px]"
      >
        {{ app.category }}
      </span>
      <a
        class="ui-link ml-auto"
        :href="app.link"
        target="_blank"
        rel="noreferrer"
      >
        View on Play Store -&gt;
      </a>
    </div>
  </article>
</template>

<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref } from 'vue'
import type { PlayStoreApp } from '~/composables/usePlayStoreApps'

defineProps<{ app: PlayStoreApp }>()

const formatRating = (value: number) => value.toFixed(1)
const formatReviews = (value: number) => value.toLocaleString('en-US')
const hasRating = (app: PlayStoreApp) => app.rating !== undefined && Number.isFinite(app.rating) && app.rating > 0
const hasReviewCount = (app: PlayStoreApp) =>
  app.reviewCount !== undefined && Number.isFinite(app.reviewCount) && app.reviewCount > 0

const topRowRef = ref<HTMLElement | null>(null)
const topRowWidth = ref<number | null>(null)
const CARD_HORIZONTAL_PADDING = 40
let topRowSyncFrame: number | null = null

const syncTopRowWidth = () => {
  topRowWidth.value = topRowRef.value ? Math.ceil(topRowRef.value.scrollWidth) : null
}

const queueTopRowWidthSync = () => {
  if (topRowSyncFrame !== null) {
    cancelAnimationFrame(topRowSyncFrame)
  }

  topRowSyncFrame = requestAnimationFrame(() => {
    topRowSyncFrame = null
    syncTopRowWidth()
  })
}

const contentWidthStyle = computed(() =>
  topRowWidth.value
    ? {
        width: `${topRowWidth.value}px`,
        maxWidth: '100%'
      }
    : undefined
)

const cardWidthStyle = computed(() =>
  topRowWidth.value
    ? {
        width: `${topRowWidth.value + CARD_HORIZONTAL_PADDING}px`,
        maxWidth: '100%'
      }
    : undefined
)

onMounted(() => {
  nextTick(() => {
    queueTopRowWidthSync()
  })

  window.addEventListener('resize', queueTopRowWidthSync)
  document.fonts?.ready.then(() => {
    queueTopRowWidthSync()
  }).catch(() => {})
})

onBeforeUnmount(() => {
  if (topRowSyncFrame !== null) {
    cancelAnimationFrame(topRowSyncFrame)
  }
  window.removeEventListener('resize', queueTopRowWidthSync)
})
</script>
