<template>
  <article v-tilt="{ max: 4 }" class="ui-panel flex h-full flex-col !rounded-3xl !p-4 transition-colors hover:border-accent/45">
    <div
      class="relative overflow-hidden rounded-2xl border border-border/70 bg-gradient-to-br p-3"
      :class="project.accent || resolveProjectAccent(project.tags)"
    >
      <div class="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.15),transparent_58%)]" aria-hidden="true" />
      <ClientOnly v-if="project.githubOrg">
        <ProjectPreviewCarousel :org="project.githubOrg" />
        <template #fallback>
          <div class="relative aspect-[2/1] w-full rounded-2xl border border-white/10 bg-black/30 shadow-inner" />
        </template>
      </ClientOnly>
      <div
        v-else-if="project.previewImage"
        class="relative flex aspect-[2/1] w-full items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-black/30 p-4 shadow-inner"
      >
        <img class="h-full w-full object-contain" :src="project.previewImage" :alt="project.previewAlt ?? project.title" loading="lazy" decoding="async" />
      </div>
      <div v-else class="relative aspect-[2/1] w-full rounded-2xl border border-white/10 bg-black/30 shadow-inner" />
    </div>

    <div class="flex flex-1 flex-col gap-3 px-1 pb-1 pt-4">
      <div class="flex flex-wrap items-center gap-2">
        <h3 class="text-lg font-semibold text-white">{{ project.title }}</h3>
        <span
          v-if="project.isPlaceholder"
          class="ui-chip border-terminal/35 bg-terminal/10 !px-2 !py-1 !text-[10px] !tracking-[0.16em] text-terminal"
        >
          Placeholder
        </span>
      </div>
      <p class="text-sm leading-relaxed text-slate-300">{{ project.description }}</p>
      <div class="flex flex-wrap gap-1.5">
        <span v-for="tag in project.tags" :key="tag" class="ui-chip font-mono !px-2 !py-0.5 !text-[10px]" :class="resolveTagAccent(tag)">
          {{ tag }}
        </span>
      </div>
      <a
        v-if="project.link"
        class="ui-link mt-auto inline-flex items-center gap-2 pt-1"
        :href="project.link"
        target="_blank"
        rel="noreferrer"
      >
        {{ project.linkLabel ?? 'View repository' }}
        <span aria-hidden="true">→</span>
      </a>
    </div>
  </article>
</template>

<script setup lang="ts">
import type { Project } from '~/data/projects'
import ProjectPreviewCarousel from '~/components/ProjectPreviewCarousel.vue'
import { resolveProjectAccent, resolveTagAccent } from '~/utils/projectAccent'

defineProps<{ project: Project }>()
</script>
