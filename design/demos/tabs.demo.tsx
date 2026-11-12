import { Code, Eye, Terminal } from "lucide-react"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import { Row, Rows, type DemoMeta } from "../demo"

export const meta: DemoMeta = { title: "Tabs", components: ["tabs"] }

function Panes() {
  return (
    <>
      <TabsContent value="preview" className="text-sm text-muted-foreground">
        The component, live.
      </TabsContent>
      <TabsContent value="code" className="text-sm text-muted-foreground">
        Its source, highlighted.
      </TabsContent>
      <TabsContent value="install" className="text-sm text-muted-foreground">
        The shadcn command that adds it.
      </TabsContent>
    </>
  )
}

export default function TabsDemo() {
  return (
    <Rows>
      <Row label="default" className="block">
        <Tabs defaultValue="preview">
          <TabsList>
            <TabsTrigger value="preview">
              <Eye />
              Preview
            </TabsTrigger>
            <TabsTrigger value="code">
              <Code />
              Code
            </TabsTrigger>
            <TabsTrigger value="install" disabled>
              <Terminal />
              Install
            </TabsTrigger>
          </TabsList>
          <Panes />
        </Tabs>
      </Row>
      <Row label="line" className="block">
        <Tabs defaultValue="code">
          <TabsList variant="line">
            <TabsTrigger value="preview">Preview</TabsTrigger>
            <TabsTrigger value="code">Code</TabsTrigger>
            <TabsTrigger value="install">Install</TabsTrigger>
          </TabsList>
          <Panes />
        </Tabs>
      </Row>
      <Row label="vertical" className="block">
        <Tabs defaultValue="install" orientation="vertical">
          <TabsList>
            <TabsTrigger value="preview">Preview</TabsTrigger>
            <TabsTrigger value="code">Code</TabsTrigger>
            <TabsTrigger value="install">Install</TabsTrigger>
          </TabsList>
          <Panes />
        </Tabs>
      </Row>
    </Rows>
  )
}
