"use client"

import type { ComponentProps } from "react"
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react"

import { Button, buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export interface NumberedPaginationProps extends Omit<ComponentProps<"nav">, "onChange"> {
  /** One-based current page. */
  page: number
  totalResults: number
  resultsPerPage: number
  /** Optional server override; the last known page always remains the boundary. */
  hasNextPage?: boolean
  isFetching?: boolean
  onPageChange: (page: number) => void
}

export interface PaginationRange {
  page: number
  nearbyPages: number[]
  totalPages: number
  showFirstPage: boolean
  showLastPage: boolean
  showStartEllipsis: boolean
  showEndEllipsis: boolean
}

/** Retains the original two-neighbor window and first/last-page links. */
export function getPaginationRange(
  page: number,
  totalResults: number,
  resultsPerPage: number,
): PaginationRange {
  const totalPages =
    Number.isFinite(totalResults) && Number.isFinite(resultsPerPage) && resultsPerPage > 0
      ? Math.max(1, Math.ceil(Math.max(0, totalResults) / resultsPerPage))
      : 1
  const currentPage = Number.isFinite(page)
    ? Math.min(totalPages, Math.max(1, Math.floor(page)))
    : 1
  const nearbyPages = Array.from({ length: 5 }, (_, index) => currentPage - 2 + index).filter(
    (candidate) => candidate >= 1 && candidate <= totalPages && candidate !== currentPage,
  )
  const firstVisible = Math.max(1, currentPage - 2)
  const lastVisible = Math.min(totalPages, currentPage + 2)

  return {
    page: currentPage,
    nearbyPages,
    totalPages,
    showFirstPage: firstVisible > 1,
    showLastPage: lastVisible < totalPages,
    showStartEllipsis: firstVisible > 2,
    showEndEllipsis: lastVisible < totalPages - 1,
  }
}

function ellipsis(key: string) {
  return (
    <li key={key}>
      <span className="flex size-9 items-center justify-center">
        <MoreHorizontal className="size-4" aria-hidden="true" />
        <span className="sr-only">More pages</span>
      </span>
    </li>
  )
}

export function NumberedPagination({
  page,
  totalResults,
  resultsPerPage,
  hasNextPage,
  isFetching = false,
  onPageChange,
  className,
  "aria-label": ariaLabel = "Pagination",
  ...props
}: NumberedPaginationProps) {
  const range = getPaginationRange(page, totalResults, resultsPerPage)
  const previousDisabled = range.page <= 1 || isFetching
  const nextDisabled = range.page >= range.totalPages || hasNextPage === false || isFetching

  function pageItem(candidate: number) {
    return (
      <li key={candidate}>
        {candidate === range.page ? (
          <span
            aria-current="page"
            aria-label={`Page ${candidate}`}
            className={cn(buttonVariants({ variant: "outline", size: "icon" }), "rounded-md")}
          >
            {candidate}
          </span>
        ) : (
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="rounded-md"
            disabled={isFetching}
            aria-label={`Go to page ${candidate}`}
            onClick={() => onPageChange(candidate)}
          >
            {candidate}
          </Button>
        )}
      </li>
    )
  }

  return (
    <nav
      {...props}
      aria-label={ariaLabel}
      aria-busy={isFetching}
      data-slot="numbered-pagination"
      className={cn("mx-auto flex w-full justify-center", className)}
    >
      <ul className="flex flex-row items-center gap-1">
        <li>
          <Button
            type="button"
            variant="ghost"
            className="gap-1 rounded-md px-2.5"
            disabled={previousDisabled}
            aria-label="Go to previous page"
            onClick={() => onPageChange(range.page - 1)}
          >
            <ChevronLeft className="size-4" aria-hidden="true" />
            <span className="hidden sm:block">Previous</span>
          </Button>
        </li>
        {range.showFirstPage && pageItem(1)}
        {range.showStartEllipsis && ellipsis("start")}
        {range.nearbyPages.filter((candidate) => candidate < range.page).map(pageItem)}
        {pageItem(range.page)}
        {range.nearbyPages.filter((candidate) => candidate > range.page).map(pageItem)}
        {range.showEndEllipsis && ellipsis("end")}
        {range.showLastPage && pageItem(range.totalPages)}
        <li>
          <Button
            type="button"
            variant="ghost"
            className="gap-1 rounded-md px-2.5"
            disabled={nextDisabled}
            aria-label="Go to next page"
            onClick={() => onPageChange(range.page + 1)}
          >
            <span className="hidden sm:block">Next</span>
            <ChevronRight className="size-4" aria-hidden="true" />
          </Button>
        </li>
      </ul>
    </nav>
  )
}
