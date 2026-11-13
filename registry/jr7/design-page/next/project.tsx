// What only this project can say about itself, for the design page (page.tsx). The rest the
// page reads from the project's files (sources.server.ts).

import Link from "next/link"

import type { DemoModule, Project } from "./types"

// Next.js has no import.meta.glob: Turbopack and webpack both have require.context
// (require-context.d.ts types it).
const found = require.context("./demos", false, /\.demo\.tsx$/)

export const project: Project = {
  name: "Project",
  brand: (
    <Link href="/" className="text-[18px] font-bold tracking-tight">
      Project
    </Link>
  ),
  uiImport: "@/components/ui",
  demos: found.keys().map((key) => found(key) as DemoModule),
  // Next.js's own opener. It wants the path from the project folder (where package.json is).
  editor: (file) => `/__nextjs_launch-editor?file=${encodeURIComponent(file)}`,
  // theme: { dark: { attribute: "data-theme", value: "dark" }, storageKey: "theme" },

  roles: [
    { name: "Background", token: "background", use: "bg-background" },
    { name: "Surface", token: "card", use: "bg-card · bg-popover" },
    { name: "Subtle", token: "muted", use: "bg-muted · bg-secondary · bg-accent" },
    { name: "Line", token: "border", use: "border-border" },
    { name: "Field", token: "input", use: "border-input" },
    { name: "Muted", token: "muted-foreground", use: "text-muted-foreground" },
    { name: "Ink", token: "foreground", use: "text-foreground" },
    { name: "Primary", token: "primary", use: "bg-primary" },
    { name: "Danger", token: "destructive", use: "bg-destructive · text-destructive" },
    { name: "Focus", token: "ring", use: "ring-ring" },
  ],

  // Leave this out if DESIGN.md's front matter has `typography:`.
  typography: [
    { name: "title", classes: "text-3xl font-bold tracking-tight" },
    { name: "heading", classes: "text-lg font-semibold" },
    { name: "body", classes: "text-sm" },
    { name: "label", classes: "text-xs font-medium text-muted-foreground" },
    { name: "data", classes: "font-mono text-xs text-muted-foreground" },
  ],
  specimens: {
    title: { text: "A title in this project's voice" },
  },
}
