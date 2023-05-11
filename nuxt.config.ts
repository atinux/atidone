import { createResolver } from 'nuxt/kit'

const { resolve } = createResolver(import.meta.url)

export default defineNuxtConfig({
  modules: [
    '@nuxt/devtools',
    '@nuxthq/ui'
  ],
  colorMode: {
    preference: 'light'
  },
  ui: {
    icons: ['heroicons', 'simple-icons']
  },
  runtimeConfig: {
    dbDir: resolve('./server/db'),
    github: {
      clientId: '',
      clientSecret: ''
    },
    session: {
      name: 'nuxt-session',
      password: ''
    }
  }
})
