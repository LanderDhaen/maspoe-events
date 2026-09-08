import { Point } from "@server/types/geo"
import { sql } from "kysely"

export const point = ({ x, y }: Point) => sql<Point>`point(${x},${y})`

export const path = (points: Point[]) =>
  sql<Point[]>`${`[${points.map(({ x, y }) => `(${x},${y})`).join(",")}]`}`

export const calculateBoundingBox = (points: Point[]) => {
  const longitudes = points.map((point) => point.x)
  const latitudes = points.map((point) => point.y)

  const bounds = [
    Math.min(...longitudes),
    Math.min(...latitudes),
    Math.max(...longitudes),
    Math.max(...latitudes),
  ] satisfies [number, number, number, number]

  return bounds
}
