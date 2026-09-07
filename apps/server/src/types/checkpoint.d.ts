import {
  ColumnType,
  Generated,
  Insertable,
  Selectable,
  Updateable,
} from "kysely"

export interface CheckpointTable {
  id: Generated<number>
  name: ColumnType<string, string, string>
  abbreviation: ColumnType<string, string, string>
  longitude: ColumnType<number, number, number>
  latitude: ColumnType<number, number, number>
  trackId: ColumnType<number, number, number>
}

export type Checkpoint = Selectable<CheckpointTable>
export type InsertableCheckpoint = Insertable<CheckpointTable>
export type UpdateableCheckpoint = Updateable<CheckpointTable>
