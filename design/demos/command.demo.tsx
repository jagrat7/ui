import { useState } from "react"
import { AudioLines, CircleAlert, Copy, LoaderCircle, Moon, Rows3 } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command"
import { Kbd } from "@/components/ui/kbd"

import { Row, Rows, type DemoMeta } from "../demo"

export const meta: DemoMeta = { title: "Command", components: ["command"] }

function Items() {
  return (
    <>
      <CommandEmpty>No components found.</CommandEmpty>
      <CommandGroup heading="Components">
        <CommandItem>
          <LoaderCircle />
          Loading Button
        </CommandItem>
        <CommandItem>
          <Rows3 />
          Numbered Pagination
        </CommandItem>
        <CommandItem>
          <AudioLines />
          Audio Visualizer
        </CommandItem>
        <CommandItem disabled>
          <CircleAlert />
          Error Message
        </CommandItem>
      </CommandGroup>
      <CommandSeparator />
      <CommandGroup heading="Actions">
        <CommandItem>
          <Copy />
          Copy install command
          <CommandShortcut>⌘C</CommandShortcut>
        </CommandItem>
        <CommandItem>
          <Moon />
          Toggle theme
          <CommandShortcut>D</CommandShortcut>
        </CommandItem>
      </CommandGroup>
    </>
  )
}

export default function CommandDemo() {
  const [open, setOpen] = useState(false)
  return (
    <Rows>
      <Row label="inline" className="block">
        <Command className="max-w-sm border">
          <CommandInput placeholder="Search components…" />
          <CommandList>
            <Items />
          </CommandList>
        </Command>
      </Row>
      <Row label="dialog">
        <Button variant="outline" onClick={() => setOpen(true)}>
          Search components
          <Kbd>/</Kbd>
        </Button>
        <CommandDialog open={open} onOpenChange={setOpen} title="Search components">
          <CommandInput placeholder="Search components…" />
          <CommandList>
            <Items />
          </CommandList>
        </CommandDialog>
      </Row>
    </Rows>
  )
}
