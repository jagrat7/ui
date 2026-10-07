import { promises as fs } from "node:fs"
import path from "node:path"

import registry from "@/registry.json"
import { codeToHtml } from "shiki"

export type RegistryItem = (typeof registry.items)[number]

export const items = registry.items

export async function getItemSource(item: RegistryItem) {
  return Promise.all(
    item.files.map(async (file) => {
      const relative = path.relative("registry", file.path)
      const code = await fs.readFile(path.join(process.cwd(), "registry", relative), "utf8")
      const html = await codeToHtml(code, {
        lang: file.path.endsWith(".css") ? "css" : "tsx",
        themes: { light: "github-light", dark: "github-dark" },
      })
      return { name: path.basename(file.path), code, html }
    }),
  )
}
