export type Project = {
  title: string
  description: string
  bullets: string[]
  tags: string[]
  accent: string
  githubOrg?: string
  link?: string
  linkLabel?: string
  previewImage?: string
  previewAlt?: string
  isPlaceholder?: boolean
}

export const projects: Project[] = [
  {
    title: 'DinkBoard',
    description: 'Pickleball scoreboard app for live scoring, local recovery, nearby sync, and Apple Watch scoring.',
    bullets: [
      'Problem: Keep pickleball scoring fast and reliable from court setup through match history.',
      'Solution: Reducer-driven Android and iOS apps with local persistence, Bluetooth nearby sync, and watchOS remote scoring.',
      'Result: A private-by-default app website with support and privacy surfaces for store readiness.'
    ],
    tags: ['Android', 'iOS', 'SwiftUI', 'Jetpack Compose'],
    accent: 'from-[#8bca1e]/30 via-[#ff7a2e]/14 to-transparent',
    link: 'https://dinkboard.ronjiemanon.com',
    linkLabel: 'Open app site',
    previewImage: '/apps/dinkboard/dinkboard-app-icon.svg',
    previewAlt: 'DinkBoard app icon'
  },
  {
    title: 'Money Manager: Expense Tracker',
    description: 'Personal finance app website and support surface for budgeting, transactions, reports, and planning.',
    bullets: [
      'Problem: Present a large finance app clearly for users and store review.',
      'Solution: Dedicated app subdomain with product copy, screenshots, support, and privacy policy.',
      'Result: A market-facing app site backed by structured content and host-aware routing.'
    ],
    tags: ['Android', 'Kotlin', 'Nuxt'],
    accent: 'from-[#31dbc2]/28 via-[#2d7067]/12 to-transparent',
    link: 'https://moneymanager.ronjiemanon.com',
    linkLabel: 'Open app site',
    previewImage: '/apps/money-manager/screen-home-latest.png',
    previewAlt: 'Money Manager home dashboard screenshot'
  },
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
