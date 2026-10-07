import Link from "next/link"

import { SITE } from "@/lib/site"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { ThemeToggle } from "@/components/theme-toggle"

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 bg-background px-2">
      <div className="screen-line-bottom mx-auto flex h-(--header-height) items-center gap-2 border-x pr-2 pl-4 md:max-w-3xl">
        <Link href="/" className="font-mono text-sm font-medium">
          <span className="text-muted-foreground">jr7/</span>ui
        </Link>

        <div className="flex-1" />

        <Button variant="link" size="sm" className="text-muted-foreground" asChild>
          <a href={SITE.home}>jr7.dev</a>
        </Button>
        <Separator orientation="vertical" className="data-[orientation=vertical]:h-5" />
        <Button variant="link" size="sm" className="text-muted-foreground" asChild>
          <a href={SITE.github} target="_blank" rel="noreferrer">
            GitHub
          </a>
        </Button>
        <Separator orientation="vertical" className="data-[orientation=vertical]:h-5" />
        <ThemeToggle />
      </div>
    </header>
  )
}
