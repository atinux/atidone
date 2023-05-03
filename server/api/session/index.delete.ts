export default eventHandler(async (event) => {
  await clearUserSession(event)

  return { loggedOut: true }
})