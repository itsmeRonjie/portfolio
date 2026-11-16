<template>
  <article class="grid items-center gap-8 lg:grid-cols-2 lg:gap-14">
    <!-- Device side. On wide screens the 3D phone flies in from the hero and docks here. -->
    <div v-reveal class="relative" :class="reversed ? 'lg:order-2' : ''">
      <div
        class="ui-edge relative overflow-hidden rounded-[2rem] border border-border/50 bg-gradient-to-br"
        :class="project.accent"
        :style="edgeStyle"
      >
        <div class="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.12),transparent_60%)]" aria-hidden="true" />
        <div class="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-canvas/80 to-transparent" aria-hidden="true" />

        <StageSlot :id="project.featured!.slot" class="relative h-[440px] sm:h-[520px]">
          <div class="relative h-full py-8">
            <DeviceFrame v-if="isIos" variant="ios" tone="titanium">
              <DinkBoardScoreboard :score="scoreState" />
            </DeviceFrame>
            <DeviceFrame v-else variant="android" tone="graphite">
              <img
                class="h-full w-full object-cover object-top"
                :src="screenSrc"
                :alt="project.previewAlt ?? project.title"
                width="718"
                height="1600"
                loading="lazy"
                decoding="async"
              />
            </DeviceFrame>
            <!-- Wrist mirror, matching where the 3D watch docks. -->
            <div
              v-if="isIos"
              class="absolute left-[84%] top-[66%] hidden h-[26%] -translate-x-1/2 -translate-y-1/2 sm:block"
              aria-hidden="true"
            >
              <div class="h-full overflow-hidden rounded-[28%] border-[3px] border-slate-400/40 bg-black shadow-panel" style="aspect-ratio: 0.86">
                <DinkBoardScoreboard :score="scoreState" variant="watch" />
              </div>
            </div>
          </div>
        </StageSlot>
      </div>
    </div>

    <div v-reveal="{ delay: 80 }" class="space-y-5">
      <div class="flex flex-wrap items-center gap-3">
        <img
          v-if="isIos && project.previewImage"
          class="h-11 w-11 rounded-xl border border-white/10"
          :src="project.previewImage"
          alt=""
          loading="lazy"
        />
        <p class="ui-eyebrow">Case study · {{ project.featured!.platforms }}</p>
      </div>
      <h3 class="text-3xl font-semibold text-white sm:text-4xl">{{ project.title }}</h3>
      <p class="text-base leading-relaxed text-slate-300">{{ project.description }}</p>

      <dl class="space-y-3">
        <div
          v-for="item in story"
          :key="item.label"
          class="grid grid-cols-[5.5rem_1fr] gap-3 rounded-2xl border border-border/50 bg-surface/60 px-4 py-3"
        >
          <dt class="font-mono text-[11px] uppercase tracking-[0.18em]" :class="item.tone">{{ item.label }}</dt>
          <dd class="text-sm leading-relaxed text-slate-300">{{ item.text }}</dd>
        </div>
      </dl>

      <div class="flex flex-wrap gap-2">
        <span v-for="tag in project.tags" :key="tag" class="ui-chip font-mono !px-2.5 !py-1 !text-[11px]" :class="resolveTagAccent(tag)">
          {{ tag }}
        </span>
      </div>

      <a v-if="project.link" class="ui-cta-secondary" :href="project.link" target="_blank" rel="noreferrer">
        {{ project.linkLabel ?? 'Open project' }}
        <span aria-hidden="true">→</span>
      </a>
    </div>
  </article>
</template>

<script setup lang="ts">
import DeviceFrame from '~/components/stage/DeviceFrame.vue'
import DinkBoardScoreboard from '~/components/dinkboard/DinkBoardScoreboard.vue'
import type { Project } from '~/data/projects'
import { moneyManagerSite } from '~/data/moneyManagerSite'
import { INITIAL_SCORE } from '~/lib/scoreStore'
import { resolveTagAccent } from '~/utils/projectAccent'

const props = defineProps<{ project: Project; reversed?: boolean }>()

const stage = useStage()
const scoreState = computed(() => stage?.scoreState.value ?? INITIAL_SCORE)
const isIos = computed(() => props.project.featured?.device === 'ios')

const screenSrc = moneyManagerSite.screenshots[0]?.textureSrc ?? props.project.previewImage

const edgeStyle = computed(() =>
  isIos.value
    ? { '--edge-from': 'rgba(139, 202, 30, 0.55)', '--edge-to': 'rgba(255, 122, 46, 0.45)' }
    : { '--edge-from': 'rgba(49, 219, 194, 0.55)', '--edge-to': 'rgba(61, 220, 132, 0.35)' }
)

// Bullets are written as "Problem: ...", "Solution: ...", "Result: ...".
const tones: Record<string, string> = { Problem: 'text-amber-300', Solution: 'text-accent-2', Result: 'text-accent' }
const story = computed(() =>
  props.project.bullets.map((bullet) => {
    const match = /^(\w+):\s*(.*)$/.exec(bullet)
    const label = match?.[1] ?? 'Note'
    return { label, text: match?.[2] ?? bullet, tone: tones[label] ?? 'text-slate-400' }
  })
)
</script>
