export default defineNuxtPlugin({
  name: 'session-fetch-plugin',
  enforce: 'pre',
  async setup () {
    await useUserSession().fetch()
  }
})