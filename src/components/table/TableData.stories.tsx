// src/components/ui/data-table.stories.tsx
import type { Meta, StoryObj } from "@storybook/react"
import {
  DataTable,
  type Column,
  type DataRow,
  type DataTableOptions,
} from "./TableData"

const meta: Meta<typeof DataTable> = {
  title: "UI/DataTable",
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

const baseColumns: Column[] = [
  { name: "Name", key: "name" },
  { name: "Email", key: "email" },
  { name: "Status", key: "status" },
  { name: "Amount", key: "amount" },
]

const baseData: DataRow[] = [
  { name: "John Doe", email: "john@example.com", status: "Active", amount: "$2,500" },
  { name: "Jane Smith", email: "jane@example.com", status: "Pending", amount: "$1,200" },
  { name: "Bob Johnson", email: "bob@example.com", status: "Inactive", amount: "$3,800" },
  { name: "Alice Brown", email: "alice@example.com", status: "Active", amount: "$1,900" },
  { name: "Charlie Wilson", email: "charlie@example.com", status: "Pending", amount: "$4,200" },
  { name: "Diana Davis", email: "diana@example.com", status: "Active", amount: "$2,100" },
  { name: "Eve Miller", email: "eve@example.com", status: "Inactive", amount: "$3,300" },
  { name: "Frank Garcia", email: "frank@example.com", status: "Active", amount: "$2,700" },
  { name: "Grace Lee", email: "grace@example.com", status: "Pending", amount: "$1,500" },
  { name: "Henry Taylor", email: "henry@example.com", status: "Active", amount: "$5,000" },
  { name: "Ivy Anderson", email: "ivy@example.com", status: "Inactive", amount: "$2,800" },
  { name: "Jack Thomas", email: "jack@example.com", status: "Active", amount: "$3,100" },
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

export const Default: Story = {
  args: {
    columns: baseColumns,
    data: baseData,
    pagination: true,
    options: defaultOptions,
  },
}

export const NoToolbar: Story = {
  args: {
    columns: baseColumns,
    data: baseData.slice(0, 6),
    pagination: true,
    options: {
      search: false,
      download: false,
      viewColumns: false,
      filter: false,
    },
  },
}

export const NoPagination: Story = {
  args: {
    columns: baseColumns,
    data: baseData.slice(0, 8),
    pagination: false,
    options: defaultOptions,
  },
}

export const CustomFilterType: Story = {
  args: {
    columns: baseColumns,
    data: baseData,
    pagination: true,
    options: {
      ...defaultOptions,
      filterType: "checkbox",
    },
  },
}

export const TallBody: Story = {
  args: {
    columns: baseColumns,
    data: baseData,
    pagination: true,
    options: {
      ...defaultOptions,
      tableBodyHeight: "600px",
      tableBodyMaxHeight: "700px",
    },
  },
}
