<template>
  <div class="relative mx-auto h-full" :style="{ aspectRatio: variant === 'ios' ? '1423 / 3000' : '1397 / 3000' }">
    <div class="relative h-full rounded-[13%/6.2%] p-[2px] shadow-[0_24px_60px_rgba(2,8,16,0.65)]" :class="frameClass">
      <div class="absolute -left-[3px] top-[18%] h-[6%] w-[3px] rounded-r-full bg-white/25" aria-hidden="true" />
      <div class="absolute -right-[3px] top-[24%] h-[11%] w-[3px] rounded-l-full bg-white/25" aria-hidden="true" />

      <div class="relative h-full rounded-[12.5%/5.9%] border border-white/10 bg-[#05080c] p-[3.2%]">
        <div class="relative h-full overflow-hidden rounded-[11%/5.1%] bg-[#070b11]">
          <slot />
          <div
            v-if="variant === 'ios'"
            class="absolute left-1/2 top-[1.6%] z-20 h-[3.4%] w-[30%] -translate-x-1/2 rounded-full bg-black"
            aria-hidden="true"
          />
          <div
            v-else
            class="absolute left-1/2 top-[1.8%] z-20 aspect-square w-[4.2%] -translate-x-1/2 rounded-full bg-black"
            aria-hidden="true"
          />
          <!-- Glass sheen -->
          <div
            class="pointer-events-none absolute inset-0 z-30 bg-[linear-gradient(125deg,rgba(255,255,255,0.12)_0%,transparent_32%,transparent_70%,rgba(255,255,255,0.05)_100%)]"
            aria-hidden="true"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
/**
 * Static CSS phone used as the server-rendered fallback inside a <StageSlot>, sized to
 * match the 3D model so the swap is seamless. Height-driven: give it a parent with a height.
 */
const props = withDefaults(defineProps<{ variant?: 'android' | 'ios'; tone?: 'graphite' | 'titanium' | 'teal' | 'court' }>(), {
  variant: 'android',
  tone: 'graphite'
})

const frameClass = computed(
  () =>
    ({
      graphite: 'bg-gradient-to-b from-slate-400/40 via-slate-600/30 to-slate-800/50',
      titanium: 'bg-gradient-to-b from-slate-200/50 via-slate-400/30 to-slate-600/45',
      teal: 'bg-gradient-to-b from-[#3f7a70]/80 via-[#1d3531]/75 to-[#162825]/80',
      court: 'bg-gradient-to-b from-[#a4ad98]/55 via-[#4b5a3d]/45 to-[#28331f]/60'
    })[props.tone]
)
</script>
