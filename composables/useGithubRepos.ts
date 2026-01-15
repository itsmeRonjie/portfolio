import { computed, unref } from 'vue'
import type { Ref } from 'vue'

export type GithubRepo = {
  id: number
  name: string
  description: string
  htmlUrl: string
  language: string
  stars: number
  updatedAt: string
}

type GithubApiRepo = {
  id: number
  name: string
  description: string | null
  html_url: string
  language: string | null
  stargazers_count: number
  updated_at: string
  fork: boolean
  archived: boolean
}

export const useGithubRepos = (org: string | Ref<string>) => {
  const orgName = computed(() => unref(org))
  const url = computed(
    () => `https://api.github.com/orgs/${orgName.value}/repos?per_page=100&sort=updated&direction=desc`
  )

  const { data, pending, error, refresh } = useFetch<GithubApiRepo[]>(url, {
    key: computed(() => `github-${orgName.value}`),
    server: false,
    default: () => [],
    watch: [orgName],
    headers: {
      Accept: 'application/vnd.github+json'
    }
  })

  const repos = computed<GithubRepo[]>(() =>
    (data.value ?? [])
      .filter((repo) => !repo.fork && !repo.archived && repo.name !== '.github')
      .map((repo) => ({
        id: repo.id,
        name: repo.name,
        description: repo.description ?? 'No description provided.',
        htmlUrl: repo.html_url,
        language: repo.language ?? 'Unknown',
        stars: repo.stargazers_count,
        updatedAt: repo.updated_at
      }))
  )

  return { repos, pending, error, refresh }
}
