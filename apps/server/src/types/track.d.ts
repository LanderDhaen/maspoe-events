import { sql } from "bun"
import {
  ColumnType,
  Generated,
  Insertable,
  Selectable,
  Updateable,
  RawBuilder,
} from "kysely"

export interface Point {
  x: number
  y: number
}

export interface TrackTable {
  id: Generated<number>
  name: ColumnType<string, string, string>
  slug: ColumnType<string, string, string>
  color: ColumnType<string, string, string>
  startingPoint: ColumnType<Point, Point, Point>
  endPoint: ColumnType<Point, Point, Point>
  path: ColumnType<Point[], Point[], Point[]>
  eventId: ColumnType<number, number, number>
}
export type Track = Selectable<TrackTable>
export type InsertableTrack = Insertable<TrackTable>
export type UpdateableTrack = Updateable<TrackTable>
