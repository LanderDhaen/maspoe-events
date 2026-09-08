import { DB, Point } from "@server/types/database"
import { Pool, types } from "pg"
import { CamelCasePlugin, Kysely, PostgresDialect, sql } from "kysely"

types.setTypeParser(20, (val) => {
  return parseInt(val, 10)
})

export const dialect = new PostgresDialect({
  pool: new Pool({
    connectionString: process.env.DATABASE_URL,
  }),
})

export const db = new Kysely<DB>({
  dialect,
  plugins: [new CamelCasePlugin()],
})

export const point = ({ x, y }: Point) => sql<Point>`point(${x},${y})`

export const path = (points: Point[]) =>
  sql<Point[]>`${`[${points.map(({ x, y }) => `(${x},${y})`).join(",")}]`}`
