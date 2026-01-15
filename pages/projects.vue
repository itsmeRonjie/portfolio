<template>
  <div>
    <SiteNav />
    <main class="mx-auto max-w-6xl px-6 pb-16 pt-12">
      <header class="space-y-4">
        <p class="text-xs uppercase tracking-[0.3em] text-slate-400">Projects</p>
        <h1 class="text-3xl font-semibold text-white sm:text-4xl">Projects by platform</h1>
        <p class="max-w-2xl text-sm text-slate-300">
          Highlights from my iOS, Android, Kotlin Multiplatform, and backend work.
        </p>
      </header>

      <div class="mt-8 flex flex-wrap gap-3">
        <button
          v-for="org in githubOrgs"
          :key="org.id"
          class="rounded-full border px-4 py-2 text-sm font-semibold transition"
          :class="
            activeOrgId === org.id
              ? 'border-accent/80 bg-accent/20 text-white shadow-glow'
              : 'border-border/70 bg-surface text-slate-200 hover:border-accent/60'
          "
          type="button"
          @click="activeOrgId = org.id"
        >
          {{ org.label }}
        </button>
      </div>

      <p class="mt-4 text-sm text-slate-400">{{ activeOrg.description }}</p>

      <div class="mt-8 grid gap-4 md:grid-cols-2">
        <template v-if="pending">
          <div
            v-for="skeleton in skeletonCards"
            :key="skeleton"
            class="rounded-2xl border border-border/60 bg-surface p-5 animate-pulse"
          >
            <div class="h-4 w-1/2 rounded-full bg-white/10" />
            <div class="mt-3 h-3 w-full rounded-full bg-white/5" />
            <div class="mt-2 h-3 w-4/5 rounded-full bg-white/5" />
            <div class="mt-4 flex gap-3">
              <div class="h-3 w-20 rounded-full bg-white/10" />
              <div class="h-3 w-16 rounded-full bg-white/10" />
            </div>
          </div>
        </template>

        <template v-else-if="error">
          <div class="rounded-2xl border border-border/60 bg-surface p-6 md:col-span-2">
            <p class="text-sm text-slate-300">
              Unable to load repositories right now. GitHub may be rate limiting the request.
            </p>
            <button
              class="mt-4 rounded-full border border-border/70 px-4 py-2 text-sm font-semibold text-slate-100 transition hover:border-accent/80"
              type="button"
              @click="refresh"
            >
              Retry
            </button>
          </div>
        </template>

        <template v-else>
          <article
            v-for="repo in visibleRepos"
            :key="repo.id"
            class="rounded-2xl border border-border/60 bg-surface p-5 transition hover:border-accent/60"
          >
            <div class="flex items-start justify-between gap-4">
              <div>
                <h2 class="text-lg font-semibold text-white">{{ repo.name }}</h2>
                <p class="mt-2 text-sm text-slate-300">{{ repo.description }}</p>
              </div>
              <span class="text-xs text-slate-400">Updated {{ formatDate(repo.updatedAt) }}</span>
            </div>
            <div class="mt-4 flex flex-wrap items-center gap-3 text-xs text-slate-400">
              <span class="rounded-full border border-border/60 bg-black/30 px-3 py-1">
                {{ repo.language }}
              </span>
              <span class="rounded-full border border-border/60 bg-black/30 px-3 py-1">
                Stars {{ repo.stars }}
              </span>
              <a
                class="ml-auto text-sm font-semibold text-accent-2 transition hover:text-white"
                :href="repo.htmlUrl"
                target="_blank"
                rel="noreferrer"
              >
                View repo -&gt;
              </a>
            </div>
          </article>
          <div v-if="repos.length === 0" class="rounded-2xl border border-border/60 bg-surface p-6 md:col-span-2">
            <p class="text-sm text-slate-300">No public repositories found for this org.</p>
          </div>
          <div v-if="canLoadMoreRepos" class="flex justify-center md:col-span-2">
            <button
              class="rounded-full border border-border/70 px-5 py-2 text-sm font-semibold text-slate-100 transition hover:border-accent/80"
              type="button"
              @click="loadMoreRepos"
            >
              Load more
            </button>
          </div>
        </template>
      </div>

      <section class="mt-16">
        <div class="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p class="text-xs uppercase tracking-[0.3em] text-slate-400">Google Play</p>
            <h2 class="text-2xl font-semibold text-white">Play Store listings</h2>
            <p class="mt-2 max-w-2xl text-sm text-slate-300">
              Latest Google Play releases and updates.
            </p>
          </div>
          <a
            v-if="playStoreDeveloperUrl"
            class="text-sm font-semibold text-accent-2 transition hover:text-white"
            :href="playStoreDeveloperUrl"
            target="_blank"
            rel="noreferrer"
          >
            View developer profile -&gt;
          </a>
        </div>

        <div class="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <template v-if="!hasPlayStoreDeveloper">
            <div class="rounded-2xl border border-border/60 bg-surface p-6 md:col-span-2 lg:col-span-3">
              <p class="text-sm text-slate-300">
                Add your Play Store developer ID in <span class="font-semibold">data/playStore.ts</span> to enable
                listings.
              </p>
            </div>
          </template>

          <template v-else-if="playStorePending">
            <div
              v-for="skeleton in playStoreSkeletons"
              :key="skeleton"
              class="rounded-2xl border border-border/60 bg-surface p-5 animate-pulse"
            >
              <div class="flex items-start gap-4">
                <div class="h-12 w-12 rounded-xl bg-white/10" />
                <div class="flex-1">
                  <div class="h-4 w-1/2 rounded-full bg-white/10" />
                  <div class="mt-3 h-3 w-full rounded-full bg-white/5" />
                  <div class="mt-2 h-3 w-4/5 rounded-full bg-white/5" />
                </div>
              </div>
              <div class="mt-4 flex gap-3">
                <div class="h-3 w-20 rounded-full bg-white/10" />
                <div class="h-3 w-16 rounded-full bg-white/10" />
              </div>
            </div>
          </template>

          <template v-else-if="playStoreError">
            <div class="rounded-2xl border border-border/60 bg-surface p-6 md:col-span-2 lg:col-span-3">
              <p class="text-sm text-slate-300">
                Unable to load Play Store listings right now. Try again in a moment.
              </p>
              <button
                class="mt-4 rounded-full border border-border/70 px-4 py-2 text-sm font-semibold text-slate-100 transition hover:border-accent/80"
                type="button"
                @click="refreshPlayStore"
              >
                Retry
              </button>
            </div>
          </template>

          <template v-else>
            <PlayStoreAppCard v-for="app in playStoreApps" :key="app.id" :app="app" />
            <div
              v-if="playStoreApps.length === 0"
              class="rounded-2xl border border-border/60 bg-surface p-6 md:col-span-2 lg:col-span-3"
            >
              <p class="text-sm text-slate-300">No Play Store apps found for this developer.</p>
            </div>
          </template>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup lang="ts">
