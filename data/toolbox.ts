export type Tool = {
  name: string
  description: string
  icon: string
  isPlaceholder?: boolean
}

export const toolbox: Tool[] = [
  {
    name: 'Kotlin / Jetpack Compose',
    description: 'Modern Android UI with Compose and Kotlin-first architecture.',
    icon: 'android'
  },
  {
    name: 'Swift / SwiftUI',
    description: 'Native iOS interfaces with SwiftUI and MVVM patterns.',
    icon: 'apple'
  },
  {
    name: 'MVVM / Clean Architecture',
    description: 'Layered app structure that keeps features modular and testable.',
    icon: 'jira'
  },
  {
    name: 'REST APIs / Networking',
    description: 'API integration, data flows, and error handling.',
    icon: 'cloud'
  },
  {
    name: 'Testing / Debugging',
    description: 'Profiling, debugging, and regression coverage.',
    icon: 'terminal'
  },
  {
    name: 'Git / CI/CD',
    description: 'Version control and release automation.',
    icon: 'terminal'
  }
]
