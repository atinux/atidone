export default defineNuxtConfig({
  extends: '@nuxthq/neo',
  modules: [ '@nuxthq/ui'],
  ui: {
    icons: ['heroicons', 'simple-icons']
  },
  devtools: { enabled: true }
})
