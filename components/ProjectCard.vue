<template>
  <article class="ui-panel overflow-hidden transition hover:border-accent/45">
    <div class="grid gap-6 md:grid-cols-[360px_1fr]">
      <div
        class="relative flex items-center justify-center overflow-hidden rounded-2xl border border-border/70 bg-gradient-to-br p-4"
        :class="project.accent || resolveProjectAccent(project.tags)"
      >
        <div class="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.15),transparent_58%)]" />
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
          <img
            class="h-full w-full object-contain"
            :src="project.previewImage"
            :alt="project.previewAlt ?? project.title"
            loading="lazy"
            decoding="async"
          />
        </div>
        <div
          v-else
          class="relative aspect-[2/1] w-full rounded-2xl border border-white/10 bg-black/30 shadow-inner"
        />
      </div>
      <div class="space-y-4">
        <p class="ui-eyebrow">Project Capsule</p>
        <div class="flex flex-wrap items-center gap-3">
          <h3 class="text-xl font-semibold text-white">{{ project.title }}</h3>
          <span
            v-if="project.isPlaceholder"
            class="ui-chip border-terminal/35 bg-terminal/10 !px-2 !py-1 !text-[10px] !tracking-[0.16em] text-terminal"
          >
            Placeholder
          </span>
        </div>
        <p class="text-sm text-slate-300">{{ project.description }}</p>
        <ul class="space-y-2 text-sm text-slate-300">
          <li v-for="bullet in project.bullets" :key="bullet" class="flex gap-2">
            <span class="mt-1 h-1.5 w-1.5 rounded-full bg-accent-2" aria-hidden="true" />
            <span>{{ bullet }}</span>
          </li>
        </ul>
        <div class="flex flex-wrap gap-2">
          <span
            v-for="tag in project.tags"
            :key="tag"
            class="ui-chip font-mono !px-2.5 !py-1 !text-[11px]"
            :class="resolveTagAccent(tag)"
          >
            {{ tag }}
          </span>
        </div>
        <a
          v-if="project.link"
          class="ui-link inline-flex items-center gap-2"
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

const resolveTagAccent = (tag: string) => {
  const normalizedTag = tag.toLowerCase()
  if (normalizedTag.includes('android') || normalizedTag.includes('kotlin') || normalizedTag.includes('compose')) {
    return 'border-accent/45 bg-accent/10 text-accent'
  }
  if (normalizedTag.includes('ios') || normalizedTag.includes('swift')) {
    return 'border-accent-2/45 bg-accent-2/10 text-accent-2'
  }
  return 'border-border/60 bg-surface-strong text-slate-200'
}

const resolveProjectAccent = (tags: string[]) => {
  const normalizedTags = tags.map((tag) => tag.toLowerCase())
  const hasAndroid = normalizedTags.some(
    (tag) => tag.includes('android') || tag.includes('kotlin') || tag.includes('compose')
  )
  const hasIos = normalizedTags.some((tag) => tag.includes('ios') || tag.includes('swift'))

  if (hasAndroid && !hasIos) {
    return 'from-accent/30 via-accent/10 to-transparent'
  }
  if (hasIos && !hasAndroid) {
    return 'from-accent-2/30 via-accent-2/10 to-transparent'
  }
  return 'from-accent/20 via-accent-2/12 to-transparent'
}
</script>
