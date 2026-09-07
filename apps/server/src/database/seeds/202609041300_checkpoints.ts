import { Kysely } from "kysely"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const seed = async (db: Kysely<any>) => {
  await db
    .insertInto("checkpoint")
    .values([
      {
        name: "Checkpoint 1",
        abbreviation: "1",
        longitude: 4.02966,
        latitude: 50.93936,
        trackId: 1, // 6 km - City Night Run Aalst 2026
      },
      {
        name: "Checkpoint 2",
        abbreviation: "2",
        longitude: 4.03344,
        latitude: 50.93859,
        trackId: 1, // 6 km - City Night Run Aalst 2026
      },
      {
        name: "Checkpoint 3",
        abbreviation: "3",
        longitude: 4.03657,
        latitude: 50.93747,
        trackId: 1, // 6 km - City Night Run Aalst 2026
      },
      {
        name: "Checkpoint 4",
        abbreviation: "4",
        longitude: 4.03939,
        latitude: 50.93738,
        trackId: 1, // 6 km - City Night Run Aalst 2026
      },
      {
        name: "Checkpoint 5",
        abbreviation: "5",
        longitude: 4.04132,
        latitude: 50.93756,
        trackId: 1, // 6 km - City Night Run Aalst 2026
      },
      {
        name: "Checkpoint 6",
        abbreviation: "6",
        longitude: 4.04272,
        latitude: 50.93898,
        trackId: 1, // 6 km - City Night Run Aalst 2026
      },
      {
        name: "Checkpoint 7",
        abbreviation: "7",
        longitude: 4.04155,
        latitude: 50.94007,
        trackId: 1, // 6 km - City Night Run Aalst 2026
      },
      {
        name: "Checkpoint 8",
        abbreviation: "8",
        longitude: 4.03832,
        latitude: 50.94064,
        trackId: 1, // 6 km - City Night Run Aalst 2026
      },
      {
        name: "Checkpoint 9",
        abbreviation: "9",
        longitude: 4.03351,
        latitude: 50.94106,
        trackId: 1, // 6 km - City Night Run Aalst 2026
      },
      {
        name: "Checkpoint 10",
        abbreviation: "10",
        longitude: 4.02874,
        latitude: 50.94299,
        trackId: 1, // 6 km -City Night Run Aalst 2026
      },

      {
        name: "Checkpoint 1",
        abbreviation: "1",
        longitude: 4.02882,
        latitude: 50.9403,
        trackId: 2, // Kids Run - City Night Run Aalst 2026
      },
      {
        name: "Checkpoint 2",
        abbreviation: "2",
        longitude: 4.03139,
        latitude: 50.94021,
        trackId: 2, // Kids Run - City Night Run Aalst 2026
      },
      {
        name: "Checkpoint 3",
        abbreviation: "3",
        longitude: 4.02874,
        latitude: 50.94299,
        trackId: 2, // Kids Run - City Night Run Aalst 2026
      },
    ])
    .execute()
}