import PlayStoreAppCard from '~/components/PlayStoreAppCard.vue'
import SiteNav from '~/components/SiteNav.vue'
import { githubOrgs } from '~/data/githubOrgs'

const profile = useProfile()
const playStore = usePlayStore()

useSeoMeta({
  title: 'Projects',
  description: profile.summary
})

const activeOrgId = ref(githubOrgs[0]?.id ?? 'android')
const activeOrg = computed(() => githubOrgs.find((org) => org.id === activeOrgId.value) ?? githubOrgs[0])

const { repos, pending, error, refresh } = useGithubRepos(computed(() => activeOrg.value.org))

const repoPageSize = 4
const visibleRepoCount = ref(repoPageSize)
const visibleRepos = computed(() => repos.value.slice(0, visibleRepoCount.value))
const canLoadMoreRepos = computed(() => repos.value.length > visibleRepoCount.value)

const loadMoreRepos = () => {
  visibleRepoCount.value = Math.min(visibleRepoCount.value + repoPageSize, repos.value.length)
}

watch(activeOrgId, () => {
  visibleRepoCount.value = repoPageSize
})

const normalizeDeveloperId = (value: string) => {
  const trimmed = value.trim()
  if (!trimmed) {
    return ''
  }
  try {
    return decodeURIComponent(trimmed).replace(/\+/g, ' ').trim()
  } catch {
    return trimmed.replace(/\+/g, ' ').trim()
  }
}

const playStoreDeveloperId = computed(() => normalizeDeveloperId(playStore.developerId))
const hasPlayStoreDeveloper = computed(() => playStoreDeveloperId.value.length > 0)
const playStoreDeveloperUrl = computed(() =>
  hasPlayStoreDeveloper.value
    ? `https://play.google.com/store/apps/developer?id=${encodeURIComponent(playStoreDeveloperId.value)}`
    : ''
)
const {
  apps: playStoreApps,
  pending: playStorePending,
  error: playStoreError,
  refresh: refreshPlayStore
} = usePlayStoreApps(playStoreDeveloperId, computed(() => playStore.limit))
const playStoreSkeletons = Array.from({ length: playStore.limit || 6 }, (_, index) => index)

const skeletonCards = Array.from({ length: repoPageSize }, (_, index) => index)

const formatDate = (value: string) =>
  new Date(value).toLocaleDateString('en-US', {
    month: 'short',
    year: 'numeric'
  })
</script>
