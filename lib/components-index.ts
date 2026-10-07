import registry from "@/registry.json"

export type ComponentEntry = { name: string; title: string; description: string }

/** Lightweight list of components for navigation (no source/highlighting). */
export const componentIndex: ComponentEntry[] = registry.items.map(
  ({ name, title, description }) => ({ name, title, description }),
)
