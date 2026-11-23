<template>
  <section id="work" class="mx-auto max-w-6xl px-5 py-16 sm:px-6 lg:py-24">
    <div v-reveal class="flex flex-wrap items-end justify-between gap-4">
      <div>
        <p class="ui-eyebrow">Case Studies</p>
        <h2 class="ui-section-title mt-3">Recent Mobile Deliveries</h2>
        <p class="mt-3 max-w-xl text-sm text-slate-300 sm:text-base">
          Android, iOS, and multiplatform work shipped with clean architecture.
        </p>
      </div>
      <NuxtLink class="ui-link" to="/projects">Open project archive →</NuxtLink>
    </div>

    <div class="mt-12 space-y-20 lg:mt-16 lg:space-y-28">
      <ProjectCaseStudy
        v-for="(project, index) in featured"
        :key="project.title"
        :project="project"
        :reversed="index % 2 === 1"
      />
    </div>

    <div v-if="others.length" class="mt-20 lg:mt-28">
      <div v-reveal class="flex items-center justify-between gap-4">
        <h3 class="text-xl font-semibold text-white">Dev Studio repositories</h3>
        <span class="ui-eyebrow">Open source</span>
      </div>
      <div class="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        <div v-for="(project, index) in others" :key="project.title" v-reveal="{ delay: index * 70 }">
          <ProjectCard :project="project" />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import ProjectCard from '~/components/ProjectCard.vue'
import ProjectCaseStudy from '~/components/ProjectCaseStudy.vue'

const projects = useProjects()
const featured = projects.filter((project) => project.featured)
const others = projects.filter((project) => !project.featured)
</script>
