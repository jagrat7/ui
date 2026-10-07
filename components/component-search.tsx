"use client"

import * as React from "react"
import dynamic from "next/dynamic"
import { SearchIcon } from "lucide-react"

import type { ComponentEntry } from "@/lib/components-index"
import { Button } from "@/components/ui/button"
import { Kbd, KbdGroup } from "@/components/ui/kbd"

const loadSearchDialog = () => import("@/components/component-search-dialog")
const ComponentSearchDialog = dynamic(loadSearchDialog, { ssr: false })

function preloadSearch() {
  void loadSearchDialog().catch(() => {})
}

// The platform is fixed for the session; keep the server-rendered label deterministic.
function subscribeToPlatform() {
  return () => {}
}

function getIsMac() {
  return /Macintosh|Mac OS X|iPhone|iPad|iPod/.test(navigator.userAgent)
}

export function ComponentSearch({ items }: { items: ComponentEntry[] }) {
  const [open, setOpen] = React.useState(false)
  const [hasOpened, setHasOpened] = React.useState(false)
  const triggerRef = React.useRef<HTMLButtonElement>(null)
  const isMac = React.useSyncExternalStore(subscribeToPlatform, getIsMac, () => false)

  React.useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      const shortcutModifier = isMac ? event.metaKey : event.ctrlKey
      if (event.key.toLowerCase() === "k" && shortcutModifier) {
        event.preventDefault()
        setHasOpened(true)
        setOpen((current) => !current)
      }
    }
    document.addEventListener("keydown", onKeyDown)
    return () => document.removeEventListener("keydown", onKeyDown)
  }, [isMac])

  function openSearch() {
    setHasOpened(true)
    setOpen(true)
  }

  return (
    <>
      <Button
        ref={triggerRef}
        onMouseEnter={preloadSearch}
        onFocus={preloadSearch}
        variant="outline"
        size="sm"
        aria-label="Search components"
        aria-keyshortcuts={isMac ? "Meta+K" : "Control+K"}
        onClick={openSearch}
        className="gap-2 bg-background/40 font-mono text-muted-foreground"
      >
        <SearchIcon />
        <KbdGroup className="max-sm:hidden">
          <Kbd>{isMac ? "⌘" : "Ctrl"}</Kbd>
          <Kbd>K</Kbd>
        </KbdGroup>
      </Button>
      {hasOpened ? (
        <ComponentSearchDialog
          items={items}
          open={open}
          onOpenChange={setOpen}
          triggerRef={triggerRef}
        />
      ) : null}
    </>
  )
}
