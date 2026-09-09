"use client"

import { Track } from "@web/types/track"
import { Badge } from "@workspace/ui/components/badge"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@workspace/ui/components/empty"
import { MapPinOff, RefreshCw } from "lucide-react"
import {
  Map,
  MapRoute,
  MapMarker,
  MarkerContent,
} from "@workspace/ui/components/map"
import { Fragment } from "react"
import { Button } from "@workspace/ui/components/button"
import { useVisibleTracks } from "@web/hooks/useVisibleTracks"

interface EventMapProps {
  tracks: Track[]
  bounds: [number, number, number, number]
}

export default function EventMap({ tracks, bounds }: EventMapProps) {
  const defaultTracks = tracks.map((track) => track.slug)

  const [visibleTracks, setVisibleTracks] = useVisibleTracks(defaultTracks)

  if (visibleTracks.length === 0) {
    const handleShowAllTracks = () => {
      setVisibleTracks(null)
    }

    return (
      <Empty className="h-lvh bg-muted/30">
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <MapPinOff />
          </EmptyMedia>
          <EmptyTitle>Geen routes geselecteerd</EmptyTitle>
          <EmptyDescription className="max-w-xs text-pretty">
            Selecteer een of meerdere routes om ze op de kaart weergeven.
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <Button variant="outline" onClick={handleShowAllTracks}>
            <RefreshCw data-icon="inline-start" />
            Toont alle routes
          </Button>
        </EmptyContent>
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
