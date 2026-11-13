// Next.js, App Router: app/design/page.tsx.
//
// The design page: every token and component. Dev only: outside development the route answers
// 404, and the page and its demos are not in the build (the imports are behind NODE_ENV).

import { notFound } from "next/navigation"
import { connection } from "next/server"
import { Suspense } from "react"

// The bundler drops this whole function from a build: the condition is known then.
const DesignPage =
  process.env.NODE_ENV === "development"
    ? async function DesignPage() {
        // Read the files on every request, not once at build time.
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
