<template>
  <section id="toolbox" class="mx-auto max-w-6xl px-5 py-16 sm:px-6 lg:py-20">
    <!-- Old in-page links pointed at #technologies; keep them landing here. -->
    <span id="technologies" class="block scroll-mt-[var(--anchor-offset)]" aria-hidden="true" />

    <div v-reveal class="flex flex-wrap items-end justify-between gap-4">
      <div>
        <p class="ui-eyebrow">Workflow Stack</p>
        <h2 class="ui-section-title mt-3">Mobile Delivery Toolbox</h2>
        <p class="mt-3 max-w-xl text-sm text-slate-300 sm:text-base">
          Two native platforms, one engineering approach from architecture to release.
        </p>
      </div>
    </div>

    <div class="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <article
        v-for="(tool, index) in platforms"
        :key="tool.name"
        v-reveal="{ delay: index * 80 }"
        v-tilt="{ max: 5 }"
        class="ui-panel ui-edge relative overflow-hidden !rounded-3xl lg:col-span-2"
        :style="tool.platform === 'ios' ? iosEdge : androidEdge"
      >
        <div
          class="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full blur-3xl"
          :class="tool.platform === 'ios' ? 'bg-accent-2/15' : 'bg-accent/15'"
          aria-hidden="true"
        />
        <div class="relative flex items-center gap-3">
          <div
            v-for="logo in tool.logos"
            :key="logo"
            class="grid h-14 w-14 place-items-center rounded-2xl border border-white/10 bg-white/[0.04] shadow-glass"
          >
            <img class="h-9 w-9 object-contain" :src="logo" alt="" loading="lazy" decoding="async" />
          </div>
          <span
            class="ui-chip ml-auto font-mono !text-[10px] uppercase tracking-[0.16em]"
            :class="tool.platform === 'ios' ? 'border-accent-2/40 bg-accent-2/10 text-accent-2' : 'border-accent/40 bg-accent/10 text-accent'"
          >
            {{ tool.platform === 'ios' ? 'iOS' : 'Android' }}
          </span>
        </div>
        <h3 class="relative mt-6 text-xl font-semibold text-white">{{ tool.name }}</h3>
        <p class="relative mt-2 text-sm leading-relaxed text-slate-300">{{ tool.description }}</p>
      </article>

      <article
        v-for="(tool, index) in practices"
        :key="tool.name"
        v-reveal="{ delay: 120 + index * 60 }"
        v-tilt="{ max: 6 }"
        class="ui-panel !rounded-3xl !p-5 transition-colors hover:border-accent/45"
      >
        <div class="grid h-11 w-11 place-items-center rounded-xl border border-border/60 bg-surface-strong text-accent-2">
          <ToolIcon :icon="tool.icon" />
        </div>
        <div class="mt-4 flex flex-wrap items-center gap-2">
          <h3 class="text-sm font-semibold text-white">{{ tool.name }}</h3>
          <span
            v-if="tool.isPlaceholder"
            class="ui-chip border-terminal/35 bg-terminal/10 !px-2 !py-0.5 !text-[10px] !tracking-[0.16em] text-terminal"
          >
            Placeholder
          </span>
        </div>
        <p class="mt-1.5 text-xs leading-relaxed text-slate-400">{{ tool.description }}</p>
      </article>
    </div>

    <!-- Core technologies, as a slow marquee (a static wrapped row under reduced motion). -->
    <div v-reveal class="ui-marquee mt-8 overflow-hidden" aria-label="Core technologies">
      <ul class="flex w-max animate-marquee gap-3 motion-reduce:w-full motion-reduce:flex-wrap motion-reduce:animate-none">
        <li
          v-for="(tech, index) in marquee"
          :key="`${tech.label}-${index}`"
          class="ui-chip shrink-0 rounded-xl px-4 py-2 text-sm"
          :aria-hidden="index >= technologies.length ? 'true' : undefined"
          :class="index >= technologies.length ? 'motion-reduce:hidden' : ''"
        >
          {{ tech.label }}
        </li>
      </ul>
    </div>
  </section>
</template>

<script setup lang="ts">
import ToolIcon from '~/components/ToolIcon.vue'

const tools = useToolbox()
const technologies = useSkills()

const platforms = tools.filter((tool) => tool.platform)
const practices = tools.filter((tool) => !tool.platform)
// Two copies so the strip can loop seamlessly at -50%.
const marquee = [...technologies, ...technologies]

const androidEdge = { '--edge-from': 'rgba(61, 220, 132, 0.55)', '--edge-to': 'rgba(61, 220, 132, 0.08)' }
const iosEdge = { '--edge-from': 'rgba(90, 200, 250, 0.55)', '--edge-to': 'rgba(90, 200, 250, 0.08)' }
</script>
