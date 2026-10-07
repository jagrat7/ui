"use client"

import { AudioVisualizer as AudvisVisualizer } from "audvis"
import { useReducedMotion } from "motion/react"
import { useEffect, useRef, useState } from "react"

import { cn } from "@/lib/utils"

export interface AudioVisualizerProps {
  /** A caller-owned Web Audio analyser. This component never requests audio access. */
  analyser?: AnalyserNode | null
  /** Optional byte-frequency samples (0–255), for non-Web-Audio inputs and demos. */
  frequencyData?: readonly number[] | Uint8Array
  isActive: boolean
  /** Optional playback progress, normalized to 0–1. */
  progress?: number
  width?: number
  height?: number
  /** Any CSS color. Defaults to the computed text-primary color. */
  color?: string
  className?: string
  ariaLabel?: string
}

/** Extracted from SpotifyPill's waveform, preserving audvis and its idle strip. */
export function AudioVisualizer({
  analyser,
  frequencyData,
  isActive,
  progress,
  width = 680,
  height = 24,
  color,
  className,
  ariaLabel = "Audio waveform",
}: AudioVisualizerProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [canvasColor, setCanvasColor] = useState<string | null>(null)
  const reduceMotion = useReducedMotion()
  const drawWidth = Number.isFinite(width) ? Math.max(8, Math.round(width)) : 680
  const drawHeight = Number.isFinite(height) ? Math.max(4, Math.round(height)) : 24
  const halfBars = Math.floor(drawWidth / 4 / 2)
  const barCount = halfBars * 2 - 1
  const stripWidth = (barCount - 1) * 4 + 3
  const active = isActive && !reduceMotion
  const hasProgress = progress !== undefined && Number.isFinite(progress)

  // Canvas needs a resolved color, rather than a CSS variable or currentColor.
  useEffect(() => {
    function updateColor() {
      if (containerRef.current) setCanvasColor(getComputedStyle(containerRef.current).color)
    }
    updateColor()
    const observer = new MutationObserver(updateColor)
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class", "style"],
    })
    const scheme = window.matchMedia("(prefers-color-scheme: dark)")
    scheme.addEventListener("change", updateColor)
    return () => {
      observer.disconnect()
      scheme.removeEventListener("change", updateColor)
    }
    // `color` and `className` change the computed color, so re-read it when they do.
    // oxlint-disable-next-line react/exhaustive-effect-dependencies
  }, [color, className])

  let bars: number[] = []
  if (active && !analyser && frequencyData?.length) {
    // The same nonlinear sampling, mirrored bars, and 3px/1px geometry as audvis.
    const half = Array.from({ length: halfBars }, (_, index) => {
      const dataIndex = Math.floor((index / halfBars) ** 1.5 * frequencyData.length * 0.5)
      const value = frequencyData[dataIndex] ?? 0
      const sample = Number.isFinite(value) ? Math.min(255, Math.max(0, value)) : 0
      return Math.max(2, (sample / 200) * (drawHeight / 2))
    })
    bars = [...half.slice(1).toReversed(), ...half]
  }

  return (
    <div
      ref={containerRef}
      data-slot="audio-visualizer"
      className={cn(
        "w-full overflow-hidden text-primary [&>canvas]:block [&>canvas]:h-full [&>canvas]:w-full",
        className,
      )}
      style={{ height: drawHeight, color }}
      role={hasProgress ? "progressbar" : "img"}
      aria-label={ariaLabel}
      aria-valuemin={hasProgress ? 0 : undefined}
      aria-valuemax={hasProgress ? 100 : undefined}
      aria-valuenow={
        hasProgress ? Math.round(Math.min(1, Math.max(0, progress!)) * 100) : undefined
      }
    >
      {active && analyser && canvasColor ? (
        <AudvisVisualizer
          key={`${drawWidth}:${drawHeight}:${canvasColor}`}
          analyser={analyser}
          isActive
          width={drawWidth}
          height={drawHeight}
          color={canvasColor}
        />
      ) : (
        <svg
          viewBox={`0 0 ${drawWidth} ${drawHeight}`}
          preserveAspectRatio="none"
          className="block size-full"
          aria-hidden="true"
        >
          {bars.length ? (
            bars.map((barHeight, index) => (
              <rect
                key={index}
                x={index * 4}
                y={drawHeight / 2 - barHeight}
                width={3}
                height={barHeight * 2}
                fill="currentColor"
              />
            ))
          ) : (
            <line
              x1={0}
              y1={drawHeight / 2}
              x2={stripWidth}
              y2={drawHeight / 2}
              stroke="currentColor"
              strokeWidth={4}
              strokeDasharray="3 1"
            />
          )}
        </svg>
      )}
    </div>
  )
}
