import { createResolver } from 'nuxt/kit'

const { resolve } = createResolver(import.meta.url)

export default defineNuxtConfig({
  modules: [
    '@nuxtjs/tailwindcss'
  ],
  devtools: {
    enabled: true
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
