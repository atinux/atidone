import vine from '@vinejs/vine'

export const createTodoValidator = vine.compile(
  vine.object({
    title: vine.string().minLength(1).maxLength(100)
  })
)

export const updateTodoValidator = vine.compile(
  vine.object({
    id: vine.number().withoutDecimals().min(1),
    completed: vine.number().withoutDecimals().min(0).max(1)
  })
)

export const deleteTodoValidator = vine.compile(
  vine.object({
    id: vine.number().withoutDecimals().min(1)
  })
)
