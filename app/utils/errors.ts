import { ZodError } from 'zod'
import { H3Error } from 'h3'
import type { NuxtError } from '#app'

export function isNuxtError(err: unknown): err is NuxtError {
  return err instanceof H3Error
}

export function isNuxtZodError(err: unknown): err is NuxtError<{ data: ZodError }> {
  return (
    isNuxtError(err)
    && (err.data as { data?: unknown })?.data instanceof ZodError
  )
}
