import { getItemSource, items, metaOf } from "@/lib/registry"
import { SITE } from "@/lib/site"
import { demos } from "@/components/demos"
import { ComponentPreview } from "@/components/component-preview"
import { InstallCommand } from "@/components/install-command"
import { ItemPicture } from "@/components/item-picture"
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
        const { preview, installs } = metaOf(item)
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
                      <InstallCommand
                        id={install.name}
                        url={`${SITE.url}/r/${install.name}.json`}
                      />
                    </div>
                  ))
                ) : (
                  <InstallCommand id={item.name} url={`${SITE.url}/r/${item.name}.json`} />
                )}
              </PanelContent>
            </Panel>
          </div>
        )
      })}

      <Separator />
      <footer className="screen-line-top screen-line-bottom flex justify-center gap-4 border-x glass px-4 py-6 font-mono text-xs text-muted-foreground">
        <a href={`${SITE.url}/r/registry.json`} className="hover:text-foreground">
          registry.json
        </a>
      </footer>
      <Separator className="h-16" />
    </div>
  )
}
