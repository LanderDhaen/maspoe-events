import { Kysely } from "kysely"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const up = async (db: Kysely<any>) => {
  await db.schema
    .createTable("track")
    .addColumn("id", "serial", (c) => c.primaryKey())
    .addColumn("createdAt", "timestamp", (c) => c.notNull().defaultTo("now()"))
    .addColumn("updatedAt", "timestamp", (c) => c.notNull().defaultTo("now()"))
    .addColumn("isActive", "boolean", (c) => c.notNull().defaultTo(true))
    .addColumn("name", "varchar", (c) => c.notNull())
    .addColumn("slug", "varchar", (c) => c.notNull().unique())
    .addColumn("startingPoint", "jsonb", (c) => c.notNull())
    .addColumn("endPoint", "jsonb", (c) => c.notNull())
    .addColumn("route", "jsonb", (c) => c.notNull())
    .addColumn("color", "varchar", (c) => c.notNull().defaultTo("1447e6"))

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
