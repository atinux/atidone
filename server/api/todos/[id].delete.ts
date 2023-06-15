import { errors } from '@vinejs/vine'
import { eq, and } from 'drizzle-orm'
import { deleteTodoValidator } from '../../schemas/todo'

export default eventHandler(async (event) => {
  const id = event.context.params?.id
  const session = await requireUserSession(event)

  try {
    const output = await deleteTodoValidator.validate({ id })

    const deletedTodo = await useDb().delete(tables.todos).where(and(
      eq(tables.todos.id, output.id),
      eq(tables.todos.userId, session.user.id)
    )).returning().get()

    if (!deletedTodo) {
      throw createError({
        statusCode: 404,
        message: 'Todo not found'
      })
    }

    return deletedTodo
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
