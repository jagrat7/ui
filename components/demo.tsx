import type * as React from "react"

import { cn } from "@/lib/utils"

/**
 * Frame for a component demo: the component sits centred on the stage, and anything
 * that's only there to drive the demo (status text, replay buttons) lives in a bar below.
 */
export function Demo({ children }: { children: React.ReactNode }) {
  return <div className="flex flex-1 flex-col">{children}</div>
}

export function DemoStage({ children, className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("flex flex-1 items-center justify-center p-6 sm:p-10", className)}
      {...props}
    >
      {children}
    </div>
  )
}

export function DemoFooter({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-10 items-center justify-between gap-3 border-t bg-background/70 px-3 py-1.5 font-mono text-xs text-muted-foreground">
      {children}
    </div>
  )
}

export function DemoCaption({ children }: { children: React.ReactNode }) {
  return (
    <span role="status" aria-live="polite" className="truncate">
      {children}
    </span>
  )
}

export function DemoActions({ children }: { children: React.ReactNode }) {
  return <div className="flex shrink-0 items-center gap-1">{children}</div>
}
