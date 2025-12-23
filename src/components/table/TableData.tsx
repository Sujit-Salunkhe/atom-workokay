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

interface DataTableProps {
  columns: Column[]
  data: DataRow[]
  pagination?: boolean
  className?: string
}

export function DataTable({ 
  columns, 
  data, 
  pagination = false,
  className 
}: DataTableProps) {
  const [currentPage, setCurrentPage] = React.useState(1)
  const rowsPerPage = 10
  const totalPages = Math.ceil(data.length / rowsPerPage)
  
  const paginatedData = pagination 
    ? data.slice(
        (currentPage - 1) * rowsPerPage,
        currentPage * rowsPerPage
      )
    : data

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  const LeftArrowIcon = () => (
  <span className="inline-flex h-5 w-5 items-center justify-center">
    <svg
      viewBox="0 0 24 24"
      className="h-4 w-4 text-(--atom-text-primary,#4b5563)"
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
      className="h-4 w-4 text-(--atom-text-primary,#4b5563)"
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

  
  const PaginationControls = () => (
    <div className="flex items-center justify-between px-4 py-3 bg-white border-t border-(--atom-border-subtle,#e2e8f0) sm:px-6">
      <div className="text-sm text-(--atom-text-muted,#64748b)">
        Showing {(currentPage - 1) * rowsPerPage + 1} to {Math.min(currentPage * rowsPerPage, data.length)} of {data.length} entries
      </div>
      <div className="flex items-center gap-1">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={cn(
            "px-3 py-1 text-sm font-medium rounded-md border transition-colors",
            currentPage === 1
              ? "bg-gray-100 text-gray-400 cursor-not-allowed border-gray-200"
              : "bg-white hover:bg-gray-50 text-(--atom-text-primary,#0f172a) border-(--atom-border-subtle,#e2e8f0) hover:border-gray-300"
          )}
        >
          <LeftArrowIcon/>
        </button>
        
        <div className="flex items-center gap-1">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={cn(
                "w-10 h-10 rounded-md text-sm font-medium flex items-center justify-center border transition-colors",
                currentPage === page
                  ? "bg-(--atom-primary,#3b82f6) text-white border-(--atom-primary,#3b82f6)"
                  : "bg-white hover:bg-gray-50 text-(--atom-text-primary,#0f172a) border-(--atom-border-subtle,#e2e8f0) hover:border-gray-300"
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
            "px-3 py-1 text-sm font-medium rounded border transition-colors",
            currentPage === totalPages
              ? "bg-gray-100 text-gray-400 cursor-not-allowed border-gray-200"
              : "bg-white hover:bg-gray-50 text-(--atom-text-primary,#0f172a) border-(--atom-border-subtle,#e2e8f0) hover:border-gray-300"
          )}
        >
          <RightArrowIcon/>
        </button>
      </div>
    </div>
  )

  return (
    <div className={cn("w-full overflow-hidden", className)}>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-left text-sm">
          <thead className="bg-(--atom-table-header-bg,#f8fafc) text-xs uppercase tracking-wide text-(--atom-text-muted,#64748b) sticky top-0 z-10">
            <tr>
              {columns.map((column) => (
                <th 
                  key={column.key}
                  className="px-4 py-2 font-medium text-(--atom-text-muted,#64748b)"
                >
                  {column.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-(--atom-border-subtle,#e2e8f0) bg-white">
            {paginatedData.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {columns.map((column) => (
                  <td 
                    key={column.key}
                    className="px-4 py-2 text-(--atom-text-primary,#0f172a)"
                  >
                    {row[column.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {pagination && data.length > rowsPerPage && (
        <PaginationControls />
      )}
    </div>
  )
}
