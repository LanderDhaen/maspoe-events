import { Elysia } from "elysia"
import { db } from "./database"

const app = new Elysia()
  .get("/", () => "Hello Elysia")
  .get("/events", async () => {
    const events = await db.selectFrom("event").selectAll().execute()

    return events
  })
  .listen(8000)

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
)

export type App = typeof app
