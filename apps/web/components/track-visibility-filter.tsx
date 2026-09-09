import { Badge } from "@workspace/ui/components/badge"
import { Checkbox } from "@workspace/ui/components/checkbox"
import { Field, FieldGroup, FieldLabel } from "@workspace/ui/components/field"

interface TrackVisibilityFilterProps {
  track: {
    name: string
    slug: string
    color: string
  }
}

export default function TrackVisibilityFilter({
  track,
}: TrackVisibilityFilterProps) {
  return (
    <FieldGroup key={track.slug} className="flex items-center gap-2">
      <Field orientation="horizontal">
        <Checkbox id={`track-${track.slug}`} />
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
