// src/components/ui/data-table.stories.tsx
import type { Meta, StoryObj } from "@storybook/react"
import { DataTable, type Column, type DataRow, type DataTableOptions } from "./TestTableData"

const meta: Meta<typeof DataTable> = {
  title: "UI/TestDataTable (No Sorting)",
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

// Sample data
const baseData: DataRow[] = [
  { 
    id: 1, 
    name: "John Doe", 
    age: 30, 
    email: "john.doe@example.com", 
    department: "Engineering", 
    status: "Active" 
  },
  { 
    id: 2, 
    name: "Jane Smith", 
    age: 25, 
    email: "jane.smith@example.com", 
    department: "Design", 
    status: "Inactive" 
  },
  { 
    id: 3, 
    name: "Bob Johnson", 
    age: 35, 
    email: "bob.johnson@example.com", 
    department: "Engineering", 
    status: "Pending" 
  },
  { 
    id: 4, 
    name: "Alice Brown", 
    age: 28, 
    email: "alice.brown@example.com", 
    department: "Marketing", 
    status: "Active" 
  },
  { 
    id: 5, 
    name: "Charlie Wilson", 
    age: 42, 
    email: "charlie.wilson@example.com", 
    department: "Sales", 
    status: "Inactive" 
  },
]

const baseColumns: Column[] = [
  { name: "Name", key: "name" },
  { name: "Age", key: "age" },
  { name: "Email", key: "email" },
  { name: "Department", key: "department" },
  { name: "Status", key: "status" },
]

const columnsWithCells: Column[] = [
  { name: "Name", key: "name" },
  { name: "Age", key: "age" },
  { 
    name: "Status", 
    key: "status",
    conditionalCell: (value: string) => (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
        value === "Active" 
          ? "bg-green-100 text-green-800" 
          : value === "Pending" 
          ? "bg-yellow-100 text-yellow-800"
          : "bg-red-100 text-red-800"
      }`}>
        {value}
      </span>
    )
  },
  { 
    name: "Actions", 
    key: "id",
    cell: (row: DataRow, rowIndex: number) => (
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

/* ------------------ Basic Stories ------------------ */

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

export const SearchOnly: Story = {
  args: {
    columns: baseColumns,
    data: baseData,
    options: { search: true },
  },
  parameters: {
    docs: {
      description: {
        story: "Try searching 'john' or 'engineering'",
      },
    },
  },
}

/* ------------------ Cell Rendering Stories ------------------ */

export const WithBadges: Story = {
  args: {
    columns: columnsWithCells,
    data: baseData,
    pagination: true,
    options: { 
      ...defaultOptions, 
      search: true 
    },
  },
}

export const Selectors: Story = {
  args: {
    columns: [
      { name: "Name", key: "name" },
      { 
        name: "Full Info", 
        key: "id", 
        selector: (row: DataRow) => `${row.department} • ${row.email}`,
      },
      { name: "Age", key: "age" },
    ],
    data: baseData,
    pagination: true,
    options: { search: true },
  },
}

export const MixedContent: Story = {
  args: {
    columns: [
      { name: "Name", key: "name" },
      { name: "Age", key: "age" },
      { 
        name: "Status Badge", 
        key: "status",
        conditionalCell: (value: string) => (
          <span className={`px-2 py-1 rounded-full text-xs ${
            value === "Active" ? "bg-green-500 text-white" : "bg-gray-500 text-white"
          }`}>
            {value}
          </span>
        )
      },
      { 
        name: "Actions", 
        key: "actions",
        cell: (row: DataRow, index: number) => (
          <div className="flex gap-2">
            <span className="text-xs text-blue-600 font-medium">Edit #{index + 1}</span>
            <span className="text-xs text-red-600 font-medium">Delete</span>
          </div>
        )
      },
    ],
    data: baseData,
    pagination: true,
    options: defaultOptions,
  },
}

/* ------------------ Layout Stories ------------------ */

export const FixedHeight: Story = {
  args: {
    columns: baseColumns,
    data: Array.from({ length: 20 }, (_, i) => ({
      id: i + 1,
      name: `User ${i + 1}`,
      age: 20 + (i % 30),
      email: `user${i + 1}@example.com`,
      department: ["Engineering", "Design", "Marketing", "Sales", "HR"][i % 5],
      status: i % 3 === 0 ? "Active" : "Inactive",
    })),
    pagination: true,
    options: {
      ...defaultOptions,
      tableBodyHeight: "400px",
      tableBodyMaxHeight: "500px",
    },
  },
}

export const NoToolbar: Story = {
  args: {
    columns: baseColumns,
    data: baseData.slice(0, 5),
    pagination: true,
  },
}

/* ------------------ Edge Cases ------------------ */

export const Empty: Story = {
  args: {
    columns: baseColumns,
    data: [],
    options: defaultOptions,
  },
}

export const SingleRow: Story = {
  args: {
    columns: baseColumns,
    data: [baseData[0]],
  },
}

export const LargeDataset: Story = {
  args: {
    columns: columnsWithCells,
    data: Array.from({ length: 100 }, (_, i) => ({
      id: i + 1,
      name: `John Doe ${i + 1}`,
      age: 25 + (i % 35),
      email: `john.doe${i + 1}@company.com`,
      department: "Engineering",
      status: i % 2 === 0 ? "Active" : "Inactive",
    })),
    pagination: true,
    options: defaultOptions,
  },
}

/* ------------------ Compact Stories ------------------ */

export const CompactView: Story = {
  args: {
    columns: [
      { name: "Name", key: "name" },
      { name: "Status", key: "status" },
    ],
    data: baseData,
    options: {
      tableBodyHeight: "300px",
      search: true,
    },
  },
}
