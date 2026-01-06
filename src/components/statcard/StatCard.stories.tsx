// src/components/ui/stat-card.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { StatCard } from './StatCard';


const meta = {
  title: 'Components/StatCard',
  component: StatCard,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A versatile StatCard component for displaying statistics with values and labels. Supports multiple variants, sizes, and layout orientations.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'success'],
      description: 'Semantic color variant for the stat card',
      table: {
        type: { summary: 'primary | secondary | success' },
        defaultValue: { summary: 'primary' },
      },
    },
    order: {
      control: 'select',
      options: ['col', 'colR', 'row', 'rowR'],
      description: 'Layout direction and order of value/label',
      table: {
        type: { summary: 'col | colR | row | rowR' },
        defaultValue: { summary: 'col' },
      },
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg'],
      description: 'Size of the stat card',
      table: {
        type: { summary: 'xs | sm | md | lg' },
        defaultValue: { summary: 'sm' },
      },
    },
    value: {
      control: 'text',
      description: 'Main stat value/number displayed prominently',
    },
    label: {
      control: 'text',
      description: 'Label text displayed below the stat value',
    },
    status: {
      control: 'select',
      options: ['high', 'medium', 'low'],
      description: 'Status indicator (future-proof, currently unused)',
    },
    asChild: {
      control: 'boolean',
      description: 'Render as child element using Radix Slot',
      table: {
        defaultValue: { summary: " " },
      },
    },
  },
} satisfies Meta<typeof StatCard>;

export default meta;
type Story = StoryObj<typeof meta>;

/* ------------------------------------------------------
 * Basic Stories
 * ------------------------------------------------------ */

export const Default: Story = {
  args: {
    variant: 'primary',
    value: '1,234',
    label: 'Total Users',
    size: 'sm',
    order: 'col',
  },
};

export const WithLargeNumber: Story = {
  args: {
    variant: 'primary',
    value: '$2.4M',
    label: 'Revenue',
    size: 'md',
    order: 'col',
  },
};

export const WithPercentage: Story = {
  args: {
    variant: 'success',
    value: '+23.4%',
    label: 'Growth Rate',
    size: 'sm',
    order: 'col',
  },
};

/* ------------------------------------------------------
 * Variant Stories
 * ------------------------------------------------------ */

export const PrimaryVariant: Story = {
  args: {
    variant: 'primary',
    value: '1,234',
    label: 'Active Users',
    size: 'md',
  },
};

export const SecondaryVariant: Story = {
  args: {
    variant: 'secondary',
    value: '567',
    label: 'Pending Tasks',
    size: 'md',
  },
};

export const SuccessVariant: Story = {
  args: {
    variant: 'success',
    value: '89.2%',
    label: 'Success Rate',
    size: 'md',
  },
};

/* ------------------------------------------------------
 * Size Stories
 * ------------------------------------------------------ */

export const ExtraSmall: Story = {
  args: {
    variant: 'primary',
    value: '42',
    label: 'Items',
    size: 'xs',
  },
};

export const Small: Story = {
  args: {
    variant: 'primary',
    value: '156',
    label: 'Views',
    size: 'sm',
  },
};

export const Medium: Story = {
  args: {
    variant: 'primary',
    value: '2,345',
    label: 'Downloads',
    size: 'md',
  },
};

export const Large: Story = {
  args: {
    variant: 'primary',
    value: '12.5K',
    label: 'Followers',
    size: 'lg',
  },
};

/* ------------------------------------------------------
 * Order/Layout Stories
 * ------------------------------------------------------ */

export const ColumnLayout: Story = {
  args: {
    variant: 'primary',
    value: '1,234',
    label: 'Users',
    order: 'col',
    size: 'md',
  },
};

export const ColumnReverse: Story = {
  args: {
    variant: 'secondary',
    value: '567',
    label: 'Orders',
    order: 'colR',
    size: 'md',
  },
};

export const RowLayout: Story = {
  args: {
    variant: 'success',
    value: '89%',
    label: 'Rate',
    order: 'row',
    size: 'md',
  },
};

export const RowReverse: Story = {
  args: {
    variant: 'primary',
    value: '234',
    label: 'Items',
    order: 'rowR',
    size: 'md',
  },
};

/* ------------------------------------------------------
 * Custom Content Stories
 * ------------------------------------------------------ */

export const WithCustomContent: Story = {
  args: {
    variant: 'success',
    size: 'md',
    children: (
      <div className="flex flex-col items-center gap-2">
        <div className="text-3xl font-bold text-green-600">↑ 12.5%</div>
        <div className="text-sm text-gray-600">Growth This Month</div>
      </div>
    ),
  },
};

export const WithIcon: Story = {
  args: {
    variant: 'primary',
    size: 'lg',
    children: (
      <div className="flex items-center gap-3">
        <svg
          className="w-8 h-8 text-blue-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
          />
        </svg>
        <div className="flex flex-col">
          <div className="text-2xl font-semibold">1,234</div>
          <div className="text-xs text-gray-500">Total Users</div>
        </div>
      </div>
    ),
  },
};

/* ------------------------------------------------------
 * asChild Stories
 * ------------------------------------------------------ */

export const AsButton: Story = {
  args: {
    asChild: true,
    variant: 'primary',
    value: '1,234',
    label: 'Click me',
    size: 'md',
  },
  render: (args:any) => (
    <StatCard {...args} asChild>
      <button
        onClick={() => alert('StatCard clicked!')}
        style={{ cursor: 'pointer' }}
      >
        <div className="text-2xl font-semibold text-blue-600">1,234</div>
        <div className="text-xs text-gray-600">Click me</div>
      </button>
    </StatCard>
  ),
};

