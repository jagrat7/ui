import type { ComponentType } from "react"

import AudioVisualizerDemo from "./audio-visualizer"
import ErrorMessageDemo from "./error-message"
import LoadingButtonDemo from "./loading-button"
import NumberedPaginationDemo from "./numbered-pagination"

export const demos: Record<string, ComponentType> = {
  "audio-visualizer": AudioVisualizerDemo,
  "error-message": ErrorMessageDemo,
  "loading-button": LoadingButtonDemo,
  "numbered-pagination": NumberedPaginationDemo,
}
