import { readFileSync, readdirSync } from "node:fs"
import { join } from "node:path"

import type { Sources } from "./types"

const CSS = "app/globals.css"
const UI = "components/ui"
const APP = ["app", "components", "lib"]
const DESIGN = "design"
const ROUTE = "app/design"

const read = (path: string) => readFileSync(join(process.cwd(), path), "utf8")
const files = (dir: string) =>
  readdirSync(join(process.cwd(), dir), { recursive: true, encoding: "utf8" })
    .filter((file) => /\.tsx?$/.test(file))
    .map((file) => join(dir, file))

export function readSources(): Sources {
  return {
    css: read(CSS),
    cssFile: CSS,
    shadcn: JSON.parse(read("components.json")),
    preset: JSON.parse(read(`${DESIGN}/shadcn-preset.gen.json`)),
    components: readdirSync(join(process.cwd(), UI), { recursive: true, encoding: "utf8" })
      .filter((file) => file.endsWith(".tsx") && !/\.(test|stories)\./.test(file))
      .map((file) => ({
        name: file.slice(0, -".tsx".length),
        code: read(join(UI, file)),
        file: join(UI, file),
      })),
    app: APP.flatMap(files)
      .filter((path) => !path.startsWith(`${DESIGN}/`) && !path.startsWith(`${ROUTE}/`))
      .map((path) => ({ path, code: read(path) })),
  }
}
