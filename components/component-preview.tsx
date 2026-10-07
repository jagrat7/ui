"use client"

import * as React from "react"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CopyButton } from "@/components/copy-button"

type SourceFile = { name: string; code: string; html: string }

export function ComponentPreview({
  preview,
  files,
}: {
  preview: React.ReactNode
  files: SourceFile[]
}) {
  const [active, setActive] = React.useState(0)
  const file = files[active]

  return (
    <Tabs defaultValue="preview" className="gap-3">
      <TabsList variant="line">
        <TabsTrigger value="preview">Preview</TabsTrigger>
        <TabsTrigger value="code">Code</TabsTrigger>
      </TabsList>

      <TabsContent value="preview">
        <div className="relative isolate flex min-h-72 flex-col overflow-hidden rounded-xl border bg-background/80">
          {/* Dots fade out toward the centre so they don't compete with the component. */}
          <div
            aria-hidden
            className="absolute inset-0 -z-1 dot-grid mask-[radial-gradient(ellipse_at_center,transparent_35%,black_85%)]"
          />
          {preview}
        </div>
      </TabsContent>

      <TabsContent value="code">
        <div className="overflow-hidden rounded-xl border bg-background/50">
          <div className="flex min-h-12 items-center gap-3 border-b bg-muted/20 pr-3 pl-4">
            <div className="flex min-w-0 flex-1 items-center gap-4 overflow-x-auto">
              {files.length === 1 ? (
                <span
                  className="min-w-0 truncate py-3 font-mono text-xs text-foreground/85"
                  title={file.name}
                >
                  {file.name}
                </span>
              ) : (
                files.map((f, i) => (
                  <button
                    key={f.name}
                    type="button"
                    onClick={() => setActive(i)}
                    aria-pressed={i === active}
                    data-active={i === active}
                    className="shrink-0 border-b-2 border-transparent py-3 font-mono text-xs whitespace-nowrap text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-ring data-[active=true]:border-primary data-[active=true]:text-foreground"
                  >
                    {f.name}
                  </button>
                ))
              )}
            </div>
            <CopyButton text={file.code} className="shrink-0" />
          </div>
          <div
            className="max-h-[480px] overflow-auto font-mono text-sm leading-relaxed [&_code]:font-mono [&_pre]:p-4 [&_pre]:font-mono"
            dangerouslySetInnerHTML={{ __html: file.html }}
          />
        </div>
      </TabsContent>
    </Tabs>
  )
}
