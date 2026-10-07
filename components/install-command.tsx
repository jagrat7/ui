"use client"

import * as React from "react"
import Image from "next/image"
import { useAtom } from "jotai"
import { atomWithStorage } from "jotai/utils"
import { motion } from "motion/react"

import { cn } from "@/lib/utils"
import { CopyButton } from "@/components/copy-button"

// Package manager picker adapted from VengeanceUI (MIT) — https://github.com/Ashutoshx7/VengeanceUI

type PackageManager = "npm" | "pnpm" | "deno" | "bun"

// Shared by every install command on the page and remembered across visits.
const packageManagerAtom = atomWithStorage<PackageManager>("package-manager", "npm")

const RUNNERS: Record<PackageManager, string> = {
  npm: "npx",
  pnpm: "pnpm dlx",
  deno: "deno run -A",
  bun: "bunx --bun",
}

const ICONS: Record<PackageManager, React.ReactNode> = {
  npm: (
    <svg viewBox="0 0 24 24" className="size-4" aria-hidden="true">
      <path
        d="M1.763 0C.786 0 0 .786 0 1.763v20.474C0 23.214.786 24 1.763 24h20.474c.977 0 1.763-.786 1.763-1.763V1.763C24 .786 23.214 0 22.237 0zM5.13 5.323l13.837.019-.009 13.836h-3.464l.01-10.382h-3.456L12.04 19.17H5.113z"
        fill="#CB3837"
      />
    </svg>
  ),
  pnpm: (
    <svg viewBox="0 0 24 24" className="size-4" aria-hidden="true">
      <path
        d="M0 0v7.5h7.5V0zm8.25 0v7.5h7.498V0zm8.25 0v7.5H24V0zM8.25 8.25v7.5h7.498v-7.5zm8.25 0v7.5H24v-7.5zM0 16.5V24h7.5v-7.5zm8.25 0V24h7.498v-7.5zm8.25 0V24H24v-7.5z"
        fill="#F69220"
      />
    </svg>
  ),
  deno: (
    <svg
      viewBox="0 0 24 24"
      className="size-4.5 shrink-0 text-emerald-600 dark:text-emerald-400"
      aria-hidden="true"
    >
      <path
        d="M1.105 18.02A11.9 11.9 0 0 1 0 12.985q0-.698.078-1.376a12 12 0 0 1 .231-1.34A12 12 0 0 1 4.025 4.02a12 12 0 0 1 5.46-2.771 12 12 0 0 1 3.428-.23c1.452.112 2.825.477 4.077 1.05a12 12 0 0 1 2.78 1.774 12.02 12.02 0 0 1 4.053 7.078A12 12 0 0 1 24 12.985q0 .454-.036.914a12 12 0 0 1-.728 3.305 12 12 0 0 1-2.38 3.875c-1.33 1.357-3.02 1.962-4.43 1.936a4.4 4.4 0 0 1-2.724-1.024c-.99-.853-1.391-1.83-1.53-2.919a5 5 0 0 1 .128-1.518c.105-.38.37-1.116.76-1.437-.455-.197-1.04-.624-1.226-.829-.045-.05-.04-.13 0-.183a.155.155 0 0 1 .177-.053c.392.134.869.267 1.372.35.66.111 1.484.25 2.317.292 2.03.1 4.153-.813 4.812-2.627s.403-3.609-1.96-4.685-3.454-2.356-5.363-3.128c-1.247-.505-2.636-.205-4.06.582-3.838 2.121-7.277 8.822-5.69 15.032a.191.191 0 0 1-.315.19 12 12 0 0 1-1.25-1.634 12 12 0 0 1-.769-1.404M11.57 6.087c.649-.051 1.214.501 1.31 1.236.13.979-.228 1.99-1.41 2.013-1.01.02-1.315-.997-1.248-1.614.066-.616.574-1.575 1.35-1.635"
        fill="currentColor"
      />
    </svg>
  ),
  bun: (
    <Image
      src="/icons/bun.svg"
      alt=""
      width={20}
      height={18}
      className="size-5 max-w-none shrink-0 object-contain"
      aria-hidden="true"
    />
  ),
}

export function InstallCommand({ url, id }: { url: string; id: string }) {
  const [stored, setPm] = useAtom(packageManagerAtom)
  const pm = stored in RUNNERS ? stored : "npm"
  const packageName = pm === "deno" ? "npm:shadcn@latest" : "shadcn@latest"
  const command = `${RUNNERS[pm]} ${packageName} add ${url}`

  return (
    <div className="overflow-hidden rounded-xl border bg-background/50">
      <div className="flex items-center justify-between border-b px-3 py-1.5">
        <div className="flex items-center gap-1 sm:gap-3">
          {(Object.keys(RUNNERS) as PackageManager[]).map((key) => (
            <button
              key={key}
              type="button"
              onClick={() => setPm(key)}
              className={cn(
                "relative flex items-center gap-2 px-2 py-1 text-sm font-medium transition-colors select-none sm:px-3",
                pm === key ? "text-foreground" : "text-muted-foreground hover:text-foreground",
              )}
            >
              {pm === key && (
                <motion.div
                  layoutId={`install-command-${id}`}
                  className="absolute inset-x-0 -bottom-[7px] h-0.5 bg-foreground"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              <span className="flex size-4 shrink-0 items-center justify-center">{ICONS[key]}</span>
              {key}
            </button>
          ))}
        </div>
        <CopyButton text={command} />
      </div>
      <pre className="overflow-x-auto p-4 font-mono text-sm leading-relaxed">
        <code>
          <span className="text-(--code-token-keyword)">{RUNNERS[pm]}</span>{" "}
          <span className="text-(--code-token-function)">{packageName}</span>{" "}
          <span className="text-(--code-token-comment)">add</span>{" "}
          <span className="text-(--code-token-string)">{url}</span>
        </code>
      </pre>
    </div>
  )
}
