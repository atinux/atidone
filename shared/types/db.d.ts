import type { schema } from 'hub:db'

export type Todo = typeof schema.todos.$inferSelect
