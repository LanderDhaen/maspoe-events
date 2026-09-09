import { Elysia } from "elysia"
import { eventRouter } from "./routes/event"

const app = new Elysia().use(eventRouter).listen(8000)

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
)

export type App = typeof app
