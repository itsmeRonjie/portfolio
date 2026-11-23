import type { RouterConfig } from '@nuxt/schema'

// Smooth-scroll to in-page anchors (/#work, /#contact) unless the visitor asked for reduced motion.
// Nuxt's default scrollBehavior reads this and also honours each target's `scroll-margin-top`.
const prefersReducedMotion =
  import.meta.client && window.matchMedia('(prefers-reduced-motion: reduce)').matches

export default {
  scrollBehaviorType: prefersReducedMotion ? 'auto' : 'smooth'
} satisfies RouterConfig
