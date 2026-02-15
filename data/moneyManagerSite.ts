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
  heroSubtitle: 'A clean, fast, offline-first finance app that helps you track, plan, and grow your money.',
  heroDescription:
    'Track income, expenses, transfers, and fees across your accounts, then monitor balances and monthly progress at a glance. Add transactions quickly with templates, recurring rules, and smart suggestions.',
  longDescription:
    'Plan ahead with budgets, bill reminders, savings goals, sinking funds, and debt payoff planning. Analyze your finances with monthly reports, category/tag/merchant breakdowns, trends, net worth tracking, and investment snapshots. Keep detailed records with notes, tags, receipt attachments, and OCR assistance.',
  playStoreUrl: 'https://play.google.com/store/apps/details?id=itsme.ronjie.moneymanager',
  supportEmail: 'manon.ronjiediafante@gmail.com',
  privacyPath: '/privacy-policy',
  supportPath: '/support',
  trustBullets: [
    'Offline-first by default: your data stays on your device.',
    'No account required for core tracking and planning.',
    'Privacy options and optional PIN/biometric app lock are available in-app.'
  ],
  statChips: ['Offline-first', 'No account required', 'Budgets', 'Bills', 'Net worth', 'Investments'],
  features: [
    {
      id: 'accounts-live-balances',
      title: 'Multiple accounts with live balances',
      description:
        'Track all your wallets and cards in one place and see updated balances as you record activity.',
      highlights: ['Multiple account support', 'At-a-glance balances', 'Clear account overview']
    },
    {
      id: 'transaction-types',
      title: 'Income, expense, transfer, and fee tracking',
      description:
        'Capture complete cash movement with proper transaction types so records stay accurate.',
      highlights: ['Income and expense entries', 'Transfers between accounts', 'Fee tracking support']
    },
    {
      id: 'planning-suite',
      title: 'Budgets, bills, goals, and debt planning',
      description:
        'Plan monthly spending and long-term priorities with budgeting, bill reminders, savings targets, and debt payoff tools.',
      highlights: ['Budget management', 'Bill tracking and reminders', 'Savings + debt planning']
    },
    {
      id: 'quick-entry',
      title: 'Recurring transactions and quick templates',
      description:
        'Save time when adding entries using templates, recurring rules, and smart suggestions.',
      highlights: ['Reusable templates', 'Recurring transaction rules', 'Faster data entry']
    },
    {
      id: 'advanced-reports',
      title: 'Advanced reports, net worth, and investments',
      description:
        'Analyze your money with monthly reports, trends, and snapshots for net worth and investments.',
      highlights: ['Monthly report views', 'Net worth tracking', 'Investment snapshots']
    },
    {
      id: 'search-filters',
      title: 'Transaction search, filters, and saved presets',
      description:
        'Find exactly what you need with detailed search, powerful filters, and reusable preset combinations.',
      highlights: ['Search across transactions', 'Advanced filters', 'Saved filter presets']
    },
    {
      id: 'import-export',
      title: 'CSV import/export, backup, and restore',
      description:
        'Move and safeguard your data with CSV tools plus local backup and restore options.',
      highlights: ['CSV import and export', 'Backup your records', 'Restore when needed']
    },
    {
      id: 'receipts-ocr',
      title: 'Receipt attachments with OCR assistance',
      description:
        'Attach receipts to transactions and use OCR-assisted capture to keep records complete.',
      highlights: ['Receipt attachments', 'OCR-assisted entry', 'Better transaction context']
    },
    {
      id: 'personalization',
      title: 'Theme, language, and privacy options',
      description:
        'Customize how MoneyManager looks and behaves with theme, language, and privacy controls.',
      highlights: ['Theme options', 'Language settings', 'Privacy preferences']
    },
    {
      id: 'app-lock',
      title: 'Optional PIN/biometric app lock',
      description:
        'Add an extra layer of protection with optional PIN or biometric lock.',
      highlights: ['Optional PIN lock', 'Biometric unlock', 'Extra app security']
    }
  ],
  screenshots: [
    {
      id: 'home-latest',
      title: 'Home dashboard (latest)',
      src: '/apps/money-manager/screen-home-latest.png',
      alt: 'MoneyManager latest home dashboard with total balance, accounts, and budget status',
      note: 'Latest home overview with balances, account cards, and monthly spending progress.'
    },
    {
      id: 'home',
      title: 'Home dashboard',
      src: '/apps/money-manager/screen-home.png',
      alt: 'MoneyManager home dashboard with total balance and account cards',
      note: 'Balance summary, account cards, and budget status.'
    },
    {
      id: 'goals',
      title: 'Savings goals',
      src: '/apps/money-manager/screen-savings-goals.png',
      alt: 'MoneyManager savings goals list with target and saved progress',
      note: 'Goal progress with target deadlines.'
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
      id: 'settings',
      title: 'Settings and finance tools',
      src: '/apps/money-manager/screen-settings.png',
      alt: 'MoneyManager settings screen with premium and finance options',
      note: 'Access finance tools, account controls, and preferences.'
    }
  ],
  faqs: [
    {
      id: 'offline',
      question: 'Does MoneyManager work offline?',
      answer:
        'Yes. MoneyManager is offline-first and keeps your finance data on your device by default.'
    },
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
