import type { Config } from 'tailwindcss'

export default {
  content: [
    './components/**/*.{vue,js,ts}',
    './data/**/*.{js,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './app.vue',
    './plugins/**/*.{js,ts}',
    './nuxt.config.{js,ts}'
  ],
  theme: {
    extend: {
      colors: {
        canvas: '#070b11',
        'canvas-2': '#0d141c',
        surface: 'rgba(13, 20, 30, 0.78)',
        'surface-strong': 'rgba(9, 15, 23, 0.92)',
        border: 'rgba(142, 159, 181, 0.24)',
        accent: '#3ddc84',
        'accent-2': '#5ac8fa',
        glow: '#7edab1',
        android: '#3ddc84',
        ios: '#5ac8fa',
        terminal: '#7ee787'
      },
      fontFamily: {
        sans: ['"Sora"', '"Manrope"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace']
      },
      fontSize: {
        // Fluid display sizes: one value from 360px phones to wide desktops.
        display: ['clamp(2.6rem, 4.1vw + 1rem, 5.25rem)', { lineHeight: '0.98', letterSpacing: '-0.04em' }],
        tagline: ['clamp(1.3rem, 1.25vw + 0.95rem, 2rem)', { lineHeight: '1.22', letterSpacing: '-0.025em' }],
        section: ['clamp(1.75rem, 1.5vw + 1.2rem, 2.6rem)', { lineHeight: '1.1', letterSpacing: '-0.03em' }]
      },
      boxShadow: {
        panel: '0 24px 70px rgba(1, 6, 12, 0.45)',
        glow: '0 0 42px rgba(61, 220, 132, 0.28)',
        android: '0 0 45px rgba(61, 220, 132, 0.3)',
        ios: '0 0 45px rgba(90, 200, 250, 0.25)',
        glass: 'inset 0 1px 0 rgba(255, 255, 255, 0.12), 0 18px 50px rgba(1, 6, 12, 0.5)',
        lift: '0 32px 80px rgba(1, 6, 12, 0.6)'
      },
      transitionTimingFunction: {
        spring: 'var(--ease-spring)',
        'spring-bouncy': 'var(--ease-spring-bouncy)',
        'out-expo': 'cubic-bezier(0.16, 1, 0.3, 1)'
      },
      keyframes: {
        'stagger-in': {
          '0%': { opacity: '0', transform: 'translateY(14px) scale(0.985)' },
          '100%': { opacity: '1', transform: 'translateY(0) scale(1)' }
        },
        'float-y': {
          '0%, 100%': { transform: 'translate3d(0, -6px, 0)' },
          '50%': { transform: 'translate3d(0, 6px, 0)' }
        },
        marquee: {
          '0%': { transform: 'translate3d(0, 0, 0)' },
          '100%': { transform: 'translate3d(-50%, 0, 0)' }
        },
        'pulse-dot': {
          '0%': { transform: 'scale(1)', opacity: '0.7' },
          '70%, 100%': { transform: 'scale(2.6)', opacity: '0' }
        },
        'tab-pop': {
          '0%': { transform: 'scale(0.82)' },
          '100%': { transform: 'scale(1)' }
        }
      },
      animation: {
        'stagger-in': 'stagger-in 0.55s ease-out both',
        'float-y': 'float-y 7s ease-in-out infinite',
        marquee: 'marquee 38s linear infinite',
        'pulse-dot': 'pulse-dot 2.2s cubic-bezier(0.16, 1, 0.3, 1) infinite',
        'tab-pop': 'tab-pop 0.45s var(--ease-spring-bouncy) both'
      }
    }
  },
  plugins: []
} satisfies Config
