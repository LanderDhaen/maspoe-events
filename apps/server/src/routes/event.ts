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
            "track.path",
            jsonArrayFrom(
              eb
                .selectFrom("checkpoint")
                .select([
                  "checkpoint.id",
                  "checkpoint.name",
                  "checkpoint.abbreviation",
                  "checkpoint.point",
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

  const track = await db.selectFrom("track").selectAll().executeTakeFirst()

  console.log("event", typeof event.tracks[0]?.startingPoint.x)
  console.log("track", typeof track?.startingPoint.x)

  console.log("event path", typeof event.tracks[0]?.path)
  console.log("track path", typeof track?.path)

  return event
})
