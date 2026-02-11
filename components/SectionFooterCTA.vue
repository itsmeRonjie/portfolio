<template>
  <section class="mx-auto max-w-6xl px-6 pb-16 pt-20" id="contact">
    <div
      class="ui-panel-strong relative overflow-hidden px-6 py-12 text-center before:pointer-events-none before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_top,rgba(61,220,132,0.12),transparent_55%)] before:content-['']"
    >
      <p class="ui-eyebrow">Ship Mobile Features</p>
      <h2 class="mt-4 text-3xl font-semibold text-white sm:text-4xl">Need a mobile developer who ships reliably?</h2>
      <p class="mt-3 text-sm text-slate-300">
        Open to Android, iOS, and Kotlin Multiplatform product work.
      </p>
      <div class="relative mt-6 flex flex-wrap items-center justify-center gap-3">
        <a
          class="ui-cta-primary"
          :href="`mailto:${profile.email}`"
        >
          Email Me
        </a>
        <a
          class="ui-cta-secondary"
          :href="profile.links.github"
          target="_blank"
          rel="noreferrer"
        >
          GitHub
        </a>
        <a
          class="ui-cta-secondary"
          :href="profile.links.linkedin"
          target="_blank"
          rel="noreferrer"
        >
          LinkedIn
        </a>
      </div>
      <div class="relative mt-8 flex items-center justify-center gap-4 text-xs text-slate-400">
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
