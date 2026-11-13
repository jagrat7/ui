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

/** A picture of an item that can't be shown live (the design page only exists in development). */
export type ItemPreview = {
  light: string
  dark: string
  width: number
  height: number
  docs: string
}
export type ItemMeta = {
  /** Listed under another item instead of on its own. */
  partOf?: string
  preview?: ItemPreview
  /** Install commands to show in place of the item's own, each for one of its variants. */
  installs?: { label: string; name: string }[]
}

export const metaOf = (item: RegistryItem): ItemMeta =>
  "meta" in item ? (item.meta as ItemMeta) : {}

/** The items the site lists, each with its own panel. */
export const items = registry.items.filter((item) => !metaOf(item).partOf)

export function highlightCode(code: string, lang: "tsx" | "css" = "tsx") {
  return codeToHtml(code, {
    lang,
    theme: "one-dark-pro",
    colorReplacements: codeColors,
  })
}

type CssRules = { [selector: string]: CssRules | string }

/** Prints a registry item's `css` rules as the CSS the shadcn CLI writes into globals.css. */
function cssRulesToText(rules: CssRules, depth = 0): string {
  const indent = "  ".repeat(depth)
  return Object.entries(rules)
    .map(([key, value]) => {
      if (typeof value === "string") return `${indent}${key}: ${value};`
      // An empty block is a bare at-rule statement such as `@apply …` or `@plugin …`.
      if (Object.keys(value).length === 0) return `${indent}${key};`
      return `${indent}${key} {\n${cssRulesToText(value, depth + 1)}\n${indent}}`
    })
    .join(depth === 0 ? "\n\n" : "\n")
}

export async function getItemSource(item: RegistryItem) {
  const css = "css" in item ? (item.css as CssRules) : undefined
  const cssCode = css ? `${cssRulesToText(css)}\n` : null
  const cssSource = cssCode
    ? [{ name: "globals.css", code: cssCode, html: await highlightCode(cssCode, "css") }]
    : []

  const fileSources = await Promise.all(
    item.files.map(async (file) => {
      const relative = path.relative("registry", file.path)
      const source = await fs.readFile(path.join(process.cwd(), "registry", relative), "utf8")
      // Keep the preview and clipboard framework-neutral; installed files retain the RSC boundary.
      const code = source.replace(/^(?:"use client"|'use client');?\r?\n(?:\r?\n)?/, "")
      const html = await highlightCode(code, file.path.endsWith(".css") ? "css" : "tsx")
      return { name: path.basename(file.path), code, html }
    }),
  )

  return [...cssSource, ...fileSources]
}
