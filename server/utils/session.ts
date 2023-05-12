import type { H3Event } from 'h3'
import { sha256 } from 'ohash'
import { defu } from 'defu'

export interface UserSession {
  user?: any
}

export async function getUserSession (event: H3Event) {
  return (await _useSession(event)).data as UserSession
}
export async function setUserSession (event: H3Event, data: UserSession) {
  const session = await _useSession(event)

  await session.update(data)

  return session.data as UserSession
}
export async function clearUserSession (event: H3Event) {
  const session = await _useSession(event)

  await session.clear()

  return true
}

export async function requireUserSession(event: H3Event) {
  const userSession = await getUserSession(event)

  if (!userSession.user) {
    throw createError({
      statusCode: 401,
      message: 'Unauthorized'
    })
  }

  return userSession
}

let sessionConfig: any

function _useSession (event: H3Event) {
  if (!sessionConfig) {
    // @ts-ignore
    sessionConfig = defu({ password: process.env.NUXT_SESSION_PASSWORD }, useRuntimeConfig(event).session)
  }

  if (!sessionConfig.password) {
    console.warn('No session password set, using a random password, please set NUXT_SESSION_PASSWORD in your .env file with at least 32 chars')
    const randomPassword = sha256(`${Date.now()}${Math.random()}`).slice(0, 32)
    console.log(`NUXT_SESSION_PASSWORD=${randomPassword}`)
    sessionConfig.password = randomPassword
  }

  return useSession(event, sessionConfig)
}