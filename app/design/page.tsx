// Next.js, App Router: app/design/page.tsx.
//
// The design page: every token and component. Dev only: outside development the route answers
// 404, and the page and its demos are not in the build (the import is behind NODE_ENV).

import { notFound } from "next/navigation"

export const dynamic = "force-dynamic"

export default async function Design() {
  // The imports sit inside the branch: after a bare `notFound()` the bundler would keep them.
  if (process.env.NODE_ENV === "development") {
    const { default: DesignPage } = await import("@/design/page")
    const { readSources } = await import("@/design/sources.server")
    return <DesignPage sources={readSources()} />
  }
  notFound()
}
