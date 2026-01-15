<template>
  <svg
    class="h-5 w-5"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
  >
    <path v-for="d in iconPaths" :key="d" :d="d" />
  </svg>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{ icon: string }>()

const paths: Record<string, string[]> = {
  android: ['M7 4h10a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z', 'M9 7h6'],
  apple: ['M8 4h8a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z', 'M10 18h4'],
  figma: ['M5 4h14v6H5z', 'M5 10h14v10H5z'],
  terminal: ['M4 6l5 6-5 6', 'M11 18h9'],
  jira: ['M4 5l8-3 8 3-8 3-8-3z', 'M4 13l8 4 8-4'],
  cloud: ['M5 18a4 4 0 0 1 1-7.9A5 5 0 0 1 18 9a4 4 0 0 1 0 8H5z']
}

const iconPaths = computed(() => paths[props.icon] || paths.terminal)
</script>
