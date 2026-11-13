import { notFound } from "next/navigation"
import { connection } from "next/server"
import { Suspense } from "react"

// The bundler drops this function from a build: NODE_ENV is known then.
const DesignPage =
  process.env.NODE_ENV === "development"
    ? async function DesignPage() {
        await connection()
        const { default: Page } = await import("@/design/page")
        const { readSources } = await import("@/design/sources.server")
        return <Page sources={readSources()} />
      }
    : null

export default function Design() {
  if (!DesignPage) notFound()
  return (
    <Suspense>
      <DesignPage />
    </Suspense>
  )
}
