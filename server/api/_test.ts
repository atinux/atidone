export default eventHandler(event => {
  // @ts-ignore
  const runtimeConfig = useRuntimeConfig(event)

  return {
    runtimeConfig: runtimeConfig,
    env: process.env,
    NUXT_GITHUB_CLIENT_ID: process.env.NUXT_GITHUB_CLIENT_ID,
    NUXT_GITHUB_CLIENT_SECRET: process.env.NUXT_GITHUB_CLIENT_SECRET,
    NUXT_SESSION_PASSWORD: process.env.NUXT_SESSION_PASSWORD,
    TURSO_DB_URL: process.env.TURSO_DB_URL,
    TURSO_DB_TOKEN: process.env.TURSO_DB_TOKEN,
  }
})