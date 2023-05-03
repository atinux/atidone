export default defineNuxtConfig({
  modules: [
    '@nuxtjs/tailwindcss'
  ],
  devtools: {
    enabled: true
  },
  runtimeConfig: {
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
