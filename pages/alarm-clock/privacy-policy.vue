<template>
  <div>
    <SiteNav />
    <main class="mx-auto max-w-4xl px-6 pb-16 pt-12">
      <header class="space-y-3">
        <p class="text-xs uppercase tracking-[0.3em] text-slate-400">Legal</p>
        <h1 class="text-3xl font-semibold text-white sm:text-4xl">Alarm Clock Privacy Policy</h1>
        <p class="text-sm text-slate-300">Last updated: 2026-01-31</p>
      </header>

      <section class="mt-10 space-y-4 text-sm text-slate-300">
        <p>
          Alarm Clock is offline; alarm data stays on your device, with optional calendar-based bypass and ads from
          third-party partners.
        </p>
      </section>

      <section class="mt-10 space-y-4">
        <h2 class="text-xl font-semibold text-white">Information We Collect</h2>
        <div class="space-y-4 text-sm text-slate-300">
          <div>
            <p class="font-semibold text-slate-200">Alarm settings (stored locally)</p>
            <p>
              Alarm times, labels, repeats, skip dates, snooze/vibration choices, ringtones, and calendar bypass rules
              are saved only in local app storage on your device.
            </p>
          </div>
          <div>
            <p class="font-semibold text-slate-200">Calendar data (optional)</p>
            <p>
              If you grant READ_CALENDAR and enable calendar bypass, the app reads your device calendars and upcoming
              events (title, start/end time, all-day flag, busy status) to decide whether to skip an alarm. Selected
              calendar IDs and event IDs may be stored locally to honor your preferences. Event details are not sent
              to any server.
            </p>
          </div>
          <div>
            <p class="font-semibold text-slate-200">Advertising data (collected by ad partners)</p>
            <p>
              Ad partners may collect or receive the Advertising ID, IP address, device/app details, coarse location
              from IP, ad impressions, and ad interaction data to serve and measure ads.
            </p>
          </div>
          <div>
            <p class="font-semibold text-slate-200">No account or direct personal data</p>
            <p>
              No account, contacts, or precise location are required, and we do not collect analytics or crash reports.
            </p>
          </div>
        </div>
      </section>

      <section class="mt-10 space-y-4">
        <h2 class="text-xl font-semibold text-white">How We Use Information</h2>
        <ul class="list-disc space-y-2 pl-5 text-sm text-slate-300">
          <li>Schedule and ring alarms at the times you configure.</li>
          <li>Send local notifications for alarms, snooze options, and alarm skipped reminders.</li>
          <li>When enabled, compare your selected calendars to bypass alarms during conflicting events.</li>
          <li>Display ads and measure their performance through our advertising partners.</li>
        </ul>
      </section>

      <section class="mt-10 space-y-4">
        <h2 class="text-xl font-semibold text-white">Permissions</h2>
        <ul class="list-disc space-y-2 pl-5 text-sm text-slate-300">
          <li>READ_CALENDAR (optional): Used only to read calendars and events when you enable calendar bypass.</li>
          <li>POST_NOTIFICATIONS: To show alarm, snooze, and bypass notifications.</li>
          <li>
            SCHEDULE_EXACT_ALARM / USE_FULL_SCREEN_INTENT / FOREGROUND_SERVICE / FOREGROUND_SERVICE_MEDIA_PLAYBACK /
            VIBRATE / MODIFY_AUDIO_SETTINGS: To schedule reliable alarms, play alarm audio, show the full-screen
            ringing UI, and control vibration/sound during alarms.
          </li>
          <li>RECEIVE_BOOT_COMPLETED: To restore scheduled alarms after your device restarts.</li>
          <li>INTERNET: To load ads and check for Google Play in-app updates.</li>
        </ul>
      </section>

      <section class="mt-10 space-y-4">
        <h2 class="text-xl font-semibold text-white">Data Sharing</h2>
        <p class="text-sm text-slate-300">
          We do not sell your data or share your local alarm or calendar data with third parties. Advertising partners
          may collect data through their SDKs to provide and measure ads.
        </p>
      </section>

      <section class="mt-10 space-y-4">
        <h2 class="text-xl font-semibold text-white">Data Retention and Control</h2>
        <ul class="list-disc space-y-2 pl-5 text-sm text-slate-300">
          <li>All alarm and preference data is stored locally. Uninstalling the app or clearing its data removes it.</li>
          <li>
            You can revoke calendar permission at any time; the app will stop reading calendars and clear cached events.
          </li>
          <li>
            You can manage ad personalization by resetting or deleting your Advertising ID in Android settings.
          </li>
          <li>You can silence or disable notifications in system settings if you prefer.</li>
        </ul>
      </section>

      <section class="mt-10 space-y-4">
        <h2 class="text-xl font-semibold text-white">Children's Privacy</h2>
        <p class="text-sm text-slate-300">
          The app is not directed to children under 13 and does not knowingly collect personal information from
          anyone.
        </p>
      </section>

      <section class="mt-10 space-y-4">
        <h2 class="text-xl font-semibold text-white">Changes to This Policy</h2>
        <p class="text-sm text-slate-300">
          We may update this policy to reflect changes in the app and will update the \"Last updated\" date.
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
  title: 'Alarm Clock Privacy Policy',
  description: 'Privacy policy for the Alarm Clock mobile app.'
})
</script>
