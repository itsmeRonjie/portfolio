<template>
  <section class="mx-auto max-w-6xl px-6 py-14" id="technologies">
    <div class="flex items-center justify-between">
      <h2 class="text-2xl font-semibold text-white">Production Mobile Stack</h2>
      <span class="ui-eyebrow">Core Systems</span>
    </div>
    <div class="mt-6 flex flex-wrap gap-3">
      <span
        v-for="tech in technologies"
        :key="tech.label"
        class="ui-chip rounded-xl px-4 py-2 text-sm transition hover:border-accent/65 hover:bg-surface"
      >
        {{ tech.label }}
      </span>
    </div>
  </section>
</template>

<script setup lang="ts">
const technologies = useSkills()
</script>
