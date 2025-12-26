// src/components/ui/data-table.tsx
import * as React from 'react'
import type { ReactNode } from 'react'
import { cn } from '../../lib/cn'

export interface Column {
  name: string
  key: string
  selector?: (row: DataRow) => any
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
  filterType?: 'dropdown' | 'checkbox' | 'text'
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

const ChevronDownIcon = () => (
  <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
    <path
      d="M6 9l6 6 6-6"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

/* ------------------ Filter Dropdown ------------------ */
interface FilterDropdownProps {
  columns: Column[]
  data: DataRow[]
  filters: Record<string, string[]>
  onFilterChange: (columnKey: string, values: string[]) => void
  onToggleFilter: (value: boolean) => void
  showFilterDropdown: boolean
}

function FilterDropdown({
  columns,
  data,
  filters,
  onFilterChange,
}: FilterDropdownProps) {
  const [expandedColumn, setExpandedColumn] = React.useState<string | null>(
    null,
  )
 
  const uniqueValuesByColumn = React.useMemo(() => {
    const result: Record<string, Set<string>> = {}

    data.forEach((row) => {
      columns.forEach((column) => {
        if (!result[column.key]) {
          result[column.key] = new Set()
        }
        const value = column.selector ? column.selector(row) : row[column.key]
        if (value !== null && value !== undefined && value !== '') {
          result[column.key].add(String(value))
        }
      })
    })

    const finalResult: Record<string, string[]> = {}
    Object.keys(result).forEach((key) => {
      finalResult[key] = Array.from(result[key]).sort()
    })

    return finalResult
  }, [data, columns])

  const handleCheckboxChange = (columnKey: string, value: string) => {
    const currentFilters = filters[columnKey] || []
    const newFilters = currentFilters.includes(value)
      ? currentFilters.filter((v) => v !== value)
      : [...currentFilters, value]

    onFilterChange(columnKey, newFilters)
  }

  const handleSelectAll = (columnKey: string, values: string[]) => {
    const currentFilters = filters[columnKey] || []
    if (currentFilters.length === values.length) {
      onFilterChange(columnKey, [])
    } else {
      onFilterChange(columnKey, values)
    }
  }

  const handleClearAll = () => {
    columns.forEach((column) => {
      onFilterChange(column.key, [])
    })
  }

  return (
    <div
      role="dialog"
      aria-label="Filter options"
      className="absolute right-0 top-full mt-2 w-72 max-h-96 overflow-y-auto bg-white rounded-md border border-[var(--atom-border-subtle,#e2e8f0)] shadow-lg z-50"
    >
      <div className="p-3 border-b border-[var(--atom-border-subtle,#e2e8f0)] flex items-center justify-between">
        <span className="text-sm font-semibold">Filter Columns</span>
        <button
          onClick={handleClearAll}
          className="text-xs text-blue-600 hover:text-blue-700"
        >
          Clear All
        </button>
      </div>

      <div className="p-2">
        {columns.map((column) => {
          const uniqueValues = uniqueValuesByColumn[column.key] || []
          const isExpanded = expandedColumn === column.key
          const columnFilters = filters[column.key] || []
          const allSelected = columnFilters.length === uniqueValues.length

          return (
            <div key={column.key} className="mb-2">
              <button
                onClick={() =>
                  setExpandedColumn(isExpanded ? null : column.key)
                }
                className="w-full flex items-center justify-between px-3 py-2 text-sm font-medium hover:bg-gray-50 rounded-md transition-colors"
              >
                <span>{column.name}</span>
                <div className="flex items-center gap-2">
                  {columnFilters.length > 0 && (
                    <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">
                      {columnFilters.length}
                    </span>
                  )}
                  <ChevronDownIcon />
                </div>
              </button>

              {isExpanded && (
                <div className="ml-2 mt-1 border-l-2 border-gray-200 pl-2">
                  <label className="flex items-center gap-2 px-3 py-1.5 text-sm hover:bg-gray-50 rounded cursor-pointer">
                    <input
                      type="checkbox"
                      checked={allSelected}
                      onChange={() => handleSelectAll(column.key, uniqueValues)}
                      className="rounded border-gray-300"
                      aria-label={`Select all ${column.name}`}
                    />
                    <span className="font-medium text-blue-600">
                      Select All
                    </span>
                  </label>

                  <div className="max-h-48 overflow-y-auto">
                    {uniqueValues.map((value) => (
                      <label
                        key={value}
                        className="flex items-center gap-2 px-3 py-1.5 text-sm hover:bg-gray-50 rounded cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          checked={columnFilters.includes(value)}
                          onChange={() =>
                            handleCheckboxChange(column.key, value)
                          }
                          className="rounded border-gray-300"
                          aria-label={`Filter by ${value}`}
                        />
                        <span className="truncate">{value}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

/* ------------------ Toolbar ------------------ */
function Toolbar(props: {
  search: boolean
  download: boolean
  viewColumns: boolean
  filter: boolean
  filterType: 'dropdown' | 'checkbox' | 'text'
  searchValue: string
  onSearchChange: (value: string) => void
  showFilterDropdown: boolean
  onToggleFilter: (value: boolean) => void
  columns: Column[]
  data: DataRow[]
  filters: Record<string, string[]>
  onFilterChange: (columnKey: string, values: string[]) => void
}) {
  const {
    search,
    download,
    viewColumns,
    filter,
    filterType,
    searchValue,
    onSearchChange,
    showFilterDropdown,
    onToggleFilter,
    columns,
    data,
    filters,
    onFilterChange,
  } = props

  const showToolbar = search || download || viewColumns || filter
  if (!showToolbar) return null

  const activeFilterCount = Object.values(filters).reduce(
    (acc, vals) => acc + vals.length,
    0,
  )
  //handle outside click
  const dropdownRef = React.useRef<HTMLDivElement>(null)
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!showFilterDropdown) return null
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        onToggleFilter(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [onToggleFilter])
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
              aria-label="Search table"
            />
          </div>
        )}
      </div>

      {/* filter drop down Button */}

      <div className="flex items-center gap-2 relative">
        {filter && (
          <div className="relative" ref={dropdownRef}>
            <button
              type="button"
              onClick={() => onToggleFilter(true)}
              className={cn(
                'flex h-8 items-center gap-2 rounded-md border px-3 text-xs font-medium transition-colors',
                showFilterDropdown
                  ? 'border-blue-500 bg-blue-50 text-blue-700'
                  : 'border-[var(--atom-border-subtle,#e2e8f0)] hover:bg-gray-50',
              )}
              aria-label="Filter table data"
              aria-expanded={showFilterDropdown}
              aria-haspopup="true"
            >
              <FilterIcon />
              {activeFilterCount > 0 && (
                <span className="bg-blue-600 text-white text-xs px-1.5 py-0.5 rounded-full min-w-[18px] text-center">
                  {activeFilterCount}
                </span>
              )}
            </button>

            {showFilterDropdown && (
              <FilterDropdown
                columns={columns}
                data={data}
                filters={filters}
                onFilterChange={onFilterChange}
                onToggleFilter={onToggleFilter}
                showFilterDropdown={showFilterDropdown}
              />
            )}
          </div>
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
      <div
        className="text-sm text-[var(--atom-text-muted,#64748b)]"
        role="status"
        aria-live="polite"
      >
        Showing {(currentPage - 1) * rowsPerPage + 1} to{' '}
        {Math.min(currentPage * rowsPerPage, dataLength)} of {dataLength}{' '}
        entries
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={cn(
            'flex h-9 w-9 items-center justify-center rounded-full border transition-colors',
            currentPage === 1
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed border-gray-200'
              : 'bg-white hover:bg-gray-50 text-[var(--atom-text-primary,#0f172a)] border-[var(--atom-border-subtle,#e2e8f0)] hover:border-gray-300 cursor-pointer',
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
                'min-w-[2.25rem] h-9 rounded-md text-sm font-medium flex items-center justify-center border transition-colors px-2 cursor-pointer',
                currentPage === page
                  ? 'bg-[var(--atom-primary,#3b82f6)] text-white border-[var(--atom-primary,#3b82f6)]'
                  : 'bg-white hover:bg-gray-50 text-[var(--atom-text-primary,#0f172a)] border-[var(--atom-border-subtle,#e2e8f0)] hover:border-gray-300',
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
            'flex h-9 w-9 items-center justify-center rounded-full border transition-colors',
            currentPage === totalPages
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed border-gray-200'
              : 'bg-white hover:bg-gray-50 text-[var(--atom-text-primary,#0f172a)] border-[var(--atom-border-subtle,#e2e8f0)] hover:border-gray-300 cursor-pointer',
          )}
          aria-label="Next page"
        >
          <RightArrowIcon />
        </button>
      </div>
    </div>
  )
}

/* ------------------ Main DataTable Component ------------------ */
export function DataTable({
  columns,
  data,
  pagination = false,
  className,
  options,
}: DataTableProps) {
  const [currentPage, setCurrentPage] = React.useState(1)
  const [searchValue, setSearchValue] = React.useState('')
  const [showFilterDropdown, setShowFilterDropdown] = React.useState(false)
  const [filters, setFilters] = React.useState<Record<string, string[]>>({})

  const rowsPerPage = 10

  const {
    search = false,
    download = false,
    viewColumns = false,
    filter = false,
    filterType = 'dropdown',
    tableBodyHeight,
    tableBodyMaxHeight,
  } = options || {}

  const normalizeText = (value: unknown) => {
    if (value === null || value === undefined) return ''
    return String(value)
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, '')
  }

  const normalizedSearch = normalizeText(searchValue.trim())

  // Apply search filter
  const searchFilteredData =
    !search || !normalizedSearch
      ? data
      : data.filter((row) =>
          columns.some((column) => {
            const value = column.selector
              ? column.selector(row)
              : row[column.key]
            const normalizedValue = normalizeText(value)
            return normalizedValue.includes(normalizedSearch)
          }),
        )

  // Apply column filters
  const filteredData = React.useMemo(() => {
    let result = searchFilteredData

    Object.entries(filters).forEach(([columnKey, selectedValues]) => {
      if (selectedValues.length > 0) {
        result = result.filter((row) => {
          const column = columns.find((col) => col.key === columnKey)
          if (!column) return true

          const cellValue = column.selector
            ? column.selector(row)
            : row[columnKey]
          return selectedValues.includes(String(cellValue))
        })
      }
    })

    return result
  }, [searchFilteredData, filters, columns])

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

  const handleFilterChange = (columnKey: string, values: string[]) => {
    setFilters((prev) => ({
      ...prev,
      [columnKey]: values,
    }))
  }

  React.useEffect(() => {
    setCurrentPage(1)
  }, [searchValue, filters])

  return (
    <div
      className={cn(
        'w-full overflow-hidden rounded-md border border-[var(--atom-border-subtle,#e2e8f0)] bg-white',
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
        showFilterDropdown={showFilterDropdown}
        onToggleFilter={() => setShowFilterDropdown(!showFilterDropdown)}
        columns={columns}
        data={data}
        filters={filters}
        onFilterChange={handleFilterChange}
      />

      <div
        className="overflow-x-auto"
        style={{
          height: tableBodyHeight,
          maxHeight: tableBodyMaxHeight,
        }}
      >
        <table
          className="w-full border-collapse text-left text-sm"
          role="table"
          aria-label="Data table"
        >
          <thead className="bg-[var(--atom-table-header-bg,#f8fafc)] text-xs uppercase tracking-wide text-[var(--atom-text-muted,#64748b)] sticky top-0 z-10">
            <tr>
              {columns.map((column) => (
                <th
                  key={column.key}
                  scope="col"
                  className="px-4 py-2 font-medium text-[var(--atom-text-muted,#64748b)]"
                >
                  {column.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--atom-border-subtle,#e2e8f0)] bg-white">
            {paginatedData.map((row, rowIndex) => (
              <tr key={row?.id ? row?.id : rowIndex}>
                {columns.map((column) => {
                  let cellValue: ReactNode = row[column.key]

                  if (column.cell) {
                    cellValue = column.cell(row, rowIndex)
                  } else if (column.conditionalCell) {
                    const rawValue = column.selector
                      ? column.selector(row)
                      : row[column.key]
                    cellValue = column.conditionalCell(rawValue, row)
                  } else if (column.selector) {
                    cellValue = column.selector(row)
                  } else {
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
        dataLength={filteredData.length}
        rowsPerPage={rowsPerPage}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  )
}
