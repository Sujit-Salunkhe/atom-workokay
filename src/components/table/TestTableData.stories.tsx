// src/components/ui/data-table.stories.tsx
import type { Meta, StoryObj } from '@storybook/react'
import { DataTable } from './TestTableData'
import type { Column, DataRow } from './TestTableData'

const meta = {
  title: 'Components/TestDataTable',
  component: DataTable,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    pagination: {
      control: 'boolean',
      description: 'Enable pagination',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'boolean' },
      },
    },
    options: {
      control: 'object',
      description: 'Table options configuration',
    },
  },
} satisfies Meta<typeof DataTable>

export default meta
type Story = StoryObj<typeof meta>

// Sample data for stories
const sampleEmployees = [
  { id: 1, name: 'Rajesh Kumar', department: 'Engineering', position: 'Senior Developer', salary: 120000, city: 'Mumbai', status: 'Active' },
  { id: 2, name: 'Priya Sharma', department: 'Marketing', position: 'Marketing Manager', salary: 95000, city: 'Delhi', status: 'Active' },
  { id: 3, name: 'Amit Patel', department: 'Engineering', position: 'Frontend Developer', salary: 85000, city: 'Bangalore', status: 'Active' },
  { id: 4, name: 'Sneha Reddy', department: 'HR', position: 'HR Specialist', salary: 70000, city: 'Hyderabad', status: 'Inactive' },
  { id: 5, name: 'Vikram Singh', department: 'Sales', position: 'Sales Executive', salary: 75000, city: 'Mumbai', status: 'Active' },
  { id: 6, name: 'Anjali Verma', department: 'Engineering', position: 'Backend Developer', salary: 90000, city: 'Pune', status: 'Active' },
  { id: 7, name: 'Rohit Mehta', department: 'Finance', position: 'Accountant', salary: 65000, city: 'Mumbai', status: 'Active' },
  { id: 8, name: 'Kavya Iyer', department: 'Marketing', position: 'Content Writer', salary: 55000, city: 'Chennai', status: 'Active' },
  { id: 9, name: 'Arjun Gupta', department: 'Engineering', position: 'DevOps Engineer', salary: 110000, city: 'Bangalore', status: 'Active' },
  { id: 10, name: 'Pooja Jain', department: 'Sales', position: 'Sales Manager', salary: 100000, city: 'Delhi', status: 'Active' },
  { id: 11, name: 'Karan Malhotra', department: 'HR', position: 'Recruiter', salary: 60000, city: 'Noida', status: 'Inactive' },
  { id: 12, name: 'Divya Nair', department: 'Engineering', position: 'QA Engineer', salary: 70000, city: 'Kochi', status: 'Active' },
  { id: 13, name: 'Sanjay Desai', department: 'Finance', position: 'Financial Analyst', salary: 80000, city: 'Mumbai', status: 'Active' },
  { id: 14, name: 'Neha Kapoor', department: 'Marketing', position: 'SEO Specialist', salary: 65000, city: 'Gurgaon', status: 'Active' },
  { id: 15, name: 'Aditya Rao', department: 'Engineering', position: 'Tech Lead', salary: 150000, city: 'Bangalore', status: 'Active' },
]

const employeeColumns: Column[] = [
  {
    name: 'ID',
    key: 'id',
    selector: (row) => row.id,
  },
  {
    name: 'Name',
    key: 'name',
    selector: (row) => row.name,
  },
  {
    name: 'Department',
    key: 'department',
    selector: (row) => row.department,
  },
  {
    name: 'Position',
    key: 'position',
    selector: (row) => row.position,
  },
  {
    name: 'City',
    key: 'city',
    selector: (row) => row.city,
  },
  {
    name: 'Salary',
    key: 'salary',
    cell: (row) => `₹${row.salary.toLocaleString('en-IN')}`,
  },
  {
    name: 'Status',
    key: 'status',
    conditionalCell: (value) => (
      <span
        className={`px-2 py-1 rounded-full text-xs font-medium ${
          value === 'Active'
            ? 'bg-green-100 text-green-700'
            : 'bg-red-100 text-red-700'
        }`}
      >
        {value}
      </span>
    ),
  },
]

// Basic table
export const Basic: Story = {
  args: {
    columns: employeeColumns,
    data: sampleEmployees,
  },
}

// Table with pagination
export const WithPagination: Story = {
  args: {
    columns: employeeColumns,
    data: sampleEmployees,
    pagination: true,
  },
}

