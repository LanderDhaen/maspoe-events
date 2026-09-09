"use client"

import { Badge } from "@workspace/ui/components/badge"
import { Checkbox } from "@workspace/ui/components/checkbox"
import { Field, FieldGroup, FieldLabel } from "@workspace/ui/components/field"
import { parseAsArrayOf, parseAsString, useQueryState } from "nuqs"

interface TrackVisibilityFilterProps {
  track: {
    name: string
    slug: string
    color: string
  }
  defaultTracks: string[]
}

export default function TrackVisibilityFilter({
  track,
  defaultTracks,
}: TrackVisibilityFilterProps) {
  const [visibleTracks, setVisibleTracks] = useQueryState(
    "tracks",
    parseAsArrayOf(parseAsString, ",").withDefault(defaultTracks)
  )

  const handleCheckboxChange = () => {
    if (visibleTracks.includes(track.slug)) {
      setVisibleTracks(visibleTracks.filter((slug) => slug !== track.slug))
    } else {
      setVisibleTracks([...visibleTracks, track.slug])
    }
  }

  return (
    <FieldGroup key={track.slug} className="flex items-center gap-2">
      <Field orientation="horizontal">
        <Checkbox
          id={`track-${track.slug}`}
          checked={visibleTracks.includes(track.slug)}
          onCheckedChange={handleCheckboxChange}
        />
        <FieldLabel htmlFor={`track-${track.slug}`}>
          <Badge
            style={{
              backgroundColor: `#${track.color}`,
            }}
            className="h-4 w-32"
          >
            {track.name}
          </Badge>
        </FieldLabel>
      </Field>
    </FieldGroup>
  )
}
