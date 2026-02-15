<template>
  <section class="mx-auto max-w-6xl px-6 py-14" id="privacy">
    <div class="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
      <article class="rounded-3xl border border-[#255c55]/70 bg-[linear-gradient(150deg,rgba(13,40,35,0.95)_0%,rgba(7,21,19,0.92)_100%)] p-6 shadow-[0_22px_52px_rgba(0,0,0,0.38)]">
        <p class="font-mono text-[11px] uppercase tracking-[0.24em] text-[#70a59e]">Trust and Privacy</p>
        <h2 class="mt-2 text-2xl font-semibold text-[#e8fbf8]">Built for private and practical money tracking</h2>
        <ul class="mt-5 space-y-3 text-sm text-[#b6d7d1]">
          <li v-for="bullet in trustBullets" :key="bullet" class="flex gap-2">
            <span class="mt-1 h-1.5 w-1.5 rounded-full bg-[#31dbc2]" aria-hidden="true" />
            <span>{{ bullet }}</span>
          </li>
        </ul>
      </article>

      <article class="rounded-3xl border border-[#2a6059]/70 bg-[#0a2621]/90 p-6">
        <h3 class="text-lg font-semibold text-[#e8faf7]">Need help or legal details?</h3>
        <p class="mt-2 text-sm leading-relaxed text-[#9dc0ba]">
          Support and legal documents stay easy to reach from the app website.
        </p>

        <div class="mt-5 grid gap-3 sm:grid-cols-2">
          <NuxtLink
            class="rounded-2xl border border-[#2f7c72]/65 bg-[#12352f] px-4 py-3 text-sm font-semibold text-[#c9ece7] transition hover:border-[#58cdbf]/70 hover:text-white"
            :to="supportPath"
          >
            Open Support
          </NuxtLink>
          <NuxtLink
            class="rounded-2xl border border-[#2f7c72]/65 bg-[#12352f] px-4 py-3 text-sm font-semibold text-[#c9ece7] transition hover:border-[#58cdbf]/70 hover:text-white"
            :to="privacyPath"
          >
            Open Privacy Policy
          </NuxtLink>
        </div>

        <div class="mt-5 rounded-2xl border border-[#2f6a62]/65 bg-[#102f2a]/80 p-4">
          <p class="font-mono text-[10px] uppercase tracking-[0.2em] text-[#7ca9a3]">Support Email</p>
          <a class="mt-2 inline-block text-sm font-semibold text-[#4ee1cd] hover:text-[#87f0e1]" :href="`mailto:${supportEmail}`">
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
