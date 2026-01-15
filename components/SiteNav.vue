<template>
  <header class="sticky top-0 z-40 border-b border-border/50 bg-canvas/80 backdrop-blur">
    <div class="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
      <NuxtLink class="flex items-center gap-3" to="/">
        <div class="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-accent to-accent-2 text-xs font-semibold text-white shadow-glow">
          {{ profile.initials }}
        </div>
        <div class="text-sm font-semibold tracking-wide text-slate-200">{{ profile.shortName }}</div>
      </NuxtLink>
      <nav class="flex items-center gap-6 text-sm text-slate-300">
        <NuxtLink class="transition hover:text-white" to="/#work">Work</NuxtLink>
        <NuxtLink class="transition hover:text-white" to="/#toolbox">Toolbox</NuxtLink>
        <NuxtLink class="transition hover:text-white" to="/#contact">Contact</NuxtLink>
        <button
          class="flex h-9 w-9 items-center justify-center rounded-full border border-border/60 bg-surface text-slate-200 transition hover:text-white"
          type="button"
          aria-label="Open settings"
        >
          <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M12 2l2.4 4.2 4.8.6-3.4 3.3.8 4.7-4.6-2.4-4.6 2.4.8-4.7-3.4-3.3 4.8-.6L12 2z" />
          </svg>
        </button>
      </nav>
    </div>
  </header>
</template>

<script setup lang="ts">
const profile = useProfile()
</script>
