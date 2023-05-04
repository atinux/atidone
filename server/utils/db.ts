import { drizzle as drizzleD1, DrizzleD1Database } from 'drizzle-orm/d1'
import { drizzle, BetterSQLite3Database } from 'drizzle-orm/better-sqlite3'
// @ts-ignore
import Database from 'better-sqlite3'
import { join } from 'pathe'

export * as tables from '~/server/db/schema'

let _db: DrizzleD1Database | BetterSQLite3Database | null = null

export const useDb = () => {
  if (!_db) {
    // local sqlite in development
    if (process.dev) {
      const { dbDir } = useRuntimeConfig()
      const sqlite = new Database(join(dbDir, './db.sqlite'))
      _db = drizzle(sqlite)

    } else {
      // d1 in production
      _db = drizzleD1(process.env.DB)
    }
  }
  return _db
}

