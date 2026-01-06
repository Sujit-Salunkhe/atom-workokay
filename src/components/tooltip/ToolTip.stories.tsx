// src/components/tooltip/Tooltip.stories.tsx
import type { Meta, StoryObj } from '@storybook/react'
import { Tooltip} from './ToolTip'

const meta = {
  title: 'Components/Tooltip',
  component: Tooltip,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A simple tooltip component that displays helpful information on hover or focus.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['soft', 'solid', 'outline', 'primary'],
      description: 'Visual style variant',
      table: {
        defaultValue: { summary: 'primary' },
      },
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Tooltip size',
      table: {
        defaultValue: { summary: 'md' },
      },
    },
    side: {
      control: 'select',
      options: ['top', 'right', 'bottom', 'left'],
      description: 'Position relative to trigger',
      table: {
        defaultValue: { summary: 'right' },
      },
    },
    showArrow: {
      control: 'boolean',
      description: 'Show arrow indicator',
    },
  },
  decorators: [
    (Story) => (
      <div className="atom-theme p-20">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Tooltip>

export default meta
type Story = StoryObj<typeof meta>

// ============================================================================
// BASIC EXAMPLES
// ============================================================================

export const Default: Story = {
  args: {
    content: 'This is a tooltip',
    children: (
      <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
        Hover me
      </button>
    ),
  },
}

export const SimpleText: Story = {
  args: {
    content: 'Helpful information',
    children: <span className="underline cursor-help">Hover for help</span>,
  },
}

export const OnLink: Story = {
  args: {
    content: 'Opens in a new window',
    children: (
      <a href="#" className="text-blue-600 hover:underline">
        External link
      </a>
    ),
  },
}

// ============================================================================
// VARIANTS
// ============================================================================

export const Variants: Story = {
  args: {
    content: '',
    children: <div />,
  },
  render: () => (
    <div className="flex gap-4">
      <Tooltip content="Soft variant" variant="soft">
        <button className="px-4 py-2 bg-gray-100 rounded-md hover:bg-gray-200">
          Soft
        </button>
      </Tooltip>

      <Tooltip content="Solid variant" variant="solid">
        <button className="px-4 py-2 bg-gray-100 rounded-md hover:bg-gray-200">
          Solid
        </button>
      </Tooltip>

      <Tooltip content="Outline variant" variant="outline">
        <button className="px-4 py-2 bg-gray-100 rounded-md hover:bg-gray-200">
          Outline
        </button>
      </Tooltip>

      <Tooltip content="Primary variant" variant="default">
        <button className="px-4 py-2 bg-gray-100 rounded-md hover:bg-gray-200">
          Primary
        </button>
      </Tooltip>
    </div>
  ),
}

// ============================================================================
// SIZES
// ============================================================================

export const Sizes: Story = {
  args: {
    content: '',
    children: <div />,
  },
  render: () => (
    <div className="flex gap-4">
      <Tooltip content="Small" size="sm">
        <button className="px-3 py-1.5 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700">
          Small
        </button>
      </Tooltip>

      <Tooltip content="Medium (default)" size="md">
        <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
          Medium
        </button>
      </Tooltip>

      <Tooltip content="Large tooltip text" size="lg">
        <button className="px-5 py-2.5 bg-blue-600 text-white rounded-md hover:bg-blue-700">
          Large
        </button>
      </Tooltip>
    </div>
  ),
}

// ============================================================================
// POSITIONS
// ============================================================================

export const Positions: Story = {
  args: {
    content: '',
    children: <div />,
  },
  render: () => (
    <div className="grid grid-cols-3 gap-8 place-items-center">
      <div />
      <Tooltip content="Top position" side="top">
        <button className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700">
          Top
        </button>
      </Tooltip>
      <div />

      <Tooltip content="Left position" side="left">
        <button className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700">
          Left
        </button>
      </Tooltip>
      <div className="text-sm text-gray-500">Hover buttons</div>
      <Tooltip content="Right position" side="right">
        <button className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700">
          Right
        </button>
      </Tooltip>

      <div />
      <Tooltip content="Bottom position" side="bottom">
        <button className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700">
          Bottom
        </button>
      </Tooltip>
      <div />
    </div>
  ),
}

// ============================================================================
// WITH ARROW
// ============================================================================

export const WithArrow: Story = {
  args: {
    content: 'Tooltip with arrow',
    showArrow: true,
    children: (
      <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700">
        Hover me
      </button>
    ),
  },
}

export const ArrowDirections: Story = {
  args: {
    content: '',
    children: <div />,
  },
  render: () => (
    <div className="grid grid-cols-2 gap-8">
      <Tooltip content="Arrow pointing down" side="top" showArrow>
        <button className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
          Top
        </button>
      </Tooltip>

      <Tooltip content="Arrow pointing left" side="right" showArrow>
        <button className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
          Right
        </button>
      </Tooltip>

      <Tooltip content="Arrow pointing up" side="bottom" showArrow>
        <button className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
          Bottom
        </button>
      </Tooltip>

      <Tooltip content="Arrow pointing right" side="left" showArrow>
        <button className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
          Left
        </button>
      </Tooltip>
    </div>
  ),
}

// ============================================================================
// FORM LABELS
// ============================================================================

export const FormLabel: Story = {
  args: {
    content: '',
    children: <div />,
  },
  render: () => (
    <div className="space-y-4 max-w-sm">
      <div>
        <label className="flex items-center gap-2 text-sm font-medium mb-1.5">
          Email Address
          <Tooltip content="We'll never share your email" side="right">
            <span className="text-gray-400 cursor-help text-xs">(?)</span>
          </Tooltip>
        </label>
        <input
          type="email"
          placeholder="you@example.com"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="flex items-center gap-2 text-sm font-medium mb-1.5">
          Password
          <Tooltip
            content="Must be at least 8 characters"
            side="right"
            variant="soft"
          >
            <span className="text-gray-400 cursor-help text-xs">(?)</span>
          </Tooltip>
        </label>
        <input
          type="password"
          placeholder="Enter password"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
    </div>
  ),
}

// ============================================================================
// BUTTON ACTIONS
// ============================================================================

export const ButtonActions: Story = {
  args: {
    content: '',
    children: <div />,
  },
  render: () => (
    <div className="flex gap-3">
      <Tooltip content="Save changes">
        <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700">
          Save
        </button>
      </Tooltip>

      <Tooltip content="Cancel and go back">
        <button className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700">
          Cancel
        </button>
      </Tooltip>

      <Tooltip content="Delete permanently" variant="solid">
        <button className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700">
          Delete
        </button>
      </Tooltip>
    </div>
  ),
}

// ============================================================================
// LONGER CONTENT
// ============================================================================

export const LongerContent: Story = {
  args: {
    content: 'This is a longer tooltip message that provides more detailed information',
    size: 'lg',
    children: (
      <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
        More info
      </button>
    ),
  },
}

export const MultilineContent: Story = {
  args: {
    content: (
      <div className="max-w-xs">
        <p className="mb-1">Important information:</p>
        <p className="text-xs">This action cannot be undone</p>
      </div>
    ),
    size: 'lg',
    side: 'top',
    children: (
      <button className="px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700">
        Warning
      </button>
    ),
  },
}

// ============================================================================
// DISABLED ELEMENTS
// ============================================================================

export const DisabledElement: Story = {
  args: {
    content: '',
    children: <div />,
  },
  render: () => (
    <div className="space-y-3">
      <Tooltip content="This button is disabled">
        <span className="inline-block">
          <button
            disabled
            className="px-4 py-2 bg-gray-300 text-gray-500 rounded-md cursor-not-allowed"
          >
            Disabled
          </button>
        </span>
      </Tooltip>
      <p className="text-xs text-gray-600">
        Wrap disabled elements in a span for tooltips to work
      </p>
    </div>
  ),
}

// ============================================================================
// TABLE CELLS
// ============================================================================

export const InTable: Story = {
  args: {
    content: '',
    children: <div />,
  },
  render: () => (
    <table className="border border-gray-200 rounded-md">
      <thead className="bg-gray-50">
        <tr>
          <th className="px-4 py-2 text-left text-sm font-medium">Name</th>
          <th className="px-4 py-2 text-left text-sm font-medium">Status</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td className="px-4 py-2 text-sm">
            <Tooltip content="Full name: John Michael Doe">
              <span className="cursor-help border-b border-dotted border-gray-400">
                John Doe
              </span>
            </Tooltip>
          </td>
          <td className="px-4 py-2">
            <Tooltip content="Active since January 2026">
              <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full cursor-help">
                Active
              </span>
            </Tooltip>
          </td>
        </tr>
        <tr>
          <td className="px-4 py-2 text-sm">
            <Tooltip content="Full name: Jane Elizabeth Smith">
              <span className="cursor-help border-b border-dotted border-gray-400">
                Jane Smith
              </span>
            </Tooltip>
          </td>
          <td className="px-4 py-2">
            <Tooltip content="Pending approval">
              <span className="px-2 py-1 bg-yellow-100 text-yellow-700 text-xs rounded-full cursor-help">
                Pending
              </span>
            </Tooltip>
          </td>
        </tr>
      </tbody>
    </table>
  ),
}

// ============================================================================
// ABBREVIATIONS
// ============================================================================

export const Abbreviations: Story = {
  args: {
    content: '',
    children: <div />,
  },
  render: () => (
    <div className="space-y-3 max-w-md">
      <p className="text-sm">
        The{' '}
        <Tooltip content="User Interface">
          <abbr className="cursor-help border-b border-dotted">UI</abbr>
        </Tooltip>{' '}
        should be intuitive and easy to use.
      </p>

      <p className="text-sm">
        We use{' '}
        <Tooltip content="Application Programming Interface">
          <abbr className="cursor-help border-b border-dotted">API</abbr>
        </Tooltip>{' '}
        to connect services.
      </p>

      <p className="text-sm">
        The{' '}
        <Tooltip content="Cascading Style Sheets">
          <abbr className="cursor-help border-b border-dotted">CSS</abbr>
        </Tooltip>{' '}
        framework makes styling easier.
      </p>
    </div>
  ),
}

// ============================================================================
// KEYBOARD ACCESSIBILITY
// ============================================================================

export const KeyboardAccessible: Story = {
  args: {
    content: '',
    children: <div />,
  },
  render: () => (
    <div className="space-y-4">
      <p className="text-sm text-gray-600">
        Tab through these buttons - tooltips appear on focus
      </p>
      <div className="flex gap-3">
        <Tooltip content="First button">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500">
            Button 1
          </button>
        </Tooltip>
        <Tooltip content="Second button">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500">
            Button 2
          </button>
        </Tooltip>
        <Tooltip content="Third button">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500">
            Button 3
          </button>
        </Tooltip>
      </div>
    </div>
  ),
}

// ============================================================================
// CARD EXAMPLE
// ============================================================================

export const SimpleCard: Story = {
  args: {
    content: '',
    children: <div />,
  },
  render: () => (
    <div className="border border-gray-200 rounded-lg p-6 max-w-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Settings</h3>
        <Tooltip content="Last updated 2 hours ago">
          <span className="text-xs text-gray-500 cursor-help">Updated</span>
        </Tooltip>
      </div>
      <p className="text-sm text-gray-600">
        Manage your account preferences and settings.
      </p>
    </div>
  ),
}
