"use client"

import { useReducedMotion } from "motion/react"
import { lazy, Suspense, useEffect, useRef, useState } from "react"

import { cn } from "@/lib/utils"

const AudvisVisualizer = lazy(() =>
  import("audvis").then((module) => ({ default: module.AudioVisualizer })),
)

export interface AudioVisualizerProps {
  analyser?: AnalyserNode | null
  frequencyData?: readonly number[] | Uint8Array
  isActive: boolean
  progress?: number
  width?: number
  height?: number
  color?: string
  className?: string
  ariaLabel?: string
}

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
  const usesAnalyser = active && Boolean(analyser)
  const hasProgress = progress !== undefined && Number.isFinite(progress)

  useEffect(() => {
    if (!usesAnalyser) return
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
    // oxlint-disable-next-line react/exhaustive-effect-dependencies
  }, [usesAnalyser, color, className])

  let bars: number[] = []
  if (active && !analyser && frequencyData?.length) {
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
        <Suspense
          fallback={<IdleWaveform width={drawWidth} height={drawHeight} stripWidth={stripWidth} />}
        >
          <AudvisVisualizer
            key={`${drawWidth}:${drawHeight}:${canvasColor}`}
            analyser={analyser}
            isActive
            width={drawWidth}
            height={drawHeight}
            color={canvasColor}
          />
        </Suspense>
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

function IdleWaveform({
  width,
  height,
  stripWidth,
}: {
  width: number
  height: number
  stripWidth: number
}) {
  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio="none"
      className="block size-full"
      aria-hidden="true"
    >
      <line
        x1={0}
        y1={height / 2}
        x2={stripWidth}
        y2={height / 2}
        stroke="currentColor"
        strokeWidth={4}
        strokeDasharray="3 1"
      />
    </svg>
  )
}
