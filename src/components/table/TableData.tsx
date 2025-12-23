// src/components/ui/data-table.tsx
import * as React from "react"
import { cn } from "../../lib/cn"

export interface Column {
  name: string
  key: string
}

export interface DataRow {
  [key: string]: any
}

export interface DataTableOptions {
  search?: boolean
  download?: boolean
  viewColumns?: boolean
  filter?: boolean
  filterType?: "dropdown" | "checkbox" | "text"
  tableBodyHeight?: string
  tableBodyMaxHeight?: string
}

interface DataTableProps {
  columns: Column[]
  data: DataRow[]
  pagination?: boolean
  className?: string
  options?: DataTableOptions
}

const LeftArrowIcon = () => (
  <span className="inline-flex h-5 w-5 items-center justify-center">
    <svg
      viewBox="0 0 24 24"
      className="h-4 w-4 text-[var(--atom-text-primary,#4b5563)]"
      aria-hidden="true"
    >
      <path
        d="M15 6l-6 6 6 6"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  </span>
)

const RightArrowIcon = () => (
  <span className="inline-flex h-5 w-5 items-center justify-center">
    <svg
      viewBox="0 0 24 24"
      className="h-4 w-4 text-[var(--atom-text-primary,#4b5563)]"
      aria-hidden="true"
    >
      <path
        d="M9 6l6 6-6 6"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  </span>
)

