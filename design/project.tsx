// What only this project can say about itself, for the design page (page.tsx). The rest the
// page reads from the project's files (sources.server.ts).

import Link from "next/link"

import { SITE } from "@/lib/site"

import type { DemoModule, Project } from "./types"

// Next.js has no import.meta.glob: Turbopack and webpack both have require.context
// (require-context.d.ts types it).
const found = require.context("./demos", false, /\.demo\.tsx$/)

export const project: Project = {
  name: SITE.name,
  brand: (
    <Link href="/" className="font-mono text-sm font-medium">
      <span className="text-muted-foreground">jagrat7/</span>ui
    </Link>
  ),
  uiImport: "@/components/ui",
  demos: found.keys().map((key) => found(key) as DemoModule),
  // next-themes: the `.dark` class on <html>, and the visitor's choice under "theme".
  theme: { storageKey: "theme" },
  // Next.js's own opener, with the path from the project folder (the repo root here).
  editor: (file) => `/__nextjs_launch-editor?file=${encodeURIComponent(file)}`,

  roles: [
    { name: "Background", token: "background", use: "bg-background" },
    { name: "Glass", token: "card", use: "glass · bg-card" },
    { name: "Popover", token: "popover", use: "bg-popover" },
    { name: "Subtle", token: "muted", use: "bg-muted · bg-secondary · bg-accent" },
    { name: "Line", token: "border", use: "border-border" },
    { name: "Hairline", token: "line", use: "bg-line · screen-line-* · stripe-divider" },
    { name: "Field", token: "input", use: "border-input" },
    { name: "Muted", token: "muted-foreground", use: "text-muted-foreground" },
    { name: "Ink", token: "foreground", use: "text-foreground" },
    { name: "Primary", token: "primary", use: "bg-primary · text-primary" },
    { name: "Danger", token: "destructive", use: "bg-destructive · text-destructive" },
    { name: "Focus", token: "ring", use: "ring-ring · outline-ring/50" },
  ],

  typography: [
    { name: "panel title", classes: "text-2xl font-medium tracking-tight text-balance" },
    { name: "dialog title", classes: "text-lg leading-none font-semibold" },
    { name: "body", classes: "text-sm" },
    { name: "description", classes: "text-sm text-balance text-muted-foreground" },
    { name: "path", classes: "font-mono text-sm font-medium" },
    { name: "caption", classes: "font-mono text-xs text-muted-foreground" },
    { name: "code", classes: "font-mono text-sm leading-relaxed" },
  ],
  specimens: {
    "panel title": { text: "Loading Button" },
    "dialog title": { text: "Search components" },
    description: {
      text: "A shadcn button with a spinner, loading label, and enforced busy/disabled state.",
    },
    path: { text: "jagrat7/ui" },
    caption: { text: "page 5 · showing 49–60 of 240" },
    code: { text: "pnpm dlx shadcn@latest add @jr7/loading-button" },
  },
}
