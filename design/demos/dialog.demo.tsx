import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import { Row, Rows, type DemoMeta } from "../demo"

export const meta: DemoMeta = { title: "Dialog", components: ["dialog"] }

export default function DialogDemo() {
  return (
    <Rows>
      <Row label="click">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">Install</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Install Loading Button</DialogTitle>
              <DialogDescription>
                Adds loading-button.tsx to your components, with button and utils.
              </DialogDescription>
            </DialogHeader>
            <pre className="overflow-x-auto rounded-md bg-muted p-3 font-mono text-xs">
              pnpm dlx shadcn@latest add @jr7/loading-button
            </pre>
            <DialogFooter showCloseButton>
              <Button>Copy command</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="ghost">No close button</Button>
          </DialogTrigger>
          <DialogContent showCloseButton={false} className="sm:max-w-sm">
            <DialogHeader>
              <DialogTitle>Allow microphone?</DialogTitle>
              <DialogDescription>
                The Audio Visualizer demo draws your microphone live. Nothing is recorded.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Not now</Button>
              </DialogClose>
              <DialogClose asChild>
                <Button>Use microphone</Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </Row>
    </Rows>
  )
}
