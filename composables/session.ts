import { UserSession } from '~/server/utils/session'
const useUserSessionState = () => useState<UserSession>('nuxt-session', () => ({}))

export const useUserSession = () => {
  const sessionState = useUserSessionState()
  return {
    loggedIn: computed(() => Boolean(sessionState.value.user)),
    user: computed(() => sessionState.value.user || null),
    data: sessionState,
    fetch,
    clear
  }
}

async function fetch() {
  useUserSessionState().value = await useRequestFetch()('/api/session').catch(() => ({}))
}

async function clear() {
  await $fetch('/api/session', { method: 'DELETE' })
  useUserSessionState().value = {}
}
