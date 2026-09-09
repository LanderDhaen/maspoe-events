import { client } from "@web/api"
import { formatDateRange } from "@web/lib/event"
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
import NotFound from "./not-found"
import TrackVisibility from "@web/components/track-visibility"
import EventMap from "@web/components/event-map"

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
        <EventMap tracks={event.tracks} bounds={event.bounds} />
      </div>
    </div>
  )
}
