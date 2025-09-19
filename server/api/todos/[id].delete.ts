import { z } from 'zod'

const ParamsSchema = z.object({
  id: z.coerce.number().int()
})

export default eventHandler(async (event) => {
  const { id } = await getValidatedRouterParams(event, ParamsSchema.parse)
  const { user } = await requireUserSession(event)

  // Delete todo for the current user
  const db = await useDB()
  const deletedTodos = await db.delete(tables.todos).where(and(
    eq(tables.todos.id, id),
    eq(tables.todos.userId, user.id)
  )).returning()

  const deletedTodo = deletedTodos[0]
  if (!deletedTodo) {
    throw createError({
      statusCode: 404,
      message: 'Todo not found'
    })
  }
  return deletedTodo
})
