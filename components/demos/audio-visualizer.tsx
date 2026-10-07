"use client"

import { useEffect, useState } from "react"
import { Pause, Play } from "lucide-react"
import { useReducedMotion } from "motion/react"

import { Button } from "@/components/ui/button"
import { AudioVisualizer } from "@/registry/jr7/audio-visualizer/audio-visualizer"

export default function AudioVisualizerDemo() {
  const [isActive, setIsActive] = useState(true)
  const [frequencyData, setFrequencyData] = useState<number[]>([])
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    if (!isActive || reduceMotion) return
    let frame = 0
    let lastUpdate = 0
    function animate(time: number) {
      if (time - lastUpdate >= 50) {
        lastUpdate = time
        setFrequencyData(
          Array.from({ length: 256 }, (_, index) => {
            const envelope = Math.exp(-index / 100)
            const pulse = 0.5 + 0.5 * Math.sin(time / 450 + index * 0.18)
            const beat = 0.5 + 0.5 * Math.sin(time / 170 - index * 0.08)
            return Math.round(18 + 170 * envelope * pulse * beat)
          }),
        )
      }
      frame = requestAnimationFrame(animate)
    }
    frame = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(frame)
  }, [isActive, reduceMotion])

  return (
    <div className="flex w-full max-w-xl items-center gap-3 rounded-2xl border border-border bg-background p-4 text-foreground">
      <Button
        type="button"
        variant="secondary"
        size="icon"
        className="size-14 shrink-0 rounded-sm sm:size-16"
        aria-label={isActive ? "Pause simulated waveform" : "Play simulated waveform"}
        onClick={() => setIsActive((current) => !current)}
      >
        {isActive ? (
          <Pause className="size-4 fill-current" aria-hidden="true" />
        ) : (
          <Play className="size-4 fill-current" aria-hidden="true" />
        )}
      </Button>
      <div className="min-w-0 flex-1">
        <p className="text-base/tight font-semibold">Midnight drive</p>
        <p className="mt-0.5 text-sm/tight text-muted-foreground">
          Simulated audio · no microphone required
        </p>
        <AudioVisualizer
          isActive={isActive}
          frequencyData={frequencyData}
          ariaLabel="Simulated frequency spectrum"
          className="mt-2"
        />
      </div>
    </div>
  )
}
