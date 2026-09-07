import { Kysely, sql } from "kysely"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const up = async (db: Kysely<any>) => {
  await db.schema
    .createTable("checkpoint")
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
    .addColumn("abbreviation", "text", (c) => c.notNull())
    .addColumn("coordinates", sql`point`, (c) => c.notNull())

    // Foreign keys

    .addColumn("trackId", "integer", (c) =>
      c.references("track.id").notNull().onDelete("restrict")
    )

    .execute()
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const down = async (db: Kysely<any>) => {
  await db.schema.dropTable("checkpoint").execute()
}
