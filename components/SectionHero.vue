<template>
  <section
    ref="heroSection"
    class="mx-auto grid max-w-6xl gap-10 px-6 pb-14 pt-10 lg:grid-cols-[1.06fr_0.94fr] lg:items-start"
    @pointermove="handlePointerMove"
    @pointerleave="handlePointerLeave"
  >
    <div class="space-y-6 animate-stagger-in will-change-transform" :style="copyColumnStyle">
      <p class="ui-eyebrow">Mobile Engineering</p>
      <h1 class="text-4xl font-semibold leading-tight text-white sm:text-5xl lg:text-6xl">
        Shipping Android and iOS products with studio-level polish.
      </h1>
      <p class="max-w-2xl text-base leading-relaxed text-slate-300 sm:text-lg">
        {{ profile.summary }}
      </p>
      <div class="flex flex-wrap gap-2">
        <span class="ui-chip border-accent/40 bg-accent/10 text-accent">Android / Kotlin</span>
        <span class="ui-chip border-accent-2/40 bg-accent-2/10 text-accent-2">iOS / Swift</span>
        <span class="ui-chip border-terminal/35 bg-terminal/10 text-terminal">CI ready releases</span>
      </div>
      <div class="flex flex-wrap items-center gap-3">
        <a class="ui-cta-primary" href="/resume.pdf" download>
          Review Resume
        </a>
        <a class="ui-cta-secondary" :href="profile.links.github" target="_blank" rel="noreferrer">
          Explore GitHub Builds
        </a>
      </div>
    </div>

    <div class="relative animate-stagger-in [animation-delay:100ms] [perspective:1200px]" :style="panelColumnStyle">
      <div
        class="absolute -left-6 top-12 h-32 w-32 rounded-full bg-accent/20 blur-3xl will-change-transform"
        aria-hidden="true"
        :style="leftGlowStyle"
      />
      <div
        class="absolute -right-4 bottom-8 h-32 w-32 rounded-full bg-accent-2/20 blur-3xl will-change-transform"
        aria-hidden="true"
        :style="rightGlowStyle"
      />
      <div class="ui-panel-strong relative overflow-hidden p-5 sm:p-6 [transform-style:preserve-3d] will-change-transform" :style="panelStyle">
        <div class="absolute inset-x-8 top-24 h-px bg-gradient-to-r from-transparent via-accent-2/45 to-transparent animate-scan-pulse" aria-hidden="true" />
        <div class="relative space-y-5">
          <div class="flex items-start justify-between gap-4">
            <div>
              <p class="ui-eyebrow">Sprint Board</p>
              <h2 class="mt-2 text-lg font-semibold text-white">Mobile Product Snapshot</h2>
            </div>
            <span class="ui-chip border-terminal/40 bg-terminal/10 font-mono text-terminal">Build Stable</span>
          </div>

          <div
            class="mx-auto w-full max-w-[310px] will-change-transform"
            :style="phoneStyle"
          >
            <div
              class="relative rounded-[2.6rem] bg-gradient-to-b from-slate-200/30 via-slate-300/10 to-slate-700/35 p-[2px] shadow-[0_24px_60px_rgba(2,8,16,0.65)]"
            >
              <div class="absolute -left-[3px] top-24 h-11 w-[3px] rounded-r-full bg-slate-300/35" aria-hidden="true" />
              <div class="absolute -left-[3px] top-40 h-14 w-[3px] rounded-r-full bg-slate-300/35" aria-hidden="true" />
              <div class="absolute -right-[3px] top-32 h-20 w-[3px] rounded-l-full bg-slate-300/35" aria-hidden="true" />

              <div class="relative rounded-[2.45rem] border border-white/10 bg-[#070b11] p-[7px]">
                <div
                  class="relative aspect-[430/932] overflow-hidden rounded-[2.05rem] border border-white/5 bg-gradient-to-b from-[#101c29] via-[#0a121d] to-[#05090f]"
                >
                  <div
                    class="absolute left-1/2 top-2 h-8 w-[128px] -translate-x-1/2 rounded-full border border-white/10 bg-black/80"
                    aria-hidden="true"
                  />
                  <div class="absolute left-1/2 top-[18px] h-2 w-2 -translate-x-1/2 rounded-full bg-slate-500/70" aria-hidden="true" />
                  <div class="relative z-10">
                    <div class="absolute inset-x-0 top-4 z-20 flex items-center justify-between px-5 font-mono text-[10px] text-slate-200">
                      <span>9:41</span>
                      <span>5G</span>
                    </div>

                    <div class="space-y-3 px-4 pb-5 pt-14">
                      <div class="rounded-2xl border border-white/10 bg-white/[0.06] p-3 backdrop-blur-sm">
                        <p class="mt-1.5 text-sm font-semibold text-white">
                          <Transition name="phone-text" mode="out-in">
                            <span :key="`title-${phoneSnapshotKey}`">{{ phoneSnapshot.title }}</span>
                          </Transition>
                        </p>
                        <p class="mt-1 font-mono text-[8px] uppercase tracking-[0.14em] text-slate-400">
                          <Transition name="phone-text" mode="out-in">
                            <span :key="`sprint-build-${phoneSnapshotKey}`">{{ phoneSnapshot.sprint }} · {{ phoneSnapshot.buildTag }}</span>
                          </Transition>
                        </p>
                        <div class="mt-2 flex items-center justify-between">
                          <span class="ui-chip !px-2 !py-0.5 !text-[9px] transition-colors duration-500" :class="phoneStatusClass">
                            <Transition name="phone-text" mode="out-in">
                              <span :key="`status-${phoneSnapshotKey}`">{{ phoneSnapshot.status }}</span>
                            </Transition>
                          </span>
                          <span class="text-[11px] font-medium text-slate-300">
                            <Transition name="phone-text" mode="out-in">
                              <span :key="`crash-${phoneSnapshotKey}`">{{ phoneSnapshot.crashFree }}% Crash Free</span>
                            </Transition>
                          </span>
                        </div>
                      </div>

                      <div class="grid grid-cols-2 gap-2">
                        <div class="rounded-xl border border-white/10 bg-white/[0.05] px-2.5 py-2">
                          <p class="font-mono text-[8px] uppercase tracking-[0.15em] text-slate-400">Android</p>
                          <p class="mt-1 text-xs font-semibold text-accent">
                            <Transition name="phone-text" mode="out-in">
                              <span :key="`android-${phoneSnapshotKey}`">{{ phoneSnapshot.androidStatus }}</span>
                            </Transition>
                          </p>
                        </div>
                        <div class="rounded-xl border border-white/10 bg-white/[0.05] px-2.5 py-2">
                          <p class="font-mono text-[8px] uppercase tracking-[0.15em] text-slate-400">iOS</p>
                          <p class="mt-1 text-xs font-semibold text-accent-2">
                            <Transition name="phone-text" mode="out-in">
                              <span :key="`ios-${phoneSnapshotKey}`">{{ phoneSnapshot.iosStatus }}</span>
                            </Transition>
                          </p>
                        </div>
                        <div class="rounded-xl border border-white/10 bg-white/[0.05] px-2.5 py-2">
                          <p class="font-mono text-[8px] uppercase tracking-[0.15em] text-slate-400">Active Users</p>
                          <p class="mt-1 text-xs font-semibold text-terminal">
                            <Transition name="phone-text" mode="out-in">
                              <span :key="`active-users-${phoneSnapshotKey}`">{{ phoneSnapshot.activeUsers }}</span>
                            </Transition>
                          </p>
                        </div>
                        <div class="rounded-xl border border-white/10 bg-white/[0.05] px-2.5 py-2">
                          <p class="font-mono text-[8px] uppercase tracking-[0.15em] text-slate-400">p95 Latency</p>
                          <p class="mt-1 text-xs font-semibold text-slate-200">
                            <Transition name="phone-text" mode="out-in">
                              <span :key="`latency-${phoneSnapshotKey}`">{{ phoneSnapshot.latency }}</span>
                            </Transition>
                          </p>
                        </div>
                      </div>

                      <div class="rounded-xl border border-white/10 bg-white/[0.05] p-2.5">
                        <div class="mb-1.5 flex items-center justify-between">
                          <span class="font-mono text-[8px] uppercase tracking-[0.15em] text-slate-400">Sprint Progress</span>
                          <span class="text-[10px] text-slate-300">
                            <Transition name="phone-text" mode="out-in">
                              <span :key="`progress-text-${phoneSnapshotKey}`">{{ phoneSnapshot.progress }}%</span>
                            </Transition>
                          </span>
                        </div>
                        <div class="h-1.5 rounded-full bg-black/45">
                          <div
                            class="h-full rounded-full bg-gradient-to-r from-accent to-accent-2 transition-[width] duration-1000 ease-out"
                            :style="{ width: `${phoneSnapshot.progress}%` }"
                          />
                        </div>
                      </div>

                      <div class="rounded-xl border border-white/10 bg-white/[0.05] p-2.5">
                        <p class="font-mono text-[8px] uppercase tracking-[0.15em] text-slate-400">Release Notes</p>
                        <ul class="mt-1.5 space-y-1.5 text-[10px] text-slate-300">
                          <li v-for="(note, index) in phoneSnapshot.notes" :key="`note-row-${index}`" class="flex items-center gap-1.5">
                            <span class="h-1 w-1 rounded-full" :class="noteDotClass(index)" />
                            <Transition name="phone-text" mode="out-in">
                              <span :key="`note-${index}-${phoneSnapshotKey}`">{{ note }}</span>
                            </Transition>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div class="absolute inset-x-0 bottom-3 flex justify-center" aria-hidden="true">
                    <div class="h-1.5 w-28 rounded-full bg-white/25" />
                  </div>

                  <div
                    class="absolute inset-0 bg-[radial-gradient(circle_at_70%_8%,rgba(90,200,250,0.14),transparent_42%),radial-gradient(circle_at_14%_82%,rgba(61,220,132,0.14),transparent_38%)]"
                    aria-hidden="true"
                  />
                </div>
              </div>
            </div>
          </div>

          <div class="grid gap-2 sm:grid-cols-2">
            <div class="rounded-2xl border border-border/60 bg-surface px-3 py-2">
              <p class="font-mono text-[10px] uppercase tracking-[0.18em] text-slate-400">Architecture</p>
              <p class="mt-1 text-sm font-semibold text-white">MVVM + Clean</p>
            </div>
            <div class="rounded-2xl border border-border/60 bg-surface px-3 py-2">
              <p class="font-mono text-[10px] uppercase tracking-[0.18em] text-slate-400">Focus</p>
              <p class="mt-1 text-sm font-semibold text-white">Quality + Velocity</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const profile = useProfile()

