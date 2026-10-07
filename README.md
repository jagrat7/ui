# jr7/ui

A single-page showcase and [shadcn registry](https://ui.shadcn.com/docs/registry) for my components.

[Explore the components and live demos at ui.jr7.dev](https://ui.jr7.dev).

The registry contains a few my own components that I have struggled to find elsewhere.

## Components

- [Loading Button](#loading-button): a button that shows progress and prevents repeated clicks during an async action.
- [Numbered Pagination](#numbered-pagination): controlled page navigation with nearby pages, first/last links, and ellipses.
- [Audio Visualizer](#audio-visualizer): a mirrored audio waveform driven by a Web Audio analyser or frequency samples.
- [Error Message](#error-message): an inline alert with a close button and optional automatic dismissal.

## Install a component

Use an existing React project configured for shadcn components, including its CSS theme and import aliases. The registry declares each component's npm and shadcn dependencies so the CLI can install them alongside the source.

```bash
npx shadcn@latest add https://ui.jr7.dev/r/loading-button.json
```

Replace `loading-button` with `numbered-pagination`, `audio-visualizer`, or `error-message` to install another component.

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

The examples below assume your components alias is `@/components`. Adjust the import paths if your project uses a different destination. The registry source lives under [`registry/jr7`](registry/jr7); the showcase imports directly from that directory.

### Loading Button

Use `LoadingButton` for form submissions, saves, or any action with a pending state. It wraps the shadcn `Button`, replacing its children with a spinner and loading label while `isLoading` is true. Your application owns the loading state and the async operation.

```tsx
"use client"

import { useState } from "react"
import { LoadingButton } from "@/components/loading-button"

export function SaveButton({ onSave }: { onSave: () => Promise<void> }) {
  const [isLoading, setIsLoading] = useState(false)

  async function handleSave() {
    setIsLoading(true)
    try {
      await onSave()
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <LoadingButton type="button" isLoading={isLoading} loadingText="Saving…" onClick={handleSave}>
      Save changes
    </LoadingButton>
  )
}
```

Props and behavior:

- `isLoading` (`boolean`, required): shows the spinner and `loadingText`, disables the button, and sets `aria-busy`.
- `children` (`ReactNode`, required): the content displayed when the button is idle.
- `loadingText` (`string`, default: `"Sending..."`): the label displayed beside the spinner.
- `isDisabled` (`boolean`, default: `false`): an additional disabled flag. The button is disabled if `isLoading`, `isDisabled`, or the standard `disabled` prop is true.
- Standard shadcn button props such as `variant`, `size`, `onClick`, and `className` are supported. `variant` defaults to `"secondary"` and `type` defaults to `"submit"`; use `type="button"` for actions that should not submit a form. `asChild` is excluded.

The spinner stops rotating when the user prefers reduced motion. Async errors remain the caller's responsibility; use `ErrorMessage` or your own error handling alongside the button.

Dependencies: `lucide-react`, the shadcn `button`, and the `cn` utility.

[Component source](registry/jr7/loading-button/loading-button.tsx) · [Interactive demo source](components/demos/loading-button.tsx)

### Numbered Pagination

Use `NumberedPagination` to navigate a known result set. It renders previous/next controls, up to two neighboring pages on each side of the current page, first/last page buttons when outside that window, and ellipses for gaps. It only renders navigation: your application updates the page state and fetches or slices the corresponding results.

```tsx
"use client"

import { useState } from "react"
import { NumberedPagination } from "@/components/numbered-pagination"

export function ResultsPagination() {
  const [page, setPage] = useState(1)

  return (
    <NumberedPagination page={page} totalResults={240} resultsPerPage={12} onPageChange={setPage} />
  )
}
```

Props and behavior:

- `page` (`number`, required): the current page, starting at **1**.
- `totalResults` (`number`, required): the total result count used to calculate the last page.
- `resultsPerPage` (`number`, required): the page size. The page count is `ceil(totalResults / resultsPerPage)`, with a minimum of one page.
- `onPageChange` (`(page: number) => void`, required): called with the requested page when a navigation button is clicked.
- `isFetching` (`boolean`, default: `false`): disables navigation and sets `aria-busy` while results are loading.
- `hasNextPage` (`boolean`, optional): setting it to `false` disables Next early. Setting it to `true` does not allow navigation beyond the calculated last page, and it does not disable numbered page buttons.
- Standard `<nav>` props, including `className` and `aria-label`, are supported. The default accessible label is `"Pagination"`.

The displayed page is clamped to the valid range and rounded down to an integer. Invalid totals or page sizes fall back to one page; a negative total is treated as zero. This normalization does not update your state or call `onPageChange`, so keep application state in sync when the result count changes. The current page is marked with `aria-current="page"`.

The module also exports `getPaginationRange(page, totalResults, resultsPerPage)` for custom navigation UIs. It returns the normalized `page`, `totalPages`, neighboring page numbers (excluding the current page), and flags for first/last links and ellipses.

Dependencies: `lucide-react`, the shadcn `button`, and the `cn` utility.

[Component source](registry/jr7/numbered-pagination/numbered-pagination.tsx) · [Interactive demo source](components/demos/numbered-pagination.tsx)

### Audio Visualizer

Use `AudioVisualizer` for an audio player, recording interface, or frequency display. It draws a mirrored waveform with `audvis` when supplied with a Web Audio `AnalyserNode`. Alternatively, supply byte-frequency samples to render an SVG waveform without creating an audio context.

```tsx
import { AudioVisualizer } from "@/components/audio-visualizer"

export function AudioPreview() {
  return (
    <AudioVisualizer
      isActive
      frequencyData={[40, 90, 150, 220, 180, 120, 80, 30]}
      height={48}
      ariaLabel="Sample audio frequency spectrum"
    />
  )
}
```

This example displays a fixed set of samples. To animate sample input, update `frequencyData` from your application. For live audio, pass your own analyser instead:

```tsx
<AudioVisualizer
  analyser={analyser}
  isActive={isPlaying}
  progress={duration > 0 ? currentTime / duration : undefined}
  ariaLabel="Playback progress"
/>
```

Here, `analyser`, `isPlaying`, `currentTime`, and `duration` come from your audio player.

Props and behavior:

- `isActive` (`boolean`, required): enables the waveform. Inactive input displays a flat, dashed idle strip.
- `analyser` (`AnalyserNode | null`, optional): a caller-owned Web Audio analyser. It takes priority over `frequencyData` when both are supplied.
- `frequencyData` (`readonly number[] | Uint8Array`, optional): byte-frequency samples from 0 to 255. Values are clamped to that range, with non-finite values treated as zero.
- `progress` (`number`, optional): normalized playback progress from 0 to 1. A finite value changes the accessible role from `img` to `progressbar` and exposes a clamped percentage through ARIA. It does not draw a separate progress indicator.
- `width` (`number`, default: `680`): the internal drawing width, which also controls the number of bars. The rendered waveform fills its container's width.
- `height` (`number`, default: `24`): the drawing and container height in pixels. Finite dimensions are rounded and clamped to at least 8 pixels wide and 4 pixels high; non-finite values use the defaults.
- `color` (`string`, optional): any CSS color. By default, the waveform uses the computed `text-primary` color and responds to theme changes.
- `className` (`string`, optional): additional container styles.
- `ariaLabel` (`string`, default: `"Audio waveform"`): the accessible label.

When reduced motion is enabled, the component displays the idle strip even if `isActive` is true. It also displays the idle strip when there is no audio input.

The component does not request microphone access, play audio, or create or close an audio context. The caller owns permissions, audio connections, stream tracks, and cleanup. The [showcase demo](components/demos/audio-visualizer.tsx) demonstrates both simulated samples and microphone input using the separate [`openMicrophone` helper](lib/microphone.ts); that helper is not installed with the registry component.

Dependencies: `audvis`, `motion`, and the `cn` utility.

[Component source](registry/jr7/audio-visualizer/audio-visualizer.tsx) · [Interactive demo source](components/demos/audio-visualizer.tsx)

### Error Message

Use `ErrorMessage` to show an inline error near a form or action. A nonempty message renders an animated alert with an icon and close button. Clearing the message hides it. The component calls your state setter for both manual and automatic dismissal.

```tsx
"use client"

import { useState } from "react"
import { ErrorMessage } from "@/components/error-message"

export function ErrorExample() {
  const [message, setMessage] = useState<string | null>(null)

  return (
    <div>
      <ErrorMessage message={message} setMessage={setMessage} autoDismissTimeout={0} />
      <button type="button" onClick={() => setMessage("We couldn't save your changes.")}>
        Show error
      </button>
    </div>
  )
}
```

Props and behavior:

- `message` (`string | null`, required): the error text. `null` or an empty string hides the alert.
- `setMessage` (`(message: string | null) => void`, required): called with `null` when the close button is clicked or the dismissal timer finishes. A React state setter can be passed directly.
- `autoDismissTimeout` (`number`, default: `5000`): milliseconds before automatic dismissal. Set it to `0` or a negative value to keep the error visible until dismissed manually.
- `className` (`string`, optional): additional alert styles.

The default timer starts when the message is shown, regardless of whether it is visible in the viewport. Changing the message, timeout, or setter restarts the timer; clearing the message or unmounting cancels it. The showcase demo disables this built-in timer and manages a separate countdown that starts when the demo is visible.

The alert uses `role="alert"`, its close button has an accessible label, and entrance/exit animations respect reduced-motion preferences.

Dependencies: `motion`, `lucide-react`, and the `cn` utility.

[Component source](registry/jr7/error-message/error-message.tsx) · [Interactive demo source](components/demos/error-message.tsx)

## Run the showcase locally

```bash
pnpm install
pnpm dev
```

To regenerate the installable registry JSON after changing a component:

```bash
pnpm registry:build
```

`pnpm build` regenerates the registry and builds the Next.js showcase. Component metadata and dependencies are defined in [`registry.json`](registry.json); interactive examples live in [`components/demos`](components/demos).

## Credits

Thanks to the projects that contributed code, design ideas, and building blocks:

- [chanhdai.com](https://github.com/ncdai/chanhdai.com): the panel layout was adapted from this MIT-licensed project. Its page dividers and circular theme reveal also inspired the showcase design.
- [VengeanceUI](https://github.com/Ashutoshx7/VengeanceUI): the package manager picker in the install commands was adapted from this MIT-licensed project.
- [shadcn/ui](https://ui.shadcn.com): provides the base UI components and the registry tooling used to distribute these components.
- **Commit Mono**, by Eigil Nikolajsen: the showcase's monospace font, distributed under the SIL Open Font License 1.1. See the [bundled font license](app/fonts/CommitMono-LICENSE.txt).
