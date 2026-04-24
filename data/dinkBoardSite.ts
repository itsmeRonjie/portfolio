export type DinkBoardFeature = {
  id: string
  title: string
  description: string
  highlights: string[]
}

export type DinkBoardFaq = {
  id: string
  question: string
  answer: string
}

export type DinkBoardSiteContent = {
  appName: string
  shortName: string
  pageTitle: string
  playStoreAppId: string
  playStoreUrl: string
  appStoreUrl: string
  supportEmail: string
  privacyPath: string
  supportPath: string
  heroTitle: string
  heroSubtitle: string
  heroDescription: string
  longDescription: string
  appIconPath: string
  privacyLastUpdated: string
  trustBullets: string[]
  statChips: string[]
  features: DinkBoardFeature[]
  faqs: DinkBoardFaq[]
}

export const dinkBoardSite: DinkBoardSiteContent = {
  appName: 'DinkBoard',
  shortName: 'DinkBoard',
  pageTitle: 'DinkBoard | Pickleball Scoreboard',
  playStoreAppId: 'itsme.ronjie.dinkboardapp',
  playStoreUrl: 'https://play.google.com/store/apps/details?id=itsme.ronjie.dinkboardapp',
  appStoreUrl: '',
  supportEmail: 'manon.ronjiediafante@gmail.com',
  privacyPath: '/privacy-policy',
  supportPath: '/support',
  heroTitle: 'DinkBoard',
  heroSubtitle: 'A focused pickleball scoreboard for live matches, nearby followers, and Apple Watch scoring.',
  heroDescription:
    'Score singles or doubles, recover live matches, review history, and share a read-only nearby scoreboard from the host device. DinkBoard keeps match flow fast without accounts, feeds, or cloud setup.',
  longDescription:
    'DinkBoard is a pickleball scoreboard for singles and doubles matches. It supports traditional side-out scoring, rally scoring targets, undo and redo, match history, players, tips, theme controls, nearby read-only follower sync, and Apple Watch remote scoring on Apple platforms.',
  appIconPath: '/apps/dinkboard/dinkboard-app-icon.svg',
  privacyLastUpdated: '2026-04-24',
  trustBullets: [
    'Match data, player names, settings, and history are stored on the device.',
    'Nearby sync is host-controlled and only runs when you start hosting or joining nearby.',
    'No account, advertising SDK, third-party analytics SDK, crash reporting SDK, contacts, camera, or precise location feature is used.'
  ],
  statChips: ['Singles', 'Doubles', 'Side-out', 'Rally', 'Undo/redo', 'History', 'Nearby sync', 'Apple Watch'],
  features: [
    {
      id: 'live-scoring',
      title: 'Live match scoring',
      description:
        'Run a match from setup to finish with clear scoring controls and state derived from the same reducer contract on Android and iOS.',
      highlights: ['Singles and doubles setup', 'Traditional side-out rules', 'Rally targets at 11, 15, and 21']
    },
    {
      id: 'recovery-history',
      title: 'Recovery and match history',
      description:
        'DinkBoard persists events and snapshots locally so active matches can recover and finished matches stay reviewable.',
      highlights: ['Local active match recovery', 'Undo and redo cursor support', 'History, trash, restore, and detail views']
    },
    {
      id: 'nearby-sync',
      title: 'Nearby read-only scoreboard',
      description:
        'Hosts can broadcast the current match to nearby followers with channel and lock metadata while keeping followers read-only.',
      highlights: ['Bluetooth nearby hosting and joining', 'Channel code and optional PIN flow', 'Gap detection and resync handling']
    },
    {
      id: 'watch-scoring',
      title: 'Apple Watch remote scoring',
      description:
        'On Apple platforms, a paired Apple Watch can mirror the active match and send score, undo, and redo commands to the iPhone host.',
      highlights: ['Watch score mirror', 'Rally, undo, and redo commands', 'Phone remains the source of truth']
    },
    {
      id: 'players-settings',
      title: 'Players, settings, and tips',
      description:
        'Keep frequent players available, tune quick-start defaults, and adjust theme and launcher appearance on Android.',
      highlights: ['Player list management', 'Quick-start match defaults', 'Themes, haptics, and home tips']
    },
    {
      id: 'privacy-first',
      title: 'Private by default',
      description:
        'DinkBoard does not require a sign-in or server account to score matches, recover state, or review history.',
      highlights: ['No account required', 'No third-party telemetry SDKs found', 'Support is handled through email']
    }
  ],
  faqs: [
    {
      id: 'offline',
      question: 'Does DinkBoard work offline?',
      answer:
        'Yes. Core scoring, history, players, settings, and match recovery are local app features.'
    },
    {
      id: 'account',
      question: 'Does DinkBoard require an account?',
      answer:
        'No. DinkBoard does not require an account or cloud sign-in for match scoring.'
    },
    {
      id: 'nearby',
      question: 'Why does DinkBoard ask for Bluetooth permissions?',
      answer:
        'Bluetooth permissions support nearby host and follower sync. Nearby sync only runs when you start hosting or joining a nearby match.'
    },
    {
      id: 'location',
      question: 'Does DinkBoard collect precise location?',
      answer:
        'No. The Android manifest includes legacy fine location permission only for Bluetooth scanning on older Android versions, and Bluetooth scan is marked not for location on newer Android versions.'
    },
    {
      id: 'watch',
      question: 'What does Apple Watch sync send?',
      answer:
        'The watch companion receives the active score, team labels, match phase, serving details, and undo/redo availability, then sends scoring commands back to the paired iPhone.'
    },
    {
      id: 'support',
      question: 'How can I contact support?',
      answer: 'Send support requests to manon.ronjiediafante@gmail.com.'
    }
  ]
}
