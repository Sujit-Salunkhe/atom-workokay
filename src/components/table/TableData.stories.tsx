// DataTable.stories.tsx
// ✅ GOLD STANDARD STORIES - Production-ready, comprehensive coverage

import type { Meta, StoryObj } from '@storybook/react'
import { DataTable } from './DataTable'
import { useState } from 'react'
import type { DataRow } from './TestTableData'

// ============================================================================
// SAMPLE DATA & COLUMNS
// ============================================================================

const sampleData = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john.doe@example.com',
    role: 'Developer',
    department: 'Engineering',
    status: 'Active',
    salary: 85000,
    hireDate: '2023-01-15',
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane.smith@company.com',
    role: 'Designer',
    department: 'Design',
    status: 'Inactive',
    salary: 72000,
    hireDate: '2022-06-22',
  },
  {
    id: 3,
    name: 'Bob Johnson',
    email: 'bob.j@company.com',
    role: 'Manager',
    department: 'Engineering',
    status: 'Active',
    salary: 120000,
    hireDate: '2021-03-10',
  },
  {
    id: 4,
    name: 'Alice Brown',
    email: 'alice.brown@company.com',
    role: 'QA Engineer',
    department: 'Quality Assurance',
    status: 'Active',
    salary: 65000,
    hireDate: '2023-11-01',
  },
  {
    id: 5,
    name: 'Charlie Wilson',
    email: 'charlie@company.com',
    role: 'Product Manager',
    department: 'Product',
    status: 'On Leave',
    salary: 95000,
    hireDate: '2020-09-15',
  },
  {
    id: 6,
    name: 'Diana Evans',
    email: 'diana.evans@company.com',
    role: 'Senior Developer',
    department: 'Engineering',
    status: 'Active',
    salary: 110000,
    hireDate: '2019-05-20',
  },
]

const sampleColumns = [
  {
    name: 'Name',
    key: 'name',
    sortable: true,
  },
  {
    name: 'Email',
    key: 'email',
    sortable: true,
  },
  {
    name: 'Role',
    key: 'role',
    sortable: true,
  },
  {
    name: 'Department',
    key: 'department',
    sortable: true,
  },
  {
    name: 'Status',
    key: 'status',
    sortable: true,
    cell: (row: any) => (
      <span
        className={`px-2 py-1 rounded-full text-xs font-medium ${
          row.status === 'Active'
            ? 'bg-green-100 text-green-800'
            : row.status === 'Inactive'
            ? 'bg-red-100 text-red-800'
            : 'bg-yellow-100 text-yellow-800'
        }`}
      >
        {row.status}
      </span>
    ),
  },
  {
    name: 'Salary',
    key: 'salary',
    sortable: true,
    selector: (row: any) => `$${row.salary?.toLocaleString()}`,
  },
  {
    name: 'Hire Date',
    key: 'hireDate',
    sortable: true,
    selector: (row: any) => new Date(row.hireDate).toLocaleDateString(),
  },
]

// ============================================================================
// META
// ============================================================================

const meta: Meta<typeof DataTable> = {
  title: 'Components/Data Display/DataTable',
  component: DataTable,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'A fully-featured, accessible data table with search, filtering, sorting, pagination, and column visibility controls.',
      },
    },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/...', // Replace with actual design link
    },
  },
  tags: ['autodocs'],
  argTypes: {
    columns: { control: 'object', table: { disable: true } },
    data: { control: 'object', table: { disable: true } },
    options: { control: 'object' },
    pagination: { control: 'boolean' },
    className: { control: 'text' },
  },
  decorators: [
    (Story) => (
      <div className="p-8 max-w-7xl mx-auto">
        <Story />
      </div>
    ),
  ],
}

export default meta

type Story = StoryObj<typeof DataTable>

// ============================================================================
// PRIMARY STORIES
// ============================================================================

export const Default: Story = {
  args: {
    columns: sampleColumns,
    data: sampleData,
  },
}

export const WithSearch: Story = {
  args: {
    columns: sampleColumns,
    data: sampleData,
    options: {
      search: true,
    },
  },
}

export const WithPagination: Story = {
  args: {
    columns: sampleColumns,
    data: [...sampleData, ...sampleData, ...sampleData],
    options: {},
    pagination: true,
  },
}

export const FullFeatured: Story = {
  args: {
    columns: sampleColumns,
    data: [...sampleData, ...sampleData, ...sampleData],
    options: {
      search: true,
      filter: true,
      viewColumns: true,
      download: true,
    },
    pagination: true,
  },
}

export const EmptyState: Story = {
  args: {
    columns: sampleColumns,
    data: [],
    options: {
      search: true,
      filter: true,
      viewColumns: true,
    },
    pagination: true,
  },
}

export const SingleRow: Story = {
  args: {
    columns: sampleColumns,
    data: [sampleData[0]],
  },
}

// ============================================================================
// INTERACTIVE STORIES
// ============================================================================

