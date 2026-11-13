import { Button } from "@/components/ui/button"
import { ArrowRight, Bookmark, Search, Trash2 } from "lucide-react"

import { Row, Rows, type DemoMeta } from "../demo"

export const meta: DemoMeta = { title: "Button", components: ["button"] }

export default function ButtonDemo() {
  return (
    <Rows>
      <Row label="variant">
        <Button>Save</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="destructive">Delete</Button>
        <Button variant="link">Link</Button>
      </Row>
      <Row label="size">
        <Button size="xs">xs</Button>
        <Button size="sm">sm</Button>
        <Button>default</Button>
        <Button size="lg">lg</Button>
      </Row>
      <Row label="icon">
        <Button>
          <Search data-icon="inline-start" />
          Search
        </Button>
        <Button variant="outline">
          Open
          <ArrowRight data-icon="inline-end" />
        </Button>
        <Button size="icon-xs" variant="outline" aria-label="Save">
          <Bookmark />
        </Button>
        <Button size="icon-sm" variant="outline" aria-label="Save">
          <Bookmark />
        </Button>
        <Button size="icon" variant="outline" aria-label="Save">
          <Bookmark />
        </Button>
        <Button size="icon-lg" variant="destructive" aria-label="Move to Trash">
          <Trash2 />
        </Button>
      </Row>
      <Row label="disabled">
        <Button disabled>Save</Button>
        <Button variant="outline" disabled>
          Outline
        </Button>
      </Row>
    </Rows>
  )
}
