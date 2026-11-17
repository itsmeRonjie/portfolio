<template>
  <!-- Two listings read better as two wide cards than as two-thirds of a row. -->
  <div class="grid gap-5 sm:grid-cols-2" :class="!pending && !error && apps.length <= 2 ? 'lg:grid-cols-2' : 'lg:grid-cols-3'">
    <div v-if="!hasDeveloper" class="ui-panel col-span-full">
      <p class="text-sm text-slate-300">
        Add your Play Store developer ID in <span class="font-semibold">data/playStore.ts</span> to enable listings.
      </p>
    </div>

    <template v-else-if="pending">
      <div v-for="skeleton in skeletons" :key="skeleton" class="ui-panel !rounded-3xl !p-5 animate-pulse">
        <div class="flex items-start gap-4">
          <div class="h-16 w-16 rounded-2xl bg-white/10" />
          <div class="flex-1">
            <div class="h-4 w-1/2 rounded-full bg-white/10" />
            <div class="mt-3 h-3 w-3/4 rounded-full bg-white/5" />
          </div>
        </div>
        <div class="mt-5 h-3 w-full rounded-full bg-white/5" />
        <div class="mt-2 h-3 w-4/5 rounded-full bg-white/5" />
      </div>
    </template>

    <div v-else-if="error" class="ui-panel col-span-full">
      <p class="text-sm text-slate-300">Unable to load Play Store listings right now. Try again in a moment.</p>
      <button class="ui-cta-secondary mt-4 !px-4 !py-2" type="button" @click="refresh()">Retry</button>
    </div>

    <template v-else>
      <div v-for="(app, index) in apps" :key="app.id" v-reveal="{ delay: index * 70, appear: true }">
        <PlayStoreAppCard :app="app" />
      </div>
      <div v-if="apps.length === 0" class="ui-panel col-span-full">
        <p class="text-sm text-slate-300">No Play Store apps found for this developer.</p>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import PlayStoreAppCard from '~/components/PlayStoreAppCard.vue'

const { hasDeveloper, apps, pending, error, refresh, skeletons } = usePlayStoreDeveloper()
</script>
