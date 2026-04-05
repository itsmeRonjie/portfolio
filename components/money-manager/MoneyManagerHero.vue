<template>
  <section
    ref="heroSection"
    class="relative overflow-hidden border-b border-[#1f4f49]/40"
    id="overview"
    @pointermove="handlePointerMove"
    @pointerleave="handlePointerLeave"
  >
    <div
      class="pointer-events-none absolute inset-0 bg-[radial-gradient(550px_at_14%_14%,rgba(43,232,198,0.2),transparent_60%),radial-gradient(660px_at_85%_10%,rgba(54,148,133,0.18),transparent_60%),linear-gradient(180deg,#02100d_0%,#041513_55%,#051917_100%)]"
      aria-hidden="true"
    />

    <div class="relative mx-auto grid max-w-6xl gap-10 px-6 pb-14 pt-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
      <div class="animate-mm-rise space-y-6 will-change-transform lg:self-start" :style="copyColumnStyle">
        <p class="font-mono text-[11px] uppercase tracking-[0.28em] text-[#76afa7]">Smart Wealth Tracking</p>
        <h1 class="text-4xl font-semibold leading-tight text-[#e7fbf7] sm:text-5xl lg:text-6xl">{{ content.heroTitle }}</h1>
        <p class="max-w-2xl text-lg leading-relaxed text-[#b7d7d2] sm:text-xl">{{ content.heroSubtitle }}</p>
        <p class="max-w-2xl text-sm leading-relaxed text-[#9ac0ba] sm:text-base">{{ content.heroDescription }}</p>

        <div class="flex flex-wrap gap-2">
          <span
            v-for="chip in content.statChips"
            :key="chip"
            class="inline-flex items-center rounded-full border border-[#2a6f67]/60 bg-[#0a2a25]/70 px-3 py-1 text-xs font-medium text-[#9bd0c9]"
          >
            {{ chip }}
          </span>
        </div>

        <div class="flex flex-wrap items-center gap-3">
          <a
            class="inline-flex items-center justify-center rounded-full border border-[#31dbc2]/45 bg-[#31dbc2] px-5 py-2.5 text-sm font-semibold text-[#09332d] shadow-[0_0_26px_rgba(49,219,194,0.3)] transition hover:-translate-y-0.5 hover:brightness-105"
            :href="content.playStoreUrl"
            target="_blank"
            rel="noreferrer"
          >
            Install on Google Play
          </a>
          <NuxtLink
            class="inline-flex items-center justify-center rounded-full border border-[#366f68]/70 bg-[#0e2924]/80 px-5 py-2.5 text-sm font-semibold text-[#c6e6e1] transition hover:border-[#56c9bb]/65 hover:text-white"
            :to="supportPath"
          >
            Contact Support
          </NuxtLink>
        </div>
      </div>

      <div class="animate-mm-rise [animation-delay:120ms] will-change-transform [perspective:1200px] lg:w-full lg:max-w-[540px] lg:justify-self-end" :style="panelColumnStyle">
        <div class="rounded-[2rem] border border-[#2b625b]/70 bg-[#08211d]/75 p-5 shadow-[0_28px_70px_rgba(0,0,0,0.45)] sm:p-6 [transform-style:preserve-3d]" :style="panelStyle">
          <div class="mb-5 flex items-start justify-between gap-3">
            <div>
              <p class="font-mono text-[10px] uppercase tracking-[0.24em] text-[#7fb3ab]">Mobile Mock</p>
              <h2 class="mt-2 text-xl font-semibold text-[#e3f9f5]">App preview</h2>
            </div>
            <span class="inline-flex rounded-full border border-[#30d8c0]/45 bg-[#30d8c0]/20 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#8ff4e3]">
              Current Build
            </span>
          </div>

          <div class="relative mx-auto w-full max-w-[340px] will-change-transform" :style="phoneStyle">
            <div class="pointer-events-none absolute -left-5 top-16 h-24 w-24 rounded-full bg-[#25cdb3]/12 blur-3xl" aria-hidden="true" :style="leftGlowStyle" />
            <div class="pointer-events-none absolute -right-4 bottom-16 h-28 w-28 rounded-full bg-[#2c8f82]/10 blur-3xl" aria-hidden="true" :style="rightGlowStyle" />

            <div class="relative rounded-[2.6rem] bg-gradient-to-b from-[#2a4d46]/85 via-[#1d3531]/75 to-[#162825]/80 p-[2px] shadow-[0_24px_60px_rgba(2,8,16,0.65)]">
              <div class="absolute -left-[3px] top-24 h-11 w-[3px] rounded-r-full bg-[#3f6a62]/55" aria-hidden="true" />
              <div class="absolute -left-[3px] top-40 h-14 w-[3px] rounded-r-full bg-[#3f6a62]/55" aria-hidden="true" />
              <div class="absolute -right-[3px] top-32 h-20 w-[3px] rounded-l-full bg-[#3f6a62]/55" aria-hidden="true" />

              <div class="relative rounded-[2.45rem] border border-white/8 bg-[#050c0b] p-[7px]">
                <div class="relative aspect-[430/932] overflow-hidden rounded-[2.08rem] border border-white/8 bg-[#081815]">
                  <img
                    v-if="previewShot"
                    :key="`preview-${previewShot.id}`"
                    class="h-full w-full object-cover object-top [filter:none]"
                    :src="previewShot.src"
                    :alt="previewShot.alt"
                    loading="eager"
                    decoding="async"
                  />
                  <div
                    v-else
                    key="preview-empty"
                    class="flex h-full w-full items-center justify-center bg-gradient-to-b from-[#0f2c28] via-[#091d1a] to-[#071412] text-xs font-semibold text-[#99c4bd]"
                  >
                    Replace hero screenshot
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { MoneyManagerSiteContent } from '~/data/moneyManagerSite'

