export type ArchitectureLayer = {
  id: string
  name: string
  /** Pattern or role the layer plays, shown as a small tag. */
  role: string
  description: string
  parts: string[]
  /** Key into ToolIcon. */
  icon: string
  /** Accent as an "r g b" triplet, so CSS can apply its own alpha. */
  color: string
}

/**
 * The layering used across the Android and iOS apps (MVVM + Clean Architecture),
 * listed top to bottom. Rendered as an exploded 3D stack in the Stack section.
 */
export const architectureLayers: ArchitectureLayer[] = [
  {
    id: 'ui',
    name: 'UI',
    role: 'Screens',
    description: 'Declarative screens in Jetpack Compose and SwiftUI that render state and forward user events.',
    parts: ['Jetpack Compose', 'SwiftUI'],
    icon: 'android',
    color: '61 220 132'
  },
  {
    id: 'presentation',
    name: 'Presentation',
    role: 'MVVM',
    description: 'ViewModels own the UI state and turn each event into a call on the layer below.',
    parts: ['ViewModel', 'UI state'],
    icon: 'state',
    color: '90 200 250'
  },
  {
    id: 'domain',
    name: 'Domain',
    role: 'Clean Architecture',
    description: 'Use cases hold the business rules, free of framework code so they stay easy to test.',
    parts: ['Use cases', 'Models'],
    icon: 'flow',
    color: '111 227 192'
  },
  {
    id: 'data',
    name: 'Data',
    role: 'Sources',
    description: 'Repositories put REST APIs and local storage behind one interface for the layers above.',
    parts: ['Repositories', 'REST APIs', 'Local storage'],
    icon: 'database',
    color: '252 211 77'
  }
]
