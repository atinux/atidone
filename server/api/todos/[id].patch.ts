import vine, { errors } from '@vinejs/vine'
import { eq, and } from 'drizzle-orm'
import { todoPatchSchema } from '../../schemas/todo'

export default eventHandler(async (event) => {
  const id = event.context.params?.id
  const body = await readBody(event)
  const session = await requireUserSession(event)

  try {
    const output = await vine.validate({ schema: todoPatchSchema, data: { id, ...body } })

    const todo = await useDb().update(tables.todos).set({
      completed: output.completed
    }).where(and(
      eq(tables.todos.id, output.id),
      eq(tables.todos.userId, session.user.id)
    )).returning().get()

    return todo
  } catch (error) {
      if (error instanceof errors.E_VALIDATION_ERROR) {
      throw createError({
        statusCode: error.status,
        message: error.message,
        data: error.messages
      })
    }
    throw error
  }
})
