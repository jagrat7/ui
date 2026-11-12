import { useState } from "react"
import { Save } from "lucide-react"

import { LoadingButton } from "@/registry/jr7/loading-button/loading-button"

import { Row, Rows, type DemoMeta } from "../demo"

export const meta: DemoMeta = {
  title: "Loading Button",
  components: ["button"],
  custom: {
    file: "registry/jr7/loading-button/loading-button.tsx",
    exports: "LoadingButton",
  },
}

export default function LoadingButtonDemo() {
  const [isLoading, setIsLoading] = useState(false)
  return (
    <Rows>
      <Row label="idle">
        <LoadingButton type="button" isLoading={false}>
          <Save />
          Save changes
        </LoadingButton>
        <LoadingButton type="button" isLoading={false} variant="default">
          Send
        </LoadingButton>
        <LoadingButton type="button" isLoading={false} variant="outline">
          Send
        </LoadingButton>
      </Row>
      <Row label="isLoading">
        <LoadingButton type="button" isLoading>
          Send
        </LoadingButton>
        <LoadingButton type="button" isLoading loadingText="Saving…" variant="default">
          Save changes
        </LoadingButton>
      </Row>
      <Row label="isDisabled">
        <LoadingButton type="button" isLoading={false} isDisabled>
          Send
        </LoadingButton>
      </Row>
      <Row label="click">
        <LoadingButton
          type="button"
          isLoading={isLoading}
          loadingText="Saving…"
          onClick={() => setIsLoading(true)}
        >
          Save changes
        </LoadingButton>
        {isLoading && (
          <button
            type="button"
            className="font-mono text-xs text-muted-foreground underline"
            onClick={() => setIsLoading(false)}
          >
            reset
          </button>
        )}
      </Row>
    </Rows>
  )
}
