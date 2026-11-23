<template>
  <section class="relative mx-auto grid max-w-6xl items-center gap-8 overflow-x-clip px-5 pb-10 pt-8 sm:px-6 lg:min-h-[calc(100svh-var(--nav-h))] lg:grid-cols-[1.02fr_0.98fr] lg:gap-6 lg:pb-16 lg:pt-6">
    <div class="relative z-10 space-y-6">
      <p class="ui-eyebrow animate-stagger-in">Mobile Engineering</p>
      <!-- A real space between the names (for search engines and screen readers); the surname never splits at its hyphen. -->
      <h1 class="ui-display animate-stagger-in [animation-delay:60ms]">{{ firstName }} <span class="whitespace-nowrap">{{ surname }}</span></h1>
      <h2 class="ui-tagline max-w-xl animate-stagger-in [animation-delay:120ms]">
        Shipping <span class="text-gradient">Android and iOS</span> products with studio-level polish.
      </h2>
      <p class="max-w-xl text-base leading-relaxed text-slate-300 animate-stagger-in [animation-delay:180ms] sm:text-lg">
        Software engineer building native apps with Kotlin, Jetpack Compose, Swift, and SwiftUI, on MVVM and Clean
        Architecture foundations that keep features fast to ship and easy to maintain.
      </p>

      <p
        v-if="currentRole"
        class="flex items-center gap-3 text-sm text-slate-300 animate-stagger-in [animation-delay:220ms]"
      >
        <span class="relative flex h-2.5 w-2.5" aria-hidden="true">
          <span class="absolute inset-0 rounded-full bg-accent animate-pulse-dot" />
          <span class="relative h-2.5 w-2.5 rounded-full bg-accent" />
        </span>
        <span>
          {{ currentRole.role }} at <span class="font-semibold text-white">{{ currentRole.company }}</span>
          <span class="text-slate-500"> · {{ currentRole.period }}</span>
        </span>
      </p>

      <div class="flex flex-wrap gap-2 animate-stagger-in [animation-delay:260ms]">
        <span class="ui-chip border-accent/40 bg-accent/10 text-accent">Android / Kotlin</span>
        <span class="ui-chip border-accent-2/40 bg-accent-2/10 text-accent-2">iOS / Swift</span>
        <span class="ui-chip border-terminal/35 bg-terminal/10 text-terminal">CI ready releases</span>
      </div>

      <div class="flex flex-wrap items-center gap-3 animate-stagger-in [animation-delay:300ms]">
        <a class="ui-cta-primary" href="/resume.pdf" download>
          Review Resume
          <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" aria-hidden="true">
            <path d="M12 4v12m0 0l-5-5m5 5l5-5M5 20h14" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </a>
        <a class="ui-cta-secondary" :href="profile.links.github" target="_blank" rel="noreferrer">
          Explore GitHub Builds
        </a>
      </div>
    </div>

    <!-- Device stage: two phones running real apps. 3D when WebGL is available, CSS otherwise. -->
    <div class="relative animate-stagger-in [animation-delay:140ms]">
      <StageSlot id="hero.stage" :interactive="false" class="relative mx-auto h-[min(116vw,480px)] w-full max-w-[540px] sm:h-[560px] lg:h-[min(680px,calc(100svh-9.5rem))] xl:max-w-[600px]">
        <!-- Stage light: a soft pool of the two platform colors behind the devices. -->
        <div
          class="pointer-events-none absolute -inset-[14%] rounded-full bg-[radial-gradient(closest-side,rgba(61,220,132,0.2),rgba(90,200,250,0.12)_48%,transparent_74%)]"
          aria-hidden="true"
        />
        <!-- Slot layout: the logo tiles in lib/three/scenes/portfolio.ts are placed in the gaps this leaves. -->
        <StageSlot id="hero.ios" class="!absolute left-[3%] top-[12%] h-[78%] w-[45%] lg:left-[8%] lg:top-[14%] lg:h-[74%] lg:w-[40%]">
          <DeviceFrame variant="ios" tone="titanium" class="-rotate-[5deg] opacity-80">
            <DinkBoardScoreboard :score="scoreState" />
          </DeviceFrame>
        </StageSlot>
        <StageSlot id="hero.android" class="!absolute right-[3%] top-[3%] h-[92%] w-[49%] lg:right-[7%] lg:top-[4%] lg:h-[90%] lg:w-[45%]">
          <DeviceFrame variant="android" tone="graphite" class="rotate-[4deg]">
            <img
              :key="activeShot?.id"
              class="h-full w-full object-cover object-top"
              :src="activeShot?.textureSrc ?? activeShot?.src"
              :alt="activeShot?.alt"
              width="718"
              height="1600"
              decoding="async"
              fetchpriority="high"
            />
          </DeviceFrame>
        </StageSlot>
      </StageSlot>

      <div class="relative z-10 mt-2 flex flex-col items-center gap-3 lg:mt-4">
        <div class="flex items-center gap-1.5" role="group" aria-label="Money Manager screens">
          <button
            v-for="(shot, index) in screens"
            :key="shot.id"
            type="button"
            class="group grid h-6 place-items-center"
            :aria-label="`Show ${shot.title}`"
            :aria-pressed="index === activeIndex"
            @click="selectScreen(index)"
          >
            <span
              class="block h-1.5 rounded-full transition-all duration-500 ease-spring"
              :class="index === activeIndex ? 'w-6 bg-accent' : 'w-1.5 bg-white/25 group-hover:bg-white/50'"
            />
          </button>
        </div>
        <!-- Not a live region: it changes on its own every few seconds. -->
        <p class="text-center text-xs text-slate-400">
          <span class="text-accent">Money Manager</span> · {{ activeShot?.title }}
          <span class="mx-1.5 text-slate-600">/</span>
          <span class="text-accent-2">DinkBoard</span> · live score
        </p>
        <div v-if="stage?.live.value" class="flex flex-wrap items-center justify-center gap-3">
          <p class="hidden font-mono text-[10px] uppercase tracking-[0.2em] text-slate-500 sm:block">
            Drag a phone to spin it · tap to interact
          </p>
          <StageMotionToggle />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import DeviceFrame from '~/components/stage/DeviceFrame.vue'
import StageMotionToggle from '~/components/stage/StageMotionToggle.vue'
import DinkBoardScoreboard from '~/components/dinkboard/DinkBoardScoreboard.vue'
import { moneyManagerSite } from '~/data/moneyManagerSite'
import { INITIAL_SCORE } from '~/lib/scoreStore'

const profile = useProfile()
const stage = useStage()

const currentRole = profile.experience[0]
const [firstName, ...surnameParts] = profile.name.split(' ')
const surname = surnameParts.join(' ')
// Same list and order as the 3D phone (lib/three/scenes/portfolio.ts), so indexes line up.
const screens = moneyManagerSite.screenshots

const scoreState = computed(() => stage?.scoreState.value ?? INITIAL_SCORE)
const activeIndex = ref(0)
const activeShot = computed(() => screens[activeIndex.value] ?? screens[0])

// The 3D phone reports which screen it is showing; mirror it so the dots and caption follow.
watch(
  () => stage?.events.screen,
  (index) => {
    if (typeof index === 'number') {
      activeIndex.value = index
    }
  }
)

const selectScreen = (index: number) => {
  activeIndex.value = index
  stage?.command('screen', index)
}
</script>
