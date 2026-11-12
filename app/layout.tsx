import type { Metadata } from "next"
import { Analytics } from "@vercel/analytics/next"
import { Geist } from "next/font/google"
import localFont from "next/font/local"
import Script from "next/script"

import { SITE } from "@/lib/site"

import "./globals.css"

const watchtowerWebsiteId = process.env.NEXT_PUBLIC_WATCHTOWER_WEBSITE_ID

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
        {children}
        <Analytics />
        {watchtowerWebsiteId && (
          <Script
            src="https://watchtower-mu-seven.vercel.app/script.js"
            data-website-id={watchtowerWebsiteId}
            data-exclude-search="true"
            strategy="afterInteractive"
          />
        )}
      </body>
    </html>
  )
}
