// The design page: every token and component. Dev only: outside development the route answers
// 404, and the page and its demos are not in the build (the import is behind NODE_ENV).

import { notFound } from "next/navigation"

export const dynamic = "force-dynamic"

// next-themes lives in the site's layout, not here (it would put back the dark mark the page
// takes off). This does the one part of it the page needs: mark <html> dark before the page
// starts if that's the visitor's choice, so the page opens in the site's theme.
const SITE_THEME = `try{var t=localStorage.getItem("theme");if(t==="dark"||(t!=="light"&&matchMedia("(prefers-color-scheme: dark)").matches))document.documentElement.classList.add("dark")}catch(e){}`

export default async function Design() {
  // The imports sit inside the branch: after a bare `notFound()` the bundler would keep them.
  if (process.env.NODE_ENV === "development") {
    const { default: DesignPage } = await import("@/design/page")
    const { readSources } = await import("@/design/sources.server")
    return (
      <>
        <script dangerouslySetInnerHTML={{ __html: SITE_THEME }} />
        <DesignPage sources={readSources()} />
      </>
    )
  }
  notFound()
}
