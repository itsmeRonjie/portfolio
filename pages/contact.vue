<template>
  <div>
    <SiteNav />
    <main class="mx-auto max-w-6xl px-6 pb-16 pt-12">
      <header class="space-y-4">
        <p class="text-xs uppercase tracking-[0.3em] text-slate-400">Contact</p>
        <h1 class="text-3xl font-semibold text-white sm:text-4xl">Let us build together</h1>
        <p class="max-w-2xl text-sm text-slate-300">
          {{ profile.summary }}
        </p>
      </header>

      <div class="mt-10 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <section class="rounded-3xl border border-border/70 bg-surface p-6">
          <h2 class="text-lg font-semibold text-white">Contact details</h2>
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
              class="rounded-full border border-border/60 px-4 py-2 text-slate-200 transition hover:border-accent/80"
              :href="profile.links.github"
              target="_blank"
              rel="noreferrer"
            >
              GitHub
            </a>
            <a
              class="rounded-full border border-border/60 px-4 py-2 text-slate-200 transition hover:border-accent/80"
              :href="profile.links.linkedin"
              target="_blank"
              rel="noreferrer"
            >
              LinkedIn
            </a>
            <a
              class="rounded-full border border-border/60 px-4 py-2 text-slate-200 transition hover:border-accent/80"
              :href="profile.links.portfolio"
              target="_blank"
              rel="noreferrer"
            >
              Portfolio
            </a>
          </div>
          <p class="mt-4 text-xs text-slate-400">
            Links and code samples are available via LinkedIn, GitHub, and portfolio.
          </p>
        </section>

        <section class="rounded-3xl border border-border/70 bg-surface p-6">
          <h2 class="text-lg font-semibold text-white">Highlights</h2>
          <ul class="mt-4 space-y-2 text-sm text-slate-300">
            <li v-for="item in profile.highlights" :key="item" class="flex gap-2">
              <span class="mt-1 h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
              <span>{{ item }}</span>
            </li>
          </ul>
          <div class="mt-6">
            <h3 class="text-sm font-semibold text-slate-100">Strengths</h3>
            <div class="mt-2 flex flex-wrap gap-2">
              <span
                v-for="strength in profile.strengths"
                :key="strength"
                class="rounded-full border border-border/60 bg-black/30 px-3 py-1 text-xs text-slate-200"
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
                class="rounded-full border border-border/60 bg-black/30 px-3 py-1 text-xs text-slate-200"
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
                class="rounded-full border border-border/60 bg-black/30 px-3 py-1 text-xs text-slate-200"
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
                class="rounded-full border border-border/60 bg-black/30 px-3 py-1 text-xs text-slate-200"
              >
                {{ interest }}
              </span>
            </div>
          </div>
        </section>
      </div>

      <section class="mt-12">
        <h2 class="text-2xl font-semibold text-white">Experience</h2>
        <div class="mt-6 space-y-6">
          <div
            v-for="role in profile.experience"
            :key="role.role"
            class="rounded-3xl border border-border/70 bg-surface p-6"
          >
            <div class="flex flex-wrap items-center justify-between gap-2">
              <div>
                <h3 class="text-lg font-semibold text-white">{{ role.role }}</h3>
                <p class="text-sm text-slate-300">{{ role.company }}</p>
              </div>
              <span class="text-xs uppercase tracking-[0.2em] text-slate-400">{{ role.period }}</span>
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
        <h2 class="text-2xl font-semibold text-white">Education</h2>
        <div class="mt-6 grid gap-4 md:grid-cols-2">
          <div
            v-for="program in profile.education"
            :key="program.program"
            class="rounded-3xl border border-border/70 bg-surface p-6"
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
