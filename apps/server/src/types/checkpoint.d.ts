import {
  ColumnType,
  Generated,
  Insertable,
  Selectable,
  Updateable,
} from "kysely"

import { Point } from "./track"

export interface CheckpointTable {
  id: Generated<number>
  name: ColumnType<string, string, string>
  abbreviation: ColumnType<string, string, string>
  point: ColumnType<Point, Point, Point>
  trackId: ColumnType<number, number, number>
}

export type Checkpoint = Selectable<CheckpointTable>
export type InsertableCheckpoint = Insertable<CheckpointTable>
export type UpdateableCheckpoint = Updateable<CheckpointTable>
