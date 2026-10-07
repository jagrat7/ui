"use client"

import { useEffect, useRef, useState } from "react"
import { Check, RotateCcw, Save } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Demo } from "@/components/demo"
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

  function reset() {
    if (timer.current !== null) clearTimeout(timer.current)
    timer.current = null
    setIsLoading(false)
    setSaved(false)
  }

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
    <Demo
      caption={isLoading ? "isLoading: true" : saved ? "Saved" : "Click to simulate a 1.5s save"}
      actions={
        <Button
          variant="ghost"
          size="xs"
          className="font-mono"
          onClick={reset}
          disabled={!isLoading && !saved}
        >
          <RotateCcw />
          Reset
        </Button>
      }
    >
      <LoadingButton type="button" isLoading={isLoading} loadingText="Saving…" onClick={save}>
        {saved ? <Check aria-hidden="true" /> : <Save aria-hidden="true" />}
        {saved ? "Saved" : "Save changes"}
      </LoadingButton>
    </Demo>
  )
}
