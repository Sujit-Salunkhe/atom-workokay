// src/components/ui/paper.stories.tsx
import type { Meta, StoryObj } from '@storybook/react'
import { Paper } from './Paper'

const meta = {
  title: 'Components/Paper',
  component: Paper,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['outlined', 'flat', 'dashed'],
      description: 'Visual style variant of the paper',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'outlined' },
      },
    },
    size: {
      control: 'select',
      options: ['none', 'sm', 'md', 'lg'],
      description: 'Text size of the paper content',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'md' },
      },
    },
    padding: {
      control: 'select',
      options: ['none', 'sm', 'md', 'lg'],
      description: 'Padding inside the paper',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'md' },
      },
    },
    radius: {
      control: 'select',
      options: ['none', 'sm', 'md', 'lg'],
      description: 'Border radius of the paper',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'md' },
      },
    },
    asChild: {
      control: 'boolean',
      description: 'Merge props with child element',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'md' },
      },
    },
  },
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Paper>

export default meta
type Story = StoryObj<typeof meta>

// Default story with interactive controls
export const Playground: Story = {
  args: {
    variant: 'outlined',
    size: 'md',
    padding: 'md',
    radius: 'md',
    children: (
      <div>
        <h3 className="text-lg font-semibold mb-2">Paper Component</h3>
        <p className="text-sm">
          Use the controls below to customize this paper component.
        </p>
      </div>
    ),
  },
}

// All variants showcase
export const Variants: Story = {
  render: () => (
    <div className="space-y-4 w-100">
      <Paper variant="outlined">
        <h4 className="font-semibold mb-1">Outlined</h4>
        <p className="text-sm">Border-based design with subtle emphasis</p>
      </Paper>

      <Paper variant="flat">
        <h4 className="font-semibold mb-1">Flat</h4>
        <p className="text-sm">Simple background with no border</p>
      </Paper>

      <Paper variant="dashed">
        <h4 className="font-semibold mb-1">Dashed</h4>
        <p className="text-sm">Dashed border for placeholders or empty states</p>
      </Paper>
    </div>
  ),
}

// Padding variations
export const PaddingOptions: Story = {
  render: () => (
    <div className="space-y-4 w-100">
      <Paper padding="none" variant="outlined">
        <div className="bg-blue-100 p-2">No padding - Custom content padding</div>
      </Paper>

      <Paper padding="sm" variant="outlined">
        <p>Small padding (p-4)</p>
      </Paper>

      <Paper padding="md" variant="outlined">
        <p>Medium padding (p-6) - Default</p>
      </Paper>

      <Paper padding="lg" variant="outlined">
        <p>Large padding (p-8)</p>
      </Paper>
    </div>
  ),
}

// Border radius variations
export const RadiusOptions: Story = {
  render: () => (
    <div className="space-y-4 w-100">
      <Paper radius="none" variant="outlined">Sharp corners (none)</Paper>
      <Paper radius="sm" variant="outlined">Small radius (sm)</Paper>
      <Paper radius="md" variant="outlined">Medium radius (md) - Default</Paper>
      <Paper radius="lg" variant="outlined">Large radius (lg)</Paper>
    </div>
  ),
}

// Size variations (text size)
export const SizeOptions: Story = {
  render: () => (
    <div className="space-y-4 w-100">
      <Paper size="sm" variant="outlined">
        <p>Small text size</p>
      </Paper>

      <Paper size="md" variant="outlined">
        <p>Medium text size (default)</p>
      </Paper>

      <Paper size="lg" variant="outlined">
        <p>Large text size</p>
      </Paper>
    </div>
  ),
}



// AsChild usage with different HTML elements
export const AsChildUsage: Story = {
  render: () => (
    <div className="space-y-4 w-100">
      <Paper asChild variant="flat">
        <article>
          <h3 className="font-semibold mb-2">Article Element</h3>
          <p className="text-sm">Using semantic HTML with asChild prop</p>
        </article>
      </Paper>

      <Paper asChild variant="outlined">
        <section>
          <h3 className="font-semibold mb-2">Section Element</h3>
          <p className="text-sm">Great for layout sections</p>
        </section>
      </Paper>

      <Paper asChild variant="outlined">
        <a href="#" className="block hover:bg-gray-50 transition-colors">
          <h3 className="font-semibold mb-2">Link Element</h3>
          <p className="text-sm">Clickable card as anchor tag</p>
        </a>
      </Paper>
    </div>
  ),
}

