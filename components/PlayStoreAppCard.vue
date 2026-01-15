<template>
  <article class="rounded-2xl border border-border/60 bg-surface p-5 transition hover:border-accent/60">
    <div class="flex items-start gap-4">
      <div
        class="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-border/60 bg-black/30"
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
      <div class="min-w-0 flex-1 space-y-2">
        <div class="flex flex-wrap items-start justify-between gap-2">
          <h3 class="text-lg font-semibold text-white">{{ app.title }}</h3>
          <span v-if="app.rating !== undefined" class="text-xs text-slate-400">
            Rating {{ formatRating(app.rating) }}
          </span>
        </div>
        <p class="text-xs uppercase tracking-[0.2em] text-slate-500">Description</p>
        <p class="text-sm text-slate-300">
          {{ app.summary || 'No description available.' }}
        </p>
      </div>
    </div>
    <div class="mt-4 flex flex-wrap items-center gap-3 text-xs text-slate-400">
      <span
        v-if="app.category"
        class="rounded-full border border-border/60 bg-black/30 px-3 py-1"
      >
        {{ app.category }}
      </span>
      <span
        v-if="app.reviewCount !== undefined"
        class="rounded-full border border-border/60 bg-black/30 px-3 py-1"
      >
        {{ formatReviews(app.reviewCount) }} reviews
      </span>
      <a
        class="ml-auto text-sm font-semibold text-accent-2 transition hover:text-white"
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
import type { PlayStoreApp } from '~/composables/usePlayStoreApps'

defineProps<{ app: PlayStoreApp }>()

const formatRating = (value: number) => value.toFixed(1)
const formatReviews = (value: number) => value.toLocaleString('en-US')
</script>
