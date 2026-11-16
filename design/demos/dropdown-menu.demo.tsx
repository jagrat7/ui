import { ChevronDown } from "lucide-react"
import { useState } from "react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { Row, Rows, type DemoMeta } from "../demo"

export const meta: DemoMeta = { title: "Dropdown menu", components: ["dropdown-menu"] }

export default function DropdownMenuDemo() {
  const [preview, setPreview] = useState(true)
  const [source, setSource] = useState(false)
  const [order, setOrder] = useState("newest")
  return (
    <Rows>
      <Row label="click">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              Install
              <ChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="start">
            <DropdownMenuGroup>
              <DropdownMenuLabel>@jr7/loading-button</DropdownMenuLabel>
              <DropdownMenuItem>
                Copy command
                <DropdownMenuShortcut>⌘C</DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuItem>
                Open registry.json
                <DropdownMenuShortcut>⌘O</DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>Package manager</DropdownMenuSubTrigger>
                <DropdownMenuSubContent>
                  <DropdownMenuItem>pnpm</DropdownMenuItem>
                  <DropdownMenuItem>npm</DropdownMenuItem>
                  <DropdownMenuItem>bun</DropdownMenuItem>
                </DropdownMenuSubContent>
              </DropdownMenuSub>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuCheckboxItem checked={preview} onCheckedChange={setPreview}>
              Show preview
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem checked={source} onCheckedChange={setSource}>
              Show source
            </DropdownMenuCheckboxItem>
            <DropdownMenuSeparator />
            <DropdownMenuRadioGroup value={order} onValueChange={setOrder}>
              <DropdownMenuRadioItem value="newest">Newest</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="oldest">Oldest</DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem disabled>Deprecated</DropdownMenuItem>
            <DropdownMenuItem variant="destructive">Remove</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </Row>
    </Rows>
  )
}
