"use client"

import { useEffect, useRef, useState } from "react"
import { Check, Save } from "lucide-react"
import { LoadingButton } from "@/registry/jr7/loading-button/loading-button"

export default function LoadingButtonDemo() {
  const [isLoading, setIsLoading] = useState(false)
  const [saved, setSaved] = useState(false)
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(
    () => () => {
      if (timer.current !== null) clearTimeout(timer.current)
    },
    [],
  )

  function save() {
    setSaved(false)
    setIsLoading(true)
    timer.current = setTimeout(() => {
      setIsLoading(false)
      setSaved(true)
      timer.current = null
    }, 1500)
  }

  return (
    <div className="flex flex-wrap items-center gap-4">
      <LoadingButton
        type="button"
        isLoading={isLoading}
        loadingText="Saving changes..."
        onClick={save}
      >
        {saved ? (
          <Check className="size-4" aria-hidden="true" />
        ) : (
          <Save className="size-4" aria-hidden="true" />
        )}
        {saved ? "Saved" : "Save changes"}
      </LoadingButton>
      <span className="text-sm text-muted-foreground" role="status">
        {saved
          ? "Your preferences have been saved."
          : isLoading
            ? "Saving preferences…"
            : "Try saving your preferences."}
      </span>
    </div>
  )
}
