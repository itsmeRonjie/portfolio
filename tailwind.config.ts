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
        canvas: '#0b0713',
        'canvas-2': '#12081f',
        surface: 'rgba(17, 12, 28, 0.7)',
        'surface-strong': 'rgba(24, 17, 38, 0.9)',
        border: 'rgba(160, 139, 214, 0.18)',
        accent: '#7c3aed',
        'accent-2': '#a855f7',
        glow: '#8b5cf6'
      },
      fontFamily: {
        sans: ['"Space Grotesk"', 'ui-sans-serif', 'system-ui', 'sans-serif']
      },
      boxShadow: {
        glow: '0 0 40px rgba(124, 58, 237, 0.35)'
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' }
        },
        'pulse-soft': {
          '0%, 100%': { opacity: '0.6' },
          '50%': { opacity: '1' }
        },
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        }
      },
      animation: {
        float: 'float 8s ease-in-out infinite',
        'pulse-soft': 'pulse-soft 6s ease-in-out infinite',
        'fade-up': 'fade-up 0.6s ease-out both'
      }
    }
  },
  plugins: []
} satisfies Config
