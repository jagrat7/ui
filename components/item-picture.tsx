import Image from "next/image"

import type { ItemPreview } from "@/lib/registry"

export function ItemPicture({ title, preview }: { title: string; preview: ItemPreview }) {
  const { light, dark, width, height, docs } = preview
  return (
    <a href={docs} className="block transition-opacity hover:opacity-90">
      <Image
        src={light}
        alt={`${title}, light`}
        width={width}
        height={height}
        className="dark:hidden"
      />
      <Image
        src={dark}
        alt={`${title}, dark`}
        width={width}
        height={height}
        className="hidden dark:block"
      />
    </a>
  )
}
