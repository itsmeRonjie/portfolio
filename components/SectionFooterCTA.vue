<template>
  <section class="mx-auto max-w-6xl px-6 pb-16 pt-20" id="contact">
    <div class="rounded-3xl border border-border/70 bg-gradient-to-br from-[#1b102b] via-[#12081f] to-[#1f0f33] px-6 py-12 text-center shadow-[0_20px_60px_rgba(8,4,14,0.55)]">
      <p class="text-sm uppercase tracking-[0.3em] text-slate-400">Let us collaborate</p>
      <h2 class="mt-4 text-3xl font-semibold text-white sm:text-4xl">Ready to build something extraordinary?</h2>
      <p class="mt-3 text-sm text-slate-300">
        Reach out for mobile projects, product collaboration, or consulting.
      </p>
      <div class="mt-6 flex flex-wrap items-center justify-center gap-3">
        <a
          class="rounded-full bg-accent px-5 py-2 text-sm font-semibold text-white shadow-glow transition hover:shadow-[0_0_50px_rgba(124,58,237,0.5)]"
          :href="`mailto:${profile.email}`"
        >
          {{ profile.email }}
        </a>
        <a
          class="rounded-full border border-border/70 px-5 py-2 text-sm font-semibold text-slate-100 transition hover:border-accent/80"
          :href="profile.links.github"
          target="_blank"
          rel="noreferrer"
        >
          GitHub
        </a>
        <a
          class="rounded-full border border-border/70 px-5 py-2 text-sm font-semibold text-slate-100 transition hover:border-accent/80"
          :href="profile.links.linkedin"
          target="_blank"
          rel="noreferrer"
        >
          LinkedIn
        </a>
      </div>
      <div class="mt-8 flex items-center justify-center gap-4 text-xs text-slate-400">
        <span>{{ profile.location }}</span>
        <span class="h-1 w-1 rounded-full bg-slate-500" aria-hidden="true" />
        <span>{{ profile.phone }}</span>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const profile = useProfile()
</script>
