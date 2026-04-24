<template>
  <main class="min-h-screen bg-[linear-gradient(180deg,#07100a_0%,#0b150b_55%,#11140f_100%)] pb-16">
    <section class="mx-auto max-w-5xl px-6 pt-12">
      <header class="rounded-lg border border-[#2d4622]/85 bg-[#111d0d]/92 p-6 sm:p-8">
        <p class="font-mono text-[11px] uppercase tracking-[0.24em] text-[#a8c98f]">DinkBoard Support</p>
        <h1 class="mt-2 text-3xl font-semibold text-[#f4ffec] sm:text-4xl">Need help with DinkBoard?</h1>
        <p class="mt-3 max-w-3xl text-sm leading-relaxed text-[#b7cda5]">
          Send the match setup, platform, device details, and what happened. This page is the support endpoint for app store listings.
        </p>
        <div class="mt-5 flex flex-wrap gap-3">
          <a
            class="inline-flex items-center justify-center rounded-lg border border-[#ff7a2e]/50 bg-[#ff7a2e] px-4 py-2 text-sm font-semibold text-[#170905] transition hover:brightness-105"
            :href="supportMailto"
          >
            Email Support
          </a>
          <a
            class="inline-flex items-center justify-center rounded-lg border border-[#466731]/70 bg-[#14210f] px-4 py-2 text-sm font-semibold text-[#d7edc4] transition hover:border-[#8bca1e]/70 hover:text-white"
            :href="content.playStoreUrl"
            target="_blank"
            rel="noreferrer"
          >
            Google Play Listing
          </a>
          <NuxtLink
            class="inline-flex items-center justify-center rounded-lg border border-[#466731]/70 bg-[#14210f] px-4 py-2 text-sm font-semibold text-[#d7edc4] transition hover:border-[#8bca1e]/70 hover:text-white"
            :to="privacyPath"
          >
            Privacy Policy
          </NuxtLink>
        </div>
      </header>

      <section class="mt-8 grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
        <article class="rounded-lg border border-[#2d4622]/85 bg-[#0d170b]/92 p-6">
          <h2 class="text-xl font-semibold text-[#f4ffec]">Support checklist</h2>
          <ul class="mt-4 space-y-2 text-sm text-[#cce0ba]">
            <li v-for="item in supportChecklist" :key="item" class="flex gap-2">
              <span class="mt-1 h-1.5 w-1.5 rounded-full bg-[#ff7a2e]" aria-hidden="true" />
              <span>{{ item }}</span>
            </li>
          </ul>
        </article>

        <article class="rounded-lg border border-[#2d4622]/85 bg-[#0d170b]/92 p-6">
          <h2 class="text-xl font-semibold text-[#f4ffec]">Support email</h2>
          <p class="mt-3 text-sm text-[#a9bf99]">
            Support is handled by email. There is no backend contact form on this page.
          </p>
          <a class="mt-3 inline-block text-base font-semibold text-[#ff9a5f] hover:text-[#ffc5a5]" :href="supportMailto">
            {{ content.supportEmail }}
          </a>
        </article>
      </section>

      <section class="mt-8 rounded-lg border border-[#2d4622]/85 bg-[#0d170b]/92 p-6 sm:p-8">
        <h2 class="text-2xl font-semibold text-[#f4ffec]">FAQ</h2>
        <div class="mt-5 space-y-3">
          <details
            v-for="faq in content.faqs"
            :key="faq.id"
            class="group rounded-lg border border-[#334f25]/80 bg-[#121f0e]/85 px-4 py-3 open:border-[#8bca1e]/70"
          >
            <summary class="cursor-pointer list-none pr-6 text-sm font-semibold text-[#eefbdf]">
              {{ faq.question }}
            </summary>
            <p class="mt-3 text-sm leading-relaxed text-[#b7cda5]">{{ faq.answer }}</p>
          </details>
        </div>
      </section>
    </section>
  </main>
</template>

<script setup lang="ts">
import type { DinkBoardSiteContent } from '~/data/dinkBoardSite'

const props = defineProps<{
  content: DinkBoardSiteContent
  privacyPath: string
}>()

const supportChecklist = [
  'DinkBoard app version and platform: Android, iPhone, or Apple Watch.',
  'Device model and OS version.',
  'Match format, scoring mode, target points, and serving side when the issue happened.',
  'Whether nearby sync or Apple Watch scoring was active.',
  'Expected behavior, actual behavior, and steps to reproduce.'
]

const supportMailto = computed(() => {
  const subject = encodeURIComponent('DinkBoard Support Request')
  return `mailto:${props.content.supportEmail}?subject=${subject}`
})
</script>
