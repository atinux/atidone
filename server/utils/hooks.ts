import { Hookable } from 'hookable'

type Hooks = {
  'todo:created': (todo: Todo) => void
}

export const hooks = new Hookable<Hooks>()

export async function webSocketPublish(topic: string, data: unknown): Promise<void> {
  // @ts-ignore
  const doBinding = process.env.$DurableObject || globalThis.__env__?.$DurableObject || globalThis.$DurableObject
  if (!doBinding) {
    return console.warn('Durable Object binding `$DurableObject` not found')
  }
  const id = doBinding.idFromName('crossws')
  const stub = doBinding.get(id)
  await stub.publish(topic, data)
}
