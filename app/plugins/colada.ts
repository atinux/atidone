import { PiniaColada } from '@pinia/colada'

export default defineNuxtPlugin({
  name: '@pinia/colada',
  dependsOn: ['pinia'],
  setup(nuxt) {
    nuxt.vueApp.use(PiniaColada, { })
  }
})
