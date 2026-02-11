<template>
  <header class="sticky top-0 z-50 border-b border-border/60 bg-canvas/80 backdrop-blur-xl">
    <div class="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-6">
      <NuxtLink class="flex items-center gap-3" to="/" @click="closeMenu">
        <div
          class="flex h-9 w-9 items-center justify-center rounded-xl border border-border/60 bg-surface-strong text-[11px] font-semibold text-slate-100 shadow-panel"
        >
          {{ profile.initials }}
        </div>
        <div>
          <div class="text-sm font-semibold tracking-wide text-slate-100">{{ profile.shortName }}</div>
          <div class="font-mono text-[10px] uppercase tracking-[0.18em] text-slate-400">Mobile Dev Studio</div>
        </div>
      </NuxtLink>

      <nav class="hidden items-center gap-6 md:flex">
        <NuxtLink v-for="item in navItems" :key="item.label" class="ui-link" :to="item.to">
          {{ item.label }}
        </NuxtLink>
      </nav>

      <button
        class="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-border/70 bg-surface-strong text-slate-100 md:hidden"
        type="button"
        :aria-expanded="isMenuOpen ? 'true' : 'false'"
        :aria-controls="mobileMenuId"
        aria-label="Open navigation menu"
        @click="toggleMenu"
      >
        <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
          <path d="M4 7h16M4 12h16M4 17h16" />
        </svg>
      </button>
    </div>

  </header>

  <Teleport to="body">
    <Transition
      enter-active-class="transition-opacity duration-200"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-opacity duration-150"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div v-if="isMenuOpen" class="fixed inset-0 z-[100] md:hidden">
        <button
          class="absolute inset-0 bg-canvas/90 backdrop-blur-sm"
          type="button"
          aria-label="Close navigation menu"
          @click="closeMenu"
        />
        <aside
          :id="mobileMenuId"
          role="dialog"
          aria-modal="true"
          class="absolute right-0 top-0 flex h-dvh w-[88vw] max-w-[320px] flex-col border-l border-border/70 bg-canvas-2 px-5 pb-7 pt-5 shadow-panel animate-drawer-in"
        >
          <div class="mb-6 flex items-center justify-between border-b border-border/60 pb-4">
            <div>
              <p class="ui-eyebrow">Navigation</p>
              <p class="mt-1 text-3xl font-semibold tracking-tight text-slate-100">{{ profile.shortName }}</p>
            </div>
            <button
              class="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border/70 bg-surface-strong text-slate-100"
              type="button"
              aria-label="Close navigation menu"
              @click="closeMenu"
            >
              <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            </button>
          </div>

          <nav class="flex flex-col gap-3">
            <NuxtLink
              v-for="item in navItems"
              :key="item.label"
              class="rounded-2xl border border-border/70 bg-surface px-4 py-3 text-2xl font-semibold tracking-tight text-slate-100 transition hover:border-accent-2/45 hover:bg-surface-strong"
              :to="item.to"
              @click="closeMenu"
            >
              {{ item.label }}
            </NuxtLink>
          </nav>
        </aside>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
const profile = useProfile()
const route = useRoute()

type NavItem = {
  label: string
  to: string
}

const navItems: NavItem[] = [
  { label: 'Work', to: '/#work' },
  { label: 'Toolbox', to: '/#toolbox' },
  { label: 'Contact', to: '/#contact' }
]

const mobileMenuId = 'site-mobile-nav'
const isMenuOpen = ref(false)

const closeMenu = () => {
  isMenuOpen.value = false
}

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

const handleEscape = (event: KeyboardEvent) => {
  if (event.key === 'Escape' && isMenuOpen.value) {
    closeMenu()
  }
}

watch(
  () => route.fullPath,
  () => {
    closeMenu()
  }
)

watch(isMenuOpen, (isOpen) => {
  if (!import.meta.client) {
    return
  }
  document.body.style.overflow = isOpen ? 'hidden' : ''
})

onMounted(() => {
  window.addEventListener('keydown', handleEscape)
})

onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleEscape)
  if (import.meta.client) {
    document.body.style.overflow = ''
  }
})
</script>
