import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@workspace/ui/components/empty"
import { CalendarX2 } from "lucide-react"

export default function NotFound() {
  return (
    <Empty className="h-lvh bg-muted/30">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <CalendarX2 />
        </EmptyMedia>
        <EmptyTitle>Evenement niet gevonden</EmptyTitle>
        <EmptyDescription>
          Helaas, het evenement dat je zoekt bestaat niet.
        </EmptyDescription>
      </EmptyHeader>
    </Empty>
  )
}
