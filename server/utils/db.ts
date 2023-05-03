// @ts-ignore
import Database from 'better-sqlite3'

export async function setupDb() {
  const db = useDb()
  // Create SQLIte table if it doesn't exist
  await db.exec(`
    CREATE TABLE IF NOT EXISTS todos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      userId INTEGER NOT NULL,
      title TEXT NOT NULL,
      completed INTEGER NOT NULL DEFAULT 0,
      createdAt TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    )
  `)
}

let db: any | null = null

export function useDb() {
  if (db) return db
  if (process.dev) {
    db = new Database('./db.sqlite')
  } else {
    db = new Database(process.env.DB)
  }
  return db
}