import { errors } from '@vinejs/vine'
import { createTodoValidator } from '../../schemas/todo'

export default eventHandler(async (event) => {
  const body = await readBody(event)
  const session = await requireUserSession(event)

  try {
    const output = await createTodoValidator.validate(body)

    const todo = await useDb().insert(tables.todos).values({
      userId: session.user.id,
      title: output.title,
      createdAt: new Date()
    }).returning().get()

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
