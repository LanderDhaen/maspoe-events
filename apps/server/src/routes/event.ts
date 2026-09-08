import { getEventBySlug } from "../services/event"
import { Elysia } from "elysia"

export const eventRouter = new Elysia({
  prefix: "/events",
}).get("/:slug", async ({ params: { slug }, status }) => {
  const event = await getEventBySlug(slug)

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
