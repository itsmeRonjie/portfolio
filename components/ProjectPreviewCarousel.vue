<template>
  <div
    class="relative flex w-full flex-col items-center"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
    <div
      class="relative w-full aspect-[2/1] touch-pan-y overflow-hidden rounded-2xl border border-white/10 bg-black/30 shadow-inner"
      @pointerdown="handlePointerDown"
      @pointermove="handlePointerMove"
      @pointerup="handlePointerUp"
      @pointercancel="handlePointerUp"
    >
      <div
        v-if="pending"
        class="flex h-full w-full items-center justify-center animate-pulse"
        aria-label="Loading repository previews"
      >
        <div class="h-20 w-40 rounded-xl bg-white/10" />
      </div>
      <div
        v-else-if="previewRepos.length === 0"
        class="flex h-full w-full flex-col items-center justify-center gap-2 text-[10px] text-slate-400"
      >
        <div class="h-20 w-40 rounded-xl bg-white/10" />
        <span>No previews yet</span>
      </div>
      <div v-else class="absolute inset-0">
        <div
          v-for="(repo, index) in previewRepos"
          :key="repo.id"
          class="absolute inset-0 transition-opacity duration-700"
          :class="index === activeIndex ? 'opacity-100' : 'opacity-0'"
        >
          <img
            class="h-full w-full object-cover"
            :src="previewImage(repo)"
            :alt="`${repo.name} preview`"
            width="1280"
            height="640"
            loading="lazy"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
          <div class="absolute bottom-2 left-2 right-2 truncate text-[10px] font-semibold text-white">
            {{ repo.name }}
          </div>
        </div>
      </div>
    </div>
    <div v-if="previewRepos.length > 1" class="mt-2 flex items-center gap-1">
      <span
        v-for="(_, index) in previewRepos"
        :key="index"
        class="h-1.5 w-1.5 rounded-full"
        :class="index === activeIndex ? 'bg-accent' : 'bg-white/20'"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, onBeforeUnmount, ref, toRef, watch } from 'vue'
import type { GithubRepo } from '~/composables/useGithubRepos'

const props = defineProps<{ org: string }>()

const org = toRef(props, 'org')
const { repos, pending } = useGithubRepos(org)
const previewRepos = computed(() => repos.value.slice(0, 6))
const activeIndex = ref(0)
const prefersReducedMotion = ref(false)

const swipeThreshold = 28

let intervalId: ReturnType<typeof setInterval> | null = null
let mediaQuery: MediaQueryList | null = null
let isHovering = false
let isDragging = false
let hasSwiped = false
let pointerId: number | null = null
let startX = 0
let startY = 0

const previewImage = (repo: GithubRepo) =>
  `https://opengraph.githubassets.com/preview/${props.org}/${repo.name}`

const handleMotionChange = (event: MediaQueryListEvent) => {
  prefersReducedMotion.value = event.matches
  startRotation()
}

const stopRotation = () => {
  if (intervalId) {
    clearInterval(intervalId)
    intervalId = null
  }
}

const showNext = () => {
  if (previewRepos.value.length < 2) {
    return
  }
  activeIndex.value = (activeIndex.value + 1) % previewRepos.value.length
}

const showPrevious = () => {
  if (previewRepos.value.length < 2) {
    return
  }
  activeIndex.value = (activeIndex.value - 1 + previewRepos.value.length) % previewRepos.value.length
}

const startRotation = () => {
  stopRotation()
  if (typeof window === 'undefined') {
    return
  }
  if (isHovering) {
    return
  }
  if (prefersReducedMotion.value || previewRepos.value.length < 2) {
    return
  }
  intervalId = setInterval(() => {
    showNext()
  }, 4500)
}

const handleMouseEnter = () => {
  isHovering = true
  stopRotation()
}

const handleMouseLeave = () => {
  isHovering = false
  startRotation()
}

const handlePointerDown = (event: PointerEvent) => {
  if (previewRepos.value.length < 2) {
    return
  }
  if (event.pointerType === 'mouse' && event.button !== 0) {
    return
  }
  isDragging = true
  hasSwiped = false
  pointerId = event.pointerId
  startX = event.clientX
  startY = event.clientY
  stopRotation()
  const target = event.currentTarget as HTMLElement | null
  target?.setPointerCapture?.(event.pointerId)
}

const handlePointerMove = (event: PointerEvent) => {
  if (!isDragging || pointerId !== event.pointerId || hasSwiped) {
    return
  }
  const deltaX = event.clientX - startX
  const deltaY = event.clientY - startY
  if (Math.abs(deltaX) < swipeThreshold || Math.abs(deltaX) < Math.abs(deltaY)) {
    return
  }
  hasSwiped = true
  if (deltaX > 0) {
    showPrevious()
  } else {
    showNext()
  }
}

const handlePointerUp = (event: PointerEvent) => {
  if (pointerId !== null && event.pointerId !== pointerId) {
    return
  }
  isDragging = false
  hasSwiped = false
  pointerId = null
  const target = event.currentTarget as HTMLElement | null
  target?.releasePointerCapture?.(event.pointerId)
  if (!isHovering) {
    startRotation()
  }
}

watch(
  previewRepos,
  () => {
    activeIndex.value = 0
    startRotation()
  },
  { immediate: true }
)

onMounted(() => {
  if (typeof window === 'undefined') {
    return
  }
  mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
  prefersReducedMotion.value = mediaQuery.matches

  if (mediaQuery.addEventListener) {
    mediaQuery.addEventListener('change', handleMotionChange)
  } else {
    mediaQuery.addListener(handleMotionChange)
  }

  startRotation()
})

onBeforeUnmount(() => {
  stopRotation()
  if (!mediaQuery) {
    return
  }
  if (mediaQuery.removeEventListener) {
    mediaQuery.removeEventListener('change', handleMotionChange)
  } else {
    mediaQuery.removeListener(handleMotionChange)
  }
})
</script>
