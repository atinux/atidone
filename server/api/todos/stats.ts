import { sql } from 'drizzle-orm'

export default eventHandler(async (event) => {
  // Count the total number of todos
  return await useDb().select({
    todos: sql<number>`count(*)`,
    users: sql<number>`count(distinct(${tables.todos.userId}))`
  }).from(tables.todos).get()
})