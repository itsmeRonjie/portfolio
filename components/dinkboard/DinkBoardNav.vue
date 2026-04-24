<template>
  <header class="sticky top-0 z-50 border-b border-[#29451d]/60 bg-[#07100a]/90 backdrop-blur-xl">
    <div class="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3.5 sm:px-6">
      <NuxtLink class="flex min-w-0 items-center gap-3" :to="homePath">
        <img
          class="h-10 w-10 rounded-lg border border-[#8bca1e]/45 bg-[#101a0d]"
          :src="appIconPath"
          alt=""
          loading="eager"
          decoding="async"
        />
        <div class="min-w-0">
          <p class="font-mono text-[10px] uppercase tracking-[0.22em] text-[#9fbd86]">Pickleball App</p>
          <p class="truncate text-sm font-semibold tracking-tight text-[#f4ffec]">DinkBoard</p>
        </div>
      </NuxtLink>

      <nav class="hidden items-center gap-5 lg:flex">
        <a class="db-nav-link" :href="`${sectionBasePath}#features`">Features</a>
        <a class="db-nav-link" :href="`${sectionBasePath}#sync`">Sync</a>
        <a class="db-nav-link" :href="`${sectionBasePath}#privacy`">Privacy</a>
      </nav>

      <div class="flex shrink-0 items-center gap-2.5">
        <NuxtLink
          class="rounded-lg border border-[#45662e]/70 bg-[#13200f] px-3.5 py-2 text-xs font-semibold text-[#d3eac0] transition hover:border-[#8bca1e]/75 hover:text-white"
          :to="supportPath"
        >
          Support
        </NuxtLink>
        <a
          class="rounded-lg border border-[#ff7a2e]/50 bg-[#ff7a2e] px-3.5 py-2 text-xs font-semibold text-[#170905] transition hover:-translate-y-0.5 hover:brightness-105"
          :href="playStoreUrl"
          target="_blank"
          rel="noreferrer"
        >
          Google Play
        </a>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    playStoreUrl: string
    appIconPath: string
    homePath: string
    supportPath: string
    sectionBasePath?: string
  }>(),
  {
    sectionBasePath: ''
  }
)
</script>

<style scoped>
.db-nav-link {
  color: #bdd6a8;
  font-size: 0.875rem;
  font-weight: 600;
  transition: color 0.2s ease;
}

.db-nav-link:hover {
  color: #f4ffec;
}
</style>
