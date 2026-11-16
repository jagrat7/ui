import { GlowBackground } from "@/components/glow-background"
import { SiteHeader } from "@/components/site-header"

// The site's shell. Kept out of the root layout so /design (dev only) can stand on its own,
// with its own header.
export default function SiteLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <GlowBackground />
      <SiteHeader />
      <main className="px-2">{children}</main>
    </>
  )
}
