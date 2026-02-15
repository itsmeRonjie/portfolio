export type MoneyManagerFeature = {
  id: string
  title: string
  description: string
  highlights: string[]
  premium?: boolean
}

export type MoneyManagerScreenshot = {
  id: string
  title: string
  src: string
  alt: string
  note: string
}

export type MoneyManagerFaq = {
  id: string
  question: string
  answer: string
}

export type MoneyManagerSiteContent = {
  appName: string
  shortName: string
  pageTitle: string
  heroScreenshotId: string
  heroTitle: string
  heroSubtitle: string
  heroDescription: string
  longDescription: string
  playStoreUrl: string
  supportEmail: string
  privacyPath: string
  supportPath: string
  trustBullets: string[]
  statChips: string[]
  features: MoneyManagerFeature[]
  screenshots: MoneyManagerScreenshot[]
  faqs: MoneyManagerFaq[]
}

export const moneyManagerSite: MoneyManagerSiteContent = {
  appName: 'MoneyManager',
  shortName: 'Money Manager',
  pageTitle: 'MoneyManager | Smart Wealth Tracking',
  heroScreenshotId: 'home',
  heroTitle: 'MoneyManager',
  heroSubtitle: 'Smart wealth tracking for daily spending, budgets, bills, and goals.',
  heroDescription:
    'Track income, expenses, accounts, and savings in one focused workspace. MoneyManager is built for clear monthly visibility and fast day-to-day finance updates.',
  longDescription:
    'MoneyManager helps you monitor cash flow, manage accounts, follow budgets, and stay ahead of recurring bills. Review detailed spending and net worth trends, then take action with clear summaries and transaction-level detail.',
  playStoreUrl: 'https://play.google.com/store/apps/details?id=itsme.ronjie.moneymanager',
  supportEmail: 'manon.ronjiediafante@gmail.com',
  privacyPath: '/privacy-policy',
  supportPath: '/support',
  trustBullets: [
    'Finance records are stored locally on your device.',
    'No account is required to use core tracking features.',
    'Privacy policy and support are available directly from the app website.'
  ],
  statChips: ['Transactions', 'Budgets', 'Bills', 'Reports', 'Savings Goals', 'Accounts'],
  features: [
    {
      id: 'transactions',
      title: 'Fast transaction tracking',
      description:
        'Capture income, expense, and transfer activity with clear list filters so month-end review takes minutes, not hours.',
      highlights: ['Income / Expense / Transfer filters', 'Daily grouping and totals', 'Quick add actions']
    },
    {
      id: 'budgets',
      title: 'Monthly budget control',
      description:
        'Track category limits and see overspent versus on-track status at a glance with progress-driven budget cards.',
      highlights: ['Remaining budget ring', 'Overspent alerts', 'Category-level progress']
    },
    {
      id: 'bills',
      title: 'Recurring bill planning',
      description:
        'Plan upcoming bills, monitor due dates, and filter by paid, overdue, or subscription status to avoid missed payments.',
      highlights: ['Upcoming / Overdue views', 'Due-date countdowns', 'Recurring setup'],
      premium: true
    },
    {
      id: 'reports',
      title: 'Clear spending and net worth reports',
      description:
        'Understand where money goes using chart-driven breakdowns, trends, and top merchant summaries across selected periods.',
      highlights: ['Category breakdown chart', 'Spending trend timeline', 'Net worth and investment tabs']
    },
    {
      id: 'goals',
      title: 'Savings goals that stay visible',
      description:
        'Track progress toward multiple goals with target dates and saved-versus-target snapshots in one list.',
      highlights: ['Goal progress bars', 'Target-date tracking', 'Multiple goals in one view']
    },
    {
      id: 'accounts',
      title: 'Account-level balance visibility',
      description:
        'Monitor wallets and cards with account-specific balances so cash position and debt movement remain easy to follow.',
      highlights: ['Cash and card cards', 'Balance snapshots', 'Account management'],
      premium: true
    }
  ],
  screenshots: [
    {
      id: 'home',
      title: 'Home dashboard',
      src: '/apps/money-manager/screen-home.png',
      alt: 'MoneyManager home dashboard with total balance and account cards',
      note: 'Balance summary, account cards, and budget status.'
    },
    {
      id: 'transactions',
      title: 'Transactions',
      src: '/apps/money-manager/screen-transactions.png',
      alt: 'MoneyManager transactions screen with filters and transaction list',
      note: 'Daily transaction feed with quick filtering.'
    },
    {
      id: 'budgets',
      title: 'Budgets',
      src: '/apps/money-manager/screen-budgets.png',
      alt: 'MoneyManager budget screen with spending ring and category progress bars',
      note: 'Track overspending and remaining budget in real time.'
    },
    {
      id: 'bills',
      title: 'Bills planner',
      src: '/apps/money-manager/screen-bills.png',
      alt: 'MoneyManager bills screen with upcoming and overdue filters',
      note: 'Keep upcoming and recurring bill payments organized.'
    },
    {
      id: 'reports-breakdown',
      title: 'Reports breakdown',
      src: '/apps/money-manager/screen-reports-breakdown.png',
      alt: 'MoneyManager reports screen showing spending category bar chart',
      note: 'Category spending analysis for monthly review.'
    },
    {
      id: 'reports-trend',
      title: 'Reports trend',
      src: '/apps/money-manager/screen-reports-trend.png',
      alt: 'MoneyManager reports trend screen with top merchants donut chart',
      note: 'Spending trends and top merchant distribution.'
    },
    {
      id: 'goals',
      title: 'Savings goals',
      src: '/apps/money-manager/screen-savings-goals.png',
      alt: 'MoneyManager savings goals list with target and saved progress',
      note: 'Goal progress with target deadlines.'
    },
    {
      id: 'settings',
      title: 'Settings and finance tools',
      src: '/apps/money-manager/screen-settings.png',
      alt: 'MoneyManager settings screen with premium and finance options',
      note: 'Access finance tools, account controls, and preferences.'
    }
  ],
  faqs: [
    {
      id: 'sync',
      question: 'Does MoneyManager require an account?',
      answer:
        'No. You can use core tracking features without creating an account. Your records are stored on your device.'
    },
    {
      id: 'backup',
      question: 'Where is my finance data stored?',
      answer:
        'Your finance entries are stored locally on your device. If cloud sync is introduced later, the privacy policy will be updated before launch.'
    },
    {
      id: 'premium',
      question: 'Are premium features available?',
      answer:
        'Yes. Some capabilities are marked as premium inside the app. The website highlights these features without publishing pricing claims.'
    },
    {
      id: 'support',
      question: 'How can I contact support?',
      answer: 'Send support requests to manon.ronjiediafante@gmail.com.'
    },
    {
      id: 'play-store',
      question: 'Where can I install MoneyManager?',
      answer:
        'Install from Google Play using the official listing linked from this website: play.google.com/store/apps/details?id=itsme.ronjie.moneymanager.'
    }
  ]
}
