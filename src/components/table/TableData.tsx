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
  sortable?: boolean // NEW: Controls if column is sortable (default: true)
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

/* ------------------ Sort Dropdown (NEW) ------------------ */
interface SortDropdownProps {
  columnKey: string
  sortConfig: { key: string | null; direction: 'asc' | 'desc' }
  onSortChange: (key: string, direction: 'asc' | 'desc') => void
}

function SortDropdown({
  columnKey,
  sortConfig,
  onSortChange,
}: SortDropdownProps) {
  const [isOpen, setIsOpen] = React.useState(false)
  const dropdownRef = React.useRef<HTMLDivElement>(null)

  const isCurrentSort = sortConfig.key === columnKey
  const currentDirection = isCurrentSort ? sortConfig.direction : 'asc'

  // Close dropdown on outside click
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSort = (direction: 'asc' | 'desc') => {
    onSortChange(columnKey, direction)
    setIsOpen(false)
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          'flex items-center gap-1 p-1 -m-1 rounded hover:bg-gray-100 transition-all duration-200 group cursor-pointer',
          isCurrentSort && 'text-blue-600 bg-blue-50 ',
        )}
        aria-label={`Sort column ${columnKey}`}
        aria-expanded={isOpen}
      >
        <svg
          className={cn(
            'h-3.5 w-3.5 transition-transform duration-200 flex-shrink-0',
            {
              'rotate-180': isCurrentSort && currentDirection === 'desc',
              'text-blue-600': isCurrentSort,
            },
          )}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full  bg-white rounded-lg border border-gray-200 shadow-xl overflow-auto z-50 ">
          <button
            onClick={() => handleSort('asc')}
            className={cn(
              'w-full text-left px-3 py-2 text-sm hover:bg-blue-50 flex items-center gap-2 transition-colors',
              currentDirection === 'asc' &&
                'bg-blue-50 border-r-2 border-blue-500 text-blue-700  font-medium',
            )}
          >
            <svg
              className="h-4 w-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M6 9l6 6 6-6" />
            </svg>
            Asc
          </button>
          <button
            onClick={() => handleSort('desc')}
            className={cn(
              'w-full text-left px-3 py-2 text-sm hover:bg-blue-50 flex items-center gap-2 rounded-b-lg transition-colors',
              currentDirection === 'desc' &&
                'bg-blue-50 border-r-2 border-blue-500 text-blue-700 font-medium',
            )}
          >
            <svg
              className="h-4 w-4 rotate-180"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M6 9l6 6 6-6" />
            </svg>
            Desc
          </button>
        </div>
      )}
    </div>
  )
}

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
  columns: Column[]
  data: DataRow[]
  filters: Record<string, string[]>
  onFilterChange: (columnKey: string, values: string[]) => void
  handleDownload: () => void
}

