export default eventHandler(async () => {
  // Count the total number of todos
  const db = await useDB()
  const result = await db.select({
    todos: sql<number>`count(*)`,
    users: sql<number>`count(distinct(${tables.todos.userId}))`
  }).from(tables.todos)

  return result[0]
})
