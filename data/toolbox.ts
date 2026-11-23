export type Tool = {
  name: string
  description: string
  icon: string
  /** Brand marks from public/icons, shown on the large platform cards. */
  logos?: string[]
  /** Platform cards span wider in the stack grid. */
  platform?: 'android' | 'ios'
  isPlaceholder?: boolean
}

export const toolbox: Tool[] = [
  {
    name: 'Kotlin / Jetpack Compose',
    description: 'Modern Android UI with Compose and Kotlin-first architecture.',
    icon: 'android',
    logos: ['/icons/kotlin.svg', '/icons/jetpackcompose.svg'],
    platform: 'android'
  },
  {
    name: 'Swift / SwiftUI',
    description: 'Native iOS interfaces with SwiftUI and MVVM patterns.',
    icon: 'apple',
    logos: ['/icons/swift.svg', '/icons/swiftui.svg'],
    platform: 'ios'
  },
  {
    name: 'MVVM / Clean Architecture',
    description: 'Layered app structure that keeps features modular and testable.',
    icon: 'layers'
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
    icon: 'git'
  }
]
