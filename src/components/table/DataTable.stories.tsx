// src/components/DataTable.stories.tsx
import type { Meta, StoryObj } from '@storybook/react-vite';
import { DataTable, type Column, type DataRow } from './DataTable';


// ✅ Helper to safely access DataRow properties
const getRowValue = (row: DataRow, key: string): string | number | undefined => {
  return (row as Record<string, unknown>)[key] as string | number | undefined;
};

const mockUsers: DataRow[] = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active', age: 28, department: 'Engineering' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User', status: 'Inactive', age: 34, department: 'Marketing' },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'Moderator', status: 'Active', age: 42, department: 'Sales' },
  { id: 4, name: 'Alice Brown', email: 'alice@example.com', role: 'Admin', status: 'Active', age: 29, department: 'Engineering' },
  { id: 5, name: 'Charlie Wilson', email: 'charlie@example.com', role: 'User', status: 'Pending', age: 31, department: 'HR' },
];

const mockColumns: Column[] = [
  { name: 'Name', key: 'name', sortable: true },
  { name: 'Email', key: 'email', sortable: true },
  { name: 'Role', key: 'role', sortable: true },
  {
    name: 'Status',
    key: 'status',
    sortable: true,
    cell: (row: DataRow) => {
      const status = getRowValue(row, 'status') as string || 'Unknown';
      const statusStyles: Record<string, string> = {
        Active: 'bg-green-100 text-green-800',
        Inactive: 'bg-red-100 text-red-800',
        Pending: 'bg-yellow-100 text-yellow-800',
      };
      return (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusStyles[status] || 'bg-gray-100 text-gray-800'}`}>
          {status}
        </span>
      );
    },
  },
  { name: 'Age', key: 'age', sortable: true },
  { name: 'Department', key: 'department', sortable: true },
];

const meta: Meta<typeof DataTable> = {
  title: 'Components/DataTable',
  component: DataTable,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Production-ready DataTable with full sorting, filtering, pagination, column visibility, search & CSV export.',
      },
    },
  },
  argTypes: {
    options: { control: 'object' },
    pagination: { control: 'boolean' },
    className: { control: 'text' },
  },
  decorators: [
    (Story) => (
      <div className="p-8 max-w-7xl mx-auto bg-background">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof DataTable>;

// All other stories unchanged...
export const Default: Story = {
  args: {
    columns: mockColumns,
    data: mockUsers.slice(0, 3),
  },
};

export const FullyFeatured: Story = {
  args: {
    columns: mockColumns,
    data: mockUsers,
    options: { search: true, download: true, viewColumns: true, filter: true },
  },
};

// ✅ CUSTOM CELLS - NO ANY!
const customColumns: Column[] = [
  ...mockColumns.slice(0, 3),
  {
    name: 'Profile',
    key: 'profile',
    cell: (row: DataRow) => {
      const name = getRowValue(row, 'name') as string || 'N/A';
      const email = getRowValue(row, 'email') as string || '';
      return (
        <div className="flex items-center space-x-3">
          <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center font-medium">
            {name[0]?.toUpperCase()}
          </div>
          <div className="truncate">
            <div className="font-medium text-sm">{name}</div>
            <div className="text-xs text-muted-foreground">{email}</div>
          </div>
        </div>
      );
    },
  },
  ...mockColumns.slice(-2),
];

export const CustomCells: Story = {
  args: {
    columns: customColumns,
    data: mockUsers,
    options: { viewColumns: true },
  },
};

// ✅ ORDERS - NO ANY!
const ordersColumns: Column[] = [
  { name: 'Order #', key: 'orderId', sortable: true },
  { name: 'Customer', key: 'customer', sortable: true },
  {
    name: 'Status',
    key: 'status',
    sortable: true,
    cell: (row: DataRow) => {
      const status = getRowValue(row, 'status') as string || 'Unknown';
      const colors: Record<string, string> = {
        Shipped: 'bg-green-100 text-green-800',
        Pending: 'bg-yellow-100 text-yellow-800',
        Delivered: 'bg-blue-100 text-blue-800',
        Cancelled: 'bg-red-100 text-red-800',
      };
      return (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${colors[status] || ''}`}>
          {status}
        </span>
      );
    },
  },
  {
    name: 'Amount',
    key: 'amount',
    sortable: true,
    cell: (row: DataRow) => {
      const amount = Number(getRowValue(row, 'amount') || 0);
      return <span className="font-mono font-medium">${amount.toLocaleString()}</span>;
    },
  },
  { name: 'Date', key: 'date', sortable: true },
];

const ordersData: DataRow[] = [
  { orderId: '#12345', customer: 'John Doe', status: 'Shipped', amount: 299.99, date: '2026-01-10' },
  { orderId: '#12346', customer: 'Jane Smith', status: 'Pending', amount: 149.50, date: '2026-01-11' },
  { orderId: '#12347', customer: 'Bob Johnson', status: 'Delivered', amount: 89.99, date: '2026-01-12' },
];

export const OrdersTable: Story = {
  args: {
    columns: ordersColumns,
    data: ordersData,
    options: { search: true },
    pagination: true,
  },
};

// ✅ PRODUCTS - NO ANY!
const productsColumns: Column[] = [
  { name: 'Product', key: 'name', sortable: true },
  { name: 'SKU', key: 'sku' },
  {
    name: 'Stock',
    key: 'stock',
    sortable: true,
    cell: (row: DataRow) => {
      const stock = Number(getRowValue(row, 'stock') || 0);
      const color = stock > 10 ? 'text-green-600' : stock > 0 ? 'text-yellow-600' : 'text-red-600';
      return <span className={`font-mono font-semibold ${color}`}>{stock}</span>;
    },
  },
  {
    name: 'Price',
    key: 'price',
    sortable: true,
    cell: (row: DataRow) => {
      const price = Number(getRowValue(row, 'price') || 0);
      return <span className="font-mono font-semibold">${price.toLocaleString()}</span>;
    },
  },
  { name: 'Category', key: 'category' },
];

// ... rest of stories (InteractiveControls, LargeDataset, etc.) unchanged


export const ProductsTable: Story = {
  args: {
    columns: productsColumns,
    data: [
      { name: 'Premium Laptop', sku: 'LAP001', stock: 12, price: 1299.99, category: 'Electronics' },
      { name: 'Wireless Mouse', sku: 'MOUSE001', stock: 45, price: 29.99, category: 'Accessories' },
      { name: 'Office Chair', sku: 'CHAIR001', stock: 3, price: 299.99, category: 'Furniture' },
      { name: 'Monitor', sku: 'MON001', stock: 0, price: 399.99, category: 'Electronics' },
    ],
    options: { filter: true, viewColumns: true },
  },
};
