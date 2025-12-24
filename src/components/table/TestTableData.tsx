// src/components/ui/data-table.tsx
import * as React from "react"
import type { ReactNode } from "react"
import { cn } from "../../lib/cn"

export interface Column {
  name: string
  key: string
  selector?: (row: DataRow) => any
  sortable?: boolean
  cell?: (row: DataRow, rowIndex: number) => ReactNode
  conditionalCell?: (value: any, row: DataRow) => ReactNode
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

/* ------------------ Icons ------------------ */
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

const SearchIcon = () => (
  <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
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
  <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
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
  <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
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
  <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
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

/* ------------------ Toolbar ------------------ */
function Toolbar(props: {
  search: boolean
  download: boolean
  viewColumns: boolean
  filter: boolean
  filterType: "dropdown" | "checkbox" | "text"
  searchValue: string
  onSearchChange: (value: string) => void
}) {
  const {
    search,
    download,
    viewColumns,
    filter,
    filterType,
    searchValue,
    onSearchChange,
  } = props

  const showToolbar = search || download || viewColumns || filter
  if (!showToolbar) return null

  return (
    <div className="flex items-center justify-between gap-3 px-4 py-2 border-b border-[var(--atom-border-subtle,#e2e8f0)] bg-white">
      <div className="flex items-center gap-2">
        {search && (
          <div className="flex h-8 w-48 items-center gap-2 rounded-md border border-[var(--atom-border-subtle,#e2e8f0)] px-2">
            <SearchIcon />
            <input
              type="text"
              placeholder="Search..."
              value={searchValue}
              onChange={(e) => onSearchChange(e.target.value)}
              className="h-full w-full bg-transparent text-sm outline-none"
            />
          </div>
        )}
      </div>

      <div className="flex items-center gap-2">
        {filter && (
          <button
            type="button"
            className="flex h-8 items-center gap-2 rounded-md border border-[var(--atom-border-subtle,#e2e8f0)] px-3 text-xs font-medium"
            aria-label="Filter"
          >
            <FilterIcon />
          </button>
        )}
        {viewColumns && (
          <button
            type="button"
            className="flex h-8 items-center gap-2 rounded-md border border-[var(--atom-border-subtle,#e2e8f0)] px-3 text-xs font-medium"
            aria-label="View columns"
          >
            <ColumnsIcon />
          </button>
        )}
        {download && (
          <button
            type="button"
            className="flex h-8 items-center gap-2 rounded-md border border-[var(--atom-border-subtle,#e2e8f0)] px-3 text-xs font-medium"
            aria-label="Download"
          >
            <DownloadIcon />
          </button>
        )}
      </div>
    </div>
  )
}

/* -------------- PaginationControls -------------- */
function PaginationControls(props: {
  pagination: boolean
  dataLength: number
  rowsPerPage: number
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}) {
  const {
    pagination,
    dataLength,
    rowsPerPage,
    currentPage,
    totalPages,
    onPageChange,
  } = props

  if (!pagination || dataLength <= rowsPerPage || totalPages <= 1) return null

  return (
    <div className="flex items-center justify-between px-4 py-3 bg-white border-t border-[var(--atom-border-subtle,#e2e8f0)] sm:px-6">
      <div className="text-sm text-[var(--atom-text-muted,#64748b)]">
        Showing {(currentPage - 1) * rowsPerPage + 1} to{" "}
        {Math.min(currentPage * rowsPerPage, dataLength)} of {dataLength} entries
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={() => onPageChange(currentPage - 1)}
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
              onClick={() => onPageChange(page)}
              className={cn(
                "min-w-[2.25rem] h-9 rounded-md text-sm font-medium flex items-center justify-center border transition-colors px-2",
                currentPage === page
                  ? "bg-[var(--atom-primary,#3b82f6)] text-white border-[var(--atom-primary,#3b82f6)]"
                  : "bg-white hover:bg-gray-50 text-[var(--atom-text-primary,#0f172a)] border-[var(--atom-border-subtle,#e2e8f0)] hover:border-gray-300",
              )}
            >
              {page}
            </button>
          ))}
        </div>

        <button
          onClick={() => onPageChange(currentPage + 1)}
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

/* ------------------ DataTable ------------------ */
export function DataTable({
  columns,
  data,
  pagination = false,
  className,
  options,
}: DataTableProps) {
  const [currentPage, setCurrentPage] = React.useState(1)
  const [searchValue, setSearchValue] = React.useState("")
  const [sortConfig, setSortConfig] = React.useState<{
    key: string | null
    direction: "asc" | "desc"
  }>({
    key: null,
    direction: "asc",
  })

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

  const normalizeText = (value: unknown) => {
    if (value === null || value === undefined) return ""
    return String(value)
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, "")
  }

