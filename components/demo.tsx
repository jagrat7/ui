import type * as React from "react"

import { cn } from "@/lib/utils"

/**
 * Frame for a component demo: the component sits centred on the stage, and anything
 * that's only there to drive the demo (status text, replay buttons) lives in a bar below.
 */
export function Demo({
  children,
  caption,
  actions,
  className,
}: {
  children: React.ReactNode
  caption?: React.ReactNode
  actions?: React.ReactNode
  className?: string
}) {
  return (
    <div className="flex flex-1 flex-col">
      <div className={cn("flex flex-1 items-center justify-center p-6 sm:p-10", className)}>
        {children}
      </div>
      {(caption || actions) && (
        <div className="flex min-h-10 items-center justify-between gap-3 border-t bg-background/70 px-3 py-1.5 font-mono text-xs text-muted-foreground">
          <span role="status" aria-live="polite" className="truncate">
            {caption}
          </span>
          {actions && <div className="flex shrink-0 items-center gap-1">{actions}</div>}
        </div>
      )}
    </div>
  )
}
