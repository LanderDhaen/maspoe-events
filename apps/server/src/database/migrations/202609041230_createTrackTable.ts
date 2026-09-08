import { Kysely, sql } from "kysely"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const up = async (db: Kysely<any>) => {
  await db.schema
    .createTable("track")
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
    .addColumn("startingPoint", "jsonb", (c) => c.notNull())
    .addColumn("endPoint", "jsonb", (c) => c.notNull())
    .addColumn("path", "jsonb", (c) => c.notNull())
    .addColumn("color", "text", (c) => c.notNull().defaultTo("1447e6"))

    // Foreign keys

    .addColumn("eventId", "integer", (c) =>
      c.references("event.id").notNull().onDelete("restrict")
    )

    .execute()
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const down = async (db: Kysely<any>) => {
  await db.schema.dropTable("track").execute()
}
