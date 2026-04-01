<template>
  <section class="mx-auto max-w-6xl px-6 py-14" id="play-store">
    <div class="flex flex-wrap items-end justify-between gap-4">
      <div>
        <p class="ui-eyebrow">Google Play</p>
        <h2 class="mt-2 text-2xl font-semibold text-white">Published Mobile Apps</h2>
        <p class="mt-2 max-w-2xl text-sm text-slate-300">
          Live releases, category coverage, and market-facing app details.
        </p>
      </div>
      <a
        v-if="playStoreDeveloperUrl"
        class="ui-link"
        :href="playStoreDeveloperUrl"
        target="_blank"
        rel="noreferrer"
      >
        Open developer profile -&gt;
      </a>
    </div>

    <div class="mt-8 flex flex-wrap items-start gap-4">
      <template v-if="!hasPlayStoreDeveloper">
        <div class="ui-panel w-full">
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
          class="ui-panel w-full max-w-[32rem] animate-pulse"
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
        <div class="ui-panel w-full">
          <p class="text-sm text-slate-300">
            Unable to load Play Store listings right now. Try again in a moment.
          </p>
          <button
            class="ui-cta-secondary mt-4 !px-4 !py-2"
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
          class="ui-panel w-full"
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

const encodeDeveloperIdForProfileUrl = (value: string) => {
  const normalized = normalizeDeveloperId(value)
  if (!normalized) {
    return ''
  }
  return encodeURIComponent(normalized).replace(/%20/g, '+')
}

const playStoreDeveloperId = computed(() => normalizeDeveloperId(playStore.developerId))
const hasPlayStoreDeveloper = computed(() => playStoreDeveloperId.value.length > 0)
const playStoreDeveloperUrl = computed(() =>
  hasPlayStoreDeveloper.value
    ? `https://play.google.com/store/apps/developer?id=${encodeDeveloperIdForProfileUrl(playStoreDeveloperId.value)}`
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
