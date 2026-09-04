import { treaty } from "@elysia/eden"
import type { App } from "@server"

const client = treaty<App>("localhost:8000")
