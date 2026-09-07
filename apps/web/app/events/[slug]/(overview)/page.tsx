import { client } from "@web/api"
import { formatDateRange } from "@web/lib/event"
import { Badge } from "@workspace/ui/components/badge"
import {
  Card,
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
      return (
        <Empty className="h-lvh bg-muted/30">
          <EmptyHeader>
            <EmptyTitle>Evenement niet gevonden</EmptyTitle>
            <EmptyDescription>
              Helaas, het evenement dat je zoekt bestaat niet.
            </EmptyDescription>
          </EmptyHeader>
        </Empty>
      )
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
      <Card className="absolute top-4 right-4 left-4 z-10 max-w-md">
        <CardHeader>
          <CardTitle>{event.name}</CardTitle>
          <CardDescription className="italic">
            {formatDateRange(event.startDate, event.endDate)}
          </CardDescription>
          {event.description && (
            <CardDescription>{event.description}</CardDescription>
          )}
        </CardHeader>
      </Card>
      <div className="h-full w-full">
        <Map center={event.tracks[0]?.startingPoint} zoom={15}>
          {event.tracks.map((track) => (
            <>
              <MapRoute
                key={track.slug}
                coordinates={track.route}
                color={`#${track.color}`}
              />
              <MapMarker
                key={`${track.slug}-start`}
                longitude={track.startingPoint[0]}
                latitude={track.startingPoint[1]}
              >
                <MarkerContent>
                  <Badge style={{ backgroundColor: `#${track.color}` }}>
                    Start
                  </Badge>
                </MarkerContent>
              </MapMarker>{" "}
              <MapMarker
                key={`${track.slug}-end`}
                longitude={track.endPoint[0]}
                latitude={track.endPoint[1]}
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
                  longitude={checkpoint.longitude}
                  latitude={checkpoint.latitude}
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
            </>
          ))}
        </Map>
      </div>
    </div>
  )
}
