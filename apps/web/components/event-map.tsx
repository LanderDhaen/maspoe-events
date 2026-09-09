"use client"

import { Track } from "@web/types/track"
import { Badge } from "@workspace/ui/components/badge"
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@workspace/ui/components/empty"
import { MapPinX } from "lucide-react"
import {
  Map,
  MapRoute,
  MapMarker,
  MarkerContent,
} from "@workspace/ui/components/map"
import { parseAsArrayOf, parseAsString, useQueryState } from "nuqs"
import { Fragment } from "react"

interface EventMapProps {
  tracks: Track[]
  bounds: [number, number, number, number]
}

export default function EventMap({ tracks, bounds }: EventMapProps) {
  const defaultTracks = tracks.map((track) => track.slug)

  const [visibleTracks] = useQueryState(
    "tracks",
    parseAsArrayOf(parseAsString, ",").withDefault(defaultTracks)
  )

  if (tracks.length === 0) {
    return (
      <Empty className="h-full bg-muted/30">
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <MapPinX />
          </EmptyMedia>
          <EmptyTitle>Geen routes gevonden</EmptyTitle>
          <EmptyDescription className="max-w-xs text-pretty">
            Helaas, dit evenement heeft geen routes
          </EmptyDescription>
        </EmptyHeader>
      </Empty>
    )
  }

  return (
    <Map
      bounds={bounds}
      fitBoundsOptions={{
        padding: 50,
      }}
    >
      {tracks
        .filter((track) => visibleTracks.includes(track.slug))
        .map((track) => (
          <Fragment key={track.slug}>
            <MapRoute
              key={track.slug}
              coordinates={track.path.map((point) => [point.x, point.y])}
              color={`#${track.color}`}
            />
            <MapMarker
              key={`${track.slug}-start`}
              longitude={track.startingPoint.x}
              latitude={track.startingPoint.y}
            >
              <MarkerContent>
                <Badge style={{ backgroundColor: `#${track.color}` }}>
                  Start
                </Badge>
              </MarkerContent>
            </MapMarker>{" "}
            <MapMarker
              key={`${track.slug}-end`}
              longitude={track.endPoint.x}
              latitude={track.endPoint.y}
            >
              <MarkerContent>
                <Badge style={{ backgroundColor: `#${track.color}` }}>
                  Finish
                </Badge>
              </MarkerContent>
            </MapMarker>
            {track.checkpoints.map((checkpoint) => (
              <MapMarker
                key={checkpoint.id}
                longitude={checkpoint.point.x}
                latitude={checkpoint.point.y}
              >
                <MarkerContent>
                  <div
                    className="flex size-6 items-center justify-center rounded-full text-primary-foreground tabular-nums"
                    style={{ backgroundColor: `#${track.color}` }}
                  >
                    {checkpoint.abbreviation}
                  </div>
                </MarkerContent>
              </MapMarker>
            ))}
          </Fragment>
        ))}
    </Map>
  )
}
