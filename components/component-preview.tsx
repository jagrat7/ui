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
        <div className="flex min-h-72 items-center justify-center rounded-lg border dot-grid p-6 sm:p-10">
          {preview}
        </div>
      </TabsContent>

      <TabsContent value="code">
        <div className="overflow-hidden rounded-lg border">
          <div className="flex items-center gap-1 border-b pr-1 pl-2">
            <div className="flex flex-1 gap-1 overflow-x-auto py-1.5">
              {files.map((f, i) => (
                <button
                  key={f.name}
                  onClick={() => setActive(i)}
                  data-active={i === active}
                  className="rounded-md px-2 py-1 font-mono text-xs text-muted-foreground data-[active=true]:bg-muted data-[active=true]:text-foreground"
                >
                  {f.name}
                </button>
              ))}
            </div>
            <CopyButton text={file.code} />
          </div>
          <div
            className="max-h-[480px] overflow-auto text-[13px] leading-relaxed [&_pre]:p-4"
            dangerouslySetInnerHTML={{ __html: file.html }}
          />
        </div>
      </TabsContent>
    </Tabs>
  )
}
