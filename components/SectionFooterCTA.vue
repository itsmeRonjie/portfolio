<template>
  <section id="contact" class="mx-auto max-w-6xl px-5 pb-10 pt-16 sm:px-6 lg:pt-24">
    <div
      v-reveal
      class="ui-panel-strong ui-edge relative overflow-hidden px-6 py-14 text-center sm:py-16 lg:min-h-[480px] lg:py-20"
    >
      <div
        class="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(61,220,132,0.14),transparent_55%),radial-gradient(circle_at_50%_120%,rgba(90,200,250,0.12),transparent_60%)]"
        aria-hidden="true"
      />

      <!-- On wide screens both phones finish their journey here, flanking the call to action. -->
      <StageSlot id="contact.left" class="!absolute left-[3%] top-1/2 hidden h-[78%] w-[18%] -translate-y-1/2 lg:block" />
      <StageSlot id="contact.right" class="!absolute right-[3%] top-1/2 hidden h-[78%] w-[18%] -translate-y-1/2 lg:block" />

      <div class="relative mx-auto max-w-xl">
        <p class="ui-eyebrow">Ship Mobile Features</p>
        <h2 class="mt-4 text-section font-semibold text-white">Need a mobile developer who ships reliably?</h2>
        <p class="mt-4 text-sm text-slate-300 sm:text-base">Open to Android, iOS, and Kotlin Multiplatform product work.</p>
        <div class="mt-8 flex flex-wrap items-center justify-center gap-3">
          <a class="ui-cta-primary" :href="`mailto:${profile.email}`">Email Me</a>
          <a class="ui-cta-secondary" :href="profile.links.github" target="_blank" rel="noreferrer">GitHub</a>
          <a class="ui-cta-secondary" :href="profile.links.linkedin" target="_blank" rel="noreferrer">LinkedIn</a>
        </div>
        <div class="mt-8 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-xs text-slate-400">
          <span>{{ profile.location }}</span>
          <span class="h-1 w-1 rounded-full bg-slate-500" aria-hidden="true" />
          <span>{{ profile.phone }}</span>
        </div>
      </div>
    </div>

    <footer class="mt-10 flex flex-col items-center gap-2 text-center text-xs text-slate-500">
      <p class="max-w-xl">
        Ronjie Man-on is a software engineer and mobile application developer focused on Android and iOS.
        Some platforms may list this name as Ronjie Manon, but this portfolio is maintained by Ronjie Man-on.
      </p>
      <p>© {{ year }} {{ profile.name }} · Built with Nuxt and three.js</p>
    </footer>
  </section>
</template>

<script setup lang="ts">
const profile = useProfile()
const year = new Date().getFullYear()
</script>
