<template>
  <section class="relative overflow-hidden border-b border-[#1f4f49]/40" id="overview">
    <div
      class="pointer-events-none absolute inset-0 bg-[radial-gradient(550px_at_14%_14%,rgba(43,232,198,0.2),transparent_60%),radial-gradient(660px_at_85%_10%,rgba(54,148,133,0.18),transparent_60%),linear-gradient(180deg,#02100d_0%,#041513_55%,#051917_100%)]"
      aria-hidden="true"
    />

    <div class="relative mx-auto grid max-w-6xl gap-10 px-6 pb-14 pt-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
      <div class="animate-mm-rise space-y-6 lg:self-start">
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

      <div class="animate-mm-rise [animation-delay:120ms] lg:w-full lg:max-w-[540px] lg:justify-self-end">
        <div class="flex items-start justify-between gap-3">
          <div>
            <p class="font-mono text-[10px] uppercase tracking-[0.24em] text-[#7fb3ab]">Current Build</p>
            <h2 class="mt-2 text-xl font-semibold text-[#e3f9f5]">App preview</h2>
          </div>
          <span class="inline-flex rounded-full border border-[#30d8c0]/45 bg-[#30d8c0]/20 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#8ff4e3]">
            {{ previewShot?.title ?? 'Android' }}
          </span>
        </div>

        <!-- The 3D phone docks here; the CSS phone below is the fallback without WebGL. -->
        <StageSlot id="mm.hero" class="mx-auto mt-5 h-[min(130vw,560px)] w-full max-w-[340px] lg:h-[600px]">
          <DeviceFrame variant="android" tone="teal">
            <img
              v-if="previewShot"
              :key="previewShot.id"
              class="h-full w-full object-cover object-top"
              :src="previewShot.textureSrc ?? previewShot.src"
              :alt="previewShot.alt"
              width="718"
              height="1600"
              loading="eager"
              decoding="async"
            />
          </DeviceFrame>
        </StageSlot>

        <div class="mt-4 flex flex-wrap items-center justify-center gap-3">
        <div class="flex justify-center gap-1.5" role="group" aria-label="App screens">
          <button
            v-for="(shot, index) in previewScreenshots"
            :key="shot.id"
            type="button"
            class="group grid h-6 place-items-center"
            :aria-label="`Show ${shot.title}`"
            :aria-pressed="index === previewIndex"
            @click="selectScreen(index)"
          >
            <span
              class="block h-1.5 rounded-full transition-all duration-500 ease-spring"
              :class="index === previewIndex ? 'w-6 bg-[#31dbc2]' : 'w-1.5 bg-white/25 group-hover:bg-white/50'"
            />
          </button>
        </div>
        <StageMotionToggle />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import DeviceFrame from '~/components/stage/DeviceFrame.vue'
import StageMotionToggle from '~/components/stage/StageMotionToggle.vue'
import type { MoneyManagerSiteContent } from '~/data/moneyManagerSite'

const props = defineProps<{
  content: MoneyManagerSiteContent
  supportPath: string
}>()

const stage = useStage()
const reducedMotion = useReducedMotion()

const previewScreenshots = computed(() => props.content.screenshots)
const initialIndex = () => {
  const index = previewScreenshots.value.findIndex((shot) => shot.id === props.content.heroScreenshotId)
  return index >= 0 ? index : 0
}
const previewIndex = ref(initialIndex())
const previewShot = computed(() => previewScreenshots.value[previewIndex.value] ?? previewScreenshots.value[0] ?? null)

// Follow the 3D phone's screen so the dots, chip and gallery stay in sync.
watch(
  () => stage?.events.screen,
  (index) => {
    if (typeof index === 'number') {
      previewIndex.value = index
    }
  }
)

const selectScreen = (index: number) => {
  previewIndex.value = index
  stage?.command('screen', index)
}

// Without WebGL the CSS phone cycles on its own (the 3D scene handles this when it is live).
let interval: ReturnType<typeof setInterval> | null = null
onMounted(() => {
  interval = setInterval(() => {
    if (stage?.live.value || stage?.paused.value || reducedMotion.value || previewScreenshots.value.length < 2) {
      return
    }
    previewIndex.value = (previewIndex.value + 1) % previewScreenshots.value.length
  }, 5_000)
})

onBeforeUnmount(() => {
  if (interval) {
    clearInterval(interval)
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
