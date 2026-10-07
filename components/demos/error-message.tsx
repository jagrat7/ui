"use client"

import { useState } from "react"
import { RotateCcw } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Demo } from "@/components/demo"
import { ErrorMessage } from "@/registry/jr7/error-message/error-message"

const SAMPLE_ERROR = "We couldn't save your changes. Please try again."

export default function ErrorMessageDemo() {
  const [message, setMessage] = useState<string | null>(SAMPLE_ERROR)

  return (
    <Demo
      caption={message ? "Auto-dismisses after 5s" : "Dismissed"}
      actions={
        <Button
          variant="ghost"
          size="xs"
          className="font-mono"
          onClick={() => setMessage(SAMPLE_ERROR)}
          disabled={Boolean(message)}
        >
          <RotateCcw />
          Show again
        </Button>
      }
    >
      <div className="grid w-full max-w-md place-items-center *:col-start-1 *:row-start-1">
        <ErrorMessage message={message} setMessage={setMessage} className="mb-0 w-full" />
        {!message && <p className="text-sm text-muted-foreground/60">No error</p>}
      </div>
    </Demo>
  )
}
