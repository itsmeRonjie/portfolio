export type Project = {
  title: string
  description: string
  bullets: string[]
  tags: string[]
  accent: string
  githubOrg?: string
  link?: string
  linkLabel?: string
  isPlaceholder?: boolean
}

export const projects: Project[] = [
  {
    title: 'Android Dev Studio Repositories',
    description: 'Repository collection for Android work built with Kotlin and Jetpack Compose.',
    bullets: [
      'Problem: Build reliable Android experiences with modern UI and architecture.',
      'Solution: MVVM + Clean Architecture, Compose UI, and REST-driven data flows.',
      'Result: Production-ready features with reusable components.'
    ],
    tags: ['Android', 'Kotlin', 'Jetpack Compose'],
    accent: 'from-accent/30 via-accent/12 to-transparent',
    githubOrg: 'android-dev-studio',
    link: 'https://github.com/orgs/android-dev-studio/repositories',
    linkLabel: 'View GitHub org'
  },
  {
    title: 'iOS Dev Studio Repositories',
    description: 'Repository collection for iOS work built with Swift and SwiftUI.',
    bullets: [
      'Problem: Deliver smooth iOS experiences with clear UX and performance.',
      'Solution: SwiftUI + MVVM, Clean Architecture, and REST integrations.',
      'Result: Production-ready features with reusable components.'
    ],
    tags: ['iOS', 'Swift', 'SwiftUI'],
    accent: 'from-accent-2/30 via-accent-2/12 to-transparent',
    githubOrg: 'ios-dev-studio',
    link: 'https://github.com/orgs/ios-dev-studio/repositories',
    linkLabel: 'View GitHub org'
  },
  {
    title: 'KMP Dev Studio Repositories',
    description: 'Repository collection for Kotlin Multiplatform work and shared modules.',
    bullets: [
      'Problem: Reduce duplication between Android and iOS feature logic.',
      'Solution: Kotlin Multiplatform shared layers with clean boundaries.',
      'Result: Consistent behavior across platforms with shared modules.'
    ],
    tags: ['KMP', 'Kotlin', 'Multiplatform'],
    accent: 'from-accent/20 via-accent-2/16 to-transparent',
    githubOrg: 'kmp-dev-studio',
    link: 'https://github.com/orgs/kmp-dev-studio/repositories',
    linkLabel: 'View GitHub org'
  }
]
