import { Point } from "./geo"
import { Checkpoint } from "./checkpoint"

export interface Track {
  slug: string
  name: string
  color: string
  startingPoint: Point
  endPoint: Point
  path: Point[]
  checkpoints: Checkpoint[]
}
