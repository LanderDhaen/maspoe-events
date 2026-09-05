import {
  ColumnType,
  Generated,
  Insertable,
  Selectable,
  Updateable,
} from "kysely"

type Coordinate = [longitude: number, latitude: number]
type Coordinates = Coordinate[]

export interface TrackTable {
  id: Generated<number>
  name: ColumnType<string, string, string>
  slug: ColumnType<string, string, string>
  color: ColumnType<string, string, string>
  startingPoint: ColumnType<Coordinate, Coordinate, Coordinate>
  endPoint: ColumnType<Coordinate, Coordinate, Coordinate>
  route: ColumnType<Coordinates, Coordinates, Coordinates>
  eventId: ColumnType<number, number, number>
}
export type Track = Selectable<TrackTable>
export type InsertableTrack = Insertable<TrackTable>
export type UpdateableTrack = Updateable<TrackTable>
