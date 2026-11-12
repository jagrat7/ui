import { Command } from "lucide-react"

import { Kbd, KbdGroup } from "@/components/ui/kbd"

import { Row, Rows, type DemoMeta } from "../demo"

export const meta: DemoMeta = { title: "Kbd", components: ["kbd"] }

export default function KbdDemo() {
  return (
    <Rows>
      <Row label="key">
        <Kbd>D</Kbd>
        <Kbd>/</Kbd>
        <Kbd>Esc</Kbd>
        <Kbd>
          <Command />
        </Kbd>
      </Row>
      <Row label="group">
        <KbdGroup>
          <Kbd>⌘</Kbd>
          <Kbd>K</Kbd>
        </KbdGroup>
        <KbdGroup>
          <Kbd>Ctrl</Kbd>
          <span className="text-xs text-muted-foreground">+</span>
          <Kbd>K</Kbd>
        </KbdGroup>
      </Row>
      <Row label="in text">
        <p className="text-sm text-muted-foreground">
          Press <Kbd>D</Kbd> to toggle the theme.
        </p>
      </Row>
    </Rows>
  )
}
