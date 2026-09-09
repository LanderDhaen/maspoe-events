import { client } from "@web/api"
import { formatDateRange } from "@web/lib/event"
import { Badge } from "@workspace/ui/components/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card"
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from "@workspace/ui/components/empty"
import {
  Map,
  MapRoute,
  MapMarker,
  MarkerContent,
} from "@workspace/ui/components/map"
import NotFound from "./not-found"
import { Fragment } from "react"
import TrackVisibility from "@web/components/track-visibility"

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  const { data: event, error } = await client
    .events({
      slug: slug,
    })
    .get()

  if (error) {
    if (error.status === 404) {
      return NotFound()
    }

    return (
      <Empty className="h-lvh bg-muted/30">
        <EmptyHeader>
          <EmptyTitle>Er is iets misgegaan</EmptyTitle>
          <EmptyDescription>
            Helaas, er is iets misgegaan bij het ophalen van het evenement.
          </EmptyDescription>
        </EmptyHeader>
      </Empty>
    )
  }

  return (
    <div className="relative h-lvh w-full">
      <Card className="absolute top-4 right-4 left-4 z-10 max-w-md opacity-95">
        <CardHeader>
          <CardTitle>{event.name}</CardTitle>
          <CardDescription className="italic">
            {formatDateRange(event.startDate, event.endDate)}
          </CardDescription>
          {event.description && (
            <CardDescription>{event.description}</CardDescription>
          )}
        </CardHeader>
        <CardContent>
          <TrackVisibility tracks={event.tracks} />
        </CardContent>
      </Card>
      <div className="h-full w-full">
        <Map
          bounds={event.bounds}
          fitBoundsOptions={{
            padding: 50,
          }}
        >
          {event.tracks.map((track) => (
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
      </div>
    </div>
  )
}