// Table with search
export const WithSearch: Story = {
  args: {
    columns: employeeColumns,
    data: sampleEmployees,
    pagination: true,
    options: {
      search: true,
    },
  },
}

// Table with filter
export const WithFilter: Story = {
  args: {
    columns: employeeColumns,
    data: sampleEmployees,
    pagination: true,
    options: {
      search: true,
      filter: true,
    },
  },
}

// Table with all toolbar options
export const FullToolbar: Story = {
  args: {
    columns: employeeColumns,
    data: sampleEmployees,
    pagination: true,
    options: {
      search: true,
      filter: true,
      viewColumns: true,
      download: true,
    },
  },
}

// Product inventory table
const productData = [
  { id: 1, name: 'Laptop', category: 'Electronics', brand: 'Dell', stock: 45, price: 55000, rating: 4.5 },
  { id: 2, name: 'Mouse', category: 'Accessories', brand: 'Logitech', stock: 120, price: 500, rating: 4.2 },
  { id: 3, name: 'Keyboard', category: 'Accessories', brand: 'Corsair', stock: 80, price: 2500, rating: 4.7 },
  { id: 4, name: 'Monitor', category: 'Electronics', brand: 'Samsung', stock: 30, price: 15000, rating: 4.4 },
  { id: 5, name: 'Headphones', category: 'Accessories', brand: 'Sony', stock: 60, price: 3500, rating: 4.6 },
  { id: 6, name: 'Webcam', category: 'Accessories', brand: 'Logitech', stock: 25, price: 4000, rating: 4.3 },
  { id: 7, name: 'Tablet', category: 'Electronics', brand: 'Apple', stock: 15, price: 35000, rating: 4.8 },
  { id: 8, name: 'Charger', category: 'Accessories', brand: 'Anker', stock: 150, price: 800, rating: 4.1 },
  { id: 9, name: 'SSD', category: 'Storage', brand: 'Samsung', stock: 50, price: 8000, rating: 4.9 },
  { id: 10, name: 'RAM', category: 'Storage', brand: 'Corsair', stock: 70, price: 6000, rating: 4.5 },
]

const productColumns: Column[] = [
  {
    name: 'Product',
    key: 'name',
  },
  {
    name: 'Category',
    key: 'category',
  },
  {
    name: 'Brand',
    key: 'brand',
  },
  {
    name: 'Stock',
    key: 'stock',
    conditionalCell: (value) => (
      <span
        className={`font-medium ${
          value < 30 ? 'text-red-600' : value < 60 ? 'text-yellow-600' : 'text-green-600'
        }`}
      >
        {value}
      </span>
    ),
  },
  {
    name: 'Price',
    key: 'price',
    cell: (row) => `₹${row.price.toLocaleString('en-IN')}`,
  },
  {
    name: 'Rating',
    key: 'rating',
    cell: (row) => (
      <div className="flex items-center gap-1">
        <span className="text-yellow-500">★</span>
        <span>{row.rating}</span>
      </div>
    ),
  },
]

export const ProductInventory: Story = {
  args: {
    columns: productColumns,
    data: productData,
    pagination: true,
    options: {
      search: true,
      filter: true,
      download: true,
    },
  },
}

// Customer orders table
const orderData = [
  { id: 'ORD-001', customer: 'Rajesh Kumar', product: 'Laptop', amount: 55000, status: 'Delivered', date: '2025-12-20' },
  { id: 'ORD-002', customer: 'Priya Sharma', product: 'Mouse', amount: 500, status: 'Pending', date: '2025-12-22' },
  { id: 'ORD-003', customer: 'Amit Patel', product: 'Keyboard', amount: 2500, status: 'Shipped', date: '2025-12-21' },
  { id: 'ORD-004', customer: 'Sneha Reddy', product: 'Monitor', amount: 15000, status: 'Delivered', date: '2025-12-19' },
  { id: 'ORD-005', customer: 'Vikram Singh', product: 'Headphones', amount: 3500, status: 'Cancelled', date: '2025-12-23' },
  { id: 'ORD-006', customer: 'Anjali Verma', product: 'Webcam', amount: 4000, status: 'Pending', date: '2025-12-24' },
  { id: 'ORD-007', customer: 'Rohit Mehta', product: 'Tablet', amount: 35000, status: 'Shipped', date: '2025-12-22' },
  { id: 'ORD-008', customer: 'Kavya Iyer', product: 'Charger', amount: 800, status: 'Delivered', date: '2025-12-20' },
]

