<template>
  <section id="experience" class="mx-auto max-w-6xl px-5 py-16 sm:px-6 lg:py-20">
    <div class="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-14">
      <div v-reveal class="lg:sticky lg:top-28 lg:self-start">
        <p class="ui-eyebrow">Experience</p>
        <h2 class="ui-section-title mt-3">Professional Mobile Roles</h2>
        <ul class="mt-5 space-y-3">
          <li v-for="item in profile.highlights" :key="item" class="flex gap-3 text-sm leading-relaxed text-slate-300 sm:text-base">
            <span class="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden="true" />
            <span>{{ item }}</span>
          </li>
        </ul>
        <div class="mt-6 flex flex-wrap gap-2">
          <span v-for="strength in profile.strengths" :key="strength" class="ui-chip">{{ strength }}</span>
        </div>
        <NuxtLink class="ui-link mt-6 inline-flex" to="/about">More about me →</NuxtLink>
      </div>

      <!-- Timeline: roles first, then education. -->
      <ol class="relative space-y-6 border-l border-border/60 pl-6 sm:pl-8">
        <li v-for="role in profile.experience" :key="role.role" v-reveal class="relative">
          <span class="timeline-dot border-accent" aria-hidden="true">
            <span class="absolute inset-0 animate-pulse-dot rounded-full bg-accent/60" />
          </span>
          <article v-tilt="{ max: 2.5 }" class="ui-panel ui-edge">
            <div class="flex flex-wrap items-start justify-between gap-3">
              <div>
                <h3 class="text-xl font-semibold text-white">{{ role.role }}</h3>
                <p class="mt-1 text-sm text-accent-2">{{ role.company }}</p>
              </div>
              <span class="ui-chip font-mono !text-[10px] text-slate-300">{{ role.period }}</span>
            </div>
            <ul class="mt-5 space-y-2.5 text-sm leading-relaxed text-slate-300">
              <li v-for="bullet in role.bullets" :key="bullet" class="flex gap-3">
                <span class="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden="true" />
                <span>{{ bullet }}</span>
              </li>
            </ul>
          </article>
        </li>

        <li v-reveal="{ delay: 80 }" class="relative">
          <span class="timeline-dot border-accent-2" aria-hidden="true" />
          <p class="ui-eyebrow">Education</p>
          <div class="mt-3 grid gap-3 sm:grid-cols-2">
            <article v-for="program in profile.education" :key="program.program" class="ui-panel !rounded-2xl !p-4">
              <h3 class="text-sm font-semibold text-white">{{ program.program }}</h3>
              <p class="mt-1 text-xs text-slate-400">{{ program.school }}</p>
            </article>
          </div>
        </li>
      </ol>
    </div>
  </section>
</template>

<script setup lang="ts">
/** Work history and education from data/profile.ts, as a compact timeline for the home page. */
const profile = useProfile()
</script>

<style scoped>
/* Sits on the timeline rule: the list is padded 1.5rem (2rem from sm), the rule is its left border. */
.timeline-dot {
  position: absolute;
  top: 0.4rem;
  left: calc(-1.5rem - 7px);
  width: 13px;
  height: 13px;
  border-width: 2px;
  border-style: solid;
  border-radius: 999px;
  background: var(--bg);
}

@media (min-width: 640px) {
  .timeline-dot {
    left: calc(-2rem - 7px);
  }
}
</style>
