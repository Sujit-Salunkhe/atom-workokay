import {useState,useMemo,useCallback,useEffect,useRef}  from 'react'
import type { ReactNode } from 'react'
import { cn } from '../../lib/cn'

export interface Column {
  name: string
  key: string
  selector?: (row: DataRow) => any
  cell?: (row: DataRow, rowIndex: number) => ReactNode
  conditionalCell?: (value: any, row: DataRow) => ReactNode
  sortable?: boolean
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
  exportFormat?: 'csv' | 'excel'
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

/* ------------------ Sort Arrows ------------------ */
interface SortArrowsProps {
  columnKey: string
  sortConfig: { key: string | null; direction: 'asc' | 'desc' }
  onSortChange: (key: string, direction: 'asc' | 'desc') => void
}

function SortArrows({ columnKey, sortConfig, onSortChange }: SortArrowsProps) {
  const isCurrentSort = sortConfig.key === columnKey
  const currentDirection = isCurrentSort ? sortConfig.direction : 'asc'

  const handleSortAsc = () => onSortChange(columnKey, 'asc')
  const handleSortDesc = () => onSortChange(columnKey, 'desc')

  return (
    <div className="flex flex-col gap-0.5 -space-y-0.5 group-hover:opacity-100 opacity-50 transition-all duration-200">
      <button
        onClick={handleSortAsc}
        className={cn(
          'w-4 h-3 p-0 flex items-center justify-center rounded-sm transition-colors duration-200 hover:bg-blue-50 hover:opacity-100 opacity-60',
          isCurrentSort &&
            currentDirection === 'asc' &&
            'opacity-100 bg-blue-50 border border-blue-300 text-blue-600 scale-110',
        )}
        aria-label="Sort ascending"
      >
        <svg
          className="w-5 h-3 stroke-[2.5]"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M6 14l6-6 6 6" />
        </svg>
      </button>

      <button
        onClick={handleSortDesc}
        className={cn(
          'w-4 h-3 p-0 flex items-center justify-center rounded-sm transition-colors duration-200 hover:bg-blue-50 hover:opacity-100 opacity-60 -mt-0.5',
          isCurrentSort &&
            currentDirection === 'desc' &&
            'opacity-100 bg-blue-50 border border-blue-300 text-blue-600 scale-110',
        )}
        aria-label="Sort descending"
      >
        <svg
          className="w-5 h-3 stroke-[2.5]"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M6 10l6 6 6-6" />
        </svg>
      </button>
    </div>
  )
}

/* ------------------ View Columns Dropdown ------------------ */
interface ViewColumnsDropdownProps {
  columns: Column[]
  columnVisibility: Record<string, boolean>
  onColumnVisibilityChange: (columnKey: string, visible: boolean) => void
}

function ViewColumnsDropdown({
  columns,
  columnVisibility,
  onColumnVisibilityChange,
}: ViewColumnsDropdownProps) {
  const visibleCount = Object.values(columnVisibility).filter(Boolean).length

  const handleToggleAll = () => {
    const allVisible = visibleCount === columns.length
    columns.forEach((col) => {
      onColumnVisibilityChange(col.key, !allVisible)
    })
  }

  return (
    <div
      role="dialog"
      aria-label="Column visibility options"
      className="absolute right-0 top-full mt-2 w-64 max-h-96 overflow-y-auto bg-white rounded-md border border-[var(--atom-border-subtle,#e2e8f0)] shadow-lg z-50"
    >
      <div className="p-3 border-b border-[var(--atom-border-subtle,#e2e8f0)] flex items-center justify-between">
        <span className="text-sm font-semibold">Show Columns</span>
        <button
          onClick={handleToggleAll}
          className="text-xs text-blue-600 hover:text-blue-700 font-medium"
        >
          {visibleCount === columns.length ? 'Hide All' : 'Show All'}
        </button>
      </div>

      <div className="p-2">
        {columns.map((column) => {
          const isVisible = columnVisibility[column.key]
          const isDisabled = isVisible && visibleCount === 1

          return (
            <label
              key={column.key}
              className={cn(
                'flex items-center gap-3 px-3 py-2.5 text-sm hover:bg-gray-50 rounded cursor-pointer transition-colors',
                isDisabled && 'opacity-50 cursor-not-allowed',
              )}
              title={isDisabled ? 'At least one column must be visible' : ''}
            >
              <input
                type="checkbox"
                checked={isVisible}
                onChange={() =>
                  !isDisabled && onColumnVisibilityChange(column.key, !isVisible)
                }
                disabled={isDisabled}
                className="rounded border-gray-300 cursor-pointer disabled:cursor-not-allowed"
                aria-label={`Toggle ${column.name} column visibility`}
              />
              <span className="truncate">{column.name}</span>
            </label>
          )
        })}
      </div>
    </div>
  )
}

/* ------------------ Filter Dropdown ------------------ */
interface FilterDropdownProps {
  columns: Column[]
  data: DataRow[]
  filters: Record<string, string[]>
  onFilterChange: (columnKey: string, values: string[]) => void
}

function FilterDropdown({
  columns,
  data,
  filters,
  onFilterChange,
}: FilterDropdownProps) {
  const [expandedColumn, setExpandedColumn] = useState<string | null>(
    null,
  )

  const uniqueValuesByColumn = useMemo(() => {
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
          className="text-xs text-blue-600 hover:text-blue-700 font-medium"
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

/* ------------------ Active Filters Display ------------------ */
interface ActiveFiltersProps {
  filters: Record<string, string[]>
  columns: Column[]
  onFilterChange: (columnKey: string, values: string[]) => void
  activeFilterCount: number
}

function ActiveFilters({
  filters,
  columns,
  onFilterChange,
  activeFilterCount,
}: ActiveFiltersProps) {
  const handleRemoveFilter = (columnKey: string, valueToRemove: string) => {
    const currentFilters = filters[columnKey] || []
    const updatedValues = currentFilters.filter((v) => v !== valueToRemove)
    onFilterChange(columnKey, updatedValues)
  }

  if (activeFilterCount === 0) return null

  return (
    <div className="px-4 py-2 border-b border-[var(--atom-border-subtle,#e2e8f0)] bg-gray-50 h-12 flex items-center">
      <div className="flex gap-2 items-center overflow-x-auto overflow-y-hidden max-w-xl scrollbar-thin">
        {Object.entries(filters).map(([columnKey, values]) => {
          const column = columns.find((col) => col.key === columnKey)
          const columnName = column?.name || columnKey
          return values.map((value) => (
            <div
              key={`${columnKey}-${value}`}
              className="inline-flex items-center gap-2 bg-blue-600 text-white text-xs rounded-full px-3 py-1 whitespace-nowrap flex-shrink-0 hover:bg-blue-700"
            >
              <span>
                <strong className="font-semibold">{columnName}:</strong> {value}
              </span>
              <button
                onClick={() => handleRemoveFilter(columnKey, value)}
                className="hover:bg-blue-700 rounded-full w-4 h-4 flex items-center justify-center transition-colors cursor-pointer ml-1"
                aria-label={`Remove ${columnName} filter: ${value}`}
              >
                <svg viewBox="0 0 24 24" className="w-3 h-3" aria-hidden="true">
                  <path
                    d="M18 6L6 18M6 6l12 12"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </div>
          ))
        })}
      </div>
    </div>
  )
}

/* ------------------ Toolbar ------------------ */
interface ToolbarProps {
  search: boolean
  download: boolean
  viewColumns: boolean
  filter: boolean
  filterType: 'dropdown' | 'checkbox' | 'text'
  searchValue: string
  onSearchChange: (value: string) => void
  showFilterDropdown: boolean
  onToggleFilter: (value: boolean) => void
  showColumnsDropdown: boolean
  onToggleColumnsDropdown: (value: boolean) => void
  columns: Column[]
  data: DataRow[]
  filters: Record<string, string[]>
  onFilterChange: (columnKey: string, values: string[]) => void
  columnVisibility: Record<string, boolean>
  onColumnVisibilityChange: (columnKey: string, visible: boolean) => void
  handleDownload: () => void
}

function Toolbar(props: ToolbarProps) {
  const {
    search,
    download,
    viewColumns,
    filter,
    searchValue,
    onSearchChange,
    showFilterDropdown,
    onToggleFilter,
    showColumnsDropdown,
    onToggleColumnsDropdown,
    columns,
    data,
    filters,
    onFilterChange,
    columnVisibility,
    onColumnVisibilityChange,
    handleDownload,
  } = props

  const showToolbar = search || download || viewColumns || filter
  if (!showToolbar) return null

  const activeFilterCount = Object.values(filters).reduce(
    (acc, vals) => acc + vals.length,
    0,
  )

  const filterDropdownRef = useRef<HTMLDivElement>(null)
  const columnsDropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        showFilterDropdown &&
        filterDropdownRef.current &&
        !filterDropdownRef.current.contains(event.target as Node)
      ) {
        onToggleFilter(false)
      }
      if (
        showColumnsDropdown &&
        columnsDropdownRef.current &&
        !columnsDropdownRef.current.contains(event.target as Node)
      ) {
        onToggleColumnsDropdown(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [showFilterDropdown, showColumnsDropdown, onToggleFilter, onToggleColumnsDropdown])

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

      <div className="flex items-center gap-2">
        {filter &&(
        <>
        <ActiveFilters
          filters={filters}
          columns={columns}
          onFilterChange={onFilterChange}
          activeFilterCount={activeFilterCount}
        />
      
          <div className="relative" ref={filterDropdownRef}>
            <button
              type="button"
              onClick={() => onToggleFilter(!showFilterDropdown)}
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
              />
            )}
          </div>
          </>
        )}

        {viewColumns && (
          <div className="relative" ref={columnsDropdownRef}>
            <button
              type="button"
              onClick={() => onToggleColumnsDropdown(!showColumnsDropdown)}
              className={cn(
                'flex h-8 items-center gap-2 rounded-md border px-3 text-xs font-medium transition-colors',
                showColumnsDropdown
                  ? 'border-blue-500 bg-blue-50 text-blue-700'
                  : 'border-[var(--atom-border-subtle,#e2e8f0)] hover:bg-gray-50',
              )}
              aria-label="View columns"
              aria-expanded={showColumnsDropdown}
              aria-haspopup="true"
            >
              <ColumnsIcon />
            </button>

            {showColumnsDropdown && (
              <ViewColumnsDropdown
                columns={columns}
                columnVisibility={columnVisibility}
                onColumnVisibilityChange={onColumnVisibilityChange}
              />
            )}
          </div>
        )}

        {download && (
          <button
            type="button"
            className="flex h-8 items-center gap-2 rounded-md border border-[var(--atom-border-subtle,#e2e8f0)] px-3 text-xs font-medium hover:bg-gray-50 cursor-pointer"
            onClick={handleDownload}
            aria-label="Download table data"
          >
            <DownloadIcon />
            <span>Export</span>
          </button>
        )}
      </div>
    </div>
  )
}

/* -------------- PaginationControls -------------- */
interface PaginationControlsProps {
  pagination: boolean
  dataLength: number
  rowsPerPage: number
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

function PaginationControls(props: PaginationControlsProps) {
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
              aria-label={`Go to page ${page}`}
              aria-current={currentPage === page ? 'page' : undefined}
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
  const [currentPage, setCurrentPage] = useState(1)
  const [searchValue, setSearchValue] = useState('')
  const [showFilterDropdown, setShowFilterDropdown] = useState(false)
  const [showColumnsDropdown, setShowColumnsDropdown] = useState(false)
  const [filters, setFilters] = useState<Record<string, string[]>>({})
  const [sortConfig, setSortConfig] = useState<{
    key: string | null
    direction: 'asc' | 'desc'
  }>({ key: null, direction: 'asc' })
  const [columnVisibility, setColumnVisibility] = useState<
    Record<string, boolean>
  >(() => columns.reduce((acc, col) => ({ ...acc, [col.key]: true }), {}))

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

  const visibleColumns = useMemo(
    () => columns.filter((col) => columnVisibility[col.key]),
    [columns, columnVisibility],
  )

  const normalizeText = (value: unknown) => {
    if (value === null || value === undefined) return ''
    return String(value)
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, '')
  }

