import { AudioVisualizer } from "@/registry/jr7/audio-visualizer/audio-visualizer"

import { Row, Rows, type DemoMeta } from "../demo"

export const meta: DemoMeta = {
  title: "Audio Visualizer",
  components: [],
  custom: {
    file: "registry/jr7/audio-visualizer/audio-visualizer.tsx",
    exports: "AudioVisualizer",
  },
}

// A fixed spectrum, so the server and the browser draw the same bars.
const SPECTRUM = Array.from({ length: 256 }, (_, index) =>
  Math.round(18 + 170 * Math.exp(-index / 100) * (0.6 + 0.4 * Math.cos(index * 0.21))),
)

export default function AudioVisualizerDemo() {
  return (
    <Rows>
      <Row label="idle" className="block">
        <AudioVisualizer isActive={false} width={320} height={24} />
      </Row>
      <Row label="samples" className="block">
        <AudioVisualizer isActive frequencyData={SPECTRUM} width={320} height={48} />
      </Row>
      <Row label="color" className="block">
        <AudioVisualizer
          isActive
          frequencyData={SPECTRUM}
          width={320}
          height={32}
          className="text-muted-foreground"
        />
      </Row>
    </Rows>
  )
}
