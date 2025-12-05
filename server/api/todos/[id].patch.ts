import { z } from 'zod'
import { db, schema } from 'hub:db'
import { and, eq } from 'drizzle-orm'

const ParamsSchema = z.object({
  id: z.coerce.number().int()
})

const BodySchema = z.object({
  completed: z.boolean()
})

export default eventHandler(async (event) => {
  const { id } = await getValidatedRouterParams(event, ParamsSchema.parse)
  const { completed } = await readValidatedBody(event, BodySchema.parse)
  const { user } = await requireUserSession(event)

  // Update todo for the current user
  const updatedTodos = await db.update(schema.todos).set({
    completed: completed ? 1 : 0
  }).where(and(
    eq(schema.todos.id, id),
    eq(schema.todos.userId, user.id)
  )).returning()

  const todo = updatedTodos[0]
  if (!todo) {
    throw createError({
      statusCode: 404,
      message: 'Todo not found'
    })
  }
  return todo
})
