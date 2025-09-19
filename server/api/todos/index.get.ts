export default eventHandler(async (event) => {
  const { user } = await requireUserSession(event)

  // List todos for the current user
  const db = await useDB()
  const todos = await db.select().from(tables.todos).where(eq(tables.todos.userId, user.id))

  return todos as Todo[]
})
