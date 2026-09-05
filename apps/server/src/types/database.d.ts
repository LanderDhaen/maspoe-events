import { EventTable } from "./event"
import { TrackTable } from "./track"

export interface Database {
  event: EventTable
  track: TrackTable
}
