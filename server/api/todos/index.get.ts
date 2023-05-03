interface Todo {
  id: number
  userId: number
  title: string
  completed: number
  createdAt: string
}

export default eventHandler(async (event) => {
  const session = await requireUserSession(event)

  // List todos for the current user
  const todos = useDb().prepare('SELECT * FROM todos WHERE userId = ?').all(session.user.id) as Todo[]

  return todos
})