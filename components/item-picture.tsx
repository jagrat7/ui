import Image from "next/image"

import type { ItemPreview } from "@/lib/registry"

/** A still of an item that has no live preview here, in the site's theme, linking to its docs. */
export function ItemPicture({ title, preview }: { title: string; preview: ItemPreview }) {
  const { light, dark, width, height, docs } = preview
  return (
    <figure>
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
      <figcaption className="border-t px-4 py-2 font-mono text-xs text-muted-foreground">
        A picture: the page only runs in development.{" "}
        <a href={docs} className="text-foreground underline-offset-4 hover:underline">
          How it works
        </a>
      </figcaption>
    </figure>
  )
}
