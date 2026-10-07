import { ChevronDown } from "lucide-react"

import { highlightCode } from "@/lib/registry"
import { CopyButton } from "@/components/copy-button"

const example = `"use client"

import { useState } from "react"
import { useAudioAnalyser } from "audvis"
import { AudioVisualizer } from "@/components/audio-visualizer"

export function MicrophoneVisualizer() {
  const [isListening, setIsListening] = useState(false)
  const { analyser } = useAudioAnalyser(isListening)

  return (
    <div className="flex flex-col gap-4">
      <button
        type="button"
        onClick={() => setIsListening((listening) => !listening)}
      >
        {isListening ? "Stop listening" : "Use microphone"}
      </button>
      <AudioVisualizer
        analyser={analyser}
        isActive={isListening && analyser !== null}
        height={48}
      />
    </div>
  )
}`

export async function AudioVisualizerSetup() {
  const html = await highlightCode(example)

  return (
    <div className="space-y-3 text-sm">
      <p className="text-muted-foreground">
        Includes <code className="font-mono text-foreground">audvis</code>,{" "}
        <code className="font-mono text-foreground">motion</code> and{" "}
        <code className="font-mono text-foreground">cn</code>.
      </p>
      <details className="group overflow-hidden rounded-xl border bg-background/50">
        <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-4 py-3 font-medium marker:content-none [&::-webkit-details-marker]:hidden">
          Setup &amp; usage
          <ChevronDown className="size-4 text-muted-foreground transition-transform group-open:rotate-180" />
        </summary>
        <div className="space-y-4 border-t p-4">
          <p className="text-muted-foreground">
            Pass an <code className="font-mono text-foreground">AnalyserNode</code>, or use{" "}
            <a
              href="https://github.com/jagrat7/AudioVisaulizer#useaudioanalyser"
              className="text-foreground underline underline-offset-4"
            >
              audvis&apos;s microphone hook
            </a>
            . Next.js requires a client component.
          </p>
          <div className="overflow-hidden rounded-lg border">
            <div className="flex items-center justify-between gap-2 border-b py-1.5 pr-2 pl-3">
              <span className="font-mono text-xs text-muted-foreground">
                microphone-visualizer.tsx
              </span>
              <CopyButton text={example} aria-label="Copy microphone example" />
            </div>
            <div
              className="max-h-[400px] overflow-auto font-mono text-sm leading-relaxed [&_code]:font-mono [&_pre]:p-4 [&_pre]:font-mono"
              dangerouslySetInnerHTML={{ __html: html }}
            />
          </div>
          <p className="text-muted-foreground">
            Microphone: HTTPS or localhost, plus browser permission.
          </p>
          <p className="text-muted-foreground">
            For samples, pass <code className="font-mono text-foreground">frequencyData</code>{" "}
            (values 0–255) with <code className="font-mono text-foreground">isActive</code>.
          </p>
        </div>
      </details>
    </div>
  )
}
