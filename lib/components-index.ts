import registry from "@/registry.json"

export type ComponentEntry = { name: string; title: string; description: string }

export const componentIndex: ComponentEntry[] = registry.items
  .filter((item) => !("meta" in item && item.meta && "partOf" in item.meta))
  .map(({ name, title, description }) => ({ name, title, description }))
