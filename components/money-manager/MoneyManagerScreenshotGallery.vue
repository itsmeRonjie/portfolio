<template>
  <section class="mx-auto max-w-6xl px-6 py-14" id="screenshots">
    <div class="space-y-3">
      <p class="font-mono text-[11px] uppercase tracking-[0.24em] text-[#70a59e]">Product Preview</p>
      <h2 class="text-3xl font-semibold text-[#e6faf6]">Current screens from the latest MoneyManager build</h2>
      <p class="max-w-3xl text-sm text-[#99beb8]">
        Home, transactions, planning, reports, automation, and theme customization from the current Android app.
      </p>
    </div>

    <!-- Wide screens: the hero phone flies down and docks beside a list; scrolling the list changes its screen. -->
    <div class="mt-10 hidden gap-12 lg:grid lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
      <div class="relative">
        <div class="sticky top-[calc(50vh-min(34vh,290px)+2rem)]">
          <StageSlot id="mm.gallery" class="mx-auto h-[min(68vh,580px)] w-full max-w-[320px]">
            <DeviceFrame variant="android" tone="teal">
              <img
                v-if="activeShot"
                :key="activeShot.id"
                class="h-full w-full object-cover object-top"
                :src="activeShot.textureSrc ?? activeShot.src"
                :alt="activeShot.alt"
                width="718"
                height="1600"
                loading="lazy"
                decoding="async"
              />
            </DeviceFrame>
          </StageSlot>
        </div>
      </div>

      <ol class="space-y-3 py-[18vh]">
        <li v-for="(shot, index) in screenshots" :key="shot.id" :ref="(el) => setItem(index, el as HTMLElement | null)" :data-index="index">
          <button
            type="button"
            class="w-full rounded-3xl border p-5 text-left transition-all duration-500 ease-spring"
            :class="
              index === activeIndex
                ? 'border-[#31dbc2]/55 bg-[linear-gradient(155deg,rgba(18,58,51,0.95)_0%,rgba(8,26,23,0.92)_100%)] shadow-[0_18px_44px_rgba(0,0,0,0.4)] lg:translate-x-1'
                : 'border-[#255850]/50 bg-[#071815]/60 opacity-70 hover:opacity-100'
            "
            :aria-pressed="index === activeIndex"
            @click="select(index)"
          >
            <span class="font-mono text-[10px] uppercase tracking-[0.2em] text-[#70a59e]">{{ String(index + 1).padStart(2, '0') }}</span>
            <h3 class="mt-1 text-lg font-semibold text-[#e4f8f4]">{{ shot.title }}</h3>
            <p class="mt-1 text-sm leading-relaxed text-[#8eb5af]">{{ shot.note }}</p>
          </button>
        </li>
      </ol>
    </div>

    <!-- Narrow screens: swipeable strip of screenshots. -->
    <div class="mt-8 overflow-x-auto pb-2 lg:hidden">
      <div class="grid min-w-[940px] grid-cols-4 gap-4">
        <article
          v-for="(shot, index) in screenshots"
          :key="shot.id"
          class="animate-mm-slide rounded-3xl border border-[#255850]/70 bg-[linear-gradient(180deg,rgba(12,38,33,0.92)_0%,rgba(6,20,18,0.92)_100%)] p-3"
          :style="{ animationDelay: `${index * 50}ms` }"
        >
          <img class="h-[380px] w-full rounded-2xl object-cover object-top" :src="shot.src" :alt="shot.alt" loading="lazy" decoding="async" />
          <h3 class="mt-3 text-sm font-semibold text-[#e4f8f4]">{{ shot.title }}</h3>
          <p class="mt-1 text-xs text-[#8eb5af]">{{ shot.note }}</p>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import DeviceFrame from '~/components/stage/DeviceFrame.vue'
import type { MoneyManagerScreenshot } from '~/data/moneyManagerSite'

const props = defineProps<{
  screenshots: MoneyManagerScreenshot[]
  heroScreenshotId: string
}>()

const stage = useStage()
// Start on the hero screen, matching the 3D phone (lib/three/scenes/moneyManager.ts).
const heroIndex = props.screenshots.findIndex((shot) => shot.id === props.heroScreenshotId)
const activeIndex = ref(Math.max(heroIndex, 0))
const activeShot = computed(() => props.screenshots[activeIndex.value] ?? props.screenshots[0] ?? null)

watch(
  () => stage?.events.screen,
  (index) => {
    if (typeof index === 'number') {
      activeIndex.value = index
    }
  }
)

const select = (index: number) => {
  if (index === activeIndex.value) {
    return
  }
  activeIndex.value = index
  stage?.command('screen', index)
}

// Selecting by scrolling: whichever list item crosses the middle of the viewport is shown.
const items = new Map<number, HTMLElement>()
let observer: IntersectionObserver | null = null

const setItem = (index: number, element: HTMLElement | null) => {
  const previous = items.get(index)
  if (previous && previous !== element) {
    observer?.unobserve(previous)
  }
  if (element) {
    items.set(index, element)
    observer?.observe(element)
  } else {
    items.delete(index)
  }
}

onMounted(() => {
  observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          select(Number((entry.target as HTMLElement).dataset.index))
        }
      }
    },
    { rootMargin: '-48% 0px -48% 0px' }
  )
  for (const element of items.values()) {
    observer.observe(element)
  }
})

onBeforeUnmount(() => observer?.disconnect())
</script>

<style scoped>
.animate-mm-slide {
  animation: mm-slide 0.55s ease-out both;
}

@keyframes mm-slide {
  0% {
    opacity: 0;
    transform: translateX(10px);
  }

  100% {
    opacity: 1;
    transform: translateX(0);
  }
}

@media (prefers-reduced-motion: reduce) {
  .animate-mm-slide {
    animation: none;
  }
}
</style>
