import { ZodError } from 'zod'
import type { NuxtError } from '#app'

export function isNuxtZodError(err: unknown): err is NuxtError<{ data: ZodError }> {
  return (
    isNuxtError(err)
    && (err.data as { data?: unknown })?.data instanceof ZodError
  )
}
