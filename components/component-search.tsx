"use client"

import * as React from "react"
import { SearchIcon } from "lucide-react"

import type { ComponentEntry } from "@/lib/components-index"
import { Button } from "@/components/ui/button"
import { Kbd, KbdGroup } from "@/components/ui/kbd"
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"

export function ComponentSearch({ items }: { items: ComponentEntry[] }) {
  const [open, setOpen] = React.useState(false)

  React.useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "k" && (event.metaKey || event.ctrlKey)) {
        event.preventDefault()
        setOpen((current) => !current)
      }
    }
    document.addEventListener("keydown", onKeyDown)
    return () => document.removeEventListener("keydown", onKeyDown)
  }, [])

  function go(name: string) {
    setOpen(false)
    document.getElementById(name)?.scrollIntoView({ behavior: "smooth" })
    history.replaceState(null, "", `#${name}`)
  }

  return (
    <>
      <Button
        variant="outline"
        size="sm"
        aria-label="Search components"
        onClick={() => setOpen(true)}
        className="gap-2 bg-background/40 font-mono text-muted-foreground"
      >
        <SearchIcon />
        <span className="max-sm:hidden">Search components</span>
        <KbdGroup className="max-sm:hidden">
          <Kbd>⌘</Kbd>
          <Kbd>K</Kbd>
        </KbdGroup>
      </Button>
      <CommandDialog
        open={open}
        onOpenChange={setOpen}
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
                <span className="line-clamp-1 text-xs text-muted-foreground">
                  {item.description}
                </span>
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  )
}
