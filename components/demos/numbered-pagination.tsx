"use client"

import { useState } from "react"
import { NumberedPagination } from "@/registry/jr7/numbered-pagination/numbered-pagination"

export default function NumberedPaginationDemo() {
  const [page, setPage] = useState(5)
  const totalResults = 240
  const resultsPerPage = 12

  return (
    <div className="w-full space-y-5 rounded-xl border border-border bg-background p-6 text-foreground">
      <div className="flex items-center justify-between gap-3">
        <p className="font-medium">Wallpaper collection</p>
        <p className="text-sm text-muted-foreground" aria-live="polite">
          {(page - 1) * resultsPerPage + 1}–{page * resultsPerPage} of {totalResults}
        </p>
      </div>
      <NumberedPagination
        page={page}
        totalResults={totalResults}
        resultsPerPage={resultsPerPage}
        onPageChange={setPage}
      />
    </div>
  )
}
