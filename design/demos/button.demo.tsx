import { ArrowRight, Copy, Search, Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"

import { Row, Rows, type DemoMeta } from "../demo"

export const meta: DemoMeta = { title: "Button", components: ["button"] }

export default function ButtonDemo() {
  return (
    <Rows>
      <Row label="variant">
        <Button>Install</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="destructive">Remove</Button>
        <Button variant="link">registry.json</Button>
      </Row>
      <Row label="size">
        <Button size="xs">xs</Button>
        <Button size="sm">sm</Button>
        <Button>default</Button>
        <Button size="lg">lg</Button>
      </Row>
      <Row label="icon">
        <Button variant="outline">
          <Search />
          Search components
        </Button>
        <Button variant="secondary">
          View source
          <ArrowRight />
        </Button>
        <Button size="icon-xs" variant="ghost" aria-label="Copy">
          <Copy />
        </Button>
        <Button size="icon-sm" variant="ghost" aria-label="Copy">
          <Copy />
        </Button>
        <Button size="icon" variant="ghost" aria-label="Copy">
          <Copy />
        </Button>
        <Button size="icon-lg" variant="destructive" aria-label="Remove">
          <Trash2 />
        </Button>
      </Row>
      <Row label="asChild">
        <Button variant="outline" asChild>
          <a href="#button">A link styled as a button</a>
        </Button>
      </Row>
      <Row label="disabled">
        <Button disabled>Install</Button>
        <Button variant="outline" disabled>
          Outline
        </Button>
      </Row>
    </Rows>
  )
}
