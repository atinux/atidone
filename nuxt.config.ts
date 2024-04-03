export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    '@nuxthub/core',
    '@nuxt/ui',
    'nuxt-auth-utils'
  ],
  ui: {
    icons: ['heroicons', 'simple-icons']
  }
})
