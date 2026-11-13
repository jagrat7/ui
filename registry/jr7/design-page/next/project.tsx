import Link from "next/link"

import type { DemoModule, Project } from "./types"

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
  editor: (file) => `/__nextjs_launch-editor?file=${encodeURIComponent(file)}`,

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
