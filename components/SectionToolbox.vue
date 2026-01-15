<template>
  <section class="mx-auto max-w-6xl px-6 py-14" id="toolbox">
    <div class="flex items-center justify-between">
      <h2 class="text-2xl font-semibold text-white">The Toolbox</h2>
      <span class="text-xs uppercase tracking-[0.2em] text-slate-400">Tools</span>
    </div>
    <div class="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <div
        v-for="tool in tools"
        :key="tool.name"
        class="rounded-2xl border border-border/60 bg-surface p-4 transition hover:border-accent/60"
      >
        <div class="flex items-center gap-3">
          <div class="flex h-10 w-10 items-center justify-center rounded-xl border border-border/60 bg-black/30 text-slate-200">
            <ToolIcon :icon="tool.icon" />
          </div>
          <div>
            <div class="flex items-center gap-2">
              <h3 class="text-sm font-semibold text-white">{{ tool.name }}</h3>
              <span
                v-if="tool.isPlaceholder"
                class="rounded-full border border-border/60 bg-black/40 px-2 py-0.5 text-[10px] uppercase tracking-widest text-slate-400"
              >
                Placeholder
              </span>
            </div>
            <p class="text-xs text-slate-400">{{ tool.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import ToolIcon from '~/components/ToolIcon.vue'

const tools = useToolbox()
</script>
