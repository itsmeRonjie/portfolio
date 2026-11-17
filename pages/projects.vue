<template>
  <div>
    <SiteNav />
    <main class="mx-auto max-w-6xl px-5 pb-20 pt-10 sm:px-6 sm:pt-14">
      <header v-reveal class="space-y-4">
        <p class="ui-eyebrow">Project Index</p>
        <h1 class="text-section font-semibold text-white sm:text-[clamp(2.25rem,3vw+1rem,3.5rem)]">Mobile Studio Project Board</h1>
        <p class="max-w-2xl text-sm text-slate-300">
          Platform-focused repositories spanning Android, iOS, and shared Kotlin Multiplatform systems.
        </p>
      </header>

      <div class="mt-8 flex flex-wrap gap-3">
        <button
          v-for="org in githubOrgs"
          :key="org.id"
          class="rounded-full border px-4 py-2 font-mono text-xs font-semibold tracking-[0.04em] transition"
          :class="
            activeOrgId === org.id
              ? 'border-accent/55 bg-accent/15 text-accent shadow-glow'
              : 'border-border/70 bg-surface text-slate-200 hover:border-accent-2/45'
          "
          type="button"
          @click="activeOrgId = org.id"
        >
          {{ org.label }}
        </button>
      </div>

      <p class="mt-4 text-sm text-slate-300">{{ activeOrg.description }}</p>

      <div class="mt-8 grid gap-4 md:grid-cols-2">
        <template v-if="pending">
          <div
            v-for="skeleton in skeletonCards"
            :key="skeleton"
            class="ui-panel !rounded-2xl !p-5 animate-pulse"
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
          <div class="ui-panel md:col-span-2">
            <p class="text-sm text-slate-300">
              Unable to load repositories right now. GitHub may be rate limiting the request.
            </p>
            <button
              class="ui-cta-secondary mt-4 !px-4 !py-2"
              type="button"
              @click="refresh()"
            >
              Retry
            </button>
          </div>
        </template>

        <template v-else>
          <article
            v-for="repo in visibleRepos"
            :key="repo.id"
            v-tilt="{ max: 4 }"
            class="ui-panel !rounded-2xl !p-5 transition-colors hover:border-accent/40"
          >
            <div class="flex items-start justify-between gap-4">
              <div>
                <h2 class="text-lg font-semibold text-white">{{ repo.name }}</h2>
                <p class="mt-2 text-sm text-slate-300">{{ repo.description }}</p>
              </div>
              <span class="ui-chip !px-2 !py-0.5 !text-[10px] font-mono text-slate-300">
                Updated {{ formatDate(repo.updatedAt) }}
              </span>
            </div>
            <div class="mt-4 flex flex-wrap items-center gap-3 text-xs text-slate-400">
              <span class="ui-chip border-accent/40 bg-accent/10 font-mono text-accent">
                {{ repo.language }}
              </span>
              <span class="ui-chip font-mono">
                Stars {{ repo.stars }}
              </span>
              <a
                class="ui-link ml-auto"
                :href="repo.htmlUrl"
                target="_blank"
                rel="noreferrer"
              >
                View repo -&gt;
              </a>
            </div>
          </article>
          <div v-if="repos.length === 0" class="ui-panel md:col-span-2">
            <p class="text-sm text-slate-300">No public repositories found for this org.</p>
          </div>
          <div v-if="canLoadMoreRepos" class="flex justify-center md:col-span-2">
            <button
              class="ui-cta-secondary"
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
            <p class="ui-eyebrow">Google Play</p>
            <h2 class="ui-section-title mt-3">Published Mobile Apps</h2>
            <p class="mt-2 max-w-2xl text-sm text-slate-300">
              Live listing snapshots from the latest Android releases.
            </p>
          </div>
          <a
            v-if="developerUrl"
            class="ui-link"
            :href="developerUrl"
            target="_blank"
            rel="noreferrer"
          >
            Open developer profile -&gt;
          </a>
        </div>

        <PlayStoreGrid class="mt-8" />
      </section>
    </main>
  </div>
</template>

<script setup lang="ts">
import PlayStoreGrid from '~/components/PlayStoreGrid.vue'
import SiteNav from '~/components/SiteNav.vue'
import { githubOrgs } from '~/data/githubOrgs'

const profile = useProfile()

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

const { developerUrl } = usePlayStoreDeveloper()

const skeletonCards = Array.from({ length: repoPageSize }, (_, index) => index)

const formatDate = (value: string) =>
  new Date(value).toLocaleDateString('en-US', {
    month: 'short',
    year: 'numeric'
  })
</script>
