"use client"

import * as React from "react"
import { motion } from "motion/react"

import { cn } from "@/lib/utils"
import { CopyButton } from "@/components/copy-button"

// Package manager picker adapted from VengeanceUI (MIT) — https://github.com/Ashutoshx7/VengeanceUI

type PackageManager = "npm" | "pnpm" | "yarn" | "bun"

const RUNNERS: Record<PackageManager, string> = {
  npm: "npx",
  pnpm: "pnpm dlx",
  yarn: "yarn dlx",
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
  yarn: (
    <svg viewBox="0 0 24 24" className="size-4" aria-hidden="true">
      <path
        d="M12 0C5.375 0 0 5.375 0 12s5.375 12 12 12 12-5.375 12-12S18.625 0 12 0zm.768 4.105c.183 0 .363.053.525.157.125.083.287.185.755 1.154.31-.088.468-.042.551-.019.204.056.366.19.463.375.477.917.542 2.553.334 3.605-.241 1.232-.755 2.029-1.131 2.576.324.329.778.899 1.117 1.825.278.774.31 1.478.273 2.015a5.51 5.51 0 0 0 .602-.329c.593-.366 1.487-.917 2.553-.931.714-.009 1.269.445 1.353 1.103a1.23 1.23 0 0 1-.945 1.362c-.649.158-.95.278-1.821.843-1.232.797-2.539 1.242-3.012 1.39a1.686 1.686 0 0 1-.704.343c-.737.181-3.266.315-3.466.315h-.046c-.783 0-1.214-.241-1.45-.491-.658.329-1.51.19-2.122-.134a1.078 1.078 0 0 1-.58-1.153 1.243 1.243 0 0 1-.153-.195c-.162-.25-.528-.936-.454-1.946.056-.723.556-1.367.88-1.71a5.522 5.522 0 0 1 .408-2.256c.306-.727.885-1.348 1.32-1.737-.32-.537-.644-1.367-.329-2.21.227-.602.412-.936.82-1.08h-.005c.199-.074.389-.153.486-.259a3.418 3.418 0 0 1 2.298-1.103c.037-.093.079-.185.125-.283.31-.658.639-1.029 1.024-1.168a.94.94 0 0 1 .328-.06z"
        fill="#2C8EBB"
      />
    </svg>
  ),
  bun: (
    <svg viewBox="0 0 80 70" className="size-4" aria-hidden="true">
      <path
        d="M71.09 20.74c-.16-.17-.33-.34-.5-.5s-.33-.34-.5-.5c-.12-.12-.24-.24-.37-.35a17.89 17.89 0 0 0-2.4-1.87c-.55-.35-1.12-.68-1.71-1a38.16 38.16 0 0 0-16.93-4.18h-.25c-5.6 0-11.13 1.45-16.12 4.18-.59.32-1.16.65-1.71 1a18.11 18.11 0 0 0-2.4 1.87c-.13.11-.24.23-.37.35-.17.16-.34.33-.5.5s-.34.33-.5.5a16.21 16.21 0 0 0-4 10.69 15.78 15.78 0 0 0 .18 2.37c.9 7.03 5.75 13.05 12.73 16.9.35.19.7.38 1.06.55a38.16 38.16 0 0 0 16.12 4.19h.25a38.16 38.16 0 0 0 16.93-4.18c.36-.18.71-.36 1.06-.55 7-3.86 11.84-9.87 12.73-16.9a15.78 15.78 0 0 0 .18-2.37 16.21 16.21 0 0 0-4-10.69z"
        fill="#FBEDDC"
      />
      <path
        d="M26.18 31.09a3.09 3.09 0 0 1 3-3.19 3.09 3.09 0 0 1 3 3.19 3.09 3.09 0 0 1-3 3.19 3.09 3.09 0 0 1-3-3.19zm15 0a3.09 3.09 0 0 1 3-3.19 3.09 3.09 0 0 1 3 3.19 3.09 3.09 0 0 1-3 3.19 3.09 3.09 0 0 1-3-3.19z"
        fill="#3E3E3E"
      />
      <path
        d="M38.16 38.42c-3.5 0-6.24 2.1-6.24 4.77s2.74 4.77 6.24 4.77 6.24-2.1 6.24-4.77-2.74-4.77-6.24-4.77z"
        fill="#F59794"
      />
    </svg>
  ),
}

export function InstallCommand({ url, id }: { url: string; id: string }) {
  const [pm, setPm] = React.useState<PackageManager>("npm")
  const command = `${RUNNERS[pm]} shadcn@latest add ${url}`

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
              {ICONS[key]}
              {key}
            </button>
          ))}
        </div>
        <CopyButton text={command} />
      </div>
      <pre className="overflow-x-auto p-4 font-mono text-sm leading-relaxed">
        <code>
          <span className="text-[#6b6b99] dark:text-[#a0a0cc]">{RUNNERS[pm]}</span>{" "}
          <span className="text-cyan-800 dark:text-[#8bb8d0]">shadcn@latest</span>{" "}
          <span className="text-muted-foreground">add</span>{" "}
          <span className="text-[#8a6d3b] dark:text-[#c9a87c]">{url}</span>
        </code>
      </pre>
    </div>
  )
}