  const normalizedSearch = normalizeText(searchValue.trim())

  const searchFilteredData = useMemo(
    () =>
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
          ),
    [data, columns, search, normalizedSearch],
  )

  const sortData = useCallback(
    (items: DataRow[]): DataRow[] => {
      if (!sortConfig.key) return items

      return [...items].sort((a, b) => {
        const column = columns.find((col) => col.key === sortConfig.key)
        if (!column) return 0

        const aValue = column.selector ? column.selector(a) : a[column.key]
        const bValue = column.selector ? column.selector(b) : b[column.key]

        if (aValue == null && bValue == null) return 0
        if (aValue == null) return sortConfig.direction === 'asc' ? 1 : -1
        if (bValue == null) return sortConfig.direction === 'asc' ? -1 : 1

        const aNum = parseFloat(String(aValue))
        const bNum = parseFloat(String(bValue))
        if (!isNaN(aNum) && !isNaN(bNum)) {
          return sortConfig.direction === 'asc' ? aNum - bNum : bNum - aNum
        }

        const aStr = String(aValue).toLowerCase().trim()
        const bStr = String(bValue).toLowerCase().trim()

        if (aStr < bStr) return sortConfig.direction === 'asc' ? -1 : 1
        if (aStr > bStr) return sortConfig.direction === 'asc' ? 1 : -1
        return 0
      })
    },
    [sortConfig.key, sortConfig.direction, columns],
  )

