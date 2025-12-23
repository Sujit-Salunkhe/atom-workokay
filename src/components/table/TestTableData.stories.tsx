// src/components/ui/data-table.stories.tsx
import type { Meta, StoryObj } from "@storybook/react"
import {
  DataTable,
  type Column,
  type DataRow,
  type DataTableOptions,
} from "./TestTableData"

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
    className: { control: "text" },
    options: { control: "object" },
  },
}

export default meta
type Story = StoryObj<typeof meta>

/* ---------- Sample data ---------- */

const baseColumns: Column[] = [
  { name: "Name", key: "name" },
  { name: "Email", key: "email" },
  { name: "Status", key: "status" },
  { name: "Amount", key: "amount" },
]

const baseData: DataRow[] = [
  { name: "John Doe",   email: "john@example.com",   status: "Active",   amount: "$2,500" },
  { name: "Jane Smith", email: "jane@example.com",   status: "Pending",  amount: "$1,200" },
  { name: "Bob Johnson",email: "bob@example.com",    status: "Inactive", amount: "$3,800" },
  { name: "Alice Brown",email: "alice@example.com",  status: "Active",   amount: "$1,900" },
  { name: "Charlie W.", email: "charlie@example.com",status: "Pending",  amount: "$4,200" },
  { name: "Diana Davis",email: "diana@example.com",  status: "Active",   amount: "$2,100" },
  { name: "Eve Miller", email: "eve@example.com",    status: "Inactive", amount: "$3,300" },
  { name: "Frank G.",   email: "frank@example.com",  status: "Active",   amount: "$2,700" },
  { name: "Grace Lee",  email: "grace@example.com",  status: "Pending",  amount: "$1,500" },
  { name: "Henry T.",   email: "henry@example.com",  status: "Active",   amount: "$5,000" },
  { name: "Ivy A.",     email: "ivy@example.com",    status: "Inactive", amount: "$2,800" },
  { name: "Jack Thomas",email: "jack@example.com",   status: "Active",   amount: "$3,100" },
]

const defaultOptions: DataTableOptions = {
  search: true,
  download: true,
  viewColumns: true,
  filter: true,
  filterType: "dropdown",
  tableBodyHeight: "400px",
  tableBodyMaxHeight: "500px",
}

/* ---------- Stories ---------- */

export const Default: Story = {
  args: {
    columns: baseColumns,
    data: baseData,
    pagination: true,
    options: defaultOptions,
  },
}

export const NoPagination: Story = {
  args: {
    columns: baseColumns,
    data: baseData,
    pagination: false,
    options: defaultOptions,
  },
}

export const NoToolbar: Story = {
  args: {
    columns: baseColumns,
    data: baseData.slice(0, 8),
    pagination: true,
    options: {
      search: false,
      download: false,
      viewColumns: false,
      filter: false,
    },
  },
}

export const SearchOnly: Story = {
  args: {
    columns: baseColumns,
    data: baseData,
    pagination: true,
    options: {
      search: true,
      download: false,
      viewColumns: false,
      filter: false,
      tableBodyHeight: "320px",
      tableBodyMaxHeight: "400px",
    },
  },
}

export const DenseTable: Story = {
  args: {
    columns: baseColumns,
    data: baseData,
    pagination: true,
    className: "text-xs",
    options: {
      ...defaultOptions,
      tableBodyHeight: "260px",
      tableBodyMaxHeight: "320px",
    },
  },
}

export const WideTable: Story = {
  args: {
    columns: [
      { name: "ID",        key: "id" },
      { name: "First",     key: "firstName" },
      { name: "Last",      key: "lastName" },
      { name: "Email",     key: "email" },
      { name: "Phone",     key: "phone" },
      { name: "Company",   key: "company" },
      { name: "Role",      key: "role" },
      { name: "Department",key: "department" },
    ],
    data: Array.from({ length: 25 }, (_, i) => ({
      id: `#${String(i + 1).padStart(3, "0")}`,
      firstName: `User${i + 1}`,
      lastName: `Last${i + 1}`,
      email: `user${i + 1}@example.com`,
      phone: `+91-99999${String(100 + i)}`,
      company: `Company ${i + 1}`,
      role: ["Developer", "Designer", "Manager", "Admin"][i % 4],
      department: ["Engineering", "Product", "Marketing", "Ops"][i % 4],
    })),
    pagination: true,
    options: {
      ...defaultOptions,
      tableBodyHeight: "450px",
      tableBodyMaxHeight: "520px",
    },
  },
  parameters: {
    layout: "fullscreen",
  },
}
