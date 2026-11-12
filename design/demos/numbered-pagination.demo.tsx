import { useState } from "react"

import { NumberedPagination } from "@/registry/jr7/numbered-pagination/numbered-pagination"

import { Row, Rows, type DemoMeta } from "../demo"

export const meta: DemoMeta = {
  title: "Numbered Pagination",
  components: ["button"],
  custom: {
    file: "registry/jr7/numbered-pagination/numbered-pagination.tsx",
    exports: "NumberedPagination · getPaginationRange",
  },
}

const noop = () => {}

export default function NumberedPaginationDemo() {
  const [page, setPage] = useState(4)
  return (
    <Rows>
      <Row label="click" className="block">
        <NumberedPagination
          page={page}
          totalResults={120}
          resultsPerPage={12}
          onPageChange={setPage}
          className="justify-start"
        />
      </Row>
      <Row label="first" className="block">
        <NumberedPagination
          page={1}
          totalResults={120}
          resultsPerPage={12}
          onPageChange={noop}
          className="justify-start"
        />
      </Row>
      <Row label="few pages" className="block">
        <NumberedPagination
          page={2}
          totalResults={30}
          resultsPerPage={12}
          onPageChange={noop}
          className="justify-start"
        />
      </Row>
      <Row label="isFetching" className="block">
        <NumberedPagination
          page={4}
          totalResults={120}
          resultsPerPage={12}
          isFetching
          onPageChange={noop}
          className="justify-start"
        />
      </Row>
    </Rows>
  )
}
