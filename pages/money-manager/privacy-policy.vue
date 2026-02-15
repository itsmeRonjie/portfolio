<template>
  <div class="min-h-screen bg-[#041310] text-[#e6f8f5]">
    <MoneyManagerNav
      :play-store-url="content.playStoreUrl"
      :home-path="homePath"
      :support-path="supportPath"
      :section-base-path="homePath"
    />

    <main class="mx-auto max-w-5xl px-6 pb-16 pt-12">
      <header class="rounded-3xl border border-[#2a5f59]/70 bg-[#0b2b25]/85 p-6 sm:p-8">
        <p class="font-mono text-[11px] uppercase tracking-[0.24em] text-[#76afa7]">Legal</p>
        <h1 class="mt-2 text-3xl font-semibold text-[#e8fcf8] sm:text-4xl">Money Manager Privacy Policy</h1>
        <p class="mt-2 text-sm text-[#9ec4be]">Last updated: 2026-02-12</p>
        <div class="mt-5 flex flex-wrap gap-3">
          <NuxtLink
            class="rounded-full border border-[#2f7a70]/70 bg-[#123a33] px-4 py-2 text-xs font-semibold text-[#cbeee8] transition hover:border-[#57cdbf]/70 hover:text-white"
            :to="supportPath"
          >
            Support
          </NuxtLink>
          <a
            class="rounded-full border border-[#31dbc2]/45 bg-[#31dbc2] px-4 py-2 text-xs font-semibold text-[#07332d] transition hover:brightness-105"
            :href="content.playStoreUrl"
            target="_blank"
            rel="noreferrer"
          >
            Install on Google Play
          </a>
        </div>
      </header>

      <section class="mt-8 space-y-6 rounded-3xl border border-[#285b55]/70 bg-[#0a2521]/85 p-6 sm:p-8">
        <p class="text-sm leading-relaxed text-[#b8dad4]">
          Money Manager is a personal finance app. Your entries are stored on your device. Cloud sync is not available
          yet; if it is added later, this policy will be updated before launch.
        </p>

        <article class="space-y-3">
          <h2 class="text-xl font-semibold text-[#e8fcf8]">Information We Collect</h2>
          <div class="space-y-3 text-sm text-[#b4d7d1]">
            <div>
              <p class="font-semibold text-[#d5f3ee]">Financial data you enter</p>
              <p>Expenses, income, categories, budgets, and other finance records you add are saved locally on your device.</p>
            </div>
            <div>
              <p class="font-semibold text-[#d5f3ee]">Diagnostics and usage data</p>
              <p>
                We use Firebase Analytics and Firebase Crashlytics to understand app performance and reliability. This
                may include device information (model, OS version), app events, and crash reports.
              </p>
            </div>
            <div>
              <p class="font-semibold text-[#d5f3ee]">Advertising data (Google AdMob)</p>
              <p>
                We show ads using Google AdMob. Ad partners may collect or receive the Advertising ID, IP address,
                device/app details, coarse location from IP, ad impressions, and ad interaction data to serve and
                measure ads.
              </p>
            </div>
            <div>
              <p class="font-semibold text-[#d5f3ee]">No account required</p>
              <p>The app does not require an account, contacts, or precise location.</p>
            </div>
          </div>
        </article>

        <article class="space-y-3">
          <h2 class="text-xl font-semibold text-[#e8fcf8]">How We Use Information</h2>
          <ul class="list-disc space-y-2 pl-5 text-sm text-[#b4d7d1]">
            <li>Improve stability and fix bugs.</li>
            <li>Respond to support requests.</li>
            <li>Show ads and measure ad performance.</li>
          </ul>
        </article>

        <article class="space-y-3">
          <h2 class="text-xl font-semibold text-[#e8fcf8]">Data Storage and Retention</h2>
          <ul class="list-disc space-y-2 pl-5 text-sm text-[#b4d7d1]">
            <li>All finance data is stored locally on your device.</li>
            <li>Uninstalling the app or clearing its data removes your records.</li>
            <li>We will update this policy before enabling any cloud sync feature.</li>
          </ul>
        </article>

        <article class="space-y-3">
          <h2 class="text-xl font-semibold text-[#e8fcf8]">Sharing of Information</h2>
          <p class="text-sm leading-relaxed text-[#b4d7d1]">
            We do not sell your data. We share limited data with service providers like Firebase to help operate and
            improve the app. Because ads are enabled, ad partners may collect data through their SDKs to provide and
            measure ads.
          </p>
        </article>

        <article class="space-y-3">
          <h2 class="text-xl font-semibold text-[#e8fcf8]">Your Choices</h2>
          <ul class="list-disc space-y-2 pl-5 text-sm text-[#b4d7d1]">
            <li>You can delete local data by clearing the app data or uninstalling.</li>
            <li>You can manage ad personalization by resetting or deleting your Advertising ID in Android settings.</li>
          </ul>
        </article>

        <article class="space-y-3">
          <h2 class="text-xl font-semibold text-[#e8fcf8]">Children's Privacy</h2>
          <p class="text-sm leading-relaxed text-[#b4d7d1]">
            The app is not directed to children under 13 and does not knowingly collect personal information from them.
          </p>
        </article>

        <article class="space-y-3">
          <h2 class="text-xl font-semibold text-[#e8fcf8]">Changes to This Policy</h2>
          <p class="text-sm leading-relaxed text-[#b4d7d1]">
            We may update this policy to reflect changes in the app and will update the "Last updated" date.
          </p>
        </article>

        <article class="space-y-3">
          <h2 class="text-xl font-semibold text-[#e8fcf8]">Contact</h2>
          <p class="text-sm leading-relaxed text-[#b4d7d1]">
            If you have questions or requests, contact us at
            <a class="text-[#56e4d1] hover:text-[#8df4e4]" :href="`mailto:${content.supportEmail}`">{{ content.supportEmail }}</a>.
          </p>
        </article>
      </section>
    </main>
  </div>
</template>

<script setup lang="ts">
import MoneyManagerNav from '~/components/money-manager/MoneyManagerNav.vue'
import { moneyManagerSite } from '~/data/moneyManagerSite'

const content = moneyManagerSite
const { isMoneyManagerFallbackPath } = useHostRouting()

const homePath = computed(() => (isMoneyManagerFallbackPath.value ? '/money-manager' : '/'))
const supportPath = computed(() => (isMoneyManagerFallbackPath.value ? '/money-manager/support' : '/support'))

useSeoMeta({
  title: 'Money Manager Privacy Policy',
  description: 'Privacy policy for the Money Manager mobile app.'
})
</script>
