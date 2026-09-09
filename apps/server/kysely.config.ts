import { defineConfig } from "kysely-ctl"
import { dialect } from "./src/database"
import { CamelCasePlugin } from "kysely"

export default defineConfig({
  dialect: dialect,
  plugins: [new CamelCasePlugin()],
  migrations: {
    migrationFolder: "src/database/migrations",
  },
  seeds: {
    seedFolder: "src/database/seeds",
  },
})
