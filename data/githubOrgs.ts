export type GithubOrg = {
  id: string
  label: string
  org: string
  description: string
}

export const githubOrgs: GithubOrg[] = [
  {
    id: 'ios',
    label: 'iOS',
    org: 'ios-dev-studio',
    description: 'iOS repositories built with Swift and SwiftUI.'
  },
  {
    id: 'android',
    label: 'Android',
    org: 'android-dev-studio',
    description: 'Android repositories built with Kotlin and Jetpack Compose.'
  },
  {
    id: 'kmp',
    label: 'KMP',
    org: 'kmp-dev-studio',
    description: 'Kotlin Multiplatform repositories and shared tooling.'
  },
  {
    id: 'backend',
    label: 'Backend',
    org: 'backend-dev-studio',
    description: 'Backend repositories and API services.'
  }
]
