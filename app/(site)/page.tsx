import { getItemSource, items, metaOf } from "@/lib/registry"
import { SITE } from "@/lib/site"
import { demos } from "@/components/demos"
import { ComponentPreview } from "@/components/component-preview"
import { InstallCommand } from "@/components/install-command"
import { ItemPicture } from "@/components/item-picture"
import { Panel, PanelContent, PanelDescription, PanelHeader, PanelTitle } from "@/components/panel"

export default async function Home() {
  const sources = await Promise.all(items.map(getItemSource))

  return (
    <div className="mx-auto space-y-16 py-10 md:max-w-3xl">
      {items.map((item, i) => {
        const Demo = demos[item.name]
        const { preview, installs } = metaOf(item)
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
              <ComponentPreview files={sources[i]}>
                {preview ? (
                  <ItemPicture title={item.title} preview={preview} />
                ) : Demo ? (
                  <Demo />
                ) : null}
              </ComponentPreview>
              {installs ? (
                installs.map((install) => (
                  <div key={install.name} className="space-y-1.5">
                    <p className="font-mono text-xs text-muted-foreground">{install.label}</p>
                    <InstallCommand id={install.name} url={`${SITE.url}/r/${install.name}.json`} />
                  </div>
                ))
              ) : (
                <InstallCommand id={item.name} url={`${SITE.url}/r/${item.name}.json`} />
              )}
            </PanelContent>
          </Panel>
        )
      })}
    </div>
  )
}
