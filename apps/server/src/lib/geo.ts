import { Point } from "@server/types/geo"
import { sql } from "kysely"

export const point = ({ x, y }: Point) => sql<Point>`point(${x},${y})`

export const path = (points: Point[]) =>
  sql<Point[]>`${`[${points.map(({ x, y }) => `(${x},${y})`).join(",")}]`}`
