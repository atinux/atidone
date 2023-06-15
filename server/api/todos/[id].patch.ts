import { eq, and } from 'drizzle-orm'

export default eventHandler(async (event) => {
  const { id } = await validateParams(event, {
    id: v.number().withoutDecimals().min(1)
  })
  const { completed } = await validateBody(event, {
    completed: v.number().withoutDecimals().min(0).max(1)
  })
  const session = await requireUserSession(event)

  const todo = await useDb().update(tables.todos).set({
    completed
  }).where(and(
    eq(tables.todos.id, id),
    eq(tables.todos.userId, session.user.id)
  )).returning().get()

  return todo
})
