<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Design page

`/design` (dev only: `pnpm dev`, then open `/design`) shows the design system as it is now: the shadcn preset, the palette and type from `app/globals.css`, and every component in light and dark side by side. It lives in `design/`, and its route is `app/design/page.tsx`.

- A new file in `components/ui`, or a new registry component in `registry/`, needs a demo: `design/demos/<name>.demo.tsx`. The page lists components that have no demo yet.
- `page.tsx`, `tokens.ts`, `types.ts`, `demo.tsx` and `icons.tsx` in `design/` are the shared template from the `design-page` skill: change them there, not here. This project's own settings are in `design/project.tsx` and `design/sources.server.ts`.
- After changing `components.json` or the theme, run `pnpm design:preset` to rewrite `design/shadcn-preset.gen.json`.
