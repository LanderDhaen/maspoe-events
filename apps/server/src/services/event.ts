import { Point } from "@server/types/geo"
import { db } from "../database"
import { jsonArrayFrom } from "kysely/helpers/postgres"
import { Expression } from "kysely"

export const getEventBySlug = async (slug: string) => {
  const event = await db
    .selectFrom("event")
    .select((eb) => [
      "event.name",
      "event.slug",
      "event.description",
      "event.startDate",
      "event.endDate",
      jsonArrayFrom(
        eb
          .selectFrom("track")
          .select((eb) => [
            "track.name",
            "track.slug",
            "track.color",
            "track.startingPoint",
            parsePoint(eb.ref("track.startingPoint")).as("startingPointB"),
            parsePoint(eb.ref("track.endPoint")).as("endPoint"),
            parsePath(eb.ref("track.path")).as("path"),
            jsonArrayFrom(
              eb
                .selectFrom("checkpoint")
                .select((eb) => [
                  "checkpoint.id",
                  "checkpoint.name",
                  "checkpoint.abbreviation",
                  parsePoint(eb.ref("checkpoint.point")).as("point"),
                ])
                .whereRef("checkpoint.trackId", "=", "track.id")
            ).as("checkpoints"),
          ])
          .whereRef("track.eventId", "=", "event.id")
      ).as("tracks"),
    ])
    .where("event.slug", "=", slug)
    .executeTakeFirst()

  return event
}

export const parsePoint = (point: Expression<Point>) => {
  return db.fn<Point>("point_as_json", [point])
}

export const parsePath = (path: Expression<Point[]>) => {
  return db.fn<Point[]>("path_as_json", [path])
}
