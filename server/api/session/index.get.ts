export default eventHandler(async (event) => {
  return await requireUserSession(event)
})