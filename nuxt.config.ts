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
      clientId: process.env.NUXT_GITHUB_CLIENT_ID || '',
      clientSecret: process.env.NUXT_GITHUB_CLIENT_SECRET || ''
    },
    session: {
      name: 'nuxt-session',
      password: process.env.NUXT_SESSION_PASSWORD || ''
    },
    turso: {
      url: process.env.TURSO_DB_URL || '',
      token: process.env.TURSO_DB_TOKEN || ''
    }
  }
})
