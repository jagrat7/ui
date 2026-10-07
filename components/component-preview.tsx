import type { ReactNode } from "react"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CopyButton } from "@/components/copy-button"

type SourceFile = { name: string; code: string; html: string }

function HighlightedSource({ html }: { html: string }) {
  return (
    <div
      className="max-h-[480px] overflow-auto font-mono text-sm leading-relaxed [&_code]:font-mono [&_pre]:p-4 [&_pre]:font-mono"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}

export function ComponentPreview({
  children,
  files,
}: {
  children: ReactNode
  files: SourceFile[]
}) {
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
          {children}
        </div>
      </TabsContent>

      <TabsContent value="code">
        {files.length === 1 ? (
          <div className="overflow-hidden rounded-xl border bg-background/50">
            <div className="flex min-h-12 items-center gap-3 border-b bg-muted/20 pr-3 pl-4">
              <span
                className="min-w-0 flex-1 truncate py-3 font-mono text-xs text-foreground/85"
                title={files[0].name}
              >
                {files[0].name}
              </span>
              <CopyButton text={files[0].code} className="shrink-0" />
            </div>
            <HighlightedSource html={files[0].html} />
          </div>
        ) : (
          <Tabs
            defaultValue={files[0]?.name}
            className="relative gap-0 overflow-hidden rounded-xl border bg-background/50"
          >
            <div className="flex min-h-12 items-center gap-3 border-b bg-muted/20 pr-12 pl-4">
              <div className="flex min-w-0 flex-1 items-center gap-4 overflow-x-auto">
                <TabsList variant="line" aria-label="Source files" className="h-auto gap-4 p-0">
                  {files.map((file) => (
                    <TabsTrigger
                      key={file.name}
                      value={file.name}
                      className="shrink-0 rounded-none py-3 font-mono text-xs"
                    >
                      {file.name}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </div>
            </div>
            {files.map((file) => (
              <TabsContent key={file.name} value={file.name}>
                <CopyButton text={file.code} className="absolute top-2.5 right-3" />
                <HighlightedSource html={file.html} />
              </TabsContent>
            ))}
          </Tabs>
        )}
      </TabsContent>
    </Tabs>
  )
}
