<template>
  <section class="mx-auto max-w-6xl px-6 pb-16 pt-10">
    <div class="overflow-hidden rounded-[2rem] border border-[#2b6a61]/75 bg-[linear-gradient(140deg,#0d312b_0%,#0a201d_60%,#0b1715_100%)] p-8 shadow-[0_28px_65px_rgba(0,0,0,0.42)]">
      <div class="grid gap-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <div>
          <p class="font-mono text-[11px] uppercase tracking-[0.24em] text-[#79b7ae]">Get Started</p>
          <h2 class="mt-2 text-3xl font-semibold leading-tight text-[#e7fcf8]">Install MoneyManager and keep every peso accountable</h2>
          <p class="mt-3 max-w-2xl text-sm leading-relaxed text-[#a9cbc6]">
            Go from daily transactions to monthly reports and long-term goals with one app built for practical finance tracking.
          </p>
        </div>
        <div class="flex flex-wrap gap-3 lg:justify-end">
          <a
            class="inline-flex items-center justify-center rounded-full border border-[#31dbc2]/45 bg-[#31dbc2] px-5 py-2.5 text-sm font-semibold text-[#08342d] shadow-[0_0_24px_rgba(49,219,194,0.26)] transition hover:-translate-y-0.5 hover:brightness-105"
            :href="playStoreUrl"
            target="_blank"
            rel="noreferrer"
          >
            Install on Google Play
          </a>
          <NuxtLink
            class="inline-flex items-center justify-center rounded-full border border-[#35776e]/70 bg-[#10352f] px-5 py-2.5 text-sm font-semibold text-[#c5e8e3] transition hover:border-[#5ed5c7]/70 hover:text-white"
            :to="supportPath"
          >
            Support
          </NuxtLink>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
defineProps<{
  playStoreUrl: string
  supportPath: string
}>()
</script>
