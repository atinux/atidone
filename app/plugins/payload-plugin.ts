import { TreeMapNode, reviveTreeMap, serializeTreeMap } from '@pinia/colada'

/**
 * Handles Pinia Colada's custom payload serialization and reviving.
 */
export default definePayloadPlugin(() => {
  definePayloadReducer(
    'PiniaColada_TreeMapNode',
    (data: unknown) => data instanceof TreeMapNode && serializeTreeMap(data)
  )

  definePayloadReviver(
    'PiniaColada_TreeMapNode',
    (data: ReturnType<typeof serializeTreeMap>) => markRaw(reviveTreeMap(data))
  )

  // Handle Errors that can be rendered in the UI where `useQuery()` is used
  // and the error is displayed in the UI.
  // Do not serialize errors that you are not handling in the UI. Let Nuxt handle these unexpected errors instead
  type ErrorPayload = [message: string, stack: string | undefined]
  definePayloadReducer(
    'PiniaColada_Error',
    (data: unknown) =>
      data instanceof Error
      && data.name === 'Error'
      && ([data.message, data.stack] satisfies ErrorPayload)
  )

  definePayloadReviver('PiniaColada_Error', (data: ErrorPayload) => {
    const [message, stack] = data
    const error = new Error(message)
    error.stack = stack
    return error
  })
})
