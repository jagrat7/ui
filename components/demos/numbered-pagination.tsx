"use client"

import { useState } from "react"

import { Demo } from "@/components/demo"
import { NumberedPagination } from "@/registry/jr7/numbered-pagination/numbered-pagination"

const TOTAL_RESULTS = 240
const RESULTS_PER_PAGE = 12

export default function NumberedPaginationDemo() {
  const [page, setPage] = useState(5)
  const first = (page - 1) * RESULTS_PER_PAGE + 1
  const last = Math.min(page * RESULTS_PER_PAGE, TOTAL_RESULTS)

  return (
    <Demo caption={`page ${page} · showing ${first}–${last} of ${TOTAL_RESULTS}`}>
      <NumberedPagination
        page={page}
        totalResults={TOTAL_RESULTS}
        resultsPerPage={RESULTS_PER_PAGE}
        onPageChange={setPage}
      />
    </Demo>
  )
}