const props = defineProps<{
  content: MoneyManagerSiteContent
  supportPath: string
}>()

const heroSection = ref<HTMLElement | null>(null)
const prefersReducedMotion = ref(false)
const pointerX = ref(0)
const pointerY = ref(0)
const targetX = ref(0)
const targetY = ref(0)
const scrollDepth = ref(0)
const previewIndex = ref(0)

let frameId = 0
let reducedMotionQuery: MediaQueryList | null = null
let previewInterval: ReturnType<typeof setInterval> | null = null

const emptyStyle = Object.freeze({}) as Record<string, string>
const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value))
const motionDisabled = computed(() => prefersReducedMotion.value)

const previewScreenshots = computed(() => props.content.screenshots)

const setInitialPreviewIndex = () => {
  const list = previewScreenshots.value
  if (list.length === 0) {
    previewIndex.value = 0
    return
  }

  const preferredIndex = list.findIndex((shot) => shot.id === props.content.heroScreenshotId)
  previewIndex.value = preferredIndex >= 0 ? preferredIndex : 0
}

const previewShot = computed(() => {
  const list = previewScreenshots.value
  if (list.length === 0) {
    return null
  }
  const safeIndex = previewIndex.value % list.length
  return list[safeIndex] ?? null
})

const rotatePreviewScreenshot = () => {
  const list = previewScreenshots.value
  if (list.length <= 1) {
    return
  }
  previewIndex.value = (previewIndex.value + 1) % list.length
}

const startPreviewRotation = () => {
  if (!import.meta.client) {
    return
  }
  if (previewInterval) {
    clearInterval(previewInterval)
  }
  previewInterval = window.setInterval(rotatePreviewScreenshot, 5_000)
}

const updateScrollDepth = () => {
  if (!heroSection.value || !import.meta.client) {
    return
  }

  const rect = heroSection.value.getBoundingClientRect()
  const viewportHeight = window.innerHeight || 1
  const sectionCenter = rect.top + rect.height * 0.5
  const normalizedDepth = (sectionCenter - viewportHeight * 0.5) / (viewportHeight * 0.8)
  scrollDepth.value = clamp(normalizedDepth, -1, 1)
}

const handlePointerMove = (event: PointerEvent) => {
  if (!heroSection.value || motionDisabled.value) {
    return
  }

  const rect = heroSection.value.getBoundingClientRect()
  const normalizedX = ((event.clientX - rect.left) / rect.width - 0.5) * 2
  const normalizedY = ((event.clientY - rect.top) / rect.height - 0.5) * 2

  targetX.value = clamp(normalizedX, -1, 1)
  targetY.value = clamp(normalizedY, -1, 1)
}

