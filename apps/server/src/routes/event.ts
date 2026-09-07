import { Coordinate } from "@server/types/track"
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
            "track.startingPoint",
            "track.endPoint",
            "track.route",
            jsonArrayFrom(
              eb
                .selectFrom("checkpoint")
                .select([
                  "checkpoint.id",
                  "checkpoint.name",
                  "checkpoint.abbreviation",
                  "checkpoint.longitude",
                  "checkpoint.latitude",
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

  const coordinates = event.tracks.flatMap((track) => track.route)
  const longitudes = coordinates.map(([longitude]) => longitude)
  const latitudes = coordinates.map(([, latitude]) => latitude)
  const bounds = [
    [Math.min(...longitudes), Math.min(...latitudes)],
    [Math.max(...longitudes), Math.max(...latitudes)],
  ]

  return {
    ...event,
    bounds,
  }
})
