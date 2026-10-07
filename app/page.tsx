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
      <Panel>
        <PanelContent className="space-y-3 py-10">
          <h1 className="font-mono text-3xl font-medium tracking-tight">
            <span className="text-muted-foreground">jr7/</span>ui
          </h1>
          <p className="max-w-xl text-balance text-muted-foreground">{SITE.description}</p>
        </PanelContent>
        <nav className="screen-line-top flex flex-wrap gap-x-4 gap-y-1 px-4 py-3 font-mono text-sm">
          {items.map((item) => (
            <a
              key={item.name}
              href={`#${item.name}`}
              className="text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
            >
              {item.name}
            </a>
          ))}
        </nav>
      </Panel>

      {items.map((item, i) => {
        const Demo = demos[item.name]
        return (
          <div key={item.name}>
            <Separator />
            <Panel id={item.name} className="scroll-mt-(--header-height)">
              <PanelHeader className="space-y-1">
                <PanelTitle>
                  <a href={`#${item.name}`}>{item.title}</a>
                </PanelTitle>
                <PanelDescription>{item.description}</PanelDescription>
              </PanelHeader>
              <PanelContent className="space-y-4">
                <ComponentPreview preview={Demo ? <Demo /> : null} files={sources[i]} />
                <InstallCommand id={item.name} url={`${SITE.url}/r/${item.name}.json`} />
              </PanelContent>
            </Panel>
          </div>
        )
      })}

      <Separator />
      <footer className="screen-line-top border-x px-4 py-6 font-mono text-xs text-muted-foreground">
        <a href={SITE.home} className="hover:text-foreground">
          jr7.dev
        </a>
        {" · "}
        <a href={`${SITE.url}/r/registry.json`} className="hover:text-foreground">
          registry.json
        </a>
      </footer>
    </div>
  )
}
