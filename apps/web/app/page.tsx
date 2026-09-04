import { Button } from "@workspace/ui/components/button"
import { client } from "@web/api"

export default async function Page() {
  const { data: events, error } = await client.events.get()

  if (error) {
    return (
      <div className="flex min-h-svh p-6">
        <div className="flex max-w-md min-w-0 flex-col gap-4 text-sm leading-loose">
          <div>
            <h1 className="font-medium">Error fetching events</h1>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-svh p-6">
      <div className="flex max-w-md min-w-0 flex-col gap-4 text-sm leading-loose">
        {events.map((event) => (
          <div key={event.id}>
            <h2 className="font-medium">{event.name}</h2>
            <p>{event.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
