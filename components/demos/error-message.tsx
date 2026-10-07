"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ErrorMessage } from "@/registry/jr7/error-message/error-message"

const SAMPLE_ERROR = "We couldn't save your changes. Please try again."

export default function ErrorMessageDemo() {
  const [message, setMessage] = useState<string | null>(SAMPLE_ERROR)

  return (
    <div className="w-full max-w-lg space-y-3">
      <div className="min-h-14">
        <ErrorMessage message={message} setMessage={setMessage} autoDismissTimeout={8000} />
      </div>
      <Button
        type="button"
        variant="outline"
        onClick={() => setMessage(SAMPLE_ERROR)}
        disabled={Boolean(message)}
      >
        Show error again
      </Button>
      <p className="text-sm text-muted-foreground">
        Dismiss the message, or let it close after eight seconds.
      </p>
    </div>
  )
}
