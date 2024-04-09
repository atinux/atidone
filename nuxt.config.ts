export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    '@nuxthub/core',
    '@nuxt/ui',
    'nuxt-auth-utils'
  ],
  hub: {
    database: true
  },
  ui: {
    icons: ['heroicons', 'simple-icons']
  }
})
