import { useState } from "react"

import { Button } from "@/components/ui/button"
import { ErrorMessage } from "@/registry/jr7/error-message/error-message"

import { Row, Rows, type DemoMeta } from "../demo"

export const meta: DemoMeta = {
  title: "Error Message",
  components: [],
  custom: {
    file: "registry/jr7/error-message/error-message.tsx",
    exports: "ErrorMessage",
  },
}

const SAMPLE = "We couldn't save your changes. Please try again."

export default function ErrorMessageDemo() {
  const [message, setMessage] = useState<string | null>(SAMPLE)
  const [timed, setTimed] = useState<string | null>(null)
  return (
    <Rows>
      <Row label="dismissible" className="block">
        <ErrorMessage
          message={message}
          setMessage={setMessage}
          autoDismissTimeout={0}
          className="mb-0"
        />
        {!message && (
          <Button
            size="xs"
            variant="ghost"
            className="font-mono"
            onClick={() => setMessage(SAMPLE)}
          >
            Show again
          </Button>
        )}
      </Row>
      <Row label="long" className="block">
        <ErrorMessage
          message="Microphone permission was denied. Allow it in your browser's site settings, then reload the page to try again."
          setMessage={() => {}}
          autoDismissTimeout={0}
          className="mb-0"
        />
      </Row>
      <Row label="5s timeout">
        {timed ? (
          <ErrorMessage message={timed} setMessage={setTimed} className="mb-0 w-full" />
        ) : (
          <Button
            size="xs"
            variant="outline"
            className="font-mono"
            onClick={() => setTimed(SAMPLE)}
          >
            Show for 5s
          </Button>
        )}
      </Row>
    </Rows>
  )
}
