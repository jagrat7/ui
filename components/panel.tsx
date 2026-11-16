import * as React from "react"

import { cn } from "@/lib/utils"

// One component's section on the home page. Sections sit open on the glow background,
// parted only by the page's vertical rhythm.

function Panel({ className, ...props }: React.ComponentProps<"section">) {
  return <section data-slot="panel" className={cn("px-4", className)} {...props} />
}

function PanelHeader({ className, ...props }: React.ComponentProps<"header">) {
  return <header data-slot="panel-header" className={cn("space-y-1", className)} {...props} />
}

function PanelTitle({ className, ...props }: React.ComponentProps<"h2">) {
  return (
    <h2
      data-slot="panel-title"
      className={cn("text-3xl font-medium tracking-tight text-balance", className)}
      {...props}
    />
  )
}

function PanelDescription({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="panel-description"
      className={cn("text-sm text-balance text-muted-foreground", className)}
      {...props}
    />
  )
}

function PanelContent({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="panel-content" className={cn("pt-3", className)} {...props} />
}

export { Panel, PanelContent, PanelDescription, PanelHeader, PanelTitle }
