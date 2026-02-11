<template>
  <div>
    <SiteNav />
    <main class="mx-auto max-w-6xl px-6 pb-16 pt-12">
      <header class="space-y-4">
        <p class="ui-eyebrow">Contact</p>
        <h1 class="text-3xl font-semibold text-white sm:text-4xl">Build Mobile Products With Me</h1>
        <p class="max-w-2xl text-sm text-slate-300">
          {{ profile.summary }}
        </p>
      </header>

      <div class="mt-10 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <section class="ui-panel">
          <h2 class="text-lg font-semibold text-white">Studio Contact Details</h2>
          <div class="mt-4 space-y-3 text-sm text-slate-300">
            <div class="flex items-center justify-between border-b border-border/60 pb-3">
              <span>Email</span>
              <a class="text-slate-100" :href="`mailto:${profile.email}`">{{ profile.email }}</a>
            </div>
            <div class="flex items-center justify-between border-b border-border/60 pb-3">
              <span>Phone</span>
              <span class="text-slate-100">{{ profile.phone }}</span>
            </div>
            <div class="flex items-center justify-between">
              <span>Location</span>
              <span class="text-slate-100">{{ profile.location }}</span>
            </div>
          </div>
          <div class="mt-6 flex flex-wrap gap-3 text-sm">
            <a
              class="ui-cta-secondary !px-4 !py-2"
              :href="profile.links.github"
              target="_blank"
              rel="noreferrer"
            >
              GitHub
            </a>
            <a
              class="ui-cta-secondary !px-4 !py-2"
              :href="profile.links.linkedin"
              target="_blank"
              rel="noreferrer"
            >
              LinkedIn
            </a>
            <a
              class="ui-cta-secondary !px-4 !py-2"
              :href="profile.links.portfolio"
              target="_blank"
              rel="noreferrer"
            >
              Portfolio
            </a>
          </div>
          <p class="mt-4 text-xs text-slate-400">
            Open-source references and shipped app examples are available in these links.
          </p>
        </section>

        <section class="ui-panel">
          <h2 class="text-lg font-semibold text-white">Delivery Highlights</h2>
          <ul class="mt-4 space-y-2 text-sm text-slate-300">
            <li v-for="item in profile.highlights" :key="item" class="flex gap-2">
              <span class="mt-1 h-1.5 w-1.5 rounded-full bg-accent-2" aria-hidden="true" />
              <span>{{ item }}</span>
            </li>
          </ul>
          <div class="mt-6">
            <h3 class="text-sm font-semibold text-slate-100">Strengths</h3>
            <div class="mt-2 flex flex-wrap gap-2">
              <span
                v-for="strength in profile.strengths"
                :key="strength"
                class="ui-chip"
              >
                {{ strength }}
              </span>
            </div>
          </div>
          <div class="mt-6">
            <h3 class="text-sm font-semibold text-slate-100">Skills</h3>
            <div class="mt-2 flex flex-wrap gap-2">
              <span
                v-for="skill in profile.skills"
                :key="skill"
                class="ui-chip"
              >
                {{ skill }}
              </span>
            </div>
          </div>
          <div class="mt-6">
            <h3 class="text-sm font-semibold text-slate-100">Languages</h3>
            <div class="mt-2 flex flex-wrap gap-2">
              <span
                v-for="language in profile.languages"
                :key="language"
                class="ui-chip"
              >
                {{ language }}
              </span>
            </div>
          </div>
          <div class="mt-6">
            <h3 class="text-sm font-semibold text-slate-100">Interests</h3>
            <div class="mt-2 flex flex-wrap gap-2">
              <span
                v-for="interest in profile.interests"
                :key="interest"
                class="ui-chip"
              >
                {{ interest }}
              </span>
            </div>
          </div>
        </section>
      </div>

      <section class="mt-12">
        <p class="ui-eyebrow">Experience</p>
        <h2 class="mt-2 text-2xl font-semibold text-white">Professional Mobile Roles</h2>
        <div class="mt-6 space-y-6">
          <div
            v-for="role in profile.experience"
            :key="role.role"
            class="ui-panel"
          >
            <div class="flex flex-wrap items-center justify-between gap-2">
              <div>
                <h3 class="text-lg font-semibold text-white">{{ role.role }}</h3>
                <p class="text-sm text-slate-300">{{ role.company }}</p>
              </div>
              <span class="ui-chip !text-[10px] font-mono text-slate-300">{{ role.period }}</span>
            </div>
            <ul class="mt-4 space-y-2 text-sm text-slate-300">
              <li v-for="bullet in role.bullets" :key="bullet" class="flex gap-2">
                <span class="mt-1 h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
                <span>{{ bullet }}</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section class="mt-12">
        <p class="ui-eyebrow">Education</p>
        <h2 class="mt-2 text-2xl font-semibold text-white">Training Foundation</h2>
        <div class="mt-6 grid gap-4 md:grid-cols-2">
          <div
            v-for="program in profile.education"
            :key="program.program"
            class="ui-panel"
          >
            <h3 class="text-lg font-semibold text-white">{{ program.program }}</h3>
            <p class="text-sm text-slate-300">{{ program.school }}</p>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup lang="ts">
import SiteNav from '~/components/SiteNav.vue'

const profile = useProfile()

useSeoMeta({
  title: 'Contact',
  description: profile.summary
})
</script>
