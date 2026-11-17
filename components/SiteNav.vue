<template>
  <header class="relative z-50 md:sticky md:top-0">
    <div class="md:ui-glass mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-4 md:mt-3 md:rounded-2xl md:px-4 md:py-2.5 lg:max-w-[74rem]">
      <NuxtLink class="flex items-center gap-3" to="/" aria-label="Home">
        <div
          class="grid h-9 w-9 place-items-center rounded-xl border border-white/10 bg-gradient-to-br from-accent/25 to-accent-2/25 text-[11px] font-semibold text-white shadow-glass"
        >
          {{ profile.initials }}
        </div>
        <div>
          <div class="text-sm font-semibold tracking-wide text-slate-100">{{ profile.shortName }}</div>
          <div class="font-mono text-[10px] uppercase tracking-[0.18em] text-slate-400">Mobile Dev Studio</div>
        </div>
      </NuxtLink>

      <nav ref="navElement" class="relative hidden items-center md:flex" aria-label="Primary">
        <span
          class="absolute inset-y-0 rounded-full border border-white/10 bg-white/[0.07] transition-[transform,width,opacity] duration-500 ease-spring"
          :style="pillStyle"
          aria-hidden="true"
        />
        <NuxtLink
          v-for="item in desktopItems"
          :key="item.key"
          :ref="(el) => setLinkRef(item.key, el)"
          class="relative rounded-full px-4 py-2 text-sm font-semibold transition-colors"
          :class="activeKey === item.key ? 'text-white' : 'text-slate-400 hover:text-white'"
          :to="item.to"
          :aria-current="activeKey === item.key ? 'page' : undefined"
        >
          {{ item.label }}
        </NuxtLink>
      </nav>

      <a class="ui-cta-primary !min-h-0 !px-4 !py-2 !text-xs" href="/resume.pdf" download>Resume</a>
    </div>

    <!-- Scroll progress hairline (desktop). -->
    <div class="pointer-events-none absolute inset-x-0 bottom-0 hidden h-px md:block" aria-hidden="true">
      <div
        class="h-full origin-left bg-gradient-to-r from-accent via-[#6fe3c0] to-accent-2"
        :style="{ transform: `scaleX(${progress})` }"
      />
    </div>
  </header>

  <SiteTabBar :items="tabItems" :active-key="activeKey" />
</template>

<script setup lang="ts">
import type { ComponentPublicInstance } from 'vue'
import SiteTabBar from '~/components/SiteTabBar.vue'
import type { TabItem } from '~/components/SiteTabBar.vue'

const profile = useProfile()
const route = useRoute()

const tabItems: TabItem[] = [
  { key: 'home', label: 'Home', to: '/', icon: 'home' },
  { key: 'work', label: 'Work', to: '/#work', icon: 'work' },
  { key: 'stack', label: 'Stack', to: '/#toolbox', icon: 'stack' },
  { key: 'about', label: 'About', to: '/about', icon: 'about' },
  { key: 'contact', label: 'Contact', to: '/#contact', icon: 'contact' }
]
const desktopItems = tabItems.filter((item) => item.key !== 'home')

const sectionToKey: Record<string, string> = {
  work: 'work',
  'play-store': 'work',
  toolbox: 'stack',
  experience: 'about',
  contact: 'contact'
}
const spied = useSectionSpy(Object.keys(sectionToKey))

const activeKey = computed(() => {
  const path = route.path.replace(/\/$/, '') || '/'
  if (path === '/about') return 'about'
  if (path === '/contact') return 'contact'
  if (path === '/projects') return 'work'
  if (path !== '/') return ''
  return spied.value ? (sectionToKey[spied.value] ?? 'home') : 'home'
})

// ---- Sliding active pill ----
const navElement = ref<HTMLElement | null>(null)
const linkElements = new Map<string, HTMLElement>()
const pill = ref({ x: 0, width: 0, visible: false })

const setLinkRef = (key: string, el: Element | ComponentPublicInstance | null) => {
  const element = el && '$el' in el ? (el.$el as HTMLElement) : (el as HTMLElement | null)
  if (element) {
    linkElements.set(key, element)
  } else {
    linkElements.delete(key)
  }
}

const measurePill = () => {
  const link = linkElements.get(activeKey.value)
  if (!link) {
    pill.value = { ...pill.value, visible: false }
    return
  }
  pill.value = { x: link.offsetLeft, width: link.offsetWidth, visible: true }
}

const pillStyle = computed(() => ({
  width: `${pill.value.width}px`,
  transform: `translateX(${pill.value.x}px)`,
  opacity: pill.value.visible ? 1 : 0
}))

watch(activeKey, () => nextTick(measurePill))

// ---- Scroll progress ----
const progress = ref(0)
let frame = 0
const updateProgress = () => {
  cancelAnimationFrame(frame)
  frame = requestAnimationFrame(() => {
    const max = document.documentElement.scrollHeight - window.innerHeight
    progress.value = max > 0 ? Math.min(window.scrollY / max, 1) : 0
  })
}

onMounted(() => {
  measurePill()
  updateProgress()
  window.addEventListener('scroll', updateProgress, { passive: true })
  window.addEventListener('resize', measurePill, { passive: true })
  // Pill widths depend on the web font; re-measure once it is in.
  document.fonts?.ready.then(measurePill).catch(() => {})
})

onBeforeUnmount(() => {
  cancelAnimationFrame(frame)
  window.removeEventListener('scroll', updateProgress)
  window.removeEventListener('resize', measurePill)
})
</script>
