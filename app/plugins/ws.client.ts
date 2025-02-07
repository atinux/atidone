export default defineNuxtPlugin((nuxtApp) => {
  const { loggedIn } = useUserSession()
  if (!loggedIn.value) return

  const { data } = useWebSocket('/ws')
  const queryCache = useQueryCache()

  watch(data, async (message) => {
    message = typeof message === 'string' ? message : await message.text()
    message = JSON.parse(message)

    if (message.event === 'todo:created') {
      const todos = queryCache.getQueryData<Todo[]>(['todos']) || []
      queryCache.setQueryData(['todos'], [...todos, message.data])
    }
  })
})
