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
      boxShadow: {
        panel: '0 24px 70px rgba(1, 6, 12, 0.45)',
        glow: '0 0 42px rgba(61, 220, 132, 0.28)',
        android: '0 0 45px rgba(61, 220, 132, 0.3)',
        ios: '0 0 45px rgba(90, 200, 250, 0.25)'
      },
      keyframes: {
        'stagger-in': {
          '0%': { opacity: '0', transform: 'translateY(14px) scale(0.985)' },
          '100%': { opacity: '1', transform: 'translateY(0) scale(1)' }
        },
        'drawer-in': {
          '0%': { opacity: '0', transform: 'translateX(16px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' }
        },
        'scan-pulse': {
          '0%, 100%': { opacity: '0.42', transform: 'scaleX(0.9)' },
          '50%': { opacity: '0.8', transform: 'scaleX(1)' }
        }
      },
      animation: {
        'stagger-in': 'stagger-in 0.55s ease-out both',
        'drawer-in': 'drawer-in 0.25s ease-out both',
        'scan-pulse': 'scan-pulse 2.6s ease-in-out infinite'
      }
    }
  },
  plugins: []
} satisfies Config
