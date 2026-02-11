<template>
  <div>
    <SiteNav />
    <main class="mx-auto max-w-6xl px-6 pb-16 pt-12">
      <header class="space-y-4">
        <p class="ui-eyebrow">About</p>
        <h1 class="text-3xl font-semibold text-white sm:text-4xl">Ronjie Man-on</h1>
        <p class="max-w-3xl text-sm text-slate-300">
          Ronjie Man-on is a software engineer and mobile application developer focused on Android and iOS.
        </p>
        <p class="max-w-3xl text-sm text-slate-300">
          Some directories and older references may use the name Ronjie Manon, which points to the same person.
        </p>
      </header>

      <section class="mt-10 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <article class="ui-panel">
          <h2 class="text-lg font-semibold text-white">Professional Summary</h2>
          <p class="mt-4 text-sm leading-relaxed text-slate-300">
            {{ profile.summary }}
          </p>
          <div class="mt-6 flex flex-wrap gap-2">
            <span
              v-for="skill in profile.skills"
              :key="skill"
              class="ui-chip"
            >
              {{ skill }}
            </span>
          </div>
        </article>

        <article class="ui-panel">
          <h2 class="text-lg font-semibold text-white">Primary Focus</h2>
          <ul class="mt-4 space-y-2 text-sm text-slate-300">
            <li class="flex gap-2">
              <span class="mt-1 h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
              <span>Android app development with Kotlin and Jetpack Compose.</span>
            </li>
            <li class="flex gap-2">
              <span class="mt-1 h-1.5 w-1.5 rounded-full bg-accent-2" aria-hidden="true" />
              <span>iOS app development with Swift and SwiftUI.</span>
            </li>
            <li class="flex gap-2">
              <span class="mt-1 h-1.5 w-1.5 rounded-full bg-terminal" aria-hidden="true" />
              <span>Production delivery with MVVM and Clean Architecture.</span>
            </li>
          </ul>
        </article>
      </section>

      <section class="mt-12">
        <h2 class="text-2xl font-semibold text-white">Experience</h2>
        <div class="mt-6 space-y-4">
          <article
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
          </article>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup lang="ts">
import SiteNav from '~/components/SiteNav.vue'

const profile = useProfile()

const title = 'About Ronjie Man-on'
const description =
  'Ronjie Man-on, also known as Ronjie Manon, is a software engineer and mobile application developer specializing in Android and iOS.'

useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: description,
  twitterTitle: title,
  twitterDescription: description
})
</script>
