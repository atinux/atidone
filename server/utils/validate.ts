import vine, { errors, VineObject } from '@vinejs/vine'
import type { H3Event } from 'h3'

export const v = vine

async function validate (data: any, schema: any) {
  try {
    // If pre-compiled schema (https://vinejs.dev/docs/getting_started#pre-compiling-schema)
    if (typeof schema?.validate === 'function') {
      return await schema.validate(data)
    }
    // If schema is a JS object, wrap it with VineObject
    if (schema instanceof VineObject === false) {
      schema = v.object(schema)
    }
    return await v.validate({
      data,
      schema
    })
  } catch (error: any) {
    if (error instanceof errors.E_VALIDATION_ERROR) {
      throw createError({
        statusCode: 400,
        message: error.message,
        data: error.messages
      })
    }
    throw createError({
      statusCode: 500,
      message: error.message || 'Internal server error'
    })
  }
}

export async function validateParams(event: H3Event, schema: any) {
  return validate(event.context.params || {}, schema)
}

export async function validateQuery(event: H3Event, schema: any) {
  return validate(getQuery(event), schema)
}

export async function validateBody(event: H3Event, schema: any) {
  return validate(await readBody(event), schema)
}