const handlePointerLeave = () => {
  targetX.value = 0
  targetY.value = 0
}

const copyColumnStyle = computed(() => {
  if (motionDisabled.value) {
    return emptyStyle
  }
  const x = pointerX.value * -6
  const y = pointerY.value * -4 + scrollDepth.value * -10
  return { transform: `translate3d(${x.toFixed(2)}px, ${y.toFixed(2)}px, 0)` }
})

const panelColumnStyle = computed(() => {
  if (motionDisabled.value) {
    return emptyStyle
  }
  const x = pointerX.value * 8
  const y = pointerY.value * 6 + scrollDepth.value * 16
  return { transform: `translate3d(${x.toFixed(2)}px, ${y.toFixed(2)}px, 0)` }
})

const leftGlowStyle = computed(() => {
  if (motionDisabled.value) {
    return emptyStyle
  }
  const x = pointerX.value * -16
  const y = pointerY.value * -12 + scrollDepth.value * -22
  return { transform: `translate3d(${x.toFixed(2)}px, ${y.toFixed(2)}px, 0)` }
})

const rightGlowStyle = computed(() => {
  if (motionDisabled.value) {
    return emptyStyle
  }
  const x = pointerX.value * 18
  const y = pointerY.value * 14 + scrollDepth.value * 18
  return { transform: `translate3d(${x.toFixed(2)}px, ${y.toFixed(2)}px, 0)` }
})

const panelStyle = computed(() => {
  if (motionDisabled.value) {
    return emptyStyle
  }
  const x = pointerX.value * 7
  const y = pointerY.value * 5 + scrollDepth.value * 14
  const rotateY = pointerX.value * 2.6
  const rotateX = pointerY.value * -2.2
  return {
    transform: `translate3d(${x.toFixed(2)}px, ${y.toFixed(2)}px, 0) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg)`
  }
})

const phoneStyle = computed(() => {
  if (motionDisabled.value) {
    return emptyStyle
  }
  const x = pointerX.value * -10
  const y = pointerY.value * -8 + scrollDepth.value * -16
  return {
    transform: `translate3d(${x.toFixed(2)}px, ${y.toFixed(2)}px, 0)`
  }
})

const animateParallax = () => {
  const damping = motionDisabled.value ? 0.24 : 0.12
  pointerX.value += (targetX.value - pointerX.value) * damping
  pointerY.value += (targetY.value - pointerY.value) * damping
  frameId = window.requestAnimationFrame(animateParallax)
}

const updateReducedMotion = () => {
  prefersReducedMotion.value = reducedMotionQuery?.matches ?? false
  if (prefersReducedMotion.value) {
    pointerX.value = 0
    pointerY.value = 0
    targetX.value = 0
    targetY.value = 0
  }
}

onMounted(() => {
  if (!import.meta.client) {
    return
  }

  setInitialPreviewIndex()
  startPreviewRotation()

  reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
  reducedMotionQuery.addEventListener('change', updateReducedMotion)
  updateReducedMotion()
  updateScrollDepth()

  window.addEventListener('scroll', updateScrollDepth, { passive: true })
  window.addEventListener('resize', updateScrollDepth, { passive: true })
  frameId = window.requestAnimationFrame(animateParallax)
})

onBeforeUnmount(() => {
  if (!import.meta.client) {
    return
  }

  reducedMotionQuery?.removeEventListener('change', updateReducedMotion)
  window.removeEventListener('scroll', updateScrollDepth)
  window.removeEventListener('resize', updateScrollDepth)
  window.cancelAnimationFrame(frameId)

  if (previewInterval) {
    clearInterval(previewInterval)
    previewInterval = null
  }
})
</script>

<style scoped>
.animate-mm-rise {
  animation: mm-rise 0.65s ease-out both;
}

@keyframes mm-rise {
  0% {
    opacity: 0;
    transform: translateY(14px);
  }

  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (prefers-reduced-motion: reduce) {
  .animate-mm-rise {
    animation: none;
  }
}
</style>