function Toolbar(props: ToolbarProps) {
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
    handleDownload,
  } = props

  const showToolbar = search || download || viewColumns || filter
  if (!showToolbar) return null

  const activeFilterCount = Object.values(filters).reduce(
    (acc, vals) => acc + vals.length,
    0,
  )

  const dropdownRef = React.useRef<HTMLDivElement>(null)
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!showFilterDropdown) return
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        onToggleFilter(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [showFilterDropdown, onToggleFilter])

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
            className="flex h-8 items-center gap-2 rounded-md border border-[var(--atom-border-subtle,#e2e8f0)] px-3 text-xs font-medium hover:bg-gray-50"
            aria-label="View columns"
          >
            <ColumnsIcon />
          </button>
        )}
        {download && (
          <button
            type="button"
            className="flex h-8 items-center gap-2 rounded-md border border-[var(--atom-border-subtle,#e2e8f0)] px-3 text-xs font-medium hover:bg-gray-50 cursor-pointer"
            onClick={handleDownload}
            aria-label="Download"
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
  // Core state
  const [currentPage, setCurrentPage] = React.useState(1)
  const [searchValue, setSearchValue] = React.useState('')
  const [showFilterDropdown, setShowFilterDropdown] = React.useState(false)
  const [filters, setFilters] = React.useState<Record<string, string[]>>({})
  const [sortConfig, setSortConfig] = React.useState<{
    key: string | null
    direction: 'asc' | 'desc'
  }>({ key: null, direction: 'asc' })

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

  // 1. SEARCH FILTER (FIRST)
  const searchFilteredData = React.useMemo(() => 
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
    [data, columns, search, normalizedSearch]
  )

  // 2. SORTING FUNCTION
  const sortData = React.useCallback((items: DataRow[]): DataRow[] => {
    if (!sortConfig.key) return items
    
    return [...items].sort((a, b) => {
      const column = columns.find(col => col.key === sortConfig.key)
      if (!column) return 0
      
      const aValue = column.selector ? column.selector(a) : a[column.key]
      const bValue = column.selector ? column.selector(b) : b[column.key]
      
      // Handle null/undefined
      if (aValue == null && bValue == null) return 0
      if (aValue == null) return sortConfig.direction === 'asc' ? 1 : -1
      if (bValue == null) return sortConfig.direction === 'asc' ? -1 : 1
      
      // Numeric first
      const aNum = parseFloat(String(aValue))
      const bNum = parseFloat(String(bValue))
      if (!isNaN(aNum) && !isNaN(bNum)) {
        return sortConfig.direction === 'asc' 
          ? aNum - bNum 
          : bNum - aNum
      }
      
      // String fallback
      const aStr = String(aValue).toLowerCase().trim()
      const bStr = String(bValue).toLowerCase().trim()
      
      if (aStr < bStr) return sortConfig.direction === 'asc' ? -1 : 1
      if (aStr > bStr) return sortConfig.direction === 'asc' ? 1 : -1
      return 0
    })
  }, [sortConfig.key, sortConfig.direction, columns])

  // 3. FILTER + SORT PIPELINE
  const sortedFilteredData = React.useMemo(() => {
    let result = searchFilteredData

    // Apply filters
    Object.entries(filters).forEach(([columnKey, selectedValues]) => {
      if (selectedValues.length > 0) {
        result = result.filter((row) => {
          const column = columns.find((col) => col.key === columnKey)
          if (!column) return true
          const cellValue = column.selector ? column.selector(row) : row[columnKey]
          return selectedValues.includes(String(cellValue))
        })
      }
    })

    // Apply sorting
    return sortData(result)
  }, [searchFilteredData, filters, columns, sortData])

  //  FIXED: Download functions NOW AFTER sortedFilteredData
  const convertToCSV = React.useCallback((dataToExport: DataRow[]): string => {
    if (dataToExport.length === 0) return ''
    
    const headers = columns.map(col => `"${col.name.replace(/"/g, '""')}"`).join(',')
    const rows = dataToExport.map(row => 
      columns.map(col => {
        const value = col.selector ? col.selector(row) : row[col.key]
        return `"${String(value || '').replace(/"/g, '""')}"`
      }).join(',')
    )
    
    return [headers, ...rows].join('\n')
  }, [columns])

  const handleDownload = React.useCallback(() => {
    if (!download) return
    
    const csvContent = convertToCSV(sortedFilteredData)
    const blob = new Blob([`\uFEFF${csvContent}`], { type: 'text/csv;charset=utf-8' }) // BOM for Excel
    const url = window.URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `table-export-${new Date().toISOString().slice(0, 10)}.csv`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    window.URL.revokeObjectURL(url)
  }, [download, sortedFilteredData, convertToCSV])

  // Derived state
  const totalPages = Math.ceil(sortedFilteredData.length / rowsPerPage)
  const paginatedData = pagination
    ? sortedFilteredData.slice(
        (currentPage - 1) * rowsPerPage,
        currentPage * rowsPerPage,
      )
    : sortedFilteredData

  // Event handlers
  const handleSortChange = React.useCallback((key: string, direction: 'asc' | 'desc') => {
    setSortConfig({ key, direction })
    setCurrentPage(1)
  }, [])

  const handleFilterChange = React.useCallback((columnKey: string, values: string[]) => {
    setFilters((prev) => ({ ...prev, [columnKey]: values }))
    setCurrentPage(1)
  }, [])

  const handlePageChange = React.useCallback((page: number) => {
    if (page < 1 || page > totalPages) return
    setCurrentPage(page)
  }, [totalPages])

  // Reset pagination on search/filter/sort
  React.useEffect(() => {
    setCurrentPage(1)
  }, [searchValue, filters, sortConfig])

  // ✅ ALL COMPONENTS BELOW (unchanged from previous)
  return (
    <div className={cn(
      'w-full overflow-hidden rounded-md border border-[var(--atom-border-subtle,#e2e8f0)] bg-white min-h-[80vh]',
      className,
    )}>
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
        handleDownload={handleDownload}
      />

      <div
        className="overflow-x-auto"
        style={{ height: tableBodyHeight, maxHeight: tableBodyMaxHeight }}
      >
        <table className="w-full border-collapse text-left text-sm" role="table" aria-label="Data table">
          <thead className="bg-[var(--atom-table-header-bg,#f8fafc)] text-xs uppercase tracking-wide text-[var(--atom-text-muted,#64748b)] sticky top-0 z-10">
            <tr>
              {columns.map((column) => {
                const isSortable = column.sortable !== false
                // const isSorted = sortConfig.key === column.key
                return (
                  <th
                    key={column.key}
                    scope="col"
                    className="px-4 py-3 font-medium text-[var(--atom-text-muted,#64748b)] group relative"
                  >
                    <div className="flex items-center justify-between">
                      <span className="truncate">{column.name}</span>
                      {isSortable && (
                        <SortDropdown
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
          
          <tbody className="divide-y divide-[var(--atom-border-subtle,#e2e8f0)] bg-white">
            {paginatedData.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="h-24 text-center text-sm text-gray-500 py-8">
                  No results found
                </td>
              </tr>
            ) : (
              paginatedData.map((row, rowIndex) => (
                <tr key={row?.id || `row-${rowIndex}`} className="hover:bg-gray-50/50 transition-colors">
                  {columns.map((column) => {
                    let cellValue: ReactNode = row[column.key]

                    if (column.cell) {
                      cellValue = column.cell(row, rowIndex)
                    } else if (column.conditionalCell) {
                      const rawValue = column.selector ? column.selector(row) : row[column.key]
                      cellValue = column.conditionalCell(rawValue, row)
                    } else if (column.selector) {
                      cellValue = column.selector(row)
                    }

                    return (
                      <td key={column.key} className="px-4 py-3 align-top">
                        {cellValue}
                      </td>
                    )
                  })}
                </tr>
              ))
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