type PhoneSnapshot = {
  title: string
  status: string
  statusTone: 'live' | 'review' | 'hold'
  sprint: string
  buildTag: string
  crashFree: string
  androidStatus: string
  iosStatus: string
  activeUsers: string
  latency: string
  progress: number
  notes: string[]
}

const heroSection = ref<HTMLElement | null>(null)
const prefersReducedMotion = ref(false)
const pointerX = ref(0)
const pointerY = ref(0)
const targetX = ref(0)
const targetY = ref(0)
const scrollDepth = ref(0)

let frameId = 0
let reducedMotionQuery: MediaQueryList | null = null
let phoneRefreshTimeout: ReturnType<typeof setTimeout> | null = null

const minPhoneRefreshMs = 30_000
const maxPhoneRefreshMs = 60_000

const snapshotTitles = [
  'Wallet Checkout Revamp',
  'Push Permission Redesign',
  'Subscriptions Edge Cases',
  'Order Timeline Refresh',
  'Onboarding Step Compression',
  'Offline Cart Recovery',
  'Rewards Wallet Integration',
  'Checkout OTP Hardening',
  'Store Locator Latency Fix',
  'Home Feed Skeleton Cleanup',
  'Background Sync Stability',
  'Session Timeout Recovery'
] as const

const snapshotStatuses = [
  { label: 'Live', tone: 'live' },
  { label: 'QA Review', tone: 'review' },
  { label: 'Hotfix', tone: 'hold' }
] as const

