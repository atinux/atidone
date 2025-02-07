export default defineNuxtConfig({
  modules: [
    '@nuxthub/core',
    '@nuxt/ui',
    'nuxt-auth-utils',
    '@nuxt/eslint',
    '@pinia/nuxt',
    '@pinia/colada-nuxt',
    '@vueuse/nuxt'
  ],
  devtools: {
    enabled: true
  },
  future: { compatibilityVersion: 4 },
  compatibilityDate: '2025-01-29',
  nitro: {
    preset: 'cloudflare_durable',
    experimental: {
      websocket: true
    }
  },
  hub: {
    database: true
  },
  // Development config
  eslint: {
    config: {
      stylistic: {
        quotes: 'single',
        commaDangle: 'never'
      }
    }
  }
})
