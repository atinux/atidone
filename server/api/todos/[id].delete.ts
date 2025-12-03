import { z } from 'zod'
import { db, schema } from 'hub:db'
import { and, eq } from 'drizzle-orm'

const ParamsSchema = z.object({
  id: z.coerce.number().int()
})

export default eventHandler(async (event) => {
  const { id } = await getValidatedRouterParams(event, ParamsSchema.parse)
  const { user } = await requireUserSession(event)

  // Delete todo for the current user
  const deletedTodos = await db.delete(schema.todos).where(
    and(
      eq(schema.todos.id, id),
      eq(schema.todos.userId, user.id)
    )
  ).returning()

  const deletedTodo = deletedTodos[0]
  if (!deletedTodo) {
    throw createError({
      statusCode: 404,
      message: 'Todo not found'
    })
  }
  return deletedTodo
})
