"use client"

import { useEffect, useRef, useState } from "react"
import { LoaderCircle, Mic, MicOff, Pause, Play } from "lucide-react"
import { useReducedMotion } from "motion/react"

import { microphoneErrorMessage, openMicrophone } from "@/lib/microphone"
import { Button } from "@/components/ui/button"
import { Demo, DemoStage, DemoFooter, DemoCaption, DemoActions } from "@/components/demo"
import { AudioVisualizer } from "@/registry/jr7/audio-visualizer/audio-visualizer"

type MicrophoneState =
  | { status: "idle" | "requesting" }
  | { status: "live"; analyser: AnalyserNode }
  | { status: "error"; message: string }

export default function AudioVisualizerDemo() {
  const [isActive, setIsActive] = useState(true)
  const [microphone, setMicrophone] = useState<MicrophoneState>({ status: "idle" })
  const microphoneRequest = useRef<AbortController | null>(null)
  const usingMicrophone = microphone.status === "live"
  const waitingForMicrophone = microphone.status === "requesting"
  const simulated = !usingMicrophone && !waitingForMicrophone

  useEffect(() => {
    return () => {
      microphoneRequest.current?.abort()
      microphoneRequest.current = null
    }
  }, [])

  function stopMicrophone() {
    microphoneRequest.current?.abort()
    microphoneRequest.current = null
    setMicrophone({ status: "idle" })
  }

  async function startMicrophone() {
    if (microphoneRequest.current) return
    const request = new AbortController()
    microphoneRequest.current = request
    setMicrophone({ status: "requesting" })

    try {
      const { analyser, stream } = await openMicrophone(request.signal)
      if (request.signal.aborted || microphoneRequest.current !== request) return

      function disconnected() {
        if (request.signal.aborted) return
        request.abort()
        microphoneRequest.current = null
        setMicrophone({
          status: "error",
          message: "Microphone disconnected. Reconnect to try again.",
        })
      }

      const tracks = stream.getAudioTracks()
      if (tracks.some((track) => track.readyState === "ended")) {
        disconnected()
        return
      }
      tracks.forEach((track) =>
        track.addEventListener("ended", disconnected, { once: true, signal: request.signal }),
      )
      setMicrophone({ status: "live", analyser })
    } catch (error) {
      if (request.signal.aborted || microphoneRequest.current !== request) return
      request.abort()
      microphoneRequest.current = null
      setMicrophone({ status: "error", message: microphoneErrorMessage(error) })
    }
  }

  return (
    <Demo>
      <DemoStage>
        <div className="flex w-full max-w-md flex-col items-center gap-6">
          {usingMicrophone ? (
            <AudioVisualizer
              isActive
              analyser={microphone.analyser}
              height={48}
              ariaLabel="Live microphone frequency spectrum"
            />
          ) : (
            <SimulatedWaveform isActive={simulated && isActive} />
          )}
          {microphone.status === "error" && (
            <p role="alert" className="text-center text-sm text-destructive">
              {microphone.message}
            </p>
          )}
        </div>
      </DemoStage>
      <DemoFooter>
        <DemoCaption>
          {usingMicrophone ? (
            <span className="inline-flex items-center gap-1.5">
              <span aria-hidden="true" className="size-1.5 rounded-full bg-emerald-500" />
              Microphone
            </span>
          ) : waitingForMicrophone ? (
            "Allow microphone access…"
          ) : (
            "Simulated audio"
          )}
        </DemoCaption>
        <DemoActions>
          {simulated && (
            <Button
              type="button"
              variant="ghost"
              size="xs"
              className="font-mono"
              aria-label={isActive ? "Pause simulated audio" : "Play simulated audio"}
              onClick={() => setIsActive((current) => !current)}
            >
              {isActive ? <Pause className="fill-current" /> : <Play className="fill-current" />}
              {isActive ? "Pause" : "Play"}
            </Button>
          )}
          <Button
            type="button"
            variant={usingMicrophone ? "outline" : "ghost"}
            size="xs"
            className="font-mono"
            onClick={usingMicrophone || waitingForMicrophone ? stopMicrophone : startMicrophone}
          >
            {waitingForMicrophone ? (
              <LoaderCircle className="motion-safe:animate-spin" />
            ) : usingMicrophone ? (
              <MicOff />
            ) : (
              <Mic />
            )}
            {waitingForMicrophone
              ? "Cancel"
              : usingMicrophone
                ? "Stop microphone"
                : "Use microphone"}
          </Button>
        </DemoActions>
      </DemoFooter>
    </Demo>
  )
}

function SimulatedWaveform({ isActive }: { isActive: boolean }) {
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
    <AudioVisualizer
      isActive={isActive}
      frequencyData={frequencyData}
      height={48}
      ariaLabel="Simulated frequency spectrum"
    />
  )
}
