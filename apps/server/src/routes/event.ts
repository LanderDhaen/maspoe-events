import { db } from "../database"
import { Elysia } from "elysia"

export const eventRouter = new Elysia({
  prefix: "/events",
}).get("/:slug", async ({ params: { slug }, status }) => {
  const event = await db
    .selectFrom("event")
    .select([
      "event.name",
      "event.slug",
      "event.description",
      "event.startDate",
      "event.endDate",
    ])
    .where("event.slug", "=", slug)
    .executeTakeFirst()

  if (!event) {
    return status(404, "Het evenement dat je zoekt bestaat niet.")
  }

  return event
})