// Content card example
export const ContentCard: Story = {
  render: () => (
    <Paper variant="outlined" className="w-100">
      <div className="mb-4">
        <h2 className="text-xl font-bold mb-2">Card Title</h2>
        <p className="text-sm opacity-60">Posted on Dec 24, 2025</p>
      </div>
      <p className="text-sm mb-4">
        This is an example of using Paper component as a content card. It can
        contain any type of content including text, images, and interactive
        elements.
      </p>
      <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
        Read More
      </button>
    </Paper>
  ),
}

// Dashboard widget example
export const DashboardWidget: Story = {
  render: () => (
    <Paper variant="flat" padding="lg" className="w-75">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold">Total Sales</h3>
        <span className="text-xs text-green-600 font-medium">+12.5%</span>
      </div>
      <p className="text-3xl font-bold">₹24,568</p>
      <p className="text-xs opacity-60 mt-2">Last 30 days</p>
    </Paper>
  ),
}

// Form container example
export const FormContainer: Story = {
  render: () => (
    <Paper variant="outlined" padding="lg" className="w-100">
      <h2 className="text-xl font-bold mb-4">Login Form</h2>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            className="w-full px-3 py-2 border rounded-md"
            placeholder="you@example.com"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Password</label>
          <input
            type="password"
            className="w-full px-3 py-2 border rounded-md"
            placeholder="••••••••"
          />
        </div>
        <button className="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
          Sign In
        </button>
      </div>
    </Paper>
  ),
}

// Empty state placeholder with dashed variant
export const EmptyState1: Story = {
  render: () => (
    <Paper variant="flat" padding="lg" className="w-[400px] text-center shadow-[var(--atom-shadow-xs2)]">
      <div className="opacity-40 mb-2">
        <svg
          className="mx-auto h-12 w-12"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
      </div>
      <h3 className="font-semibold mb-1">No documents yet</h3>
      <p className="text-sm opacity-60">
        Upload your first document to get started
      </p>
    </Paper>
  ),
}
// Empty state placeholder with dashed variant
export const EmptyState2: Story = {
  render: () => (
    <Paper variant="flat" padding="lg" className="w-[400px] text-center shadow-[var(--atom-shadow-sm)]">
      <div className="opacity-40 mb-2">
        <svg
          className="mx-auto h-12 w-12"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
      </div>
      <h3 className="font-semibold mb-1">No documents yet</h3>
      <p className="text-sm opacity-60">
        Upload your first document to get started
      </p>
    </Paper>
  ),
}
export const EmptyState3: Story = {
  render: () => (
    <Paper variant="flat" padding="lg" className="w-[400px] text-center shadow-[var(--atom-shadow-md)]">
      <div className="opacity-40 mb-2">
        <svg
          className="mx-auto h-12 w-12"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
      </div>
      <h3 className="font-semibold mb-1">No documents yet</h3>
      <p className="text-sm opacity-60">
        Upload your first document to get started
      </p>
    </Paper>
  ),
}
export const EmptyState4: Story = {
  render: () => (
    <Paper variant="flat" padding="lg" className="w-[400px] text-center shadow-[var(--atom-shadow-lg)]">
      <div className="opacity-40 mb-2">
        <svg
          className="mx-auto h-12 w-12"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
      </div>
      <h3 className="font-semibold mb-1">No documents yet</h3>
      <p className="text-sm opacity-60">
        Upload your first document to get started
      </p>
    </Paper>
  ),
}

// Upload zone example with dashed variant
export const UploadZone: Story = {
  render: () => (
    <Paper 
      variant="dashed" 
      padding="lg" 
      className="w-[400px] text-center cursor-pointer hover:bg-gray-50 transition-colors"
    >
      <svg
        className="mx-auto h-12 w-12 mb-3 opacity-40"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
        />
      </svg>
      <h3 className="font-semibold mb-1">Click to upload</h3>
      <p className="text-sm opacity-60">
        or drag and drop files here
      </p>
    </Paper>
  ),
}

