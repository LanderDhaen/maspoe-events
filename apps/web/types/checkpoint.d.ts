import { Point } from "./geo"

export interface Checkpoint {
  id: number
  name: string
  abbreviation: string
  point: Point
}
