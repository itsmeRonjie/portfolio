<template>
  <div>
    <SiteNav />
    <main class="mx-auto max-w-4xl px-6 pb-16 pt-12">
      <header class="space-y-3">
        <p class="text-xs uppercase tracking-[0.3em] text-slate-400">Legal</p>
        <h1 class="text-3xl font-semibold text-white sm:text-4xl">Money Manager Privacy Policy</h1>
        <p class="text-sm text-slate-300">Last updated: 2026-01-31</p>
      </header>

      <section class="mt-10 space-y-4 text-sm text-slate-300">
        <p>
          Money Manager is a personal finance app. Your entries are stored on your device. Cloud sync is not available
          yet; if it is added later, this policy will be updated before launch.
        </p>
      </section>

      <section class="mt-10 space-y-4">
        <h2 class="text-xl font-semibold text-white">Information We Collect</h2>
        <div class="space-y-4 text-sm text-slate-300">
          <div>
            <p class="font-semibold text-slate-200">Financial data you enter</p>
            <p>
              Expenses, income, categories, budgets, and other finance records you add are saved locally on your
              device.
            </p>
          </div>
          <div>
            <p class="font-semibold text-slate-200">Diagnostics and usage data</p>
            <p>
              We use Firebase Analytics and Firebase Crashlytics to understand app performance and reliability. This
              may include device information (model, OS version), app events, and crash reports.
            </p>
          </div>
          <div>
            <p class="font-semibold text-slate-200">Advertising data (future)</p>
            <p>
              If we add ads (for example, Google AdMob), ad partners may collect or receive the Advertising ID, IP
              address, device/app details, coarse location from IP, ad impressions, and ad interaction data to serve
              and measure ads.
            </p>
          </div>
          <div>
            <p class="font-semibold text-slate-200">No account required</p>
            <p>The app does not require an account, contacts, or precise location.</p>
          </div>
        </div>
      </section>

      <section class="mt-10 space-y-4">
        <h2 class="text-xl font-semibold text-white">How We Use Information</h2>
        <ul class="list-disc space-y-2 pl-5 text-sm text-slate-300">
          <li>Provide core budgeting and tracking features.</li>
          <li>Improve stability and fix bugs.</li>
          <li>Respond to support requests.</li>
          <li>Show ads and measure performance if ads are introduced.</li>
        </ul>
      </section>

      <section class="mt-10 space-y-4">
        <h2 class="text-xl font-semibold text-white">Data Storage and Retention</h2>
        <ul class="list-disc space-y-2 pl-5 text-sm text-slate-300">
          <li>All finance data is stored locally on your device.</li>
          <li>Uninstalling the app or clearing its data removes your records.</li>
          <li>We will update this policy before enabling any cloud sync feature.</li>
        </ul>
      </section>

      <section class="mt-10 space-y-4">
        <h2 class="text-xl font-semibold text-white">Sharing of Information</h2>
        <p class="text-sm text-slate-300">
          We do not sell your data. We share limited data with service providers like Firebase to help operate and
          improve the app. If ads are added, ad partners may collect data through their SDKs to provide and measure ads.
        </p>
      </section>

      <section class="mt-10 space-y-4">
        <h2 class="text-xl font-semibold text-white">Your Choices</h2>
        <ul class="list-disc space-y-2 pl-5 text-sm text-slate-300">
          <li>You can delete local data by clearing the app data or uninstalling.</li>
          <li>You can manage ad personalization by resetting or deleting your Advertising ID in Android settings.</li>
        </ul>
      </section>

      <section class="mt-10 space-y-4">
        <h2 class="text-xl font-semibold text-white">Children's Privacy</h2>
        <p class="text-sm text-slate-300">
          The app is not directed to children under 13 and does not knowingly collect personal information from them.
        </p>
      </section>

      <section class="mt-10 space-y-4">
        <h2 class="text-xl font-semibold text-white">Changes to This Policy</h2>
        <p class="text-sm text-slate-300">
          We may update this policy to reflect changes in the app and will update the "Last updated" date.
        </p>
      </section>

      <section class="mt-10 space-y-4">
        <h2 class="text-xl font-semibold text-white">Contact</h2>
        <p class="text-sm text-slate-300">
          If you have questions or requests, contact us at manon.ronjiediafante@gmail.com.
        </p>
      </section>
    </main>
  </div>
</template>

<script setup lang="ts">
import SiteNav from '~/components/SiteNav.vue'

useSeoMeta({
  title: 'Money Manager Privacy Policy',
  description: 'Privacy policy for the Money Manager mobile app.'
})
</script>
