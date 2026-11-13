import assert from "node:assert/strict"
import { existsSync, readFileSync } from "node:fs"
import { test } from "node:test"

const registry = JSON.parse(readFileSync(new URL("../registry.json", import.meta.url), "utf8"))
const item = (name) => registry.items.find((entry) => entry.name === name)
const targets = (name) => item(name).files.map((file) => file.target ?? file.path)

const SHARED = ["page.tsx", "tokens.ts", "types.ts", "demo.tsx", "icons.tsx"]

test("every file an item lists exists", () => {
  for (const entry of registry.items)
    for (const file of entry.files) assert.ok(existsSync(file.path), `${entry.name}: ${file.path}`)
})

test("the design page items take the five shared files from design/, not a copy", () => {
  for (const name of ["design-page", "design-page-next", "design-page-vite"]) {
    const paths = item(name).files.map((file) => file.path)
    for (const shared of SHARED) assert.ok(paths.includes(`design/${shared}`), `${name}: ${shared}`)
    assert.ok(paths.includes("components/ui/sortable.tsx"), `${name}: sortable`)
  }
})

test("each bundler's item carries its own files and none of the other's", () => {
  const next = targets("design-page-next")
  const vite = targets("design-page-vite")
  for (const file of [
    "design/sources.server.ts",
    "design/require-context.d.ts",
    "app/design/page.tsx",
  ]) {
    assert.ok(next.includes(file), `next: ${file}`)
    assert.ok(!vite.includes(file), `vite: ${file}`)
  }
  for (const file of ["design/sources.ts", "design/index.tsx", "routes/design.tsx"]) {
    assert.ok(vite.includes(file), `vite: ${file}`)
    assert.ok(!next.includes(file), `next: ${file}`)
  }
})

test("the update item leaves the project's own files alone", () => {
  const own = ["design/project.tsx", "design/ui.ts", "design/shadcn-preset.gen.json"]
  for (const file of own) assert.ok(!targets("design-page").includes(file), file)
  for (const file of item("design-page").files) assert.doesNotMatch(file.path, /\/demos\//)
})

test("the design page items need the page's components", () => {
  for (const name of ["design-page-next", "design-page-vite"])
    assert.deepEqual(item(name).registryDependencies, ["button", "dropdown-menu", "utils"])
  // Updating with --overwrite would otherwise overwrite the project's own button and menu.
  assert.equal(item("design-page").registryDependencies, undefined)
  for (const name of ["design-page", "design-page-next", "design-page-vite"]) {
    for (const dep of [
      "@dnd-kit/core",
      "@dnd-kit/modifiers",
      "@dnd-kit/sortable",
      "@dnd-kit/utilities",
    ])
      assert.ok(item(name).dependencies.includes(dep), `${name}: ${dep}`)
  }
})
