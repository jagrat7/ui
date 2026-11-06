import type * as React from "react"

import { cn } from "@/lib/utils"

/**
 * Thin scrollbar on a transparent track. The thumb sits at 40% of the border colour and
 * goes to full strength while the pointer is over the element. Apply it to any scroller
 * you can't wrap, such as a dialog body or a popover.
 */
export const minimalScrollbarClassName = [
  "[scrollbar-width:thin]",
  "[scrollbar-color:color-mix(in_oklab,var(--color-border)_40%,transparent)_transparent]",
  "hover:[scrollbar-color:var(--color-border)_transparent]",
  // Browsers without scrollbar-color (older Safari) style the WebKit pseudo-elements instead.
  "[&::-webkit-scrollbar]:size-2",
  "[&::-webkit-scrollbar-track]:bg-transparent",
  "[&::-webkit-scrollbar-corner]:bg-transparent",
  "[&::-webkit-scrollbar-thumb]:rounded-full",
  "[&::-webkit-scrollbar-thumb]:bg-border/40",
  "hover:[&::-webkit-scrollbar-thumb]:bg-border",
].join(" ")

export function MinimalScrollbar({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="minimal-scrollbar"
      className={cn("overflow-auto", minimalScrollbarClassName, className)}
      {...props}
    />
  )
}