const androidStatusPool = ['Release', 'Merging', 'Hotfix', 'Staging'] as const
const iosStatusPool = ['QA Review', 'TestFlight', 'App Review', 'Ready', 'Metadata Fix'] as const
const releaseNotePool = [
  'Biometric fallback fixed',
  'Navigation jank reduced 27%',
  'Cold start dropped by 180ms',
  'Checkout retry flow stabilized',
  'iOS deep-link bug resolved',
  'Offline sync queue trimmed',
  'Crash loop guard added',
  'Compose animation hitch removed',
  'Card scanner retry fixed',
  'Search indexing warmup added',
  'Profile cache invalidation fixed',
  'A/B flag sync race removed'
] as const

const emptyStyle = Object.freeze({}) as Record<string, string>

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value))
const randomInt = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min
const pickRandom = <T>(items: readonly T[]) => items[randomInt(0, items.length - 1)]
const pickDistinctNotes = (count: number) => {
  const pool = [...releaseNotePool]
  const notes: string[] = []
  while (notes.length < count && pool.length > 0) {
    const nextIndex = randomInt(0, pool.length - 1)
    notes.push(pool[nextIndex])
    pool.splice(nextIndex, 1)
  }
  return notes
}
const randomBuildTag = () => `v${randomInt(2, 6)}.${randomInt(0, 9)}.${randomInt(0, 39)}`
const randomActiveUsers = () => `${(randomInt(9, 360) / 10).toFixed(1)}k`

