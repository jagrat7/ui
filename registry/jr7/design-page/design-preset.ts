import { execSync } from "node:child_process"
import { writeFileSync } from "node:fs"
import { join } from "node:path"

const root = join(import.meta.dirname, "..")
const SHADCN_DIR = "."
const OUT = "src/design/shadcn-preset.gen.json"

const info = JSON.parse(
  execSync("bun x shadcn@latest info --json", { cwd: join(root, SHADCN_DIR), encoding: "utf8" }),
)

writeFileSync(
  join(root, OUT),
  `${JSON.stringify(
    {
      base: info.config?.base,
      code: info.preset?.code,
      values: info.preset?.values,
      fallbacks: info.preset?.fallbacks,
    },
    null,
    2,
  )}\n`,
)
console.log(`Wrote ${OUT}: --preset ${info.preset?.code ?? "(none)"}`)
