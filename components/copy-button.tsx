"use client"

import * as React from "react"
import { CheckIcon, CopyIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

export function CopyButton({
  text,
  className,
  ...props
}: { text: string } & React.ComponentProps<typeof Button>) {
  const [copied, setCopied] = React.useState(false)

  React.useEffect(() => {
    if (!copied) return
    const timeout = setTimeout(() => setCopied(false), 1500)
    return () => clearTimeout(timeout)
  }, [copied])

  return (
    <Button
      variant="ghost"
      size="icon"
      aria-label="Copy to clipboard"
      className={cn("size-7 text-muted-foreground", className)}
      onClick={() => {
        navigator.clipboard.writeText(text)
        setCopied(true)
      }}
      {...props}
    >
      {copied ? <CheckIcon /> : <CopyIcon />}
    </Button>
  )
}
