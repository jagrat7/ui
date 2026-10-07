import { getItemSource, items } from "@/lib/registry"
import { SITE } from "@/lib/site"
import { demos } from "@/components/demos"
import { ComponentPreview } from "@/components/component-preview"
import { InstallCommand } from "@/components/install-command"
import {
  Panel,
  PanelContent,
  PanelDescription,
  PanelHeader,
  PanelTitle,
  Separator,
} from "@/components/panel"

export default async function Home() {
  const sources = await Promise.all(items.map(getItemSource))

  return (
    <div className="mx-auto md:max-w-3xl">
      {items.map((item, i) => {
        const Demo = demos[item.name]
        return (
          <div key={item.name}>
            {i > 0 && <Separator />}
            <Panel id={item.name} className="scroll-mt-(--header-height)">
              <PanelHeader className="space-y-1">
                <PanelTitle>
                  <a href={`#${item.name}`}>{item.title}</a>
                </PanelTitle>
                <PanelDescription>{item.description}</PanelDescription>
              </PanelHeader>
              <PanelContent className="space-y-4">
                <ComponentPreview files={sources[i]}>{Demo ? <Demo /> : null}</ComponentPreview>
                <InstallCommand id={item.name} url={`${SITE.url}/r/${item.name}.json`} />
              </PanelContent>
            </Panel>
          </div>
        )
      })}

      <Separator />
      <footer className="screen-line-top screen-line-bottom flex gap-4 border-x glass px-4 py-6 font-mono text-xs text-muted-foreground">
        <a href={`${SITE.url}/r/registry.json`} className="hover:text-foreground">
          registry.json
        </a>
      </footer>
      <Separator className="h-16" />
    </div>
  )
}
