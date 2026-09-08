import { Kysely } from "kysely"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const seed = async (db: Kysely<any>) => {
  await db
    .insertInto("checkpoint")
    .values([
      {
        name: "Checkpoint 1",
        abbreviation: "1",
        point: JSON.stringify([4.02966, 50.93936]),
        trackId: 1, // 6 km - City Night Run Aalst 2026
      },
      {
        name: "Checkpoint 2",
        abbreviation: "2",
        point: JSON.stringify([4.03344, 50.93859]),
        trackId: 1, // 6 km - City Night Run Aalst 2026
      },
      {
        name: "Checkpoint 3",
        abbreviation: "3",
        point: JSON.stringify([4.03657, 50.93747]),
        trackId: 1, // 6 km - City Night Run Aalst 2026
      },
      {
        name: "Checkpoint 4",
        abbreviation: "4",
        point: JSON.stringify([4.03939, 50.93738]),
        trackId: 1, // 6 km - City Night Run Aalst 2026
      },
      {
        name: "Checkpoint 5",
        abbreviation: "5",
        point: JSON.stringify([4.04132, 50.93756]),
        trackId: 1, // 6 km - City Night Run Aalst 2026
      },
      {
        name: "Checkpoint 6",
        abbreviation: "6",
        point: JSON.stringify([4.04272, 50.93898]),
        trackId: 1, // 6 km - City Night Run Aalst 2026
      },
      {
        name: "Checkpoint 7",
        abbreviation: "7",
        point: JSON.stringify([4.04155, 50.94007]),
        trackId: 1, // 6 km - City Night Run Aalst 2026
      },
      {
        name: "Checkpoint 8",
        abbreviation: "8",
        point: JSON.stringify([4.03832, 50.94064]),
        trackId: 1, // 6 km - City Night Run Aalst 2026
      },
      {
        name: "Checkpoint 9",
        abbreviation: "9",
        point: JSON.stringify([4.03351, 50.94064]),
        trackId: 1, // 6 km - City Night Run Aalst 2026
      },
      {
        name: "Checkpoint 9",
        abbreviation: "9",
        point: JSON.stringify([4.03351, 50.94106]),
        trackId: 1, // 6 km - City Night Run Aalst 2026
      },
      {
        name: "Checkpoint 10",
        abbreviation: "10",
        point: JSON.stringify([4.03351, 50.94106]),
        trackId: 1, // 6 km - City Night Run Aalst 2026
      },
      {
        name: "Checkpoint 10",
        abbreviation: "10",
        point: JSON.stringify([4.02874, 50.94299]),
        trackId: 1, // 6 km -City Night Run Aalst 2026
      },

      {
        name: "Checkpoint 1",
        abbreviation: "1",
        point: JSON.stringify([4.02882, 50.9403]),
        trackId: 2, // Kids Run - City Night Run Aalst 2026
      },
      {
        name: "Checkpoint 2",
        abbreviation: "2",
        point: JSON.stringify([4.03139, 50.94021]),
        trackId: 2, // Kids Run - City Night Run Aalst 2026
      },
      {
        name: "Checkpoint 3",
        abbreviation: "3",
        point: JSON.stringify([4.02874, 50.94299]),
        trackId: 2, // Kids Run - City Night Run Aalst 2026
      },
    ])
    .execute()
}
