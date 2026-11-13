// The components the design page itself is built from, at this project's paths. page.tsx and
// demo.tsx import them from here, so those files stay the same in every project.

export { Button, buttonVariants } from "@/components/ui/button"
export {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
export { Sortable, SortableHandle, SortableItem } from "@/components/ui/sortable"
export { cn } from "@/lib/utils"

// The page's own icons, from the project's icon library, under these names. Another library's
// are renamed on the way: `RiSearchLine as Search`.
export {
  Blocks,
  ChevronRight,
  ChevronsDownUp,
  ChevronsUpDown,
  Menu,
  Moon,
  MousePointer2,
  Search,
  Shapes,
  Sun,
} from "lucide-react"
