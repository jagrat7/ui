"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { motion, useInView, useReducedMotion } from "motion/react"
import { RotateCcw } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Demo, DemoStage, DemoFooter, DemoCaption, DemoActions } from "@/components/demo"
import { ErrorMessage } from "@/registry/jr7/error-message/error-message"

const SAMPLE_ERROR = "We couldn't save your changes. Please try again."
const DISMISS_SECONDS = 5

export default function ErrorMessageDemo() {
  const [message, setMessage] = useState<string | null>(SAMPLE_ERROR)
  const previewRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(previewRef, { amount: 1 })
  const dismiss = useCallback(() => setMessage(null), [])

  return (
    <Demo>
      <DemoStage>
        <div
          ref={previewRef}
          className="grid w-full max-w-md place-items-center *:col-start-1 *:row-start-1"
        >
          <ErrorMessage
            message={message}
            setMessage={setMessage}
            autoDismissTimeout={0}
            className="mb-0 w-full"
          />
          {!message && <p className="text-sm text-muted-foreground/60">No error</p>}
        </div>
      </DemoStage>
      <DemoFooter>
        <DemoCaption>
          {!message ? (
            "Dismissed"
          ) : isInView ? (
            <DismissCountdown onDismiss={dismiss} />
          ) : (
            "Timer starts when visible"
          )}
        </DemoCaption>
        <DemoActions>
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
        </DemoActions>
      </DemoFooter>
    </Demo>
  )
}

function DismissCountdown({ onDismiss }: { onDismiss: () => void }) {
  const [secondsRemaining, setSecondsRemaining] = useState(DISMISS_SECONDS)
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    // One clock drives both the countdown and dismissal so they stay in sync.
    const deadline = performance.now() + DISMISS_SECONDS * 1000
    const timer = setInterval(() => {
      const remaining = Math.max(0, Math.ceil((deadline - performance.now()) / 1000))
      setSecondsRemaining(remaining)
      if (remaining === 0) {
        clearInterval(timer)
        onDismiss()
      }
    }, 100)

    return () => clearInterval(timer)
  }, [onDismiss])

  return (
    <span role="timer" aria-live="off" className="tabular-nums">
      Dismisses in{" "}
      <motion.span
        key={secondsRemaining}
        initial={reduceMotion ? false : { scale: 1.25, opacity: 0.65 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: reduceMotion ? 0 : 0.25, ease: "easeOut" }}
        className={`inline-block min-w-[1ch] text-center font-semibold ${
          secondsRemaining <= 2 ? "text-amber-700 dark:text-amber-400" : "text-primary"
        }`}
      >
        {secondsRemaining}
      </motion.span>
      s
    </span>
  )
}