  const sortedFilteredData = useMemo(() => {
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

    return sortData(result)
  }, [searchFilteredData, filters, columns, sortData])

  const convertToCSV = useCallback(
    (dataToExport: DataRow[]): string => {
      if (dataToExport.length === 0) return ''

      const headers = visibleColumns
        .map((col) => `"${col.name.replace(/"/g, '""')}"`)
        .join(',')
      const rows = dataToExport.map((row) =>
        visibleColumns
          .map((col) => {
            const value = col.selector ? col.selector(row) : row[col.key]
            return `"${String(value || '').replace(/"/g, '""')}"`
          })
          .join(','),
      )

      return [headers, ...rows].join('\n')
    },
    [visibleColumns],
  )

  const handleDownload = useCallback(() => {
    if (!download) return

    const csvContent = convertToCSV(sortedFilteredData)
    const blob = new Blob([`\uFEFF${csvContent}`], {
      type: 'text/csv;charset=utf-8',
    })
    const url = window.URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `table-export-${new Date().toISOString().slice(0, 10)}.csv`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    window.URL.revokeObjectURL(url)
  }, [download, sortedFilteredData, convertToCSV])

  const totalPages = Math.ceil(sortedFilteredData.length / rowsPerPage)
  const paginatedData = pagination
    ? sortedFilteredData.slice(
        (currentPage - 1) * rowsPerPage,
        currentPage * rowsPerPage,
      )
    : sortedFilteredData

