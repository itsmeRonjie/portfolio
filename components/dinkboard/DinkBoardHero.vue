<template>
  <section class="relative overflow-hidden border-b border-[#253c1b]/70 bg-[linear-gradient(180deg,#07100a_0%,#0c160c_52%,#10140f_100%)]" id="overview">
    <div
      class="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(139,202,30,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(139,202,30,0.06)_1px,transparent_1px)] bg-[size:42px_42px]"
      aria-hidden="true"
    />

    <div class="relative mx-auto grid max-w-6xl gap-10 px-6 pb-14 pt-12 lg:grid-cols-[1.04fr_0.96fr] lg:items-center">
      <div class="space-y-6">
        <p class="font-mono text-[11px] uppercase tracking-[0.28em] text-[#aacb91]">Court-side scoring</p>
        <h1 class="text-4xl font-semibold leading-tight text-[#f4ffec] sm:text-5xl lg:text-6xl">{{ content.heroTitle }}</h1>
        <p class="max-w-2xl text-lg leading-relaxed text-[#cfe3bf] sm:text-xl">{{ content.heroSubtitle }}</p>
        <p class="max-w-2xl text-sm leading-relaxed text-[#a9bf99] sm:text-base">{{ content.heroDescription }}</p>

        <div class="flex flex-wrap gap-2">
          <span
            v-for="chip in content.statChips"
            :key="chip"
            class="inline-flex items-center rounded-lg border border-[#3f5e2a]/70 bg-[#14210f]/80 px-3 py-1 text-xs font-medium text-[#d7edc4]"
          >
            {{ chip }}
          </span>
        </div>

        <div class="flex flex-wrap items-center gap-3">
          <a
            class="inline-flex items-center justify-center rounded-lg border border-[#ff7a2e]/50 bg-[#ff7a2e] px-5 py-2.5 text-sm font-semibold text-[#170905] transition hover:-translate-y-0.5 hover:brightness-105"
            :href="content.playStoreUrl"
            target="_blank"
            rel="noreferrer"
          >
            View on Google Play
          </a>
          <NuxtLink
            class="inline-flex items-center justify-center rounded-lg border border-[#4a6b34]/70 bg-[#172410]/85 px-5 py-2.5 text-sm font-semibold text-[#d2e8c0] transition hover:border-[#8bca1e]/65 hover:text-white"
            :to="supportPath"
          >
            Contact Support
          </NuxtLink>
        </div>
      </div>

      <div class="rounded-xl border border-[#385726]/80 bg-[#101b0e]/80 p-5 shadow-[0_28px_70px_rgba(0,0,0,0.45)] sm:p-6">
        <div class="flex items-start justify-between gap-3">
          <div>
            <p class="font-mono text-[10px] uppercase tracking-[0.24em] text-[#a8c98f]">Live Score</p>
            <h2 class="mt-2 text-xl font-semibold text-[#f2ffe9]">Host, watch, and nearby follower</h2>
          </div>
          <img class="h-12 w-12 rounded-lg border border-[#8bca1e]/45 bg-[#081008]" :src="content.appIconPath" alt="" loading="eager" decoding="async" />
        </div>

        <!-- Three devices share one score. In 3D each one lights up as the point syncs to it. -->
        <StageSlot id="db.stage" :interactive="false" class="relative mt-4 h-[440px] sm:h-[480px]">
          <StageSlot id="db.follower" class="!absolute left-[2%] top-[12%] hidden h-[74%] w-[32%] sm:block">
            <DeviceFrame variant="android" tone="court" class="-rotate-6 opacity-75">
              <DinkBoardScoreboard :score="score" variant="follower" />
            </DeviceFrame>
          </StageSlot>
          <StageSlot id="db.host" class="!absolute left-1/2 top-[2%] h-[94%] w-[44%] -translate-x-1/2 sm:left-[58%]">
            <DeviceFrame variant="ios" tone="court">
              <DinkBoardScoreboard :score="score" />
            </DeviceFrame>
          </StageSlot>
          <StageSlot id="db.watch" class="!absolute bottom-[4%] right-[1%] h-[34%] w-[24%]">
            <div class="flex h-full items-center justify-center">
              <div class="h-[68%] overflow-hidden rounded-[28%] border-[3px] border-[#8f969e]/60 bg-black shadow-panel" style="aspect-ratio: 0.86">
                <DinkBoardScoreboard :score="score" variant="watch" />
              </div>
            </div>
          </StageSlot>
        </StageSlot>

        <div class="mt-4 grid grid-cols-3 gap-2">
          <button
            type="button"
            class="rounded-lg border border-[#8bca1e]/45 bg-[#17240f] px-2 py-2.5 text-xs font-semibold text-[#cce8b2] transition active:scale-95 hover:border-[#8bca1e]/80 sm:text-sm"
            @click="point('home')"
          >
            + {{ teams.home }}
          </button>
          <button
            type="button"
            class="rounded-lg border border-[#3053c8]/55 bg-[#0e1430] px-2 py-2.5 text-xs font-semibold text-[#c2ccff] transition active:scale-95 hover:border-[#6f8aff]/80 sm:text-sm"
            @click="point('away')"
          >
            + {{ teams.away }}
          </button>
          <button
            type="button"
            class="rounded-lg border border-[#2d4622] bg-[#0f180d] px-2 py-2.5 text-xs font-semibold text-[#d9efc6] transition active:scale-95 enabled:hover:border-[#8bca1e]/60 disabled:opacity-40 sm:text-sm"
            :disabled="!score.canUndo"
            @click="undo"
          >
            Undo
          </button>
        </div>
        <!-- The visible score changes during demo autoplay, so only announce points the visitor scores. -->
        <p class="sr-only" aria-live="polite">{{ announcement }}</p>
        <div class="mt-3 flex flex-wrap items-center justify-center gap-3">
        <p class="text-center text-xs text-[#a9bf99]">
          {{ teams.home }} {{ score.home }} – {{ score.away }} {{ teams.away }}
          <span class="text-[#6b8558]"> · demo scoring, synced to the watch and a nearby follower</span>
        </p>
        <StageMotionToggle v-if="stage?.live.value" />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import DeviceFrame from '~/components/stage/DeviceFrame.vue'
import DinkBoardScoreboard from '~/components/dinkboard/DinkBoardScoreboard.vue'
import StageMotionToggle from '~/components/stage/StageMotionToggle.vue'
import type { DinkBoardSiteContent } from '~/data/dinkBoardSite'
import { INITIAL_SCORE, SCORE_TEAMS } from '~/lib/scoreStore'
import type { ScoreSide } from '~/lib/scoreStore'

defineProps<{
  content: DinkBoardSiteContent
  supportPath: string
}>()

const stage = useStage()
const teams = SCORE_TEAMS
const score = computed(() => stage?.scoreState.value ?? INITIAL_SCORE)

const announcement = ref('')
const announce = () => {
  const now = stage?.score.get()
  if (now) {
    announcement.value = `${teams.home} ${now.home}, ${teams.away} ${now.away}${now.winner ? ', game' : ''}`
  }
}

const point = (side: ScoreSide) => {
  stage?.command('input')
  stage?.score.score(side)
  announce()
}

const undo = () => {
  stage?.command('input')
  stage?.score.undo()
  announce()
}
</script>
