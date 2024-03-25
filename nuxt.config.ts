export default defineNuxtConfig({
  devtools: { enabled: true },
  extends: ['@nuxthub/core'],
  modules: [
    '@nuxt/ui',
    'nuxt-auth-utils'
  ],
  ui: {
    icons: ['heroicons', 'simple-icons']
  }
})
