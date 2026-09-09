import { Kysely } from "kysely"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const seed = async (db: Kysely<any>) => {
  await db
    .insertInto("event")
    .values([
      {
        name: "City Night Run Aalst 2026",
        slug: "city-night-run-aalst-2026",
        description:
          "Van Sinte Annalaan, 9300 Aalst, België naar Sinte Annalaan, 9300 Aalst, België",
        startDate: new Date("2026-03-28"),
        endDate: new Date("2026-03-28"),
      },
      {
        name: "Halve Marathon Aalst 2026",
        slug: "halve-marathon-aalst-2026",
        startDate: new Date("2026-11-22"),
        endDate: new Date("2026-11-22"),
      },
    ])
    .execute()
}
