<template>
  <section class="mx-auto max-w-6xl px-6 py-14" id="work">
    <div class="flex flex-wrap items-end justify-between gap-4">
      <div>
        <h2 class="text-2xl font-semibold text-white">Selected Work</h2>
        <p class="mt-2 text-sm text-slate-400">Recent mobile builds and case studies.</p>
      </div>
      <NuxtLink
        class="text-sm font-semibold text-accent-2 transition hover:text-white"
        to="/projects"
      >
        View all projects
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
