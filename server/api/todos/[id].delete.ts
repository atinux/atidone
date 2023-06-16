import { eq, and } from 'drizzle-orm'

export default eventHandler(async (event) => {
  const { id } = await validateParams(event, {
    id: v.number().withoutDecimals().min(1)
  })
  const session = await requireUserSession(event)

  const deletedTodo = await useDb().delete(tables.todos).where(and(
    eq(tables.todos.id, id),
    eq(tables.todos.userId, session.user.id)
  )).returning().get()

  if (!deletedTodo) {
    throw createError({
      statusCode: 404,
      message: 'Todo not found'
    })
  }

  return deletedTodo
})
