import * as React from "react"

import { cn } from "@/lib/utils"

// Panel layout adapted from chanhdai.com (MIT) — https://github.com/ncdai/chanhdai.com

function Panel({ className, ...props }: React.ComponentProps<"section">) {
  return (
    <section
      data-slot="panel"
      className={cn("screen-line-top screen-line-bottom border-x", className)}
      {...props}
    />
  )
}

function PanelHeader({ className, ...props }: React.ComponentProps<"header">) {
  return (
    <header
      data-slot="panel-header"
      className={cn("screen-line-bottom px-4 py-3", className)}
      {...props}
    />
  )
}

function PanelTitle({ className, ...props }: React.ComponentProps<"h2">) {
  return (
    <h2
      data-slot="panel-title"
      className={cn("text-2xl font-medium tracking-tight text-balance", className)}
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
  return <div data-slot="panel-content" className={cn("p-4", className)} {...props} />
}

function Separator({ className }: { className?: string }) {
  return <div className={cn("stripe-divider w-full border-x", className)} />
}

export { Panel, PanelContent, PanelDescription, PanelHeader, PanelTitle, Separator }
