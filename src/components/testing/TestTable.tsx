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

export interface ActionProps {
  label?: string
  onClick: (row: DataRow, rowIndex: number) => void
  icon?: ReactNode
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost'
  disabled?: boolean | ((row: DataRow) => boolean)
  show?: (row: DataRow) => boolean
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

export interface DataTableProps {
  columns: Column[]
  data: DataRow[]
  pagination?: boolean
  className?: string
  options?: DataTableOptions
  actions?: ActionProps[]
}

/* ------------------ Icons ------------------ */
// ... (keep all your existing icons - LeftArrowIcon, RightArrowIcon, SearchIcon, etc.)

// Add these action icons
const EditIcon = () => (
  <svg
    viewBox="0 0 24 24"
    className="h-4 w-4"
    fill="none"
    stroke="currentColor"
  >
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
  </svg>
)

const DeleteIcon = () => (
  <svg
    viewBox="0 0 24 24"
    className="h-4 w-4"
    fill="none"
    stroke="currentColor"
  >
    <path d="M21 4H8l-1-1H5a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h3l1 1h11a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2z" />
    <path d="M22 11v6a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-6" />
  </svg>
)

const ViewIcon = () => (
  <svg
    viewBox="0 0 24 24"
    className="h-4 w-4"
    fill="none"
    stroke="currentColor"
  >
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
)

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
              className="inline-flex items-center gap-2 bg-blue-600 text-white text-xs rounded-full px-3 py-1 whitespace-nowrap flex-shrink-0 hover:scrollbar-thumb-gray-600 "
            >
              <span>
                <strong className="font-semibold">{columnName}:</strong> {value}
              </span>
              <button
                onClick={() => handleRemoveFilter(columnKey, value)}
                className="hover:bg-blue-700 rounded-full w-4 h-4 flex items-center justify-center transition-colors cursor-pointer"
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
          <>
            <ActiveFilters
              filters={filters}
              columns={columns}
              onFilterChange={onFilterChange}
              activeFilterCount={activeFilterCount}
            />
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
          </>
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

export function DataTable({
  columns,
  data,
  pagination = false,
  className,
  options,
  actions,
}: DataTableProps) {
  const [currentPage, setCurrentPage] = React.useState(1)
  const [searchValue, setSearchValue] = React.useState('')
  const [showFilterDropdown, setShowFilterDropdown] = React.useState(false)
  const [filters, setFilters] = React.useState<Record<string, string[]>>({})
  const hasActions = actions && actions.length > 0
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

  // ... (keep all your existing filter/search/pagination logic exactly the same)
  const normalizeText = (value: unknown) => {
    if (value === null || value === undefined) return ''
    return String(value)
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, '')
  }

  const normalizedSearch = normalizeText(searchValue.trim())

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

  // Action rendering function
  const renderActionsCell = (row: DataRow, rowIndex: number) => {
    if (!hasActions) return null

    return (
      <div className="flex gap-1 justify-end">
        {actions!.map((action, actionIndex) => {
          // Conditional show
          if (action.show && !action.show(row)) return null

          // Dynamic disabled
          const isDisabled =
            typeof action.disabled === 'function'
              ? action.disabled(row)
              : action.disabled || false

          return (
            <button
              key={actionIndex}
              onClick={() => action.onClick(row, rowIndex)}
              disabled={isDisabled}
              className={cn(
                'h-8 px-2 text-xs rounded flex items-center gap-1 transition-all duration-200 font-medium flex-shrink-0',
                'hover:shadow-sm active:scale-95 focus:outline-none focus:ring-2 focus:ring-offset-1',
                isDisabled && 'opacity-50 cursor-not-allowed',
                action.variant === 'danger' &&
                  'text-red-600 hover:bg-red-50 hover:text-red-700 focus:ring-red-500',
                action.variant === 'primary' &&
                  'text-blue-600 hover:bg-blue-50 hover:text-blue-700 focus:ring-blue-500',
                action.variant === 'secondary' &&
                  'text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:ring-gray-500',
                action.variant === 'ghost' &&
                  'text-gray-500 hover:bg-gray-100 hover:text-gray-900 focus:ring-gray-500',
              )}
              title={`${action.label}${isDisabled ? ' (Disabled)' : ''}`}
              aria-label={action.label}
            >
              {action.icon && (
                <span className="h-3 w-3 flex-shrink-0">{action?.icon}</span>
              )}
              {action.label && (
                <span className="whitespace-nowrap">{action?.label}</span>
              )}
            </button>
          )
        })}
      </div>
    )
  }

  return (
    <div
      className={cn(
        'w-full overflow-hidden rounded-md border border-[var(--atom-border-subtle,#e2e8f0)] bg-white min-h-[80vh]',
        className,
      )}
    >
      {/* Toolbar - unchanged */}
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
              {columns.map((column) => {
                const isActionsColumn = column.key === '__actions'
                if (isActionsColumn && !hasActions) return null

                return (
                  <th
                    key={column.key}
                    scope="col"
                    className={cn(
                      'px-4 py-2 font-medium text-[var(--atom-text-muted,#64748b)]',
                      isActionsColumn && 'w-40 text-right',
                    )}
                  >
                    {column.name}
                  </th>
                )
              })}
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--atom-border-subtle,#e2e8f0)] bg-white">
            {paginatedData.map((row, rowIndex) => (
              <tr
                key={row?.id ? row?.id : rowIndex}
                className="hover:bg-gray-50"
              >
                {columns.map((column) => {
                  const isActionsColumn = column.key === '__actions'

                  if (isActionsColumn) {
                    return (
                      <td key={column.key} className="px-4 py-3 text-right">
                        {renderActionsCell(row, rowIndex)}
                      </td>
                    )
                  }

                  let cellValue: ReactNode

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
                    <td key={column.key} className="px-4 py-3">
                      {cellValue}
                    </td>
                  )
                })}
              </tr>
            ))}
            {paginatedData.length === 0 && (
              <tr>
                <td
                  colSpan={columns.length}
                  className="px-4 py-8 text-center text-gray-500"
                >
                  No data available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination - unchanged */}
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
