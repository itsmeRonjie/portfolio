<template>
  <button
    v-if="stage"
    type="button"
    class="inline-flex min-h-8 items-center gap-1.5 rounded-full border border-white/15 bg-white/[0.05] px-3 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-300 transition-colors hover:border-white/30 hover:text-white"
    :aria-pressed="stage.paused.value"
    @click="stage.setPaused(!stage.paused.value)"
  >
    <svg class="h-3 w-3" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path v-if="stage.paused.value" d="M8 5.5v13a1 1 0 0 0 1.5.86l10.5-6.5a1 1 0 0 0 0-1.72L9.5 4.64A1 1 0 0 0 8 5.5z" />
      <path v-else d="M7 5h3.5v14H7zM13.5 5H17v14h-3.5z" />
    </svg>
    {{ stage.paused.value ? 'Play motion' : 'Pause motion' }}
  </button>
</template>

<script setup lang="ts">
/** Stops floating devices, auto-advancing screens and demo scoring for visitors who want stillness. */
const stage = useStage()
</script>
