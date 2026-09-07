import { Kysely } from "kysely"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const up = async (db: Kysely<any>) => {
  await db.schema
    .createTable("event")
    .addColumn("id", "integer", (c) =>
      c.generatedByDefaultAsIdentity().primaryKey()
    )
    .addColumn("createdAt", "timestamptz", (c) =>
      c.notNull().defaultTo("now()")
    )
    .addColumn("updatedAt", "timestamptz", (c) =>
      c.notNull().defaultTo("now()")
    )
    .addColumn("isActive", "boolean", (c) => c.notNull().defaultTo(true))
    .addColumn("name", "text", (c) => c.notNull())
    .addColumn("slug", "text", (c) => c.notNull().unique())
    .addColumn("description", "text")
    .addColumn("startDate", "date", (c) => c.notNull())
    .addColumn("endDate", "date", (c) => c.notNull())
    .execute()
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const down = async (db: Kysely<any>) => {
  await db.schema.dropTable("event").execute()
}
