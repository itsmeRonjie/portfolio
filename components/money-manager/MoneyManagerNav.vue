<template>
  <header class="sticky top-0 z-50 border-b border-[#2a5f59]/45 bg-[#041411]/80 backdrop-blur-xl">
    <div class="mx-auto flex max-w-6xl items-center justify-between px-5 py-3.5 sm:px-6">
      <NuxtLink class="flex items-center gap-3" :to="homePath">
        <span
          class="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-[#31dbc2]/35 bg-[#10322d] text-base font-bold text-[#31dbc2]"
          aria-hidden="true"
        >
          ₱
        </span>
        <div>
          <p class="font-mono text-[10px] uppercase tracking-[0.22em] text-[#75a7a0]">Android App</p>
          <p class="text-sm font-semibold tracking-tight text-[#d5f7f0]">MoneyManager</p>
        </div>
      </NuxtLink>

      <nav class="hidden items-center gap-5 lg:flex">
        <a class="mm-nav-link" href="#features">Features</a>
        <a class="mm-nav-link" href="#screenshots">Screenshots</a>
        <a class="mm-nav-link" href="#privacy">Trust</a>
      </nav>

      <div class="flex items-center gap-2.5">
        <NuxtLink
          class="rounded-full border border-[#2f8a7f]/60 bg-[#10322d] px-3.5 py-2 text-xs font-semibold text-[#b4ddd7] transition hover:border-[#31dbc2]/70 hover:text-[#e4fffa]"
          :to="supportPath"
        >
          Support
        </NuxtLink>
        <a
          class="rounded-full border border-[#31dbc2]/45 bg-[#31dbc2] px-3.5 py-2 text-xs font-semibold text-[#07332d] shadow-[0_0_24px_rgba(49,219,194,0.3)] transition hover:-translate-y-0.5 hover:brightness-105"
          :href="playStoreUrl"
          target="_blank"
          rel="noreferrer"
        >
          Install
        </a>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
defineProps<{
  playStoreUrl: string
  homePath: string
  supportPath: string
}>()
</script>

<style scoped>
.mm-nav-link {
  color: #9ec6c0;
  font-size: 0.875rem;
  font-weight: 600;
  transition: color 0.2s ease;
}

.mm-nav-link:hover {
  color: #d8f7f1;
}
</style>
