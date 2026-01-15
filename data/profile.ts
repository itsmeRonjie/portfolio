export type Experience = {
  role: string
  period: string
  company: string
  bullets: string[]
}

export type Education = {
  program: string
  school: string
}

export const profile = {
  name: 'Ronjie Diafante Man-on',
  shortName: 'Ronjie',
  initials: 'RDM',
  title: 'Software Engineer | Mobile Application Development',
  focus: 'Android (Kotlin/Jetpack Compose) / iOS (Swift/SwiftUI)',
  location: 'Cebu City, Cebu',
  phone: '+63 907 828 1150',
  email: 'manon.ronjiediafante@gmail.com',
  links: {
    linkedin: 'https://linkedin.com/in/ronjiemanon',
    github: 'https://github.com/itsmeronjie',
    portfolio: 'https://portfolio-rdmanon.vercel.app'
  },
  summary:
    'Software engineer specializing in native Android and iOS development. Builds maintainable apps using modern UI frameworks (Jetpack Compose and SwiftUI), MVVM, and Clean Architecture, collaborating in Agile teams with designers, backend engineers, and QA to ship reliable features.',
  highlights: [
    'Ships production-ready features for Android and iOS using modern native UI toolkits.',
    'Builds reusable components and clean layers to speed up delivery and reduce defects.'
  ],
  experience: [
    {
      role: 'Mobile Application Developer',
      period: 'Jan 2023 - Present',
      company: 'Vauldex Technologies Inc',
      bullets: [
        'Develop and maintain native mobile applications for Android (Kotlin/Jetpack Compose) and iOS (Swift/SwiftUI).',
        'Apply MVVM and Clean Architecture patterns to keep features modular, testable, and maintainable.',
        'Integrate REST APIs; implement authentication flows, local storage, and UI state handling.',
        'Collaborate in Agile/Scrum ceremonies, track work in Jira, and participate in code reviews and QA cycles.',
        'Support release preparation, debugging, profiling, and basic test automation where applicable.'
      ]
    }
  ] satisfies Experience[],
  education: [
    {
      program: 'Bachelor of Science in Electronics Engineering',
      school: 'Technological University of the Philippines - Visayas'
    },
    {
      program: 'Computer Engineering Technology',
      school: 'Technological University of the Philippines - Visayas'
    }
  ] satisfies Education[],
  skills: [
    'Kotlin / Jetpack Compose',
    'Swift / SwiftUI',
    'MVVM / Clean Architecture',
    'REST APIs / Networking',
    'Testing / Debugging',
    'Git / CI/CD'
  ],
  strengths: ['Ownership', 'Problem Solving', 'Collaboration', 'Attention to Detail'],
  interests: ['Open Source', 'Performance', 'UI/UX', 'Learning'],
  languages: ['English', 'Filipino']
} as const
