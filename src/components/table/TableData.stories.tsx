// src/components/ui/data-table.stories.tsx
import type { Meta, StoryObj } from "@storybook/react"
import { DataTable, type Column, type DataRow } from "./TableData"

const meta: Meta<typeof DataTable> = {
  title: "UI/DataTable",
  component: DataTable,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    columns: { control: "object" },
    data: { control: "object" },
    pagination: { control: "boolean" },
    className: { control: "text" },
  },
}

export default meta
type Story = StoryObj<typeof meta>

const sampleColumns: Column[] = [
  { name: "Name", key: "name" },
  { name: "Email", key: "email" },
  { name: "Status", key: "status" },
  { name: "Amount", key: "amount" },
]

const sampleData: DataRow[] = [
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

export const Default: Story = {
  args: {
    columns: sampleColumns,
    data: sampleData,
    pagination: true,
  },
}

export const NoPagination: Story = {
  args: {
    columns: sampleColumns,
    data: sampleData.slice(0, 5),
    pagination: false,
  },
}

export const EmptyPagination: Story = {
  args: {
    columns: sampleColumns,
    data: [],
    pagination: true,
  },
}

export const SinglePage: Story = {
  args: {
    columns: sampleColumns,
    data: sampleData.slice(0, 8),
    pagination: true,
  },
}

export const MultiPage: Story = {
  args: {
    columns: sampleColumns,
    data: sampleData,
    pagination: true,
  },
  parameters: {
    layout: "fullscreen",
  },
}

export const WideTable: Story = {
  args: {
    columns: [
      { name: "ID", key: "id" },
      { name: "First Name", key: "firstName" },
      { name: "Last Name", key: "lastName" },
      { name: "Email", key: "email" },
      { name: "Phone", key: "phone" },
      { name: "Company", key: "company" },
      { name: "Role", key: "role" },
    ],
    data: Array.from({ length: 15 }, (_, i) => ({
      id: `#${String(i + 1).padStart(3, '0')}`,
      firstName: `User${i + 1}`,
      lastName: `Lastname${i + 1}`,
      email: `user${i + 1}@example.com`,
      phone: `+1 (555) ${String(100 + i).padStart(3, '0')}-4567`,
      company: `Company ${i + 1}`,
      role: ['Developer', 'Designer', 'Manager', 'Admin'][i % 4],
    })),
    pagination: true,
  },
  parameters: {
    layout: "fullscreen",
  },
}
