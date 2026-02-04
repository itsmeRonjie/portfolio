<template>
  <section class="mx-auto max-w-6xl px-6 py-14" id="play-store">
    <div class="flex flex-wrap items-end justify-between gap-4">
      <div>
        <p class="text-xs uppercase tracking-[0.3em] text-slate-400">Google Play</p>
        <h2 class="text-2xl font-semibold text-white">Play Store listings</h2>
        <p class="mt-2 max-w-2xl text-sm text-slate-300">
          Latest Google Play releases and updates.
        </p>
      </div>
      <a
        v-if="playStoreDeveloperUrl"
        class="text-sm font-semibold text-accent-2 transition hover:text-white"
        :href="playStoreDeveloperUrl"
        target="_blank"
        rel="noreferrer"
      >
        View developer profile -&gt;
      </a>
    </div>

    <div class="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <template v-if="!hasPlayStoreDeveloper">
        <div class="rounded-2xl border border-border/60 bg-surface p-6 md:col-span-2 lg:col-span-3">
          <p class="text-sm text-slate-300">
            Add your Play Store developer ID in <span class="font-semibold">data/playStore.ts</span> to enable
            listings.
          </p>
        </div>
      </template>

      <template v-else-if="playStorePending">
        <div
          v-for="skeleton in playStoreSkeletons"
          :key="skeleton"
          class="rounded-2xl border border-border/60 bg-surface p-5 animate-pulse"
        >
          <div class="flex items-start gap-4">
            <div class="h-12 w-12 rounded-xl bg-white/10" />
            <div class="flex-1">
              <div class="h-4 w-1/2 rounded-full bg-white/10" />
              <div class="mt-3 h-3 w-full rounded-full bg-white/5" />
              <div class="mt-2 h-3 w-4/5 rounded-full bg-white/5" />
            </div>
          </div>
          <div class="mt-4 flex gap-3">
            <div class="h-3 w-20 rounded-full bg-white/10" />
            <div class="h-3 w-16 rounded-full bg-white/10" />
          </div>
        </div>
      </template>

      <template v-else-if="playStoreError">
        <div class="rounded-2xl border border-border/60 bg-surface p-6 md:col-span-2 lg:col-span-3">
          <p class="text-sm text-slate-300">
            Unable to load Play Store listings right now. Try again in a moment.
          </p>
          <button
            class="mt-4 rounded-full border border-border/70 px-4 py-2 text-sm font-semibold text-slate-100 transition hover:border-accent/80"
            type="button"
            @click="refreshPlayStore"
          >
            Retry
          </button>
        </div>
      </template>

      <template v-else>
        <PlayStoreAppCard v-for="app in playStoreApps" :key="app.id" :app="app" />
        <div
          v-if="playStoreApps.length === 0"
          class="rounded-2xl border border-border/60 bg-surface p-6 md:col-span-2 lg:col-span-3"
        >
          <p class="text-sm text-slate-300">No Play Store apps found for this developer.</p>
        </div>
      </template>
    </div>
  </section>
</template>

<script setup lang="ts">
import PlayStoreAppCard from '~/components/PlayStoreAppCard.vue'

const playStore = usePlayStore()

const normalizeDeveloperId = (value: string) => {
  const trimmed = value.trim()
  if (!trimmed) {
    return ''
  }
  try {
    return decodeURIComponent(trimmed).replace(/\+/g, ' ').trim()
  } catch {
    return trimmed.replace(/\+/g, ' ').trim()
  }
}

const playStoreDeveloperId = computed(() => normalizeDeveloperId(playStore.developerId))
const hasPlayStoreDeveloper = computed(() => playStoreDeveloperId.value.length > 0)
const playStoreDeveloperUrl = computed(() =>
  hasPlayStoreDeveloper.value
    ? `https://play.google.com/store/apps/developer?id=${encodeURIComponent(playStoreDeveloperId.value)}`
    : ''
)
const {
  apps: playStoreApps,
  pending: playStorePending,
  error: playStoreError,
  refresh: refreshPlayStore
} = usePlayStoreApps(playStoreDeveloperId, computed(() => playStore.limit))
const playStoreSkeletons = Array.from({ length: playStore.limit || 6 }, (_, index) => index)
</script>
