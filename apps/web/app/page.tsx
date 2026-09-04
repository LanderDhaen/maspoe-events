import { client } from "@web/api"

export default async function Page() {
  const { data: event, error } = await client
    .events({
      slug: "city-night-run-aalst-2026",
    })
    .get()

  if (error) {
    return (
      <div>
        <h1 className="font-medium">Er is iets misgelopen</h1>
      </div>
    )
  }

  return (
    <div className="flex min-h-svh p-6">
      <div className="flex max-w-md min-w-0 flex-col gap-4 text-sm leading-loose">
        <h1 className="font-medium">{event.name}</h1>
        <p>{event.description}</p>
      </div>
    </div>
  )
}
