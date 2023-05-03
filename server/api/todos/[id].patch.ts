import { useValidatedParams, useValidatedBody, z, zh } from 'h3-zod'

export default eventHandler(async (event) => {
  const { id } = await useValidatedParams(event, {
    id: zh.intAsString
  })
  const { completed } = await useValidatedBody(event, {
    completed: z.number().int().min(0).max(1)
  })
  const session = await requireUserSession(event)

  // List todos for the current user
  const info = useDb().prepare('UPDATE todos SET completed = ? WHERE id = ? AND userId = ?').run(completed, id, session.user.id)
  
  return { info }
})