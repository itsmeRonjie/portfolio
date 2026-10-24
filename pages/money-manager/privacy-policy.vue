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
        <h1 class="mt-2 text-3xl font-semibold text-[#e8fcf8] sm:text-4xl">{{ content.appName }} Privacy Policy</h1>
        <p class="mt-2 text-sm text-[#9ec4be]">Last updated: 2026-10-24</p>
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
          This policy explains how Money Manager, also called PeraTrack in our Apple apps, handles information on
          Android and iOS, including supported tablet, watch, and widget features. You can use local finance features
          without a cloud account. If you choose to sign in and use Household sync, information in the shared
          workspace is also stored in the cloud and made available to its authorized members. Feature availability
          varies by platform and app version.
        </p>

        <article class="space-y-3">
          <h2 class="text-xl font-semibold text-[#e8fcf8]">Information We Collect</h2>
          <div class="space-y-3 text-sm text-[#b4d7d1]">
            <div>
              <p class="font-semibold text-[#d5f3ee]">Financial data you enter</p>
              <p>
                The app stores the records you enter or import, such as accounts, balances, transactions, categories,
                notes, budgets, and plans. These records are used to provide your finance features. Device-local
                records are not automatically made visible to other Household members.
              </p>
            </div>
            <div>
              <p class="font-semibold text-[#d5f3ee]">Optional accounts and Household sync</p>
              <p>
                Cloud sign-in uses Google Firebase Authentication, which processes your email address, sign-in
                credentials, and account identifiers. When you create or join a Household and enable sync, Google
                Firebase stores the workspace's financial records and supporting account, membership, role, invitation,
                and synchronization information. Members can access shared information according to their Household
                permissions. Share a workspace or invitation only with people you intend to give access.
              </p>
            </div>
            <div>
              <p class="font-semibold text-[#d5f3ee]">Receipts, images, and files</p>
              <p>
                Receipts, photos, PDFs, and other files you select or capture are kept in the app's local storage.
                Household sync can include an attachment's filename, local reference, type, size, and other metadata
                with its financial record; the current sync feature does not upload the receipt image or PDF itself.
                Backups and exports you create can include the actual files. Copies saved through device backup
                services or destinations you choose are handled separately by those services.
              </p>
            </div>
            <div>
              <p class="font-semibold text-[#d5f3ee]">Diagnostics and usage data</p>
              <p>
                The Android app uses Firebase Analytics and Firebase Crashlytics in supported production builds to
                understand feature usage, performance, and reliability. This may include app events, device and OS
                information, diagnostic identifiers, and crash reports. Android analytics follows the app's analytics
                preference. The current iOS app uses local diagnostic logging rather than Firebase Analytics or
                Crashlytics. Diagnostic behavior can differ between platforms and versions.
              </p>
            </div>
          </div>
        </article>

        <article class="space-y-3">
          <h2 class="text-xl font-semibold text-[#e8fcf8]">Advertising and Privacy Choices</h2>
          <div class="space-y-3 text-sm leading-relaxed text-[#b4d7d1]">
            <p>
              Where advertising is enabled, Google AdMob and its advertising partners may process IP addresses,
              device and app information, advertising identifiers when available and permitted, approximate location
              inferred from IP addresses, and ad requests, impressions, and interactions to provide and measure ads.
            </p>
            <p>
              The app uses Google's User Messaging Platform to obtain consent information and, where applicable,
              display consent messages before requesting ads. Privacy options are available in the app when the
              consent service requires them. You can also manage advertising and tracking permissions in your Android
              or Apple device settings. The availability of an advertising identifier depends on your platform,
              permissions, and privacy choices.
            </p>
          </div>
        </article>

        <article class="space-y-3">
          <h2 class="text-xl font-semibold text-[#e8fcf8]">Assistant and Optional Online Features</h2>
          <div class="space-y-3 text-sm leading-relaxed text-[#b4d7d1]">
            <p>
              Assistant inference uses on-device models, such as Apple Foundation Models, Android Gemini Nano, or
              locally downloaded models, depending on your device and selected option. Downloading an optional model
              contacts its hosting provider, such as Hugging Face, which receives ordinary download request and
              network information. Your finance records and assistant prompts are not included in a model download.
            </p>
            <p>
              Optional online features, including GIF search and media you choose to load, contact their providers.
              A provider such as GIPHY can receive the search terms, requested content, and network information
              needed to answer that request. These providers process information under their own privacy policies.
            </p>
            <p>
              Live exchange rates and investment quotes contact the relevant data provider with the requested
              currencies, stock symbol, or cryptocurrency identifier. Market-data requests also include the provider
              API key you configure, where required. These requests do not include your transaction history or
              balances. Providers receive the network information needed to deliver a response.
            </p>
            <p>
              Rate and quote sources include ExchangeRate-API, Frankfurter, the European Central Bank, currency-api
              downloads hosted by Cloudflare Pages or jsDelivr, CoinGecko, and your selected market-data provider:
              Twelve Data, Finnhub, Financial Modeling Prep, Alpha Vantage, EODHD, Marketstack, or Tiingo.
            </p>
          </div>
        </article>

        <article class="space-y-3">
          <h2 class="text-xl font-semibold text-[#e8fcf8]">Purchases and Device Permissions</h2>
          <div class="space-y-3 text-sm leading-relaxed text-[#b4d7d1]">
            <p>
              Apple or Google processes purchases made through its app store. The app uses purchase and entitlement
              information to provide paid features or restore access. We do not receive your payment card details
              from those app-store transactions.
            </p>
            <p>
              Features may ask for access to a camera, selected photos or files, notifications, or device
              authentication when you use them. Permission is used for the feature you choose, such as attaching a
              receipt, importing a file, receiving a reminder, or unlocking the app. You can change permissions in
              device settings; restricting them can limit the related feature.
            </p>
            <p>
              Supported watch and widget features share selected financial snapshots and actions with your paired
              device or widgets through the platform's companion and app-sharing features. Information can be
              visible on the watch, home screen, or lock screen according to the features and settings you enable.
            </p>
          </div>
        </article>

        <article class="space-y-3">
          <h2 class="text-xl font-semibold text-[#e8fcf8]">How We Use Information</h2>
          <ul class="list-disc space-y-2 pl-5 text-sm text-[#b4d7d1]">
            <li>Store and organize the financial information you enter or import.</li>
            <li>Authenticate optional cloud accounts and synchronize the Households you choose to share.</li>
            <li>Provide selected features, purchases, imports, exports, backups, and reminders.</li>
            <li>Improve stability and fix bugs.</li>
            <li>Respond to support requests.</li>
            <li>Show ads and measure ad performance.</li>
          </ul>
        </article>

        <article class="space-y-3">
          <h2 class="text-xl font-semibold text-[#e8fcf8]">Data Storage and Retention</h2>
          <ul class="list-disc space-y-2 pl-5 text-sm text-[#b4d7d1]">
            <li>
              Local financial records are kept in the app's device storage until you delete them or remove that
              storage. Device backups and exports can retain separate copies.
            </li>
            <li>
              Synced Household information is stored separately in Google Firebase for the account and shared
              workspace. Clearing local data, signing out, or uninstalling does not delete your cloud account or
              erase shared Household records.
            </li>
            <li>
              Removing a Household member changes that member's access; it does not automatically remove financial
              records from the shared ledger. Other authorized members may retain access to those records, and
              people who previously received copies may still hold them.
            </li>
            <li>
              Backups, exported files, and copies held by other members or device backup services are separate from
              the app's local storage. You control the destinations you select and should remove unwanted copies
              from those destinations.
            </li>
            <li>
              To request deletion of a cloud account or cloud data, contact us using the address below. We may need
              to verify account ownership and the requester's authority over a shared workspace. Service-provider
              retention and backup practices also apply to information they process.
            </li>
          </ul>
        </article>

        <article class="space-y-3">
          <h2 class="text-xl font-semibold text-[#e8fcf8]">Sharing of Information</h2>
          <p class="text-sm leading-relaxed text-[#b4d7d1]">
            We do not sell your financial records. Information is shared with the Household members you authorize,
            with service providers needed for the features you use, and with advertising partners as described
            above. An import, export, backup, or external sharing action can also send information to a destination
            you select. We may disclose information when required by law or necessary to respond to a valid legal
            request.
          </p>
        </article>

        <article class="space-y-3">
          <h2 class="text-xl font-semibold text-[#e8fcf8]">Your Choices</h2>
          <ul class="list-disc space-y-2 pl-5 text-sm text-[#b4d7d1]">
            <li>Use local finance features without creating a cloud account.</li>
            <li>Choose whether to sign in, join a Household, enable sync, or share information with other members.</li>
            <li>Use the app's record management, export, backup, and privacy settings where available.</li>
            <li>Manage Android analytics preferences and device permissions in the relevant settings.</li>
            <li>Review advertising choices through available in-app privacy options and device settings.</li>
            <li>
              Contact us about access, correction, deletion, or other privacy rights that apply where you live.
              Deleting local copies alone does not delete cloud or independently saved copies.
            </li>
          </ul>
        </article>

        <article class="space-y-3">
          <h2 class="text-xl font-semibold text-[#e8fcf8]">Third-Party Services</h2>
          <p class="text-sm leading-relaxed text-[#b4d7d1]">
            The services described above include Google Firebase, Google AdMob and its partners, Apple and Google
            app stores and device services, GIPHY, and optional model-hosting providers such as Hugging Face.
            Their privacy policies describe how they process and retain information:
          </p>
          <ul class="list-disc space-y-2 pl-5 text-sm text-[#b4d7d1]">
            <li><a class="text-[#56e4d1] hover:text-[#8df4e4]" href="https://policies.google.com/privacy" target="_blank" rel="noreferrer">Google Privacy Policy</a></li>
            <li><a class="text-[#56e4d1] hover:text-[#8df4e4]" href="https://www.apple.com/legal/privacy/" target="_blank" rel="noreferrer">Apple Privacy Policy</a></li>
            <li><a class="text-[#56e4d1] hover:text-[#8df4e4]" href="https://support.giphy.com/hc/en-us/articles/360032872931-GIPHY-Privacy-Policy" target="_blank" rel="noreferrer">GIPHY Privacy Policy</a></li>
            <li><a class="text-[#56e4d1] hover:text-[#8df4e4]" href="https://huggingface.co/privacy" target="_blank" rel="noreferrer">Hugging Face Privacy Policy</a></li>
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

const { content } = useMoneyManagerSiteContent()
const { isMoneyManagerFallbackPath } = useHostRouting()

const homePath = computed(() => (isMoneyManagerFallbackPath.value ? '/money-manager' : '/'))
const supportPath = computed(() => (isMoneyManagerFallbackPath.value ? '/money-manager/support' : '/support'))

useSeoMeta(() => ({
  title: `${content.value.appName} Privacy Policy`,
  description: `Privacy policy for ${content.value.appName}.`
}))
</script>
