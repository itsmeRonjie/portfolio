<template>
  <section id="play-store" class="mx-auto max-w-6xl px-5 py-16 sm:px-6 lg:py-20">
    <div v-reveal class="flex flex-wrap items-end justify-between gap-4">
      <div>
        <p class="ui-eyebrow">Google Play</p>
        <h2 class="ui-section-title mt-3">Published Mobile Apps</h2>
        <p class="mt-3 max-w-2xl text-sm text-slate-300 sm:text-base">
          Live releases, category coverage, and market-facing app details.
        </p>
      </div>
      <a v-if="developerUrl" class="ui-link" :href="developerUrl" target="_blank" rel="noreferrer">
        Open developer profile →
      </a>
    </div>

    <PlayStoreGrid class="mt-10" />
  </section>
</template>

<script setup lang="ts">
import PlayStoreGrid from '~/components/PlayStoreGrid.vue'

const { developerUrl } = usePlayStoreDeveloper()
</script>
