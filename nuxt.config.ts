const fontsHref =
  'https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@500;600;700&family=Manrope:wght@400;500;600;700&family=Sora:wght@400;500;600;700;800&display=swap'

export default defineNuxtConfig({
  compatibilityDate: '2026-02-12',
  modules: ['@nuxtjs/tailwindcss'],
  css: ['~/assets/css/main.css'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {}
    }
  },
  app: {
    head: {
      htmlAttrs: { lang: 'en' },
      meta: [
        // viewport-fit=cover exposes the safe-area insets used by the mobile tab bar.
        { name: 'viewport', content: 'width=device-width, initial-scale=1, viewport-fit=cover' },
        { name: 'theme-color', content: '#070b11' }
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { rel: 'stylesheet', href: fontsHref }
      ]
    },
    // Opacity only: a transform on the page root would re-anchor fixed children.
    pageTransition: { name: 'page', mode: 'out-in' }
  },
  vite: {
    optimizeDeps: {
      // three is only reached through a lazy import; pre-bundle it so dev does not reload on first use.
      include: ['three']
    }
  },
  runtimeConfig: {
    public: {
      siteUrl: 'https://ronjiemanon.com'
    }
  },
  typescript: {
    strict: true
  }
})
