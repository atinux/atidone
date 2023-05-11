import { getRequestURL } from 'h3'
import { joinURL } from 'ufo'

// Coming in Nuxt 3.5.0
// https://github.com/nuxt/nuxt/pull/20765
export function useRequestURL () {
  if (process.server) {
    const { baseURL } = useRuntimeConfig().app
    const url = getRequestURL(useRequestEvent())
    url.pathname = joinURL(baseURL, url.pathname)
    return url
  }
  return new URL(window.location.href)
}
