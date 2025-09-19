import { z } from 'zod'

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

  // SQlite:
  // const isCompleted = completed ? 1 : 0
  const isCompleted = completed

  // Update todo for the current user
  const db = await useDB()
  const updatedTodos = await db.update(tables.todos).set({
    completed: isCompleted
  }).where(and(
    eq(tables.todos.id, id),
    eq(tables.todos.userId, user.id)
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