const orderColumns: Column[] = [
  {
    name: 'Order ID',
    key: 'id',
  },
  {
    name: 'Customer',
    key: 'customer',
  },
  {
    name: 'Product',
    key: 'product',
  },
  {
    name: 'Amount',
    key: 'amount',
    cell: (row) => `₹${row.amount.toLocaleString('en-IN')}`,
  },
  {
    name: 'Date',
    key: 'date',
  },
  {
    name: 'Status',
    key: 'status',
    conditionalCell: (value) => {
      const statusColors = {
        Delivered: 'bg-green-100 text-green-700',
        Shipped: 'bg-blue-100 text-blue-700',
        Pending: 'bg-yellow-100 text-yellow-700',
        Cancelled: 'bg-red-100 text-red-700',
      }
      return (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[value as keyof typeof statusColors]}`}>
          {value}
        </span>
      )
    },
  },
]

export const CustomerOrders: Story = {
  args: {
    columns: orderColumns,
    data: orderData,
    pagination: true,
    options: {
      search: true,
      filter: true,
      viewColumns: true,
    },
  },
}

// Simple table without pagination
export const SimpleTable: Story = {
  args: {
    columns: [
      { name: 'ID', key: 'id' },
      { name: 'Name', key: 'name' },
      { name: 'Email', key: 'email' },
    ],
    data: [
      { id: 1, name: 'John Doe', email: 'john@example.com' },
      { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
      { id: 3, name: 'Bob Johnson', email: 'bob@example.com' },
    ],
  },
}

// Table with custom height
export const CustomHeight: Story = {
  args: {
    columns: employeeColumns,
    data: sampleEmployees,
    options: {
      search: true,
      filter: true,
      tableBodyMaxHeight: '400px',
    },
  },
}

// Empty state
export const EmptyTable: Story = {
  args: {
    columns: employeeColumns,
    data: [],
    options: {
      search: true,
      filter: true,
    },
  },
}

// Sales data table
const salesData = [
  { id: 1, salesperson: 'Rajesh Kumar', region: 'North', month: 'January', sales: 450000, target: 500000 },
  { id: 2, salesperson: 'Priya Sharma', region: 'South', month: 'January', sales: 520000, target: 500000 },
  { id: 3, salesperson: 'Amit Patel', region: 'East', month: 'January', sales: 380000, target: 400000 },
  { id: 4, salesperson: 'Sneha Reddy', region: 'West', month: 'January', sales: 610000, target: 600000 },
  { id: 5, salesperson: 'Vikram Singh', region: 'North', month: 'February', sales: 480000, target: 500000 },
  { id: 6, salesperson: 'Anjali Verma', region: 'South', month: 'February', sales: 550000, target: 500000 },
  { id: 7, salesperson: 'Rohit Mehta', region: 'East', month: 'February', sales: 420000, target: 400000 },
  { id: 8, salesperson: 'Kavya Iyer', region: 'West', month: 'February', sales: 590000, target: 600000 },
]

const salesColumns: Column[] = [
  {
    name: 'Salesperson',
    key: 'salesperson',
  },
  {
    name: 'Region',
    key: 'region',
  },
  {
    name: 'Month',
    key: 'month',
  },
  {
    name: 'Sales',
    key: 'sales',
    cell: (row) => `₹${row.sales.toLocaleString('en-IN')}`,
  },
  {
    name: 'Target',
    key: 'target',
    cell: (row) => `₹${row.target.toLocaleString('en-IN')}`,
  },
  {
    name: 'Achievement',
    key: 'achievement',
    cell: (row) => {
      const percentage = ((row.sales / row.target) * 100).toFixed(1)
      const isAchieved = row.sales >= row.target
      return (
        <div className="flex items-center gap-2">
          <span className={`font-medium ${isAchieved ? 'text-green-600' : 'text-red-600'}`}>
            {percentage}%
          </span>
          <span>{isAchieved ? '✓' : '✗'}</span>
        </div>
      )
    },
  },
]

export const SalesReport: Story = {
  args: {
    columns: salesColumns,
    data: salesData,
    pagination: true,
    options: {
      search: true,
      filter: true,
      download: true,
      viewColumns: true,
    },
  },
}

// Interactive playground
export const Playground: Story = {
  args: {
    columns: employeeColumns,
    data: sampleEmployees,
    pagination: true,
    options: {
      search: true,
      filter: true,
      viewColumns: true,
      download: true,
    },
  },
}
