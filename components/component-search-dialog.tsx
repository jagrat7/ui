"use client"

import type { RefObject } from "react"
import type { ComponentEntry } from "@/lib/components-index"
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"

export default function ComponentSearchDialog({
  items,
  open,
  onOpenChange,
  triggerRef,
}: {
  items: ComponentEntry[]
  open: boolean
  onOpenChange: (open: boolean) => void
  triggerRef: RefObject<HTMLButtonElement | null>
}) {
  function go(name: string) {
    onOpenChange(false)
    document.getElementById(name)?.scrollIntoView({ behavior: "smooth" })
    history.replaceState(null, "", `#${name}`)
  }

  return (
    <CommandDialog
      open={open}
      onOpenChange={onOpenChange}
      onCloseAutoFocus={(event) => {
        event.preventDefault()
        triggerRef.current?.focus()
      }}
      title="Search components"
      description="Jump to a component"
    >
      <CommandInput placeholder="Search components…" />
      <CommandList>
        <CommandEmpty>No components found.</CommandEmpty>
        <CommandGroup heading={`${items.length} components`}>
          {items.map((item) => (
            <CommandItem
              key={item.name}
              value={`${item.name} ${item.title} ${item.description}`}
              onSelect={() => go(item.name)}
              className="flex-col items-start gap-0.5"
            >
              <span className="font-mono text-sm">{item.name}</span>
              <span className="line-clamp-1 text-xs text-muted-foreground">{item.description}</span>
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  )
}
