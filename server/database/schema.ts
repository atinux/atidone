// import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core'
import { pgTable, text as pgText, boolean as pgBoolean, timestamp as pgTimestamp, serial as pgSerial, integer as pgInteger } from 'drizzle-orm/pg-core'

// export const todos = sqliteTable('todos', {
//   id: integer('id').primaryKey(),
//   userId: integer('user_id').notNull(), // GitHub Id
//   title: text('title').notNull(),
//   completed: integer('completed').notNull().default(0),
//   createdAt: integer('created_at', { mode: 'timestamp' }).notNull()
// })

export const todos = pgTable('todos', {
  id: pgSerial('id').primaryKey(),
  userId: pgInteger('user_id').notNull(), // GitHub Id
  title: pgText('title').notNull(),
  completed: pgBoolean('completed').notNull().default(false),
  createdAt: pgTimestamp('created_at').notNull()
})
