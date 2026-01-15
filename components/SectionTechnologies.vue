<template>
  <section class="mx-auto max-w-6xl px-6 py-14" id="technologies">
    <div class="flex items-center justify-between">
      <h2 class="text-2xl font-semibold text-white">Core Technologies</h2>
      <span class="text-xs uppercase tracking-[0.2em] text-slate-400">Core stack</span>
    </div>
    <div class="mt-6 flex flex-wrap gap-3">
      <span
        v-for="tech in technologies"
        :key="tech.label"
        class="rounded-full border border-border/60 bg-surface px-4 py-2 text-sm text-slate-200 transition hover:border-accent/70"
      >
        {{ tech.label }}
      </span>
    </div>
  </section>
</template>

<script setup lang="ts">
const technologies = useSkills()
</script>
