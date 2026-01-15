<template>
  <article class="overflow-hidden rounded-3xl border border-border/70 bg-surface p-6 shadow-[0_20px_60px_rgba(8,4,14,0.55)] transition hover:border-accent/60 hover:shadow-[0_30px_70px_rgba(8,4,14,0.65)]">
    <div class="grid gap-6 md:grid-cols-[360px_1fr]">
      <div
        class="relative flex items-center justify-center overflow-hidden rounded-2xl border border-border/70 bg-gradient-to-br p-4"
        :class="project.accent"
      >
        <div class="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.2),transparent_55%)]" />
        <ClientOnly v-if="project.githubOrg">
          <ProjectPreviewCarousel :org="project.githubOrg" />
          <template #fallback>
            <div class="relative w-full aspect-[2/1] rounded-2xl border border-white/10 bg-black/30 shadow-inner" />
          </template>
        </ClientOnly>
        <div
          v-else
          class="relative w-full aspect-[2/1] rounded-2xl border border-white/10 bg-black/30 shadow-inner"
        />
      </div>
      <div class="space-y-4">
        <div class="flex flex-wrap items-center gap-3">
          <h3 class="text-xl font-semibold text-white">{{ project.title }}</h3>
          <span
            v-if="project.isPlaceholder"
            class="rounded-full border border-border/70 bg-black/40 px-2 py-1 text-[10px] uppercase tracking-widest text-slate-400"
          >
            Placeholder
          </span>
        </div>
        <p class="text-sm text-slate-300">{{ project.description }}</p>
        <ul class="space-y-2 text-sm text-slate-300">
          <li v-for="bullet in project.bullets" :key="bullet" class="flex gap-2">
            <span class="mt-1 h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
            <span>{{ bullet }}</span>
          </li>
        </ul>
        <div class="flex flex-wrap gap-2">
          <span
            v-for="tag in project.tags"
            :key="tag"
            class="rounded-full border border-border/60 bg-surface-strong px-3 py-1 text-xs text-slate-200"
          >
            {{ tag }}
          </span>
        </div>
        <a
          v-if="project.link"
          class="inline-flex items-center gap-2 text-sm font-semibold text-accent-2 transition hover:text-white"
          :href="project.link"
          target="_blank"
          rel="noreferrer"
        >
          {{ project.linkLabel ?? 'View repository' }}
          <span aria-hidden="true">-&gt;</span>
        </a>
      </div>
    </div>
  </article>
</template>

<script setup lang="ts">
import type { Project } from '~/data/projects'
import ProjectPreviewCarousel from '~/components/ProjectPreviewCarousel.vue'

defineProps<{ project: Project }>()
</script>