// simple inline icons (you can swap with Lucide/Remix later)
const SearchIcon = () => (
  <svg
    viewBox="0 0 24 24"
    className="h-4 w-4"
    aria-hidden="true"
  >
    <path
      d="M11 5a6 6 0 014.472 9.985l3.271 3.272-1.414 1.414-3.272-3.271A6 6 0 1111 5z"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

const FilterIcon = () => (
  <svg
    viewBox="0 0 24 24"
    className="h-4 w-4"
    aria-hidden="true"
  >
    <path
      d="M4 5h16l-6 7v5l-4 2v-7L4 5z"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

const ColumnsIcon = () => (
  <svg
    viewBox="0 0 24 24"
    className="h-4 w-4"
    aria-hidden="true"
  >
    <path
      d="M5 4h4v16H5zM10 4h4v16h-4zM15 4h4v16h-4z"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

const DownloadIcon = () => (
  <svg
    viewBox="0 0 24 24"
    className="h-4 w-4"
    aria-hidden="true"
  >
    <path
      d="M12 3v12m0 0l-4-4m4 4l4-4M5 19h14"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

export function DataTable({
  columns,
  data,
  pagination = false,
  className,
  options,
}: DataTableProps) {
  const [currentPage, setCurrentPage] = React.useState(1)
  const [searchValue , setSearchValue] = React.useState('')
  const rowsPerPage = 10
 

  const {
    search = false,
    download = false,
    viewColumns = false,
    filter = false,
    filterType = "dropdown",
    tableBodyHeight,
    tableBodyMaxHeight,
  } = options || {}

  const normalizedSearch = searchValue.trim().toLowerCase()

const filteredData = !search || !normalizedSearch
  ? data
  : data.filter((row) =>
      columns.some((column) => {
        const value = row[column.key]
        if (value === null || value === undefined) return false
        return String(value).toLowerCase().includes(normalizedSearch)
      }),
    )

const totalPages = Math.ceil(filteredData.length / rowsPerPage)

const paginatedData = pagination
  ? filteredData.slice(
      (currentPage - 1) * rowsPerPage,
      currentPage * rowsPerPage,
    )
  : filteredData


  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return
    setCurrentPage(page)
  }

  const Toolbar = () => {
    const showToolbar = search || download || viewColumns || filter
    if (!showToolbar) return null
    

    React.useEffect(() => {
  setCurrentPage(1)
}, [searchValue])

    return (
      <div className="flex items-center justify-between gap-3 px-4 py-2 border-b border-(--atom-border-subtle,#e2e8f0) bg-white">
        <div className="flex items-center gap-2">
          {search && (
            <div className="flex h-8 w-48 items-center gap-2 rounded-md border border-(--atom-border-subtle,#e2e8f0) px-2">
              <SearchIcon />
              <input
                type="text"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                placeholder="Search..."
                className="h-full w-full bg-transparent text-sm outline-none"
              />
            </div>
          )}
        </div>

        <div className="flex items-center gap-2">
          {filter && (
            <button
              type="button"
              className="flex h-8 items-center gap-2 rounded-md border border-(--atom-border-subtle,#e2e8f0) px-3 text-xs font-medium"
              aria-label="Filter"
            >
              <FilterIcon />
            </button>
          )}
          {viewColumns && (
            <button
              type="button"
              className="flex h-8 items-center gap-2 rounded-md border border-(--atom-border-subtle,#e2e8f0) px-3 text-xs font-medium"
              aria-label="View columns"
            >
              <ColumnsIcon />
            </button>
          )}
          {download && (
            <button
              type="button"
              className="flex h-8 items-center gap-2 rounded-md border border-(--atom-border-subtle,#e2e8f0) px-3 text-xs font-medium"
              aria-label="Download"
            >
              <DownloadIcon />
            </button>
          )}
        </div>
      </div>
    )
  }

  const PaginationControls = () => {
    if (!pagination || data.length <= rowsPerPage || totalPages <= 1) return null

    return (
      <div className="flex items-center justify-between px-4 py-3 bg-white border-t border-[var(--atom-border-subtle,#e2e8f0)] sm:px-6">
        <div className="text-sm text-[var(--atom-text-muted,#64748b)]">
          Showing {(currentPage - 1) * rowsPerPage + 1} to{" "}
          {Math.min(currentPage * rowsPerPage, data.length)} of {data.length} entries
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={cn(
              "flex h-9 w-9 items-center justify-center rounded-full border transition-colors",
              currentPage === 1
                ? "bg-gray-100 text-gray-400 cursor-not-allowed border-gray-200"
                : "bg-white hover:bg-gray-50 text-[var(--atom-text-primary,#0f172a)] border-[var(--atom-border-subtle,#e2e8f0)] hover:border-gray-300",
            )}
            aria-label="Previous page"
          >
            <LeftArrowIcon />
          </button>

          <div className="flex items-center gap-1">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={cn(
                  "min-w-[2.25rem] h-9 rounded-md text-sm font-medium flex items-center justify-center border transition-colors px-2",
                  currentPage === page
                    ? "bg-(--atom-primary,#3b82f6)] text-white border-[var(--atom-primary,#3b82f6)]"
                    : "bg-white hover:bg-gray-50 text-[var(--atom-text-primary,#0f172a)] border-[var(--atom-border-subtle,#e2e8f0)] hover:border-gray-300",
                )}
              >
                {page}
              </button>
            ))}
          </div>

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={cn(
              "flex h-9 w-9 items-center justify-center rounded-full border transition-colors",
              currentPage === totalPages
                ? "bg-gray-100 text-gray-400 cursor-not-allowed border-gray-200"
                : "bg-white hover:bg-gray-50 text-[var(--atom-text-primary,#0f172a)] border-[var(--atom-border-subtle,#e2e8f0)] hover:border-gray-300",
            )}
            aria-label="Next page"
          >
            <RightArrowIcon />
          </button>
        </div>
      </div>
    )
  }

  return (
    <div
      className={cn(
        "w-full overflow-hidden rounded-md border border-[var(--atom-border-subtle,#e2e8f0)] bg-white",
        className,
      )}
    >
      <Toolbar />

      <div
        className="overflow-x-auto"
        style={{
          height: tableBodyHeight,
          maxHeight: tableBodyMaxHeight,
        }}
      >
        <table className="w-full border-collapse text-left text-sm">
          <thead className="bg-[var(--atom-table-header-bg,#f8fafc)] text-xs uppercase tracking-wide text-[var(--atom-text-muted,#64748b)] sticky top-0 z-10">
            <tr>
              {columns.map((column) => (
                <th
                  key={column.key}
                  className="px-4 py-2 font-medium text-[var(--atom-text-muted,#64748b)]"
                >
                  {column.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--atom-border-subtle,#e2e8f0)] bg-white">
            {paginatedData.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {columns.map((column) => (
                  <td
                    key={column.key}
                    className="px-4 py-2 text-[var(--atom-text-primary,#0f172a)]"
                  >
                    {row[column.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <PaginationControls />
    </div>
  )
}
