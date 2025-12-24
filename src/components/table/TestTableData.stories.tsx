// src/components/ui/data-table.stories.tsx
import type { Meta, StoryObj } from "@storybook/react"
import { DataTable, type Column, type DataRow, type DataTableOptions } from "./TestTableData"

const meta: Meta<typeof DataTable> = {
  title: "UI/TableTableData",
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
  { id: 1, name: "John Doe", age: 30, email: "john.doe@example.com", department: "Engineering", status: "Active" },
  { id: 2, name: "Jane Smith", age: 25, email: "jane.smith@example.com", department: "Design", status: "Active" },
  { id: 3, name: "Bob Johnson", age: 35, email: "bob.johnson@example.com", department: "Engineering", status: "Inactive" },
  { id: 4, name: "Alice Brown", age: 28, email: "alice.brown@example.com", department: "Marketing", status: "Pending" },
  { id: 5, name: "Charlie Wilson", age: 42, email: "charlie.wilson@example.com", department: "Sales", status: "Active" },
  { id: 6, name: "Diana Davis", age: 33, email: "diana.davis@example.com", department: "HR", status: "Active" },
]

const baseColumns: Column[] = [
  { name: "Name", key: "name", sortable: true },
  { name: "Age", key: "age", sortable: true },
  { name: "Email", key: "email", sortable: true },
  { name: "Department", key: "department", sortable: true },
  { name: "Status", key: "status", sortable: false }, // Non-sortable
]

const columnsWithSelector: Column[] = [
  { name: "Name", key: "name", sortable: true },
  { 
    name: "Full Name", 
    key: "id", 
    selector: (row: DataRow) => `${row.name} (${row.department})`,
    sortable: true 
  },
  { name: "Age", key: "age", sortable: true },
  { name: "Email", key: "email" }, // No sortable = disabled
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
}

export const Selectors: Story = {
  args: {
    columns: columnsWithSelector,
    data: baseData,
    pagination: true,
    options: { 
      ...defaultOptions, 
      search: true 
    },
  },
}

export const MixedSortable: Story = {
  args: {
    columns: [
      { name: "Name", key: "name", sortable: true },
      { name: "Age", key: "age" }, // Not sortable
      { name: "Email", key: "email", sortable: true },
      { 
        name: "Computed", 
        key: "id", 
        selector: (row: DataRow) => `ID: ${row.id}`,
        sortable: false 
      },
    ],
    data: baseData,
    pagination: true,
    options: defaultOptions,
  },
}

export const NoToolbar: Story = {
  args: {
    columns: baseColumns,
    data: baseData.slice(0, 5),
    pagination: true,
  },
}

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

/* ------------------ Interactive Stories ------------------ */

export const LargeDataset: Story = {
  args: {
    columns: baseColumns,
    data: Array.from({ length: 100 }, (_, i) => ({
      id: i + 1,
      name: `John Doe ${i + 1}`,
      age: 25 + (i % 35),
      email: `john.doe${i + 1}@company.com`,
      department: "Engineering",
      status: "Active",
    })),
    pagination: true,
    options: defaultOptions,
  },
}

export const SearchAndSort: Story = {
  args: {
    columns: [
      { name: "Name", key: "name", sortable: true },
      { name: "Age", key: "age", sortable: true },
      { name: "Department", key: "department", sortable: true },
    ],
    data: baseData.concat(baseData).concat(baseData), // 18 rows
    pagination: true,
    options: { search: true },
  },
  parameters: {
    docs: {
      description: {
        story: "Try searching 'john' or 'engineering', then click headers to sort",
      },
    },
  },
}
