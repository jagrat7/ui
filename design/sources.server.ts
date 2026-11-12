// The project's files as text, for the design page to read: the version for a server (Next.js
// and the like), which reads them from disk on each request. It takes the place of sources.ts
// and index.tsx. Paths are from the repo root, which is where the dev server runs.

import { readFileSync, readdirSync } from "node:fs"
import { join } from "node:path"

import type { Sources } from "./types"

const CSS = "app/globals.css"
const UI = "components/ui"
/** The folders whose files can import a component. Not the design page's own. */
const APP = ["app", "components", "lib", "registry"]
const DESIGN = "design"

const read = (path: string) => readFileSync(join(process.cwd(), path), "utf8")
const files = (dir: string) =>
  readdirSync(join(process.cwd(), dir), { recursive: true, encoding: "utf8" })
    .filter((file) => /\.tsx?$/.test(file))
    .map((file) => join(dir, file))

export function readSources(): Sources {
  return {
    css: read(CSS),
    cssFile: CSS,
    // designMd: read("DESIGN.md"),   // if the project has one
    shadcn: JSON.parse(read("components.json")),
    preset: JSON.parse(read(`${DESIGN}/shadcn-preset.gen.json`)),
    // Named from the UI folder down, so a file in a subfolder is `folder/name`.
    components: readdirSync(join(process.cwd(), UI), { recursive: true, encoding: "utf8" })
      .filter((file) => file.endsWith(".tsx"))
      .map((file) => ({ name: file.slice(0, -".tsx".length), code: read(join(UI, file)) })),
    app: APP.flatMap(files)
      .filter((path) => !path.startsWith(`app/${DESIGN}/`))
      .map((path) => ({ path, code: read(path) })),
  }
}
