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

// The platform is fixed for the session; keep the server-rendered label deterministic.
function subscribeToPlatform() {
  return () => {}
}

function getIsMac() {
  return /Macintosh|Mac OS X|iPhone|iPad|iPod/.test(navigator.userAgent)
}

export function ComponentSearch({ items }: { items: ComponentEntry[] }) {
  const [open, setOpen] = React.useState(false)
  const isMac = React.useSyncExternalStore(subscribeToPlatform, getIsMac, () => false)

  React.useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      const shortcutModifier = isMac ? event.metaKey : event.ctrlKey
      if (event.key.toLowerCase() === "k" && shortcutModifier) {
        event.preventDefault()
        setOpen((current) => !current)
      }
    }
    document.addEventListener("keydown", onKeyDown)
    return () => document.removeEventListener("keydown", onKeyDown)
  }, [isMac])

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
        aria-keyshortcuts={isMac ? "Meta+K" : "Control+K"}
        onClick={() => setOpen(true)}
        className="gap-2 bg-background/40 font-mono text-muted-foreground"
      >
        <SearchIcon />
        <KbdGroup className="max-sm:hidden">
          <Kbd>{isMac ? "⌘" : "Ctrl"}</Kbd>
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