const motionDisabled = computed(() => prefersReducedMotion.value)
const phoneSnapshotKey = ref(0)
const phoneSnapshot = ref<PhoneSnapshot>({
  title: 'Wallet Checkout Revamp',
  status: 'Live',
  statusTone: 'live',
  sprint: 'Sprint 27',
  buildTag: 'v4.2.18',
  crashFree: '99.8',
  androidStatus: 'Release',
  iosStatus: 'QA Review',
  activeUsers: '1.8k',
  latency: '188ms',
  progress: 82,
  notes: ['Biometric fallback fixed', 'Navigation jank reduced 27%', 'Crash loop guard added']
})

const phoneStatusClass = computed(() => {
  if (phoneSnapshot.value.statusTone === 'review') {
    return 'border-accent-2/45 bg-accent-2/10 text-accent-2'
  }
  if (phoneSnapshot.value.statusTone === 'hold') {
    return 'border-amber-300/40 bg-amber-400/10 text-amber-300'
  }
  return 'border-terminal/40 bg-terminal/10 text-terminal'
})

const noteDotClass = (index: number) => {
  if (index % 3 === 0) {
    return 'bg-accent'
  }
  if (index % 3 === 1) {
    return 'bg-accent-2'
  }
  return 'bg-terminal'
}

const createPhoneSnapshot = (): PhoneSnapshot => {
  const status = pickRandom(snapshotStatuses)
  const crashFree = (99 + Math.random() * 0.95).toFixed(2)

  return {
    title: pickRandom(snapshotTitles),
    status: status.label,
    statusTone: status.tone,
    sprint: `Sprint ${randomInt(16, 42)}`,
    buildTag: randomBuildTag(),
    crashFree,
    androidStatus: pickRandom(androidStatusPool),
    iosStatus: pickRandom(iosStatusPool),
    activeUsers: randomActiveUsers(),
    latency: `${randomInt(105, 390)}ms`,
    progress: randomInt(58, 97),
    notes: pickDistinctNotes(3)
  }
}

const schedulePhoneSnapshotRefresh = () => {
  if (!import.meta.client) {
    return
  }

  if (phoneRefreshTimeout) {
    clearTimeout(phoneRefreshTimeout)
  }

  const nextDelay = randomInt(minPhoneRefreshMs, maxPhoneRefreshMs)
  phoneRefreshTimeout = window.setTimeout(() => {
    phoneSnapshot.value = createPhoneSnapshot()
    phoneSnapshotKey.value += 1
    schedulePhoneSnapshotRefresh()
  }, nextDelay)
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

  reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
  reducedMotionQuery.addEventListener('change', updateReducedMotion)
  updateReducedMotion()
  updateScrollDepth()
  phoneSnapshot.value = createPhoneSnapshot()
  phoneSnapshotKey.value += 1
  schedulePhoneSnapshotRefresh()

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
  if (phoneRefreshTimeout) {
    clearTimeout(phoneRefreshTimeout)
    phoneRefreshTimeout = null
  }
})
</script>

<style scoped>
.phone-text-enter-active,
.phone-text-leave-active {
  transition:
    opacity 320ms ease,
    transform 320ms ease,
    filter 320ms ease;
}

.phone-text-enter-from,
.phone-text-leave-to {
  opacity: 0;
  transform: translateY(4px);
  filter: blur(1px);
}
</style>
