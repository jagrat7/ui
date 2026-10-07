import { promises as fs } from "node:fs"
import path from "node:path"

import registry from "@/registry.json"
import { codeToHtml } from "shiki"

// Preserve One Dark Pro's token rules while sharing its palette with install commands.
const codeColors = {
  "#282c34": "var(--code-background)",
  "#abb2bf": "var(--code-foreground)",
  "#c678dd": "var(--code-token-keyword)",
  "#61afef": "var(--code-token-function)",
  "#98c379": "var(--code-token-string)",
  "#e5c07b": "var(--code-token-constant)",
  "#d19a66": "var(--code-token-number)",
  "#e06c75": "var(--code-token-parameter)",
  "#56b6c2": "var(--code-token-cyan)",
  "#7f848e": "var(--code-token-comment)",
  "#5c6370": "var(--code-token-comment-muted)",
  "#ffffff": "var(--code-token-bright)",
  "#f44747": "var(--code-token-invalid)",
  "#be5046": "var(--code-token-deleted)",
}

export type RegistryItem = (typeof registry.items)[number]

export const items = registry.items

export async function getItemSource(item: RegistryItem) {
  return Promise.all(
    item.files.map(async (file) => {
      const relative = path.relative("registry", file.path)
      const code = await fs.readFile(path.join(process.cwd(), "registry", relative), "utf8")
      const html = await codeToHtml(code, {
        lang: file.path.endsWith(".css") ? "css" : "tsx",
        theme: "one-dark-pro",
        colorReplacements: codeColors,
      })
      return { name: path.basename(file.path), code, html }
    }),
  )
}
