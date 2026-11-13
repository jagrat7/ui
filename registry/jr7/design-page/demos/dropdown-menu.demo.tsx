import { buttonVariants } from "@/components/ui/button"
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
import { useState } from "react"

import { Row, Rows, type DemoMeta } from "../demo"
import { ChevronsUpDown } from "../ui"

export const meta: DemoMeta = { title: "Dropdown menu", components: ["dropdown-menu"] }

export default function DropdownMenuDemo() {
  const [starred, setStarred] = useState(true)
  const [archived, setArchived] = useState(false)
  const [order, setOrder] = useState("newest")
  return (
    <Rows>
      <Row label="click">
        <DropdownMenu>
          <DropdownMenuTrigger className={buttonVariants({ variant: "outline" })}>
            My account
            <ChevronsUpDown />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="start">
            <DropdownMenuGroup>
              <DropdownMenuLabel>My account</DropdownMenuLabel>
              <DropdownMenuItem>
                Profile
                <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuItem>
                Settings
                <DropdownMenuShortcut>⌘,</DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>Share</DropdownMenuSubTrigger>
                <DropdownMenuSubContent>
                  <DropdownMenuItem>Copy link</DropdownMenuItem>
                  <DropdownMenuItem>Email</DropdownMenuItem>
                </DropdownMenuSubContent>
              </DropdownMenuSub>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuCheckboxItem
              checked={starred}
              onCheckedChange={(checked) => setStarred(checked === true)}
            >
              Show starred
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={archived}
              onCheckedChange={(checked) => setArchived(checked === true)}
            >
              Show archived
            </DropdownMenuCheckboxItem>
            <DropdownMenuSeparator />
            <DropdownMenuRadioGroup
              value={order}
              onValueChange={(value) => setOrder(String(value))}
            >
              <DropdownMenuRadioItem value="newest">Newest</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="oldest">Oldest</DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem disabled>Billing</DropdownMenuItem>
            <DropdownMenuItem variant="destructive">Delete account</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </Row>
    </Rows>
  )
}
