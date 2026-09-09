import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from "@workspace/ui/components/empty"

export default function NotFound() {
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
