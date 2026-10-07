# jr7/ui

A single-page showcase and [shadcn registry](https://ui.shadcn.com/docs/registry) for my components — https://ui.jr7.dev

## Install a component

```bash
npx shadcn@latest add https://ui.jr7.dev/r/loading-button.json
```

Or add the namespace to your `components.json` once and use `@jr7/<name>`:

```json
{
  "registries": {
    "@jr7": "https://ui.jr7.dev/r/{name}.json"
  }
}
```

```bash
npx shadcn@latest add @jr7/loading-button
```
