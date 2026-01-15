<template>
  <section class="mx-auto grid max-w-6xl gap-12 px-6 pb-16 pt-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
    <div class="space-y-6">
      <h1 class="text-4xl font-semibold leading-tight text-white sm:text-5xl lg:text-6xl">
        I build delightful mobile experiences.
      </h1>
      <p class="max-w-xl text-base leading-relaxed text-slate-300 sm:text-lg">
        {{ profile.summary }}
      </p>
      <div class="flex flex-wrap items-center gap-4">
        <a
          class="rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white shadow-glow transition hover:shadow-[0_0_50px_rgba(124,58,237,0.5)]"
          href="/resume.pdf"
          download
        >
          Download Resume
        </a>
        <a
          class="rounded-full border border-border/70 px-6 py-3 text-sm font-semibold text-slate-100 transition hover:border-accent/80 hover:text-white"
          :href="profile.links.github"
          target="_blank"
          rel="noreferrer"
        >
          View GitHub
        </a>
      </div>
    </div>
    <div class="relative">
      <div class="absolute -left-6 -top-6 h-28 w-28 rounded-full bg-accent/20 blur-3xl animate-pulse-soft" aria-hidden="true" />
      <div class="absolute -bottom-8 right-6 h-32 w-32 rounded-full bg-accent-2/20 blur-3xl animate-pulse-soft" aria-hidden="true" />
      <div class="relative overflow-hidden rounded-3xl border border-border/70 bg-gradient-to-br from-[#201132] via-[#1c0f2e] to-[#2c1443] p-6 shadow-glow">
        <div class="absolute right-0 top-0 h-40 w-40 rounded-full bg-gradient-to-br from-purple-500/40 via-fuchsia-500/20 to-transparent blur-2xl" aria-hidden="true" />
        <div class="absolute bottom-0 left-0 h-32 w-32 rounded-full bg-gradient-to-tr from-indigo-500/30 via-purple-500/10 to-transparent blur-2xl" aria-hidden="true" />
        <div class="relative flex flex-col gap-6">
          <div class="h-44 rounded-2xl border border-border/70 bg-gradient-to-br from-[#2b1642] via-[#1b0e2c] to-[#321b4b]" />
          <div class="space-y-3">
            <div>
              <div class="text-base font-semibold text-white sm:text-lg">{{ profile.name }}</div>
              <div class="mt-1 text-sm text-slate-300">{{ profile.title }}</div>
              <div class="mt-1 text-xs text-slate-400">{{ profile.focus }}</div>
            </div>
            <div class="flex flex-wrap gap-3">
              <div class="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/5">
                <img src="/icons/kotlin.svg" alt="Kotlin" class="h-full w-full object-contain" />
              </div>
              <div class="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/5">
                <img src="/icons/jetpackcompose.svg" alt="Jetpack Compose" class="h-full w-full object-contain" />
              </div>
              <div class="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/5">
                <img src="/icons/swift.svg" alt="Swift" class="h-full w-full object-contain" />
              </div>
              <div class="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/5">
                <img src="/icons/swiftui.svg" alt="SwiftUI" class="h-full w-full object-contain" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const profile = useProfile()
</script>