  const handleSortChange = useCallback(
    (key: string, direction: 'asc' | 'desc') => {
      setSortConfig({ key, direction })
      setCurrentPage(1)
    },
    [],
  )

  const handleFilterChange = useCallback(
    (columnKey: string, values: string[]) => {
      setFilters((prev) => ({ ...prev, [columnKey]: values }))
      setCurrentPage(1)
    },
    [],
  )

  const handleColumnVisibilityChange = useCallback(
    (columnKey: string, visible: boolean) => {
      setColumnVisibility((prev) => ({ ...prev, [columnKey]: visible }))
    },
    [],
  )

  const handlePageChange = useCallback(
    (page: number) => {
      if (page < 1 || page > totalPages) return
      setCurrentPage(page)
    },
    [totalPages],
  )

  useEffect(() => {
    setCurrentPage(1)
  }, [searchValue, filters, sortConfig])

  useEffect(() => {
    setColumnVisibility(
      columns.reduce((acc, col) => ({ ...acc, [col.key]: true }), {}),
    )
  }, [columns])

  

  return (
    <div
      className={cn(
        'w-full overflow-hidden rounded-md border border-[var(--atom-border-subtle,#e2e8f0)] bg-white min-h-[80vh]',
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
        onToggleFilter={setShowFilterDropdown}
        showColumnsDropdown={showColumnsDropdown}
        onToggleColumnsDropdown={setShowColumnsDropdown}
        columns={columns}
        data={data}
        filters={filters}
        onFilterChange={handleFilterChange}
        columnVisibility={columnVisibility}
        onColumnVisibilityChange={handleColumnVisibilityChange}
        handleDownload={handleDownload}
      />

    

      <div
        className="overflow-x-auto"
        style={{ height: tableBodyHeight, maxHeight: tableBodyMaxHeight }}
      >
       
<table
  className="w-full border-collapse text-left text-sm"
  role="table"
  aria-label="Data table"
  aria-rowcount={sortedFilteredData.length}
  aria-colcount={visibleColumns.length}
>
  <thead className="bg-[var(--atom-table-header-bg,#f8fafc)] text-xs uppercase tracking-wide text-[var(--atom-text-muted,#64748b)] sticky top-0 z-10">
    <tr role="row">
      {visibleColumns.map((column, colIndex) => {
        const isSortable = column.sortable !== false
        const isCurrentSort = sortConfig.key === column.key
        const sortDirection = isCurrentSort ? sortConfig.direction : undefined

        return (
          <th
            key={column.key}
            scope="col"
            role="columnheader"
            aria-colindex={colIndex + 1}
            aria-sort={
              isCurrentSort
                ? sortDirection === 'asc'
                  ? 'ascending'
                  : 'descending'
                : isSortable
                ? 'none'
                : undefined
            }
            className="px-4 py-3 font-medium text-[var(--atom-text-muted,#64748b)] group relative"
          >
            <div className="flex items-center justify-between">
              <span className="truncate">{column.name}</span>
              {isSortable && (
                <SortArrows
                  columnKey={column.key}
                  sortConfig={sortConfig}
                  onSortChange={handleSortChange}
                />
              )}
            </div>
          </th>
        )
      })}
    </tr>
  </thead>

  <tbody 
    className="divide-y divide-[var(--atom-border-subtle,#e2e8f0)] bg-white"
    role="rowgroup"
  >
    {paginatedData.length === 0 ? (
      <tr role="row">
        <td
          colSpan={visibleColumns.length}
          role="cell"
          aria-colspan={visibleColumns.length}
          className="h-24 text-center text-sm text-gray-500 py-8"
        >
          No results found
        </td>
      </tr>
    ) : (
      paginatedData.map((row, rowIndex) => {
        const actualRowIndex = (currentPage - 1) * rowsPerPage + rowIndex + 1
        
        return (
          <tr
            key={row?.id || `row-${rowIndex}`}
            role="row"
            aria-rowindex={actualRowIndex}
            className="hover:bg-gray-50/50 transition-colors"
          >
            {visibleColumns.map((column, colIndex) => {
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
              }

              return (
                <td 
                  key={column.key} 
                  role="cell"
                  aria-colindex={colIndex + 1}
                  className="px-4 py-3 align-top"
                >
                  {cellValue}
                </td>
              )
            })}
          </tr>
        )
      })
    )}
  </tbody>
</table>

      </div>

      <PaginationControls
        pagination={pagination}
        dataLength={sortedFilteredData.length}
        rowsPerPage={rowsPerPage}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  )
}