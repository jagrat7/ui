import registry from "@/registry.json"

export type ComponentEntry = { name: string; title: string; description: string }

/** Lightweight list of components for navigation (no source/highlighting). Items listed under
    another item (`meta.partOf`) are left out, as on the page. */
export const componentIndex: ComponentEntry[] = registry.items
  .filter((item) => !("meta" in item && item.meta && "partOf" in item.meta))
  .map(({ name, title, description }) => ({ name, title, description }))
