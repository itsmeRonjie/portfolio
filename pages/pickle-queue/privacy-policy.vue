<template>
  <div>
    <SiteNav />
    <main class="mx-auto max-w-4xl px-6 pb-16 pt-12">
      <header class="space-y-3">
        <p class="text-xs uppercase tracking-[0.3em] text-slate-400">Legal</p>
        <h1 class="text-3xl font-semibold text-white sm:text-4xl">Pickle Queue Privacy Policy</h1>
        <p class="text-sm text-slate-300">Last updated: 2026-06-06</p>
      </header>

      <section class="mt-10 space-y-4 text-sm text-slate-300">
        <p>
          Pickle Queue is a pickleball queue, court, session, and scoring app. The app is local-first. Workspace,
          roster, queue, match, score, and export data are stored on your device unless you choose to enable private
          iCloud collaboration.
        </p>
      </section>

      <section class="mt-10 space-y-4">
        <h2 class="text-xl font-semibold text-white">Information We Collect or Access</h2>
        <div class="space-y-4 text-sm text-slate-300">
          <div>
            <p class="font-semibold text-slate-200">Workspace and session data you enter</p>
            <p>
              Workspace names, player names, ratings, queue entries, court assignments, match results, scores,
              session history, organizer notes, and app settings are saved on your device.
            </p>
          </div>
          <div>
            <p class="font-semibold text-slate-200">Optional iCloud collaboration data</p>
            <p>
              If you enable organizer collaboration, Pickle Queue uses Apple CloudKit and private iCloud sharing to
              sync selected workspace records and share them with the organizers you invite. Apple handles the iCloud
              account, authentication, storage, and share invitation infrastructure.
            </p>
          </div>
          <div>
            <p class="font-semibold text-slate-200">Exports you create</p>
            <p>
              If you generate CSV or PDF exports, those files contain the session, roster, scoring, or analytics data
              you choose to export. Sharing or saving those files is controlled by the destination you select.
            </p>
          </div>
          <div>
            <p class="font-semibold text-slate-200">Support requests</p>
            <p>
              If you email support, we receive the information you choose to include, such as your email address,
              screenshots, device details, or reproduction steps.
            </p>
          </div>
          <div>
            <p class="font-semibold text-slate-200">No account, ads, or third-party telemetry SDKs</p>
            <p>
              Pickle Queue does not require an app-specific account and does not include advertising SDKs,
              third-party analytics SDKs, third-party crash reporting SDKs, contacts access, camera access, or precise
              location features.
            </p>
          </div>
        </div>
      </section>

      <section class="mt-10 space-y-4">
        <h2 class="text-xl font-semibold text-white">How We Use Information</h2>
        <ul class="list-disc space-y-2 pl-5 text-sm text-slate-300">
          <li>Run queue rotation, court assignment, scoring, session history, and workspace management.</li>
          <li>Enable private organizer collaboration when you choose to invite other organizers.</li>
          <li>Generate CSV and PDF exports at your request.</li>
          <li>Respond to support requests.</li>
        </ul>
      </section>

      <section class="mt-10 space-y-4">
        <h2 class="text-xl font-semibold text-white">iCloud and Sharing</h2>
        <p class="text-sm text-slate-300">
          Cloud collaboration is optional. When enabled, workspace data may be stored in your iCloud account and shared
          with invited organizers through Apple CloudKit sharing. People you invite may be able to view or edit the
          shared workspace depending on the permissions you grant. You can stop sharing through the app or iCloud
          sharing controls.
        </p>
      </section>

      <section class="mt-10 space-y-4">
        <h2 class="text-xl font-semibold text-white">Data Storage and Retention</h2>
        <ul class="list-disc space-y-2 pl-5 text-sm text-slate-300">
          <li>Local app data remains on your device until you delete it, clear app data, or uninstall the app.</li>
          <li>iCloud collaboration data is stored and retained according to your iCloud account and sharing settings.</li>
          <li>Exported files remain wherever you save or share them.</li>
          <li>Support emails remain in the support mailbox as needed to respond and track the request.</li>
        </ul>
      </section>

      <section class="mt-10 space-y-4">
        <h2 class="text-xl font-semibold text-white">Sharing of Information</h2>
        <p class="text-sm text-slate-300">
          We do not sell your data. Pickle Queue shares information only when you use a feature that sends it, such as
          iCloud organizer collaboration, exported files, system backups, or email support through your email provider.
        </p>
      </section>

      <section class="mt-10 space-y-4">
        <h2 class="text-xl font-semibold text-white">Your Choices</h2>
        <ul class="list-disc space-y-2 pl-5 text-sm text-slate-300">
          <li>You can use Pickle Queue without enabling iCloud collaboration.</li>
          <li>You can remove local records by deleting app data or uninstalling Pickle Queue.</li>
          <li>You can manage iCloud storage, backups, and sharing from Apple system settings and iCloud controls.</li>
          <li>You control whether to create, save, or share CSV and PDF exports.</li>
        </ul>
      </section>

      <section class="mt-10 space-y-4">
        <h2 class="text-xl font-semibold text-white">Children's Privacy</h2>
        <p class="text-sm text-slate-300">
          Pickle Queue is not directed to children under 13 and does not knowingly collect personal information from
          them.
        </p>
      </section>

      <section class="mt-10 space-y-4">
        <h2 class="text-xl font-semibold text-white">Changes to This Policy</h2>
        <p class="text-sm text-slate-300">
          We may update this policy to reflect app changes and will update the "Last updated" date when we do.
        </p>
      </section>

      <section class="mt-10 space-y-4">
        <h2 class="text-xl font-semibold text-white">Contact</h2>
        <p class="text-sm text-slate-300">
          If you have questions or requests, contact us at
          <a class="ui-link" href="mailto:manon.ronjiediafante@gmail.com">manon.ronjiediafante@gmail.com</a>.
        </p>
      </section>
    </main>
  </div>
</template>

<script setup lang="ts">
import SiteNav from '~/components/SiteNav.vue'

useSeoMeta({
  title: 'Pickle Queue Privacy Policy',
  description: 'Privacy policy for the Pickle Queue app.'
})
</script>
