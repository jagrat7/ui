"use client"

import { AnimatePresence, motion, useReducedMotion } from "motion/react"
import { AlertCircle, X } from "lucide-react"
import { useEffect } from "react"

import { cn } from "@/lib/utils"

export interface ErrorMessageProps {
  message: string | null
  setMessage: (message: string | null) => void
  className?: string
  /** Auto-dismiss after this many milliseconds; 0 disables it. Defaults to 8000. */
  autoDismissTimeout?: number
}

export function ErrorMessage({
  message,
  setMessage,
  className,
  autoDismissTimeout = 8000,
}: ErrorMessageProps) {
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    if (!message || autoDismissTimeout <= 0) return
    const timer = setTimeout(() => setMessage(null), autoDismissTimeout)
    return () => clearTimeout(timer)
  }, [message, setMessage, autoDismissTimeout])

  return (
    <AnimatePresence>
      {message ? (
        <motion.div
          key="error-message"
          role="alert"
          initial={reduceMotion ? false : { opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.3 }}
          className={cn(
            "group relative mb-2 flex items-center justify-between gap-2 rounded-md px-3 py-2 text-sm text-destructive",
            className,
          )}
        >
          <div className="flex min-w-0 items-center gap-2">
            <AlertCircle className="size-4 shrink-0" aria-hidden="true" />
            <span className="wrap-break-word">{message}</span>
          </div>
          <button
            type="button"
            onClick={() => setMessage(null)}
            className="shrink-0 rounded-sm p-1 opacity-100 transition-opacity duration-200 hover:text-destructive/80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring motion-reduce:transition-none sm:opacity-0 sm:group-focus-within:opacity-100 sm:group-hover:opacity-100"
            aria-label="Close error message"
          >
            <X className="size-4" aria-hidden="true" />
          </button>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
