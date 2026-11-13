"use client"

import { useState } from "react"

import { Demo, DemoStage, DemoFooter, DemoCaption } from "@/components/demo"

const FILES = Array.from({ length: 40 }, (_, i) => ({
  name: `scene-${String(i + 1).padStart(2, "0")}.pkg`,
  size: `${(((i * 37) % 90) / 10 + 2.4).toFixed(1)} MB`,
}))

export default function ScrollbarStyledDemo() {
  const [progress, setProgress] = useState(0)

  return (
    <Demo>
      <DemoStage>
        <div
          tabIndex={0}
          aria-label="Wallpaper files"
          className="h-56 w-full max-w-sm scrollbar-styled overflow-y-auto rounded-lg border bg-background/60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
          onScroll={(event) => {
            const el = event.currentTarget
            const max = el.scrollHeight - el.clientHeight
            setProgress(max > 0 ? Math.round((el.scrollTop / max) * 100) : 0)
          }}
        >
          <ul className="divide-y font-mono text-xs">
            {FILES.map((file) => (
              <li key={file.name} className="flex items-center justify-between px-3 py-2">
                <span>{file.name}</span>
                <span className="text-muted-foreground tabular-nums">{file.size}</span>
              </li>
            ))}
          </ul>
        </div>
      </DemoStage>
      <DemoFooter>
        <DemoCaption>
          {progress === 0 ? "Hover the list to brighten the thumb" : `scrolled ${progress}%`}
        </DemoCaption>
      </DemoFooter>
    </Demo>
  )
}
