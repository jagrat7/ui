"use client"

import { useEffect, useState } from "react"
import { Pause, Play } from "lucide-react"
import { useReducedMotion } from "motion/react"

import { Button } from "@/components/ui/button"
import { Demo } from "@/components/demo"
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
    <Demo
      caption="Simulated audio · no microphone needed"
      actions={
        <Button
          variant="ghost"
          size="xs"
          className="font-mono"
          onClick={() => setIsActive((current) => !current)}
        >
          {isActive ? <Pause className="fill-current" /> : <Play className="fill-current" />}
          {isActive ? "Pause" : "Play"}
        </Button>
      }
    >
      <AudioVisualizer
        isActive={isActive}
        frequencyData={frequencyData}
        height={48}
        ariaLabel="Simulated frequency spectrum"
        className="max-w-md"
      />
    </Demo>
  )
}
