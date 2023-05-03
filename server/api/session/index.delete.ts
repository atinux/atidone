import { clearNuxtSession } from "../utils/session"

export default eventHandler(async (event) => {
  await clearUserSession(event)

  return { loggedOut: true }
})