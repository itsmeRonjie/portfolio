<template>
  <nav
    class="site-tabbar ui-glass fixed inset-x-3 z-[60] mx-auto flex max-w-md items-stretch justify-between rounded-[1.75rem] p-1.5 md:hidden"
    :style="{ bottom: 'calc(0.75rem + env(safe-area-inset-bottom, 0px))' }"
    aria-label="Primary"
  >
    <NuxtLink
      v-for="item in items"
      :key="item.key"
      :to="item.to"
      class="relative flex min-h-[3.25rem] flex-1 flex-col items-center justify-center gap-0.5 rounded-[1.35rem] text-[10px] font-semibold transition-colors"
      :class="activeKey === item.key ? 'text-white' : 'text-slate-400 active:text-slate-200'"
      :aria-current="activeKey === item.key ? 'page' : undefined"
    >
      <span
        v-if="activeKey === item.key"
        class="absolute inset-0 animate-tab-pop rounded-[1.35rem] border border-white/10 bg-white/[0.09]"
        aria-hidden="true"
      />
      <svg
        class="relative h-[22px] w-[22px] transition-transform duration-300 ease-spring-bouncy"
        :class="activeKey === item.key ? '-translate-y-px scale-110 text-accent' : ''"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="1.8"
        stroke-linecap="round"
        stroke-linejoin="round"
        aria-hidden="true"
      >
        <path v-for="d in icons[item.icon]" :key="d" :d="d" />
      </svg>
      <span class="relative">{{ item.label }}</span>
    </NuxtLink>
  </nav>
</template>

<script setup lang="ts">
export type TabItem = {
  key: string
  label: string
  to: string
  icon: 'home' | 'work' | 'stack' | 'about' | 'contact'
}

defineProps<{ items: TabItem[]; activeKey: string }>()

const icons: Record<TabItem['icon'], string[]> = {
  home: ['M4 10.5L12 4l8 6.5V19a1 1 0 0 1-1 1h-4.5v-5.5h-5V20H5a1 1 0 0 1-1-1v-8.5z'],
  work: ['M7 3h10a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z', 'M10.5 6h3', 'M10 18h4'],
  stack: ['M12 3l9 4.5-9 4.5-9-4.5L12 3z', 'M3 12l9 4.5 9-4.5', 'M3 16.5L12 21l9-4.5'],
  about: ['M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8z', 'M4.5 20a7.5 7.5 0 0 1 15 0'],
  contact: ['M4 6h16v12H4z', 'M4 7l8 6 8-6']
}
</script>
