// src/components/ui/data-table.stories.tsx
import type { Meta, StoryObj } from "@storybook/react"
import { DataTable, type Column, type DataRow, type DataTableOptions } from "./TestTableData"
import { Badge, type BadgeStatus } from "../badge/Badge"  // Your real Badge component

const meta: Meta<typeof DataTable> = {
  title: "UI/TestDataTable",
  component: DataTable,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  argTypes: {
    columns: { control: "object" },
    data: { control: "object" },
    pagination: { control: "boolean" },
    options: { control: "object" },
    className: { control: "text" },
  },
}

export default meta

type Story = StoryObj<typeof DataTable>

// Sample data with all your Badge status values
const baseData: DataRow[] = [
  { 
    id: 1, 
    name: "John Doe", 
    age: 30, 
    email: "john.doe@example.com", 
    department: "Engineering", 
    status: "validated" as BadgeStatus 
  },
  { 
    id: 2, 
    name: "Jane Smith", 
    age: 25, 
    email: "jane.smith@example.com", 
    department: "Design", 
    status: "incoming" as BadgeStatus 
  },
  { 
    id: 3, 
    name: "Bob Johnson", 
    age: 35, 
    email: "bob.johnson@example.com", 
    department: "Engineering", 
    status: "quarantined" as BadgeStatus 
  },
  { 
    id: 4, 
    name: "Alice Brown", 
    age: 28, 
    email: "alice.brown@example.com", 
    department: "Marketing", 
    status: "failed" as BadgeStatus 
  },
  { 
    id: 5, 
    name: "Charlie Wilson", 
    age: 42, 
    email: "charlie.wilson@example.com", 
    department: "Sales", 
    status: "archieved" as BadgeStatus 
  },
  { 
    id: 6, 
    name: "Diana Davis", 
    age: 33, 
    email: "diana.davis@example.com", 
    department: "HR", 
    status: "info" as BadgeStatus 
  },
]

// Base columns
const baseColumns: Column[] = [
  { name: "Name", key: "name", sortable: true },
  { name: "Age", key: "age", sortable: true },
  { name: "Email", key: "email", sortable: true },
  { name: "Department", key: "department", sortable: true },
]

// NEW: Columns with your REAL Badge variants
const columnsWithBadges: Column[] = [
  { name: "Name", key: "name", sortable: true },
  { name: "Age", key: "age", sortable: true },
  { 
    name: "Status", 
    key: "status",
    sortable: false,  // Status badges usually not sortable
    conditionalCell: (value: BadgeStatus, row: DataRow) => (
      <Badge status={value} size="sm">
        <h4>{value.charAt(0).toUpperCase() + value.slice(1)}</h4>
      </Badge>
    )
  },
  { 
    name: "Actions", 
    key: "id",
    cell: (row: DataRow) => (
      <div className="flex gap-1">
        <button className="h-6 px-2 text-xs rounded border bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100">
          Edit
        </button>
        <button className="h-6 px-2 text-xs rounded border bg-red-50 text-red-700 border-red-200 hover:bg-red-100">
          Delete
        </button>
      </div>
    )
  },
]

const defaultOptions: DataTableOptions = {
  search: true,
  filter: true,
  viewColumns: true,
  download: true,
  filterType: "dropdown",
}

/* ------------------ Core Stories ------------------ */

export const Default: Story = {
  args: {
    columns: baseColumns,
    data: baseData.slice(0, 3),
    pagination: false,
  },
}

export const WithPagination: Story = {
  args: {
    columns: baseColumns,
    data: baseData,
    pagination: true,
    options: defaultOptions,
  },
}

/* ------------------ BADGE INTEGRATION STORIES ------------------ */

export const WithStatusBadges: Story = {
  args: {
    columns: columnsWithBadges,
    data: baseData,
    pagination: true,
    options: { 
      ...defaultOptions, 
      search: true 
    },
  },
  parameters: {
    docs: {
      description: {
        story: "All your Badge status variants: validated, incoming, quarantined, failed, archieved, info",
      },
    },
  },
}

export const BadgeSearch: Story = {
  args: {
    columns: [
      { name: "Name", key: "name", sortable: true },
      { 
        name: "Status", 
        key: "status",
        conditionalCell: (value: BadgeStatus) => (
          <Badge status={value} size="sm">
            {value}
          </Badge>
        )
      },
    ],
    data: baseData.concat(baseData), // Duplicate for more search results
    options: { search: true },
  },
  parameters: {
    docs: {
      description: {
        story: "Search 'validated' or 'john' - works with Badge content!",
      },
    },
  },
}

export const MixedContent: Story = {
  args: {
    columns: [
      { name: "Name", key: "name", sortable: true },
      { name: "Age", key: "age", sortable: true },
      { 
        name: "Status", 
        key: "status",
        conditionalCell: (value: BadgeStatus) => (
          <Badge status={value} size="sm" />
        )
      },
      { 
        name: "Full Info", 
        key: "id",
        selector: (row: DataRow) => `${row.department} • ${row.email}`,
        sortable: true
      },
      { 
        name: "Actions", 
        key: "actions",
        cell: (row: DataRow, index: number) => (
          <Badge priority="low" size="sm">
            Row {index + 1}
          </Badge>
        )
      },
    ],
    data: baseData,
    pagination: true,
    options: defaultOptions,
  },
}

/* ------------------ Advanced Stories ------------------ */

export const LargeDataset: Story = {
  args: {
    columns: columnsWithBadges,
    data: Array.from({ length: 50 }, (_, i) => ({
      id: i + 1,
      name: `User ${i + 1}`,
      age: 25 + (i % 35),
      email: `user${i + 1}@example.com`,
      department: ["Engineering", "Design", "Marketing"][i % 3],
      status: ["validated", "incoming", "quarantined", "failed", "archieved", "info"][i % 6] as BadgeStatus,
    })),
    pagination: true,
    options: defaultOptions,
  },
}

export const PriorityBadges: Story = {
  args: {
    columns: [
      { name: "Task", key: "name", sortable: true },
      { 
        name: "Priority", 
        key: "priority",
        conditionalCell: (value: "high" | "medium" | "low") => (
          <Badge priority={value} size="sm">
            {value.toUpperCase()}
          </Badge>
        )
      },
      { name: "Status", key: "status", sortable: true },
    ],
    data: [
      { name: "Fix login bug", priority: "high" as const, status: "failed" },
      { name: "Update docs", priority: "medium" as const, status: "incoming" },
      { name: "Review PR", priority: "low" as const, status: "validated" },
    ],
    options: { search: true },
  },
}

export const CompactView: Story = {
  args: {
    columns: [
      { name: "Name", key: "name", sortable: true },
      { 
        name: "Status", 
        key: "status",
        conditionalCell: (value: BadgeStatus) => (
          <Badge status={value} size="sm" />
        )
      },
    ],
    data: baseData,
    options: {
      ...defaultOptions,
      tableBodyHeight: "300px",
    },
  },
}
