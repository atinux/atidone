import { useValidatedParams, zh } from 'h3-zod'

export default eventHandler(async (event) => {
  const { id } = await useValidatedParams(event, {
    id: zh.intAsString
  })
  const session = await requireUserSession(event)

  // List todos for the current user
  const info = useDb().prepare('DELETE FROM todos WHERE id = ? AND userId = ?').run(id, session.user.id)
  
  return { info }
})