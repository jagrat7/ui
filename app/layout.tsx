import type { Metadata } from "next"
import { Geist } from "next/font/google"
import localFont from "next/font/local"

import { SITE } from "@/lib/site"
import { GlowBackground } from "@/components/glow-background"
import { SiteHeader } from "@/components/site-header"
import { ThemeProvider } from "@/components/theme-provider"

import "./globals.css"

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] })

const commitMono = localFont({
  src: "./fonts/CommitMono.woff2",
  variable: "--font-commit-mono",
})

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: SITE.title,
  description: SITE.description,
  applicationName: SITE.name,
  authors: [{ name: "Jagrat", url: SITE.home }],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: SITE.name,
    title: SITE.title,
    description: SITE.description,
    url: "/",
  },
  twitter: {
    card: "summary",
    title: SITE.title,
    description: SITE.description,
  },
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${commitMono.variable}`}
      suppressHydrationWarning
    >
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <GlowBackground />
          <SiteHeader />
          <main className="overflow-x-clip px-2">{children}</main>
        </ThemeProvider>
      </body>
    </html>
  )
}
