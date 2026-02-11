<template>
  <section class="mx-auto max-w-6xl px-6 py-14" id="work">
    <div class="flex flex-wrap items-end justify-between gap-4">
      <div>
        <p class="ui-eyebrow">Case Studies</p>
        <h2 class="mt-2 text-2xl font-semibold text-white">Recent Mobile Deliveries</h2>
        <p class="mt-2 text-sm text-slate-300">Android, iOS, and multiplatform work shipped with clean architecture.</p>
      </div>
      <NuxtLink class="ui-link" to="/projects">
        Open project archive
      </NuxtLink>
    </div>
    <div class="mt-8 grid gap-6">
      <ProjectCard v-for="project in projects" :key="project.title" :project="project" />
    </div>
  </section>
</template>

<script setup lang="ts">
import ProjectCard from '~/components/ProjectCard.vue'

const projects = useProjects()
</script>
