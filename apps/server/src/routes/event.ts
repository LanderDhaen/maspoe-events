import { Point } from "@server/types/geo"
import { db } from "../database"
import { Elysia } from "elysia"
import { jsonArrayFrom } from "kysely/helpers/postgres"

export const eventRouter = new Elysia({
  prefix: "/events",
}).get("/:slug", async ({ params: { slug }, status }) => {
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
            eb
              .fn<Point>("point_as_json", [eb.ref("track.startingPoint")])
              .as("startingPoint"),
            eb
              .fn<Point>("point_as_json", [eb.ref("track.endPoint")])
              .as("endPoint"),
            eb.fn<Point[]>("path_as_json", [eb.ref("track.path")]).as("path"),
            jsonArrayFrom(
              eb
                .selectFrom("checkpoint")
                .select((eb) => [
                  "checkpoint.id",
                  "checkpoint.name",
                  "checkpoint.abbreviation",
                  eb
                    .fn<Point>("point_as_json", [eb.ref("checkpoint.point")])
                    .as("point"),
                ])
                .whereRef("checkpoint.trackId", "=", "track.id")
            ).as("checkpoints"),
          ])
          .whereRef("track.eventId", "=", "event.id")
      ).as("tracks"),
    ])
    .where("event.slug", "=", slug)
    .executeTakeFirst()

  if (!event) {
    return status(404, "Het evenement dat je zoekt bestaat niet.")
  }

  const coordinates = event.tracks.flatMap((track) => track.path)
  const longitudes = coordinates.map((coord) => coord.x)
  const latitudes = coordinates.map((coord) => coord.y)

  const bounds = [
    Math.min(...longitudes),
    Math.min(...latitudes),
    Math.max(...longitudes),
    Math.max(...latitudes),
  ] satisfies [number, number, number, number]

  return {
    ...event,
    bounds,
  }
})
