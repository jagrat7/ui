import { getItemSource, items } from "@/lib/registry"
import { SITE } from "@/lib/site"
import { demos } from "@/components/demos"
import { ComponentPreview } from "@/components/component-preview"
import { InstallCommand } from "@/components/install-command"
import { Panel, PanelContent, PanelDescription, PanelHeader, PanelTitle } from "@/components/panel"

export default async function Home() {
  const sources = await Promise.all(items.map(getItemSource))

  return (
    <div className="mx-auto space-y-16 py-10 md:max-w-3xl">
      {items.map((item, i) => {
        const Demo = demos[item.name]
        return (
          <Panel
            key={item.name}
            id={item.name}
            className="scroll-mt-[calc(var(--header-height)+--spacing(10))]"
          >
            <PanelHeader>
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
        )
      })}

      <footer className="flex justify-center gap-4 px-4 pt-4 font-mono text-xs text-muted-foreground">
        <a href={`${SITE.url}/r/registry.json`} className="hover:text-foreground">
          registry.json
        </a>
      </footer>
    </div>
  )
}
