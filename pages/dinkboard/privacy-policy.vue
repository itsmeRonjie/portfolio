<template>
  <div class="min-h-screen bg-[#07100a] text-[#eefbdf]">
    <DinkBoardNav
      :play-store-url="content.playStoreUrl"
      :app-icon-path="content.appIconPath"
      :home-path="homePath"
      :support-path="supportPath"
      :section-base-path="homePath"
    />

    <main class="mx-auto max-w-5xl px-6 pb-16 pt-12">
      <header class="rounded-lg border border-[#2d4622]/85 bg-[#111d0d]/92 p-6 sm:p-8">
        <p class="font-mono text-[11px] uppercase tracking-[0.24em] text-[#a8c98f]">Legal</p>
        <h1 class="mt-2 text-3xl font-semibold text-[#f4ffec] sm:text-4xl">{{ content.appName }} Privacy Policy</h1>
        <p class="mt-2 text-sm text-[#a9bf99]">Last updated: {{ content.privacyLastUpdated }}</p>
        <div class="mt-5 flex flex-wrap gap-3">
          <NuxtLink
            class="rounded-lg border border-[#466731]/70 bg-[#14210f] px-4 py-2 text-xs font-semibold text-[#d7edc4] transition hover:border-[#8bca1e]/70 hover:text-white"
            :to="supportPath"
          >
            Support
          </NuxtLink>
          <a
            class="rounded-lg border border-[#ff7a2e]/50 bg-[#ff7a2e] px-4 py-2 text-xs font-semibold text-[#170905] transition hover:brightness-105"
            :href="content.playStoreUrl"
            target="_blank"
            rel="noreferrer"
          >
            Google Play Listing
          </a>
        </div>
      </header>

      <section class="mt-8 space-y-6 rounded-lg border border-[#2d4622]/85 bg-[#0d170b]/92 p-6 sm:p-8">
        <p class="text-sm leading-relaxed text-[#cce0ba]">
          DinkBoard is a pickleball scoring app. Match records, player names, settings, and history are stored on your
          device. The app does not require an account and does not provide cloud sync.
        </p>

        <article class="space-y-3">
          <h2 class="text-xl font-semibold text-[#f4ffec]">Information We Collect or Access</h2>
          <div class="space-y-3 text-sm text-[#cce0ba]">
            <div>
              <p class="font-semibold text-[#eefbdf]">Match and player data you enter</p>
              <p>Team labels, player names, scoring events, match history, app settings, and theme preferences are saved locally on your device.</p>
            </div>
            <div>
              <p class="font-semibold text-[#eefbdf]">Nearby sync data</p>
              <p>
                If you start hosting or joining a nearby match, DinkBoard uses Bluetooth to advertise or discover a
                nearby session and exchange read-only match frames. These frames may include channel metadata, optional
                lock status, device display name or model, scores, serving state, and rally events.
              </p>
            </div>
            <div>
              <p class="font-semibold text-[#eefbdf]">Apple Watch sync data</p>
              <p>
                On Apple platforms, DinkBoard can send active match status to the paired Apple Watch and receive score,
                undo, and redo commands from the watch.
              </p>
            </div>
            <div>
              <p class="font-semibold text-[#eefbdf]">Support requests</p>
              <p>
                If you email support, we receive the information you choose to include, such as your email address,
                device details, screenshots, or reproduction steps.
              </p>
            </div>
            <div>
              <p class="font-semibold text-[#eefbdf]">No account or third-party telemetry SDKs</p>
              <p>
                Current DinkBoard code does not include account sign-in, advertising SDKs, third-party analytics SDKs,
                crash reporting SDKs, contacts access, camera access, or a precise location feature.
              </p>
            </div>
          </div>
        </article>

        <article class="space-y-3">
          <h2 class="text-xl font-semibold text-[#f4ffec]">Bluetooth and Location Permissions</h2>
          <p class="text-sm leading-relaxed text-[#cce0ba]">
            DinkBoard uses Bluetooth permissions for nearby hosting and joining. On older Android versions, Bluetooth
            scanning required location permission, so the Android manifest includes legacy fine location permission up
            to Android 11. On newer Android versions, Bluetooth scanning is marked as not used for location. DinkBoard
            does not collect precise location.
          </p>
        </article>

        <article class="space-y-3">
          <h2 class="text-xl font-semibold text-[#f4ffec]">How We Use Information</h2>
          <ul class="list-disc space-y-2 pl-5 text-sm text-[#cce0ba]">
            <li>Run live scoring, undo, redo, recovery, and match history.</li>
            <li>Enable nearby read-only sync when you choose to host or join a nearby match.</li>
            <li>Enable Apple Watch score mirroring and remote scoring commands on Apple platforms.</li>
            <li>Respond to support requests.</li>
          </ul>
        </article>

        <article class="space-y-3">
          <h2 class="text-xl font-semibold text-[#f4ffec]">Data Storage and Retention</h2>
          <ul class="list-disc space-y-2 pl-5 text-sm text-[#cce0ba]">
            <li>App data is stored locally on your device using platform storage.</li>
            <li>Deleting app data or uninstalling the app removes local DinkBoard records from that device.</li>
            <li>Android and iOS system backup settings may include app data in device backups depending on your device and account settings.</li>
            <li>Support emails remain in the support mailbox as needed to respond and track the request.</li>
          </ul>
        </article>

        <article class="space-y-3">
          <h2 class="text-xl font-semibold text-[#f4ffec]">Sharing of Information</h2>
          <p class="text-sm leading-relaxed text-[#cce0ba]">
            We do not sell your data. DinkBoard does not send match history to an app server. Information is shared only
            when you use a feature that sends it, such as nearby Bluetooth sync, Apple Watch sync, system backups, or
            email support through your email provider.
          </p>
        </article>

        <article class="space-y-3">
          <h2 class="text-xl font-semibold text-[#f4ffec]">Your Choices</h2>
          <ul class="list-disc space-y-2 pl-5 text-sm text-[#cce0ba]">
            <li>You can avoid nearby sync by not hosting or joining a nearby match.</li>
            <li>You can remove local records by deleting app data or uninstalling DinkBoard.</li>
            <li>You can manage device backups in Android or iOS settings.</li>
          </ul>
        </article>

        <article class="space-y-3">
          <h2 class="text-xl font-semibold text-[#f4ffec]">Children's Privacy</h2>
          <p class="text-sm leading-relaxed text-[#cce0ba]">
            DinkBoard is not directed to children under 13 and does not knowingly collect personal information from them.
          </p>
        </article>

        <article class="space-y-3">
          <h2 class="text-xl font-semibold text-[#f4ffec]">Changes to This Policy</h2>
          <p class="text-sm leading-relaxed text-[#cce0ba]">
            We may update this policy to reflect app changes and will update the "Last updated" date when we do.
          </p>
        </article>

        <article class="space-y-3">
          <h2 class="text-xl font-semibold text-[#f4ffec]">Contact</h2>
          <p class="text-sm leading-relaxed text-[#cce0ba]">
            If you have questions or requests, contact us at
            <a class="text-[#ff9a5f] hover:text-[#ffc5a5]" :href="`mailto:${content.supportEmail}`">{{ content.supportEmail }}</a>.
          </p>
        </article>
      </section>
    </main>
  </div>
</template>

<script setup lang="ts">
import DinkBoardNav from '~/components/dinkboard/DinkBoardNav.vue'

const { content } = useDinkBoardSiteContent()
const { isDinkBoardFallbackPath } = useHostRouting()

const homePath = computed(() => (isDinkBoardFallbackPath.value ? '/dinkboard' : '/'))
const supportPath = computed(() => (isDinkBoardFallbackPath.value ? '/dinkboard/support' : '/support'))

useSeoMeta(() => ({
  title: `${content.value.appName} Privacy Policy`,
  description: `Privacy policy for ${content.value.appName}.`
}))
</script>
