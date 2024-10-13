import { TreeMapNode, reviveTreeMap, serializeTreeMap } from '@pinia/colada'

/**
 * Handles Pinia Colada's custom payload serialization and reviving.
 */
export default definePayloadPlugin(() => {
  definePayloadReducer('PiniaColada_TreeMapNode', (data: unknown) => {
    if (data instanceof TreeMapNode) {
      // TODO: should allow serializing Errors too
      return serializeTreeMap(data)
    }
  })

  definePayloadReviver(
    'PiniaColada_TreeMapNode',
    (data: ReturnType<typeof serializeTreeMap>) => {
      return markRaw(reviveTreeMap(data))
    }
  )
})
