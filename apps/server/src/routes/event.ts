import { calculateBoundingBox } from "../lib/geo"
import { getEventBySlug } from "../services/event"
import { Elysia } from "elysia"

export const eventRouter = new Elysia({
  prefix: "/events",
}).get("/:slug", async ({ params: { slug }, status }) => {
  const event = await getEventBySlug(slug)

  if (!event) {
    return status(404, "Het evenement dat je zoekt bestaat niet.")
  }

  const paths = event.tracks.flatMap((track) => track.path)
  const bounds = calculateBoundingBox(paths)

  return {
    ...event,
    bounds,
  }
})
