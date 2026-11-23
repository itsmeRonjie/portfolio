import type { Directive } from 'vue'

/**
 * Motion directives shared by every page.
 *
 *  v-reveal  rises an element in the first time it scrolls into view.
 *  v-tilt    tilts a card toward the pointer in 3D, with a moving glare.
 *
 * Both are progressive enhancements: they only ever add classes on the client, so
 * server-rendered and no-JS pages show every element in its final state.
 * The matching CSS lives in assets/css/main.css.
 */

type RevealOptions = {
  /** Stagger delay in ms. */
  delay?: number
  /** Animate even when the element mounts inside the viewport (for late, async content). */
  appear?: boolean
}

type TiltOptions = {
  /** Maximum tilt in degrees. */
  max?: number
}

const prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches
const hasFinePointer = () => window.matchMedia('(hover: hover) and (pointer: fine)').matches

// ---- v-reveal -------------------------------------------------------------

const REVEAL_SAFETY_MS = 1700
let revealObserver: IntersectionObserver | null = null

const finishReveal = (el: HTMLElement) => {
  el.classList.remove('reveal-run', 'reveal-pending')
  el.style.removeProperty('--reveal-delay')
}

const runReveal = (el: HTMLElement) => {
  el.classList.add('reveal-run')
  // Flush styles so the transition starts from the hidden state. Synchronous on purpose: an
  // animation frame never comes in a background tab, and content must not stay hidden there.
  void el.offsetWidth
  el.classList.remove('reveal-pending')
  const delay = Number.parseFloat(el.style.getPropertyValue('--reveal-delay')) || 0
  // Release the transition override afterwards so hover and tilt transitions work normally.
  window.setTimeout(() => finishReveal(el), REVEAL_SAFETY_MS + delay)
}

const getRevealObserver = () => {
  revealObserver ??= new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) {
          continue
        }
        revealObserver?.unobserve(entry.target)
        runReveal(entry.target as HTMLElement)
      }
    },
    { rootMargin: '0px 0px -7% 0px', threshold: 0.06 }
  )
  return revealObserver
}

const reveal: Directive<HTMLElement, RevealOptions | undefined> = {
  mounted(el, binding) {
    if (prefersReducedMotion()) {
      return
    }

    const options = binding.value ?? {}
    const alreadyVisible = el.getBoundingClientRect().top < window.innerHeight * 0.94
    if (alreadyVisible && !options.appear) {
      // On screen at mount: leave it alone rather than flash it out and back in.
      return
    }

    if (options.delay) {
      el.style.setProperty('--reveal-delay', `${options.delay}ms`)
    }
    el.classList.add('reveal-pending')
    getRevealObserver().observe(el)
  },
  unmounted(el) {
    revealObserver?.unobserve(el)
  },
  getSSRProps: () => ({})
}

// ---- v-tilt ---------------------------------------------------------------

type TiltHandlers = {
  enter: (event: PointerEvent) => void
  move: (event: PointerEvent) => void
  leave: () => void
}

const tiltHandlers = new WeakMap<HTMLElement, TiltHandlers>()

const tilt: Directive<HTMLElement, TiltOptions | undefined> = {
  mounted(el, binding) {
    // Touch has no hover, and tilt is exactly the motion a reduced-motion visitor opted out of.
    if (!hasFinePointer() || prefersReducedMotion()) {
      return
    }

    const max = binding.value?.max ?? 6
    let rect: DOMRect | null = null
    let frame = 0

    const enter = (event: PointerEvent) => {
      if (event.pointerType !== 'mouse') {
        return
      }
      rect = el.getBoundingClientRect()
      el.classList.add('is-tilting')
    }

    const move = (event: PointerEvent) => {
      if (!rect) {
        return
      }
      const x = (event.clientX - rect.left) / rect.width
      const y = (event.clientY - rect.top) / rect.height
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        el.style.setProperty('--tilt-x', `${((0.5 - y) * 2 * max).toFixed(2)}deg`)
        el.style.setProperty('--tilt-y', `${((x - 0.5) * 2 * max).toFixed(2)}deg`)
        el.style.setProperty('--glare-x', `${(x * 100).toFixed(1)}%`)
        el.style.setProperty('--glare-y', `${(y * 100).toFixed(1)}%`)
      })
    }

    const leave = () => {
      cancelAnimationFrame(frame)
      rect = null
      el.classList.remove('is-tilting')
      el.style.setProperty('--tilt-x', '0deg')
      el.style.setProperty('--tilt-y', '0deg')
    }

    el.classList.add('tilt')
    el.addEventListener('pointerenter', enter)
    el.addEventListener('pointermove', move)
    el.addEventListener('pointerleave', leave)
    tiltHandlers.set(el, { enter, move, leave })
  },
  unmounted(el) {
    const handlers = tiltHandlers.get(el)
    if (!handlers) {
      return
    }
    el.removeEventListener('pointerenter', handlers.enter)
    el.removeEventListener('pointermove', handlers.move)
    el.removeEventListener('pointerleave', handlers.leave)
    tiltHandlers.delete(el)
  },
  getSSRProps: () => ({})
}

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive('reveal', reveal)
  nuxtApp.vueApp.directive('tilt', tilt)
})
