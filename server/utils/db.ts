// import { drizzle as drizzleD1 } from 'drizzle-orm/d1'
// import { drizzle as drizzleBetterSqlite3 } from 'drizzle-orm/better-sqlite3'

import * as schema from '../database/schema'

export { sql, eq, and, or } from 'drizzle-orm'

export const tables = schema

export async function useDB() {
  const database = hubDatabase()
  const instance = await database.getInstance()

  if (import.meta.dev) {
    const { drizzle } = await import('drizzle-orm/pglite')
    return drizzle(instance, { schema: tables })
  }

  const { drizzle } = await import('drizzle-orm/node-postgres')
  return drizzle(instance, { schema: tables })

  // if (import.meta.dev) {
  //   const { drizzle } = await import('drizzle-orm/better-sqlite3')
  //   return drizzle(instance, { schema: tables })
  // }

  // const { drizzle } = await import('drizzle-orm/d1')
  // return drizzle(instance, { schema: tables })
}

export type Todo = typeof tables.todos.$inferSelect
