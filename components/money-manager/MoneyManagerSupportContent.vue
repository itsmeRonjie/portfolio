<template>
  <main class="min-h-screen bg-[radial-gradient(550px_at_12%_8%,rgba(44,219,190,0.22),transparent_56%),radial-gradient(640px_at_86%_2%,rgba(86,159,145,0.2),transparent_58%),linear-gradient(180deg,#03120f_0%,#041614_52%,#051a17_100%)] pb-16">
    <section class="mx-auto max-w-5xl px-6 pt-12">
      <header class="rounded-3xl border border-[#295f58]/75 bg-[#0a2923]/85 p-6 sm:p-8">
        <p class="font-mono text-[11px] uppercase tracking-[0.24em] text-[#76afa7]">MoneyManager Support</p>
        <h1 class="mt-2 text-3xl font-semibold text-[#e8fcf8] sm:text-4xl">Need help with MoneyManager?</h1>
        <p class="mt-3 max-w-3xl text-sm leading-relaxed text-[#a9cbc5]">
          Share your issue, expected behavior, and device details. We use this page as the support endpoint for the Google Play listing.
        </p>
        <div class="mt-5 flex flex-wrap gap-3">
          <a
            class="inline-flex items-center justify-center rounded-full border border-[#32d9c1]/45 bg-[#32d9c1] px-4 py-2 text-sm font-semibold text-[#06332d] transition hover:brightness-105"
            :href="`mailto:${content.supportEmail}`"
          >
            Email Support
          </a>
          <a
            class="inline-flex items-center justify-center rounded-full border border-[#2d7067]/70 bg-[#10362f] px-4 py-2 text-sm font-semibold text-[#c7ebe5] transition hover:border-[#59cabd]/70 hover:text-white"
            :href="content.playStoreUrl"
            target="_blank"
            rel="noreferrer"
          >
            View Play Store Listing
          </a>
          <NuxtLink
            class="inline-flex items-center justify-center rounded-full border border-[#2d7067]/70 bg-[#10362f] px-4 py-2 text-sm font-semibold text-[#c7ebe5] transition hover:border-[#59cabd]/70 hover:text-white"
            :to="privacyPath"
          >
            Privacy Policy
          </NuxtLink>
        </div>
      </header>

      <section class="mt-8 grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
        <article class="rounded-3xl border border-[#285b55]/70 bg-[#09231f]/85 p-6">
          <h2 class="text-xl font-semibold text-[#e7fcf8]">Support checklist</h2>
          <ul class="mt-4 space-y-2 text-sm text-[#b4d7d1]">
            <li class="flex gap-2"><span class="mt-1 h-1.5 w-1.5 rounded-full bg-[#31dbc2]" aria-hidden="true" />App version</li>
            <li class="flex gap-2"><span class="mt-1 h-1.5 w-1.5 rounded-full bg-[#31dbc2]" aria-hidden="true" />Android device model and OS version</li>
            <li class="flex gap-2"><span class="mt-1 h-1.5 w-1.5 rounded-full bg-[#31dbc2]" aria-hidden="true" />What you expected vs what happened</li>
            <li class="flex gap-2"><span class="mt-1 h-1.5 w-1.5 rounded-full bg-[#31dbc2]" aria-hidden="true" />Steps to reproduce (if possible)</li>
          </ul>
        </article>

        <article class="rounded-3xl border border-[#285b55]/70 bg-[#09231f]/85 p-6">
          <h2 class="text-xl font-semibold text-[#e7fcf8]">Support email</h2>
          <p class="mt-3 text-sm text-[#9fc5bf]">
            We respond through email support.
          </p>
          <a class="mt-3 inline-block text-base font-semibold text-[#56e4d1] hover:text-[#8df4e4]" :href="`mailto:${content.supportEmail}`">
            {{ content.supportEmail }}
          </a>
        </article>
      </section>

      <section class="mt-8 rounded-3xl border border-[#285b55]/70 bg-[#09231f]/85 p-6 sm:p-8">
        <h2 class="text-2xl font-semibold text-[#e8fcf8]">FAQ</h2>
        <div class="mt-5 space-y-3">
          <details
            v-for="faq in content.faqs"
            :key="faq.id"
            class="group rounded-2xl border border-[#2d645d]/70 bg-[#102f2a]/75 px-4 py-3 open:border-[#4ebfb1]/70"
          >
            <summary class="cursor-pointer list-none pr-6 text-sm font-semibold text-[#d8f3ee]">
              {{ faq.question }}
            </summary>
            <p class="mt-3 text-sm leading-relaxed text-[#a5cbc5]">{{ faq.answer }}</p>
          </details>
        </div>
      </section>
    </section>
  </main>
</template>

<script setup lang="ts">
import type { MoneyManagerSiteContent } from '~/data/moneyManagerSite'

defineProps<{
  content: MoneyManagerSiteContent
  privacyPath: string
}>()
</script>
