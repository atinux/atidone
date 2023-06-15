export default eventHandler(async (event) => {
  const { title } = await validateBody(event, {
    title: v.string().minLength(1).maxLength(100)
  })
  const session = await requireUserSession(event)

  const todo = await useDb().insert(tables.todos).values({
    userId: session.user.id,
    title: title,
    createdAt: new Date()
  }).returning().get()

  return todo
})