export const AsLink: Story = {
  args: {
    asChild: true,
    variant: 'success',
    size: 'md',
  },
  render: (args:any) => (
    <StatCard {...args} asChild>
      <a href="#stats" style={{ textDecoration: 'none' }}>
        <div className="text-2xl font-semibold text-green-600">89.2%</div>
        <div className="text-xs text-gray-600">View Details</div>
      </a>
    </StatCard>
  ),
};

/* ------------------------------------------------------
 * Grid Display - Show All Variants
 * ------------------------------------------------------ */

export const AllVariants: Story = {
  render: () => (
    <div className="grid grid-cols-3 gap-4 p-8">
      <StatCard variant="primary" value="1,234" label="Primary" size="md" />
      <StatCard variant="secondary" value="567" label="Secondary" size="md" />
      <StatCard variant="success" value="89%" label="Success" size="md" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Displays all three variant types side by side for comparison.',
      },
    },
  },
};

export const AllSizes: Story = {
  render: () => (
    <div className="flex items-end gap-4 p-8">
      <StatCard variant="primary" value="42" label="XS" size="xs" />
      <StatCard variant="primary" value="156" label="SM" size="sm" />
      <StatCard variant="primary" value="2.3K" label="MD" size="md" />
      <StatCard variant="primary" value="12K" label="LG" size="lg" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Displays all four size variants for comparison.',
      },
    },
  },
};

export const AllLayouts: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-4 p-8">
      <StatCard
        variant="primary"
        value="1,234"
        label="Column"
        order="col"
        size="md"
      />
      <StatCard
        variant="secondary"
        value="567"
        label="Column Reverse"
        order="colR"
        size="md"
      />
      <StatCard
        variant="success"
        value="89%"
        label="Row"
        order="row"
        size="md"
      />
      <StatCard
        variant="primary"
        value="234"
        label="Row Reverse"
        order="rowR"
        size="md"
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Displays all four layout orientations for comparison.',
      },
    },
  },
};

/* ------------------------------------------------------
 * Dashboard Example
 * ------------------------------------------------------ */

export const DashboardExample: Story = {
  render: () => (
    <div className="grid grid-cols-4 gap-6 p-8 bg-gray-50 dark:bg-gray-900 rounded-lg">
      <StatCard
        variant="primary"
        value="12,345"
        label="Total Users"
        size="md"
        order="col"
      />
      <StatCard
        variant="secondary"
        value="$45.2K"
        label="Revenue"
        size="md"
        order="col"
      />
      <StatCard
        variant="success"
        value="+23.4%"
        label="Growth"
        size="md"
        order="col"
      />
      <StatCard
        variant="primary"
        value="1,234"
        label="Active Sessions"
        size="md"
        order="col"
      />
    </div>
  ),
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story: 'Example dashboard layout with multiple StatCard components.',
      },
    },
  },
};

/* ------------------------------------------------------
 * Real-World Examples
 * ------------------------------------------------------ */

export const AnalyticsDashboard: Story = {
  render: () => (
    <div className="space-y-6 p-8 max-w-4xl">
      <h2 className="text-2xl font-bold mb-4">Website Analytics</h2>
      
      {/* Top Row */}
      <div className="grid grid-cols-4 gap-4">
        <StatCard variant="primary" value="24.5K" label="Page Views" size="sm" />
        <StatCard variant="primary" value="1,234" label="Visitors" size="sm" />
        <StatCard variant="success" value="3m 42s" label="Avg. Duration" size="sm" />
        <StatCard variant="secondary" value="42.3%" label="Bounce Rate" size="sm" />
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-3 gap-4">
        <StatCard variant="success" value="+12.5%" label="Growth Rate" size="md" />
        <StatCard variant="primary" value="89.2%" label="Conversion" size="md" />
        <StatCard variant="secondary" value="567" label="New Users" size="md" />
      </div>
    </div>
  ),
  parameters: {
    layout: 'fullscreen',
  },
};

export const EcommerceDashboard: Story = {
  render: () => (
    <div className="space-y-6 p-8 max-w-6xl">
      <h2 className="text-2xl font-bold mb-4">Sales Dashboard</h2>
      
      <div className="grid grid-cols-5 gap-4">
        <StatCard variant="success" value="$124K" label="Total Revenue" size="sm" />
        <StatCard variant="primary" value="2,345" label="Orders" size="sm" />
        <StatCard variant="secondary" value="$52.89" label="Avg. Order" size="sm" />
        <StatCard variant="success" value="1,876" label="Customers" size="sm" />
        <StatCard variant="primary" value="94.3%" label="Satisfaction" size="sm" />
      </div>
    </div>
  ),
  parameters: {
    layout: 'fullscreen',
  },
};

/* ------------------------------------------------------
 * Responsive Example
 * ------------------------------------------------------ */

export const ResponsiveLayout: Story = {
  render: () => (
    <div className="p-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard variant="primary" value="12.5K" label="Users" size="md" />
        <StatCard variant="secondary" value="$45.2K" label="Revenue" size="md" />
        <StatCard variant="success" value="+23.4%" label="Growth" size="md" />
        <StatCard variant="primary" value="1,234" label="Orders" size="md" />
      </div>
    </div>
  ),
  parameters: {
    layout: 'fullscreen',
    viewport: {
      defaultViewport: 'responsive',
    },
    docs: {
      description: {
        story: 'Responsive grid layout that adapts to different screen sizes.',
      },
    },
  },
};
