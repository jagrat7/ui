# jr7/ui

A single-page showcase and [shadcn registry](https://ui.shadcn.com/docs/registry) for my components — https://ui.jr7.dev

Built on [shadcn-ui/registry-template](https://github.com/shadcn-ui/registry-template); layout style adapted from [chanhdai.com](https://github.com/ncdai/chanhdai.com) (MIT) and the install picker from [VengeanceUI](https://github.com/Ashutoshx7/VengeanceUI) (MIT).

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

## Develop

```bash
pnpm dev             # site at localhost:3000
pnpm registry:build  # regenerate public/r/*.json
pnpm build           # registry:build + next build
```

## Add a component

1. Put the source in `registry/jr7/<name>/<name>.tsx` (import primitives from `@/components/ui/*`, `cn` from `@/lib/utils`).
2. Add an entry to `registry.json` with its npm `dependencies` and shadcn `registryDependencies`.
3. Add a demo in `components/demos/<name>.tsx` and register it in `components/demos/index.ts`.