  const normalizedSearch = normalizeText(searchValue.trim())

  const filteredData = !search || !normalizedSearch
    ? data
    : data.filter((row) =>
        columns.some((column) => {
          const value = column.selector ? column.selector(row) : row[column.key]
          const normalizedValue = normalizeText(value)
          return normalizedValue.includes(normalizedSearch)
        }),
      )

  const sortedData = React.useMemo(() => {
    if (!sortConfig.key) return filteredData

    const sorted = [...filteredData].sort((a, b) => {
      const column = columns.find(c => c.key === sortConfig.key)
      const aVal = column?.selector ? column.selector(a) : a[sortConfig.key!]
      const bVal = column?.selector ? column.selector(b) : b[sortConfig.key!]

      const aNum = Number(String(aVal).replace(/[^0-9.-]/g, ""))
      const bNum = Number(String(bVal).replace(/[^0-9.-]/g, ""))

      if (!Number.isNaN(aNum) && !Number.isNaN(bNum)) {
        return sortConfig.direction === "asc" ? aNum - bNum : bNum - aNum
      }

      const aStr = normalizeText(aVal)
      const bStr = normalizeText(bVal)

      if (aStr < bStr) return sortConfig.direction === "asc" ? -1 : 1
      if (aStr > bStr) return sortConfig.direction === "asc" ? 1 : -1
      return 0
    })

    return sorted
  }, [filteredData, sortConfig, columns])

  const totalPages = Math.ceil(sortedData.length / rowsPerPage)

  const paginatedData = pagination
    ? sortedData.slice(
        (currentPage - 1) * rowsPerPage,
        currentPage * rowsPerPage,
      )
    : sortedData

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return
    setCurrentPage(page)
  }

  const handleSort = (key: string) => {
    const column = columns.find(col => col.key === key)
    if (!column?.sortable) return

    setSortConfig((prev) => {
      if (prev.key === key) {
        const nextDirection = prev.direction === "asc" ? "desc" : "asc"
        return { key, direction: nextDirection }
      }
      return { key, direction: "asc" }
    })
    setCurrentPage(1)
  }

  React.useEffect(() => {
    setCurrentPage(1)
  }, [searchValue])

  return (
    <div
      className={cn(
        "w-full overflow-hidden rounded-md border border-[var(--atom-border-subtle,#e2e8f0)] bg-white",
        className,
      )}
    >
      <Toolbar
        search={search}
        download={download}
        viewColumns={viewColumns}
        filter={filter}
        filterType={filterType}
        searchValue={searchValue}
        onSearchChange={setSearchValue}
      />

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
              {columns.map((column) => {
                const isActive = sortConfig.key === column.key
                const direction = sortConfig.direction
                const isSortable = column.sortable !== false

                return (
                  <th
                    key={column.key}
                    scope="col"
                    onClick={() => handleSort(column.key)}
                    className={cn(
                      "px-4 py-2 font-medium text-[var(--atom-text-muted,#64748b)]",
                      isSortable
                        ? "cursor-pointer select-none group hover:bg-gray-50"
                        : "cursor-default",
                    )}
                  >
                    <div className="flex items-center gap-1">
                      <span>{column.name}</span>
                      {isSortable && (
                        <span
                          className={cn(
                            "ml-1 inline-flex h-4 w-4 items-center justify-center text-[10px] opacity-0 transition-opacity",
                            "group-hover:opacity-60",
                            isActive && "opacity-100 text-[var(--atom-text-primary,#0f172a)]",
                          )}
                        >
                          {!isActive && "↕"}
                          {isActive && direction === "asc" && "↑"}
                          {isActive && direction === "desc" && "↓"}
                        </span>
                      )}
                    </div>
                  </th>
                )
              })}
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--atom-border-subtle,#e2e8f0)] bg-white">
            {paginatedData.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {columns.map((column) => {
                  let cellValue: ReactNode = row[column.key]
                  
                  // Priority 1: Custom cell renderer
                  if (column.cell) {
                    cellValue = column.cell(row, rowIndex)
                  }
                  // Priority 2: Conditional cell renderer
                  else if (column.conditionalCell) {
                    const rawValue = column.selector ? column.selector(row) : row[column.key]
                    cellValue = column.conditionalCell(rawValue, row)
                  }
                  // Priority 3: Selector function
                  else if (column.selector) {
                    cellValue = column.selector(row)
                  }
                  // Priority 4: Raw data value
                  else {
                    cellValue = row[column.key]
                  }
                  
                  return (
                    <td key={column.key} className="px-4 py-2">
                      {cellValue}
                    </td>
                  )
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <PaginationControls
        pagination={pagination}
        dataLength={sortedData.length}
        rowsPerPage={rowsPerPage}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  )
}
