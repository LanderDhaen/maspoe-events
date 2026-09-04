import {
  ColumnType,
  Generated,
  Insertable,
  Selectable,
  Updateable,
} from "kysely"

type Latitude = number
type Longitude = number
type Coordinates = [Latitude, Longitude][]

export interface EventTable {
  id: Generated<number>
  name: ColumnType<string, string, string>
  slug: ColumnType<string, string, string>
  description: ColumnType<string | null, string | null, string | null>
  startDate: ColumnType<Date, Date, Date>
  endDate: ColumnType<Date, Date, Date>
}

export type Event = Selectable<EventTable>
export type InsertableEvent = Insertable<EventTable>
export type UpdateableEvent = Updateable<EventTable>
