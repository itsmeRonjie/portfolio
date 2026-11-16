<template>
  <svg
    class="h-5 w-5"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="1.8"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
  >
    <path v-for="d in iconPaths" :key="d" :d="d" />
  </svg>
</template>

<script setup lang="ts">
const props = defineProps<{ icon: string }>()

const paths: Record<string, string[]> = {
  // Phone with a punch-hole camera.
  android: ['M7 3h10a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z', 'M12 6h.01', 'M10 18h4'],
  // Phone with a pill-shaped island.
  apple: ['M7 3h10a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z', 'M10.5 6h3', 'M10 18h4'],
  layers: ['M12 3l9 4.5-9 4.5-9-4.5L12 3z', 'M3 12l9 4.5 9-4.5', 'M3 16.5L12 21l9-4.5'],
  cloud: ['M7 18a4.5 4.5 0 0 1-.9-8.9A5.5 5.5 0 0 1 16.8 8 4.5 4.5 0 0 1 17 18H7z', 'M9.5 14l2.5-2.5 2.5 2.5'],
  terminal: ['M4 5h16a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1z', 'M7 10l3 2.5L7 15', 'M12.5 15H17'],
  git: ['M6 3v12', 'M18 9a3 3 0 1 0 0-6 3 3 0 0 0 0 6z', 'M6 21a3 3 0 1 0 0-6 3 3 0 0 0 0 6z', 'M18 9a9 9 0 0 1-9 9'],
  figma: ['M5 4h14v6H5z', 'M5 10h14v10H5z'],
  jira: ['M4 5l8-3 8 3-8 3-8-3z', 'M4 13l8 4 8-4']
}

const iconPaths = computed(() => paths[props.icon] ?? paths.terminal!)
</script>
