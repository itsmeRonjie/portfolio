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
  playStoreAppId: string
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
  appName: 'Money Manager: Expense Tracker',
  shortName: 'MoneyManager',
  pageTitle: 'Money Manager: Expense Tracker',
  playStoreAppId: 'itsme.ronjie.moneymanager',
  heroScreenshotId: 'home-overview',
  heroTitle: 'Money Manager: Expense Tracker',
  heroSubtitle:
    'Expense tracker, budget planner, bill reminders, and net worth in one app.',
  heroDescription:
    'Money Manager is an expense tracker and budget planner that helps you manage spending, bills, savings goals, debt, and net worth in one place. Record expenses, income, and transfers in seconds. Stay on top of monthly budgets, upcoming bills, and future balances with clear reports, reminders, and forecasts.',
  longDescription:
    'Money Manager is an expense tracker and budget planner that helps you manage spending, bills, savings goals, debt, and net worth in one place.\n\nRecord expenses, income, and transfers in seconds. Stay on top of monthly budgets, upcoming bills, and future balances with clear reports, reminders, and forecasts.\n\nWhether you want a simple way to track daily expenses or a more complete personal finance app, Money Manager helps you plan ahead and understand where your money is going.\n\nKey features:\n• Track expenses, income, transfers, and split transactions\n• Build monthly budgets and see how much you have left to spend\n• Manage bills with due dates, reminders, and payment history\n• Set savings goals and sinking funds with progress tracking\n• View spending reports, category trends, and top merchants\n• Track net worth, assets, and investment holdings\n• Forecast future balances and spot shortfalls earlier\n• Import transactions from CSV or XLSX with duplicate detection\n• Protect your data with app lock and privacy mode',
  playStoreUrl: 'https://play.google.com/store/apps/details?id=itsme.ronjie.moneymanager',
  supportEmail: 'manon.ronjiediafante@gmail.com',
  privacyPath: '/privacy-policy',
  supportPath: '/support',
  trustBullets: [
    'Offline-first by default: core finance data stays on your device unless you export it.',
    'No account required for tracking, planning, reports, and daily reminders.',
    'PIN/biometric app lock, privacy mode, and local backup/restore are available in-app.'
  ],
  statChips: ['Offline-first', 'Budgets', 'Bills', 'Goals', 'Debt payoff', 'Reports', 'Net worth', 'Investments'],
  features: [
    {
      id: 'dashboard-overview',
      title: 'Dashboard with balances, budgets, bills, and goals',
      description:
        'Open to a home view that surfaces your total balance, monthly trend, account snapshots, savings goals, and upcoming bills.',
      highlights: ['Total balance + trend chart', 'Budget and savings summaries', 'Upcoming bills and subscription prompts']
    },
    {
      id: 'accounts-categories',
      title: 'Accounts, credit cards, and category management',
      description:
        'Organize wallets, bank accounts, credit cards, and categories with sorting, archive, statement, and visual customization options.',
      highlights: ['Multiple account types', 'Credit card statement support', 'Custom category icons and colors']
    },
    {
      id: 'transactions-engine',
      title: 'Fast transaction tracking with search and filters',
      description:
        'Record income, expense, transfer, and fee entries quickly, then find anything later with filters, presets, grouping, and search.',
      highlights: ['Income, expense, transfer, and fee entries', 'Saved filter presets and calendar view', 'Split transactions and quick add']
    },
    {
      id: 'planning-suite',
      title: 'Budgets, bills, goals, forecasts, and financial health',
      description:
        'Plan monthly spending and longer-term priorities with budget cards, bill reminders, savings goals, forecasts, and health views.',
      highlights: ['Monthly budget progress', 'Bills reminders, snooze, and mark paid', 'Goals, forecasts, and finance health views']
    },
    {
      id: 'debt-obligations',
      title: 'Debt payoff and obligation tracking',
      description:
        'Stay on top of debt with payoff planning, borrowed and lent obligation records, and detailed settlement flows.',
      highlights: ['Snowball and avalanche payoff planning', 'Borrowed and lent obligation tracking', 'Settlement, archive, and history views'],
      premium: true
    },
    {
      id: 'reports-analytics',
      title: 'Reports, net worth, investments, and trends',
      description:
        'Review spending from multiple angles with charts, breakdowns, top merchants, trend views, net worth, and investments dashboards.',
      highlights: ['Spending overview and breakdown charts', 'Top categories, tags, and merchants', 'Net worth and investments dashboards']
    },
    {
      id: 'automation-reminders',
      title: 'Rules, recurring transactions, and reminders',
      description:
        'Automate repetitive finance work with rules, recurring entries, bill reminders, and background reminder jobs.',
      highlights: ['Transaction rules engine', 'Recurring transaction generation', 'Bill and daily reminder scheduling'],
      premium: true
    },
    {
      id: 'imports-receipts',
      title: 'CSV tools, backups, and receipt OCR',
      description:
        'Bring data in, export it out, and keep records complete with CSV and spreadsheet tools, local backups, attachments, and OCR assistance.',
      highlights: ['CSV and spreadsheet import', 'Backup export and restore', 'Receipt attachments with OCR suggestions']
    },
    {
      id: 'customization-security',
      title: 'Themes, language, and app security',
      description:
        'Tune the app to your setup with currency and month-start preferences, theme palettes, fonts, privacy mode, and app lock.',
      highlights: ['Theme palettes, fonts, and custom colors', 'Language, currency, and month-start settings', 'PIN, biometrics, and privacy mode']
    },
    {
      id: 'widgets-shortcuts',
      title: 'Widgets, shortcuts, and deep links',
      description:
        'Jump into key actions faster with launcher shortcuts, widgets, and deep links that open the screens you use most.',
      highlights: ['Quick add launcher shortcuts', 'Widget support and refresh actions', 'Deep-link routing to key destinations'],
      premium: true
    }
  ],
  screenshots: [
    {
      id: 'home-overview',
      title: 'Home dashboard',
      src: '/apps/money-manager/screen-home-latest.png',
      alt: 'MoneyManager home dashboard with total balance, debt and loan cards, account cards, and bottom navigation',
      note: 'The current home screen combines balance trends, debts and loans, account snapshots, and quick entry actions.'
    },
    {
      id: 'transactions',
      title: 'Transactions list',
      src: '/apps/money-manager/screen-transactions.png',
      alt: 'MoneyManager transactions screen with monthly totals, filter chips, transaction rows, and quick action buttons',
      note: 'Scan recent entries, switch transaction types, and jump between list and calendar views from one screen.'
    },
    {
      id: 'edit-transaction',
      title: 'Transaction editor',
      src: '/apps/money-manager/screen-edit-transaction.png',
      alt: 'MoneyManager edit transaction screen with type picker, amount entry, account selector, and numeric keypad',
      note: 'Edit or add entries with focused amount input, account selection, and category mode controls.'
    },
    {
      id: 'plan',
      title: 'Plan hub',
      src: '/apps/money-manager/screen-plan-overview.png',
      alt: 'MoneyManager plan screen with budgets, goals, bills, recurring transactions, debts and loans, and debt payoff planner cards',
      note: 'The planning hub surfaces budgets, goals, bills, recurring entries, debts and loans, and payoff planning.'
    },
    {
      id: 'reports',
      title: 'Reports breakdown',
      src: '/apps/money-manager/screen-reports-breakdown.png',
      alt: 'MoneyManager reports screen showing spending tabs, monthly totals, and a category breakdown chart',
      note: 'Review spending totals and category breakdowns with the current reports dashboard.'
    },
    {
      id: 'settings-finance',
      title: 'Finance settings',
      src: '/apps/money-manager/screen-settings.png',
      alt: 'MoneyManager settings screen with premium, account management, categories, rules, currency, and exchange rate settings',
      note: 'Manage premium tools, accounts, categories, rules, currency, and exchange rate preferences.'
    },
    {
      id: 'settings-reminders',
      title: 'Automation and reminders',
      src: '/apps/money-manager/screen-settings-reminders.png',
      alt: 'MoneyManager settings screen with smart suggestions, daily transaction reminders, bill reminder offsets, and privacy mode',
      note: 'Configure automation, daily reminders, bill reminder offsets, sound, vibration, and privacy mode.'
    },
    {
      id: 'theme-customization',
      title: 'Theme customization',
      src: '/apps/money-manager/screen-theme.png',
      alt: 'MoneyManager theme settings screen with visual style presets, color palettes, and font selection',
      note: 'Switch visual styles, palettes, and fonts to match the look you want.'
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
      id: 'account',
      question: 'Does MoneyManager require an account?',
      answer:
        'No. You can use core tracking features without creating an account. Your records are stored on your device.'
    },
    {
      id: 'imports',
      question: 'Can I import, export, or back up my data?',
      answer:
        'Yes. MoneyManager supports CSV import and export, spreadsheet import, plus local backup export and restore.'
    },
    {
      id: 'automation',
      question: 'Does MoneyManager support reminders or recurring transactions?',
      answer:
        'Yes. The app includes recurring transactions, rules, bill reminders, and daily reminder flows.'
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