// Product card example
export const ProductCard: Story = {
  render: () => (
    <Paper variant="outlined" padding="none" className="w-[280px] overflow-hidden">
      <div className="h-48 bg-gray-200 flex items-center justify-center">
        <span className="text-gray-400">Product Image</span>
      </div>
      <div className="p-4">
        <h3 className="font-semibold mb-1">Product Name</h3>
        <p className="text-sm opacity-60 mb-3">
          Short product description goes here
        </p>
        <div className="flex items-center justify-between">
          <span className="text-xl font-bold">₹1,299</span>
          <button className="px-4 py-2 bg-blue-500 text-white text-sm rounded hover:bg-blue-600">
            Add to Cart
          </button>
        </div>
      </div>
    </Paper>
  ),
}

// Notification card
export const NotificationCard: Story = {
  render: () => (
    <Paper variant="flat" className="w-[400px]">
      <div className="flex gap-3">
        <div className="flex-shrink-0">
          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
            <span className="text-blue-600 text-xl">🔔</span>
          </div>
        </div>
        <div className="flex-1">
          <h4 className="font-semibold mb-1">New Update Available</h4>
          <p className="text-sm opacity-60">
            Version 2.0 is now available for download.
          </p>
          <p className="text-xs opacity-40 mt-2">2 hours ago</p>
        </div>
      </div>
    </Paper>
  ),
}

// Stats grid
export const StatsGrid: Story = {
  render: () => (
    <div className="grid grid-cols-3 gap-4">
      <Paper variant="outlined" padding="md">
        <p className="text-sm opacity-60 mb-1">Total Users</p>
        <p className="text-2xl font-bold">1,234</p>
      </Paper>
      <Paper variant="outlined" padding="md">
        <p className="text-sm opacity-60 mb-1">Revenue</p>
        <p className="text-2xl font-bold">₹45K</p>
      </Paper>
      <Paper variant="outlined" padding="md">
        <p className="text-sm opacity-60 mb-1">Growth</p>
        <p className="text-2xl font-bold">+12%</p>
      </Paper>
    </div>
  ),
}

// Profile card
export const ProfileCard: Story = {
  render: () => (
    <Paper variant="outlined" className="w-[320px]">
      <div className="flex flex-col items-center text-center">
        <div className="w-20 h-20 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full mb-4" />
        <h3 className="text-lg font-bold mb-1">John Doe</h3>
        <p className="text-sm opacity-60 mb-4">Full Stack Developer</p>
        <div className="flex gap-2 mb-4">
          <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">React</span>
          <span className="px-3 py-1 bg-green-100 text-green-700 text-xs rounded-full">Node.js</span>
          <span className="px-3 py-1 bg-purple-100 text-purple-700 text-xs rounded-full">TypeScript</span>
        </div>
        <button className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          View Profile
        </button>
      </div>
    </Paper>
  ),
}

// Pricing card
export const PricingCard: Story = {
  render: () => (
    <Paper variant="outlined" className="w-[320px]">
      <div className="text-center mb-6">
        <h3 className="text-lg font-bold mb-2">Pro Plan</h3>
        <div className="mb-2">
          <span className="text-4xl font-bold">₹999</span>
          <span className="text-sm opacity-60">/month</span>
        </div>
        <p className="text-sm opacity-60">Perfect for professionals</p>
      </div>
      <ul className="space-y-3 mb-6">
        <li className="flex items-center gap-2 text-sm">
          <span className="text-green-500">✓</span>
          Unlimited projects
        </li>
        <li className="flex items-center gap-2 text-sm">
          <span className="text-green-500">✓</span>
          Priority support
        </li>
        <li className="flex items-center gap-2 text-sm">
          <span className="text-green-500">✓</span>
          Advanced analytics
        </li>
        <li className="flex items-center gap-2 text-sm">
          <span className="text-green-500">✓</span>
          Custom integrations
        </li>
      </ul>
      <button className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
        Get Started
      </button>
    </Paper>
  ),
}
