import { parseAsArrayOf, parseAsString, useQueryState } from "nuqs"

export function useVisibleTracks(defaultTracks: string[]) {
  return useQueryState(
    "tracks",
    parseAsArrayOf(parseAsString, ",").withDefault(defaultTracks)
  )
}
