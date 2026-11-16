<template>
  <article v-tilt="{ max: 5 }" class="ui-panel flex h-full flex-col !rounded-3xl !p-5 transition-colors hover:border-accent-2/45">
    <div class="flex items-start gap-4">
      <div class="h-16 w-16 shrink-0 overflow-hidden rounded-2xl border border-border/60 bg-surface-strong shadow-[0_10px_30px_rgba(0,0,0,0.45)]">
        <img v-if="app.icon" class="h-full w-full object-cover" :src="app.icon" :alt="`${app.title} icon`" loading="lazy" decoding="async" />
        <div v-else class="h-full w-full bg-white/10" />
      </div>
      <div class="min-w-0 flex-1">
        <h3 class="text-lg font-semibold leading-snug text-white">{{ app.title }}</h3>
        <div class="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1.5 text-xs text-slate-300">
          <span v-if="hasRating" class="flex items-center gap-1 font-mono text-amber-200">
            <svg aria-hidden="true" class="h-3.5 w-3.5 fill-current" viewBox="0 0 20 20">
              <path d="M10 1.5l2.63 5.34 5.89.86-4.26 4.15 1.01 5.87L10 15.02 4.73 17.72l1.01-5.87L1.48 7.7l5.89-.86L10 1.5z" />
            </svg>
            {{ (app.rating ?? 0).toFixed(1) }}
          </span>
          <span v-if="hasReviews" class="font-mono text-slate-400">
            {{ (app.reviewCount ?? 0).toLocaleString('en-US') }} {{ app.reviewCount === 1 ? 'review' : 'reviews' }}
          </span>
          <span v-if="app.installs" class="ui-chip border-accent-2/35 bg-accent-2/10 !px-2 !py-0.5 !text-[10px] font-mono text-accent-2">
            {{ app.installs }} downloads
          </span>
        </div>
      </div>
    </div>

    <p class="mt-4 flex-1 text-sm leading-relaxed text-slate-300">
      {{ app.summary || 'No description available.' }}
    </p>

    <div class="mt-5 flex flex-wrap items-center gap-3 text-xs text-slate-400">
      <span v-if="app.category" class="ui-chip font-mono !px-2.5 !py-1 !text-[10px]">{{ app.category }}</span>
      <a class="ui-link ml-auto" :href="app.link" target="_blank" rel="noreferrer">View on Play Store →</a>
    </div>
  </article>
</template>

<script setup lang="ts">
import type { PlayStoreApp } from '~/composables/usePlayStoreApps'

const props = defineProps<{ app: PlayStoreApp }>()

const hasRating = computed(() => props.app.rating !== undefined && Number.isFinite(props.app.rating) && props.app.rating > 0)
const hasReviews = computed(
  () => props.app.reviewCount !== undefined && Number.isFinite(props.app.reviewCount) && props.app.reviewCount > 0
)
</script>