const LargeDataset = Array.from({ length: 100 }, (_, i) => ({
  ...sampleData[0],
  id: i + 1,
  name: `User ${i + 1}`,
  email: `user${i + 1}@example.com`,
}))

export const PerformanceLargeDataset: Story = {
  args: {
    columns: sampleColumns,
    data: LargeDataset,
    options: {
      search: true,
      filter: true,
      viewColumns: true,
    },
    pagination: true,
  },
  parameters: {
    chromatic: { disable: false },
    docs: {
      description: {
        story:
          'Tests performance with 100 rows, pagination, search, and filtering enabled.',
      },
    },
  },
}

export const CustomCellRendering: Story = {
  render: (args) => {
    const customColumns = [
      ...sampleColumns.slice(0, 3),
      {
        name: 'Actions',
        key: 'actions',
        cell: (row: any) => (
          <div className="flex gap-2">
            <button className="px-2 py-1 bg-blue-500 text-white text-xs rounded hover:bg-blue-600">
              Edit
            </button>
            <button className="px-2 py-1 bg-red-500 text-white text-xs rounded hover:bg-red-600">
              Delete
            </button>
          </div>
        ),
      },
    ]

    return <DataTable {...args} columns={customColumns} />
  },
  args: {
    data: sampleData,
  },
}

export const Responsive: Story = {
  args: {
    columns: sampleColumns,
    data: sampleData,
    options: {
      search: true,
      filter: true,
    },
    pagination: true,
  },
  parameters: {
    viewport: {
      viewports: {
        mobile: { name: 'Mobile', styles: { width: '375px', height: '667px' } },
        tablet: { name: 'Tablet', styles: { width: '768px', height: '1024px' } },
      },
    },
  },
}

// ============================================================================
// EDGE CASES
// ============================================================================

export const NoFeatures: Story = {
  args: {
    columns: sampleColumns,
    data: sampleData,
  },
  parameters: {
    docs: {
      description: {
        story: 'Minimal table with no toolbar features enabled.',
      },
    },
  },
}

export const LongTextContent: Story = {
  args: {
    columns: [
      {
        name: 'Very Long Column Header That Wraps And Tests Layout',
        key: 'description',
        sortable: true,
      },
      {
        name: 'Name',
        key: 'name',
      },
    ],
    data: sampleData.map((row, i) => ({
      ...row,
      description: `This is a very long description that demonstrates how the table handles lengthy content in cells. It should truncate appropriately and maintain proper layout even with extremely long text content that would normally break the design. Row ${i + 1}.`,
    })),
  },
}

export const ComplexDataTypes: Story = {
  render: (args) => {
    const complexData = [
      {
        id: 1,
        name: 'Mixed Data',
        number: 12345.67,
        boolean: true,
        date: new Date(),
        array: ['tag1', 'tag2', 'tag3'],
        object: { nested: 'value' },
        nullValue: null,
        undefinedValue: undefined,
      },
    ]

    const complexColumns = [
      { name: 'Name', key: 'name' },
      {
        name: 'Number',
        key: 'number',
        selector: (row: DataRow) => row.number?.toLocaleString(),
      },
      {
        name: 'Boolean',
        key: 'boolean',
        cell: (row: DataRow) => (
          <span>{row.boolean ? '✅ Yes' : '❌ No'}</span>
        ),
      },
      {
        name: 'Date',
        key: 'date',
        selector: (row: DataRow) => row.date?.toLocaleDateString(),
      },
      {
        name: 'Array',
        key: 'array',
        cell: (row: DataRow) => (
          <div className="flex flex-wrap gap-1">
            {(row.array || []).map((tag: string, i: number) => (
              <span
                key={i}
                className="px-2 py-1 bg-gray-200 text-xs rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        ),
      },
    ]

    return <DataTable {...args} columns={complexColumns} data={complexData} />
  },
}

// ============================================================================
// ACCESSIBILITY STORY
// ============================================================================

export const Accessibility: Story = {
  render: (args) => (
    <div className="p-4">
      <h3 className="text-lg font-bold mb-4">Keyboard & Screen Reader Test</h3>
      <p className="mb-4 text-sm text-gray-600">
        Use Tab to navigate, Enter/Space for interactions, arrow keys for
        pagination and sorting.
      </p>
      <DataTable
        {...args}
        options={{
          search: true,
          filter: true,
          viewColumns: true,
          download: true,
        }}
        pagination={true}
      />
    </div>
  ),
  args: {
    columns: sampleColumns,
    data: sampleData,
  },
  parameters: {
    a11y: {
      options: {
        rules: {
          'color-contrast': 'enforce',
          'label': 'enforce',
          'page-has-heading-one': 'off',
        },
      },
    },
  },
}

// ============================================================================
// PLAYGROUND
// ============================================================================

export const Playground: Story = {
  args: {
    columns: sampleColumns,
    data: sampleData,
    options: {
      search: true,
      filter: true,
      viewColumns: true,
      download: true,
    },
    pagination: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Interactive playground - use controls to test different configurations.',
      },
    },
  },
}
