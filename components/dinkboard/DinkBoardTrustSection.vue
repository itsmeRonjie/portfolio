<template>
  <section class="mx-auto max-w-6xl px-6 py-14" id="privacy">
    <div class="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
      <article class="rounded-lg border border-[#2d4622]/85 bg-[#111d0d]/92 p-6 shadow-[0_22px_52px_rgba(0,0,0,0.38)]">
        <p class="font-mono text-[11px] uppercase tracking-[0.24em] text-[#a8c98f]">Trust and Privacy</p>
        <h2 class="mt-2 text-2xl font-semibold text-[#f4ffec]">Local-first scoring with explicit nearby sharing</h2>
        <ul class="mt-5 space-y-3 text-sm text-[#cce0ba]">
          <li v-for="bullet in trustBullets" :key="bullet" class="flex gap-2">
            <span class="mt-1 h-1.5 w-1.5 rounded-full bg-[#8bca1e]" aria-hidden="true" />
            <span>{{ bullet }}</span>
          </li>
        </ul>
      </article>

      <article class="rounded-lg border border-[#2d4622]/85 bg-[#0d170b]/92 p-6" id="sync">
        <h3 class="text-lg font-semibold text-[#f4ffec]">Support and legal details</h3>
        <p class="mt-2 text-sm leading-relaxed text-[#a9bf99]">
          Support requests and privacy details stay reachable from the app website.
        </p>

        <div class="mt-5 grid gap-3 sm:grid-cols-2">
          <NuxtLink
            class="rounded-lg border border-[#466731]/70 bg-[#14210f] px-4 py-3 text-sm font-semibold text-[#d7edc4] transition hover:border-[#8bca1e]/70 hover:text-white"
            :to="supportPath"
          >
            Open Support
          </NuxtLink>
          <NuxtLink
            class="rounded-lg border border-[#466731]/70 bg-[#14210f] px-4 py-3 text-sm font-semibold text-[#d7edc4] transition hover:border-[#8bca1e]/70 hover:text-white"
            :to="privacyPath"
          >
            Open Privacy Policy
          </NuxtLink>
        </div>

        <div class="mt-5 rounded-lg border border-[#2d4622]/85 bg-[#111d0d] p-4">
          <p class="font-mono text-[10px] uppercase tracking-[0.2em] text-[#a8c98f]">Support Email</p>
          <a class="mt-2 inline-block text-sm font-semibold text-[#ff9a5f] hover:text-[#ffc5a5]" :href="`mailto:${supportEmail}`">
            {{ supportEmail }}
          </a>
        </div>
      </article>
    </div>
  </section>
</template>

<script setup lang="ts">
defineProps<{
  trustBullets: string[]
  privacyPath: string
  supportPath: string
  supportEmail: string
}>()
</script>
