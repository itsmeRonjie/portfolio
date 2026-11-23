<template>
  <!-- Watch face -->
  <div v-if="variant === 'watch'" class="flex h-full flex-col bg-[#020403] p-[8%] text-center">
    <p class="font-mono text-[9px] uppercase tracking-[0.2em] text-[#9fbd86]">DinkBoard</p>
    <div class="mt-[6%] grid flex-1 grid-cols-2 gap-[6%]">
      <div
        v-for="side in sides"
        :key="side"
        class="flex flex-col items-center justify-center rounded-xl border"
        :class="look[side].tile"
      >
        <span class="font-mono text-[8px] tracking-[0.16em]" :class="look[side].soft">{{ look[side].label }}</span>
        <span class="text-3xl font-semibold leading-none" :class="look[side].digit">{{ score[side] }}</span>
      </div>
    </div>
    <p class="mt-[6%] text-[11px] font-semibold text-[#f4ffec]">{{ statusLine }}</p>
  </div>

  <!-- Phone screen -->
  <div
    v-else
    class="flex h-full flex-col bg-[linear-gradient(180deg,#0d190d_0%,#060d08_100%)] bg-[length:100%_100%] px-[6%] pb-[6%] pt-[16%] text-[#f4ffec]"
  >
    <div class="flex items-start justify-between gap-2">
      <div>
        <p class="font-mono text-[8px] uppercase tracking-[0.2em]" :class="variant === 'follower' ? 'text-[#ff7a2e]' : 'text-[#9fbd86]'">
          {{ variant === 'follower' ? 'Nearby · Read-only' : 'Live score' }}
        </p>
        <p class="mt-1 text-sm font-semibold">{{ variant === 'follower' ? 'Following #321' : 'Host view' }}</p>
      </div>
      <span class="rounded-lg border border-[#314a24] bg-[#101c0d] px-2 py-0.5 text-[10px] font-semibold text-[#d9efc6]">
        Rally {{ score.rally }}
      </span>
    </div>

    <div class="mt-[6%] flex flex-1 flex-col gap-[4%]">
      <div
        v-for="side in sides"
        :key="side"
        class="flex flex-1 flex-col justify-between rounded-2xl border p-[6%]"
        :class="look[side].tile"
      >
        <div>
          <p class="font-mono text-[8px] tracking-[0.18em] text-[#9fbd86]">{{ look[side].label }}</p>
          <p class="text-[11px] font-semibold">{{ teams[side] }}</p>
        </div>
        <p class="text-center text-5xl font-semibold leading-none" :class="look[side].digit">{{ score[side] }}</p>
        <p class="text-center text-[10px] font-semibold" :class="look[side].soft">{{ caption(side) }}</p>
      </div>
    </div>

    <div class="mt-[5%] grid grid-cols-3 gap-1.5">
      <div v-for="cell in cells" :key="cell[0]" class="rounded-lg border border-[#2d4622] bg-[#0f180d] px-1.5 py-1">
        <p class="text-[8px] text-[#a9bf99]">{{ cell[0] }}</p>
        <p class="truncate text-[10px] font-semibold">{{ cell[1] }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { SCORE_TEAMS } from '~/lib/scoreStore'
import type { ScoreSide, ScoreSnapshot } from '~/lib/scoreStore'

/** HTML twin of the 3D scoreboard: the static fallback and the no-WebGL experience. */
const props = withDefaults(defineProps<{ score: ScoreSnapshot; variant?: 'host' | 'follower' | 'watch' }>(), {
  variant: 'host'
})

const sides: ScoreSide[] = ['home', 'away']
const teams = SCORE_TEAMS

const look = {
  home: {
    label: 'HOME',
    tile: 'border-[#8bca1e]/40 bg-[#17240f]',
    digit: 'text-[#8bca1e]',
    soft: 'text-[#cce8b2]'
  },
  away: {
    label: 'AWAY',
    tile: 'border-[#3053c8]/50 bg-[#0e1430]',
    digit: 'text-[#6f8aff]',
    soft: 'text-[#c2ccff]'
  }
} as const

const caption = (side: ScoreSide) => {
  if (props.score.winner === side) {
    return 'Game'
  }
  return props.score.serving === side ? `Serving · ${props.score.server}` : 'Receiver'
}

const statusLine = computed(() =>
  props.score.winner ? `Game · ${SCORE_TEAMS[props.score.winner]}` : `Rally ${props.score.rally}`
)

const cells = computed(() =>
  props.variant === 'follower'
    ? [
        ['Server', String(props.score.server)],
        ['Mode', 'Read-only'],
        ['Host', '#321']
      ]
    : [
        ['Server', String(props.score.server)],
        ['Undo', props.score.canUndo ? 'Available' : 'None'],
        ['Nearby', '#321']
      ]
)
</script>
