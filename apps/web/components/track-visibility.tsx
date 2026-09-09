"use client"

import { useVisibleTracks } from "@web/hooks/useVisibleTracks"
import { Track } from "@web/types/track"
import { Badge } from "@workspace/ui/components/badge"
import { Checkbox } from "@workspace/ui/components/checkbox"
import { Field, FieldGroup, FieldLabel } from "@workspace/ui/components/field"

interface TrackVisibilityProps {
  tracks: Track[]
}

export default function TrackVisibility({ tracks }: TrackVisibilityProps) {
  const defaultTracks = tracks.map((track) => track.slug)

  const [visibleTracks, setVisibleTracks] = useVisibleTracks(defaultTracks)

  const handleCheckboxChange = (slug: string) => {
    if (visibleTracks.includes(slug)) {
      setVisibleTracks(visibleTracks.filter((s) => s !== slug))
    } else {
      setVisibleTracks([...visibleTracks, slug])
    }
  }

  return (
    <div className="flex flex-col gap-2">
      {tracks.map((track) => (
        <FieldGroup key={track.slug} className="flex items-center gap-2">
          <Field orientation="horizontal">
            <Checkbox
              id={`track-${track.slug}`}
              checked={visibleTracks.includes(track.slug)}
              onCheckedChange={() => handleCheckboxChange(track.slug)}
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
      ))}
    </div>
  )
}
