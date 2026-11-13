// Vite wants each glob's options written out in place.

import shadcn from "../../components.json"
import css from "../app/globals.css?raw"
import preset from "./shadcn-preset.gen.json"
import type { Sources } from "./types"

export const sources: Sources = {
  css,
  cssFile: "src/app/globals.css",
  shadcn,
  preset,
  components: Object.entries(
    import.meta.glob<string>("../components/ui/**/*.tsx", {
      eager: true,
      query: "?raw",
      import: "default",
    }),
  ).map(([path, code]) => ({
    name: path.slice("../components/ui/".length, -".tsx".length),
    code,
    file: `src/${path.slice("../".length)}`,
  })),
  app: Object.entries(
    import.meta.glob<string>(
      ["../**/*.{ts,tsx}", "!./**", "!../**/*.server.*", "!../**/*.gen.*", "!../**/*.test.*"],
      {
        eager: true,
        query: "?raw",
        import: "default",
      },
    ),
  ).map(([path, code]) => ({ path: `src/${path.slice("../".length)}`, code })),
}
