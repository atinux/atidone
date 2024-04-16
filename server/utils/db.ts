import { drizzle } from 'drizzle-orm/d1'
import * as schema from '../database/schema'

export { sql, eq, and, or } from 'drizzle-orm'

export const tables = schema

export function useDB() {
  return drizzle(hubDatabase(), { schema })
}
