import vine from '@vinejs/vine'

export const todoPostSchema = vine.object({
  title: vine.string().minLength(1).maxLength(100)
})

export const todoPatchSchema = vine.object({
  id: vine.number().withoutDecimals().min(1),
  completed: vine.number().withoutDecimals().min(0).max(1)
})

export const todoDeleteSchema = vine.object({
  id: vine.number().withoutDecimals().min(1)
})
