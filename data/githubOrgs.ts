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

// Use the repositories' uploaded social images directly instead of generating cards for them.
export const githubRepoPreviewImages: Readonly<Record<string, string>> = {
  'android-dev-studio/GWeather': 'https://repository-images.githubusercontent.com/1060493166/12620bab-dbc0-4610-87d4-1b55514516fe',
  'kmp-dev-studio/Portfolio': 'https://repository-images.githubusercontent.com/1075082160/4db18fe1-1c89-475f-bf6c-4b4d7699dc8a'
}
