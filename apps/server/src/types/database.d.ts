import {
  ColumnType,
  Generated,
  Insertable,
  Selectable,
  Updateable,
} from "kysely"

import { Path, Point } from "./geo"

export interface Database {
  event: EventTable
  track: TrackTable
  checkpoint: CheckpointTable
}

export interface EventTable {
  id: Generated<number>
  name: ColumnType<string, string, string>
  slug: ColumnType<string, string, string>
  description: ColumnType<string | null, string | null, string | null>
  startDate: ColumnType<Date, Date, Date>
  endDate: ColumnType<Date, Date, Date>
}

export interface TrackTable {
  id: Generated<number>
  name: ColumnType<string, string, string>
  slug: ColumnType<string, string, string>
  color: ColumnType<string, string, string>
  startingPoint: ColumnType<Point, Point, Point>
  endPoint: ColumnType<Point, Point, Point>
  path: ColumnType<Path, Path, Path>
  eventId: ColumnType<number, number, number>
}

export interface CheckpointTable {
  id: Generated<number>
  name: ColumnType<string, string, string>
  abbreviation: ColumnType<string, string, string>
  point: ColumnType<Point, Point, Point>
  trackId: ColumnType<number, number, number>
}
