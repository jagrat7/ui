import { GlowBackground } from "@/components/glow-background"
import { SiteHeader } from "@/components/site-header"
import { ThemeProvider } from "@/components/theme-provider"

// The site's shell. Kept out of the root layout so /design (dev only) can stand on its own: it
// keeps its own theme on <html>, which next-themes would otherwise put back.
export default function SiteLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      <GlowBackground />
      <SiteHeader />
      <main className="overflow-x-clip px-2">{children}</main>
    </ThemeProvider>
  )
}
