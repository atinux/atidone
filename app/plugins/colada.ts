import { PiniaColada, PiniaColadaQueryHooksPlugin } from '@pinia/colada'

export default defineNuxtPlugin({
  name: '@pinia/colada',
  dependsOn: ['pinia'],
  setup(nuxt) {
    nuxt.vueApp.use(PiniaColada, {
      plugins: [PiniaColadaQueryHooksPlugin({
        onError(error, entry) {
          console.error(`🫠 Error for entry "${entry.key.join('/')}"`, error)
        }
      })]
    })
  }
})
