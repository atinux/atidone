import { useValidatedBody, z } from 'h3-zod'

export default eventHandler(async (event) => {
  console.log('validate body')
  const { title } = await useValidatedBody(event, {
    title: z.string().min(1).max(100)
  })
  console.log('validate session')
  const session = await requireUserSession(event)

  // List todos for the current user
  console.log('INsert todo')
  const info = useDb().prepare('INSERT INTO todos (title, userId) VALUES (?, ?)').run(title, session.user.id)
  if (!info.lastInsertRowid) {
    throw createError({
      statusCode: 500,
      message: 'Could not create todo'
    })
  }
  console.log('query todo')
  return useDb().prepare('SELECT * FROM todos WHERE id = ? AND userId = ?').get(info.lastInsertRowid, session.user.id)
})