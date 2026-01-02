// src/components/ui/Dropdown.stories.tsx
import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import {
  Dropdown,
  DropdownTrigger,
  DropdownContent,
  DropdownItem,
  DropdownSeparator,
  DropdownLabel,
  type DropdownContentProps,
} from './DropDown'
import { ChevronDown, User, Settings, LogOut, Mail, MessageSquare, Plus, Edit, Trash } from 'lucide-react'

const meta: Meta<typeof Dropdown> = {
  title: 'Components/Dropdown',
  component: Dropdown,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A fully accessible dropdown menu component with smooth Framer Motion animations. Supports keyboard navigation, positioning, and custom content.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    open: {
      control: 'boolean',
      description: 'Controlled open state',
    },
    defaultOpen: {
      control: 'boolean',
      description: 'Default open state (uncontrolled)',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    onOpenChange: {
      control: false,
      description: 'Callback when open state changes',
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

// ============================================================================
// BASIC EXAMPLES
// ============================================================================

export const Default: Story = {
  render: () => (
    <Dropdown>
      <DropdownTrigger className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
        Open Menu <ChevronDown className="ml-2 h-4 w-4" />
      </DropdownTrigger>
      <DropdownContent>
        <DropdownItem>
          <User className="mr-2 h-4 w-4" />
          Profile
        </DropdownItem>
        <DropdownItem>
          <Settings className="mr-2 h-4 w-4" />
          Settings
        </DropdownItem>
        <DropdownSeparator />
        <DropdownItem>
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </DropdownItem>
      </DropdownContent>
    </Dropdown>
  ),
}

export const WithLabels: Story = {
  render: () => (
    <Dropdown>
      <DropdownTrigger className="px-4 py-2 border rounded-md hover:bg-gray-50">
        Account Options <ChevronDown className="ml-2 h-4 w-4" />
      </DropdownTrigger>
      <DropdownContent className="w-56">
        <DropdownLabel>My Account</DropdownLabel>
        <DropdownItem>
          <User className="mr-2 h-4 w-4" />
          Profile
        </DropdownItem>
        <DropdownItem>
          <Settings className="mr-2 h-4 w-4" />
          Settings
        </DropdownItem>
        <DropdownSeparator />
        <DropdownLabel>Communication</DropdownLabel>
        <DropdownItem>
          <Mail className="mr-2 h-4 w-4" />
          Email
        </DropdownItem>
        <DropdownItem>
          <MessageSquare className="mr-2 h-4 w-4" />
          Messages
        </DropdownItem>
        <DropdownSeparator />
        <DropdownItem>
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </DropdownItem>
      </DropdownContent>
    </Dropdown>
  ),
}

export const WithDisabledItems: Story = {
  render: () => (
    <Dropdown>
      <DropdownTrigger className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
        Actions <ChevronDown className="ml-2 h-4 w-4" />
      </DropdownTrigger>
      <DropdownContent className="w-48">
        <DropdownItem>
          <Edit className="mr-2 h-4 w-4" />
          Edit
        </DropdownItem>
        <DropdownItem disabled>
          <Trash className="mr-2 h-4 w-4" />
          Delete (disabled)
        </DropdownItem>
        <DropdownSeparator />
        <DropdownItem>
          <Plus className="mr-2 h-4 w-4" />
          Add New
        </DropdownItem>
      </DropdownContent>
    </Dropdown>
  ),
}

// ============================================================================
// POSITIONING
// ============================================================================

export const PositionBottom: Story = {
  render: () => (
    <Dropdown>
      <DropdownTrigger className="px-4 py-2 border rounded-md hover:bg-gray-50">
        Bottom (Default)
      </DropdownTrigger>
      <DropdownContent side="bottom">
        <DropdownItem>Option 1</DropdownItem>
        <DropdownItem>Option 2</DropdownItem>
        <DropdownItem>Option 3</DropdownItem>
      </DropdownContent>
    </Dropdown>
  ),
}

export const PositionTop: Story = {
  render: () => (
    <Dropdown>
      <DropdownTrigger className="px-4 py-2 border rounded-md hover:bg-gray-50">
        Top
      </DropdownTrigger>
      <DropdownContent side="top">
        <DropdownItem>Option 1</DropdownItem>
        <DropdownItem>Option 2</DropdownItem>
        <DropdownItem>Option 3</DropdownItem>
      </DropdownContent>
    </Dropdown>
  ),
}

export const PositionLeft: Story = {
  render: () => (
    <Dropdown>
      <DropdownTrigger className="px-4 py-2 border rounded-md hover:bg-gray-50">
        Left
      </DropdownTrigger>
      <DropdownContent side="left">
        <DropdownItem>Option 1</DropdownItem>
        <DropdownItem>Option 2</DropdownItem>
        <DropdownItem>Option 3</DropdownItem>
      </DropdownContent>
    </Dropdown>
  ),
}

export const PositionRight: Story = {
  render: () => (
    <Dropdown>
      <DropdownTrigger className="px-4 py-2 border rounded-md hover:bg-gray-50">
        Right
      </DropdownTrigger>
      <DropdownContent side="right">
        <DropdownItem>Option 1</DropdownItem>
        <DropdownItem>Option 2</DropdownItem>
        <DropdownItem>Option 3</DropdownItem>
      </DropdownContent>
    </Dropdown>
  ),
}

export const AlignmentStart: Story = {
  render: () => (
    <Dropdown>
      <DropdownTrigger className="px-4 py-2 border rounded-md hover:bg-gray-50">
        Align Start
      </DropdownTrigger>
      <DropdownContent side="bottom" align="start" className="w-64">
        <DropdownItem>This dropdown aligns to the start of the trigger</DropdownItem>
        <DropdownItem>Option 2</DropdownItem>
      </DropdownContent>
    </Dropdown>
  ),
}

export const AlignmentCenter: Story = {
  render: () => (
    <Dropdown>
      <DropdownTrigger className="px-4 py-2 border rounded-md hover:bg-gray-50">
        Align Center
      </DropdownTrigger>
      <DropdownContent side="bottom" align="center" className="w-64">
        <DropdownItem>This dropdown is centered on the trigger</DropdownItem>
        <DropdownItem>Option 2</DropdownItem>
      </DropdownContent>
    </Dropdown>
  ),
}

export const AlignmentEnd: Story = {
  render: () => (
    <Dropdown>
      <DropdownTrigger className="px-4 py-2 border rounded-md hover:bg-gray-50">
        Align End
      </DropdownTrigger>
      <DropdownContent side="bottom" align="end" className="w-64">
        <DropdownItem>This dropdown aligns to the end of the trigger</DropdownItem>
        <DropdownItem>Option 2</DropdownItem>
      </DropdownContent>
    </Dropdown>
  ),
}

// ============================================================================
// CONTROLLED MODE
// ============================================================================

export const Controlled: Story = {
  render: () => {
    const [open, setOpen] = useState(false)

    return (
      <div className="space-y-4">
        <div className="flex gap-2">
          <button
            onClick={() => setOpen(true)}
            className="px-3 py-1 bg-green-600 text-white rounded text-sm"
          >
            Open
          </button>
          <button
            onClick={() => setOpen(false)}
            className="px-3 py-1 bg-red-600 text-white rounded text-sm"
          >
            Close
          </button>
          <button
            onClick={() => setOpen(!open)}
            className="px-3 py-1 bg-blue-600 text-white rounded text-sm"
          >
            Toggle
          </button>
        </div>
        <p className="text-sm">
          Dropdown is: <strong>{open ? 'Open' : 'Closed'}</strong>
        </p>
        <Dropdown open={open} onOpenChange={setOpen}>
          <DropdownTrigger className="px-4 py-2 border rounded-md hover:bg-gray-50">
            Controlled Menu
          </DropdownTrigger>
          <DropdownContent>
            <DropdownItem>Option 1</DropdownItem>
            <DropdownItem>Option 2</DropdownItem>
            <DropdownItem>Option 3</DropdownItem>
          </DropdownContent>
        </Dropdown>
      </div>
    )
  },
}

// ============================================================================
// CUSTOM CONTENT
// ============================================================================

export const WithCustomContent: Story = {
  render: () => (
    <Dropdown>
      <DropdownTrigger className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
        User Profile
      </DropdownTrigger>
      <DropdownContent className="w-72 p-4">
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-semibold">
              JD
            </div>
            <div>
              <p className="font-semibold">John Doe</p>
              <p className="text-sm text-gray-500">john@example.com</p>
            </div>
          </div>
          <div className="border-t pt-3">
            <DropdownItem>View Profile</DropdownItem>
            <DropdownItem>Account Settings</DropdownItem>
            <DropdownItem>Billing</DropdownItem>
          </div>
        </div>
      </DropdownContent>
    </Dropdown>
  ),
}

export const WithForm: Story = {
  render: () => (
    <Dropdown>
      <DropdownTrigger className="px-4 py-2 border rounded-md hover:bg-gray-50">
        Quick Actions
      </DropdownTrigger>
      <DropdownContent className="w-64 p-4" preventClose>
        <div className="space-y-3">
          <h3 className="font-semibold text-sm">Create New Item</h3>
          <div>
            <label htmlFor="item-name" className="block text-xs font-medium mb-1">
              Name
            </label>
            <input
              id="item-name"
              type="text"
              className="w-full px-2 py-1 border rounded text-sm"
              placeholder="Enter name"
            />
          </div>
          <div>
            <label htmlFor="item-type" className="block text-xs font-medium mb-1">
              Type
            </label>
            <select id="item-type" className="w-full px-2 py-1 border rounded text-sm">
              <option>Document</option>
              <option>Folder</option>
              <option>Link</option>
            </select>
          </div>
          <div className="flex gap-2">
            <button className="flex-1 px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700">
              Create
            </button>
            <button className="flex-1 px-3 py-1 border rounded text-sm hover:bg-gray-50">
              Cancel
            </button>
          </div>
        </div>
      </DropdownContent>
    </Dropdown>
  ),
}

export const WithCheckboxes: Story = {
  render: () => {
    const [selected, setSelected] = useState<string[]>(['email'])

    const toggleItem = (item: string) => {
      setSelected((prev) =>
        prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item],
      )
    }

    return (
      <Dropdown>
        <DropdownTrigger className="px-4 py-2 border rounded-md hover:bg-gray-50">
          Notifications ({selected.length})
        </DropdownTrigger>
        <DropdownContent className="w-56" preventClose>
          <DropdownLabel>Enable Notifications</DropdownLabel>
          <DropdownItem
            onClick={() => toggleItem('email')}
            className="justify-between"
          >
            Email
            <input
              type="checkbox"
              checked={selected.includes('email')}
              onChange={() => {}}
              className="ml-auto"
            />
          </DropdownItem>
          <DropdownItem
            onClick={() => toggleItem('sms')}
            className="justify-between"
          >
            SMS
            <input
              type="checkbox"
              checked={selected.includes('sms')}
              onChange={() => {}}
              className="ml-auto"
            />
          </DropdownItem>
          <DropdownItem
            onClick={() => toggleItem('push')}
            className="justify-between"
          >
            Push
            <input
              type="checkbox"
              checked={selected.includes('push')}
              onChange={() => {}}
              className="ml-auto"
            />
          </DropdownItem>
        </DropdownContent>
      </Dropdown>
    )
  },
}

// ============================================================================
// COMPLEX EXAMPLES
// ============================================================================

export const NestedMenu: Story = {
  render: () => (
    <div className="space-y-4">
      <p className="text-sm text-gray-600">
        Note: True nested dropdowns require additional state management
      </p>
      <Dropdown>
        <DropdownTrigger className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
          File Menu
        </DropdownTrigger>
        <DropdownContent className="w-48">
          <DropdownItem>New File</DropdownItem>
          <DropdownItem>New Folder</DropdownItem>
          <DropdownSeparator />
          <DropdownItem>Open...</DropdownItem>
          <DropdownItem>Save</DropdownItem>
          <DropdownItem>Save As...</DropdownItem>
          <DropdownSeparator />
          <DropdownItem>Export →</DropdownItem>
          <DropdownItem>Import →</DropdownItem>
          <DropdownSeparator />
          <DropdownItem>Close</DropdownItem>
        </DropdownContent>
      </Dropdown>
    </div>
  ),
}

export const WithOffsets: Story = {
  render: () => (
    <div className="flex gap-4">
      <Dropdown>
        <DropdownTrigger className="px-4 py-2 border rounded-md hover:bg-gray-50">
          Default Offset
        </DropdownTrigger>
        <DropdownContent>
          <DropdownItem>Option 1</DropdownItem>
          <DropdownItem>Option 2</DropdownItem>
        </DropdownContent>
      </Dropdown>

      <Dropdown>
        <DropdownTrigger className="px-4 py-2 border rounded-md hover:bg-gray-50">
          Large Offset
        </DropdownTrigger>
        <DropdownContent sideOffset={20} alignOffset={10}>
          <DropdownItem>Option 1</DropdownItem>
          <DropdownItem>Option 2</DropdownItem>
        </DropdownContent>
      </Dropdown>
    </div>
  ),
}

export const ManyItems: Story = {
  render: () => (
    <Dropdown>
      <DropdownTrigger className="px-4 py-2 border rounded-md hover:bg-gray-50">
        Select Country
      </DropdownTrigger>
      <DropdownContent className="max-h-64 overflow-y-auto">
        {[
          'United States',
          'United Kingdom',
          'Canada',
          'Australia',
          'Germany',
          'France',
          'Italy',
          'Spain',
          'Netherlands',
          'Sweden',
          'Norway',
          'Denmark',
          'Finland',
          'Poland',
          'Japan',
          'South Korea',
          'China',
          'India',
          'Brazil',
          'Mexico',
        ].map((country) => (
          <DropdownItem key={country}>{country}</DropdownItem>
        ))}
      </DropdownContent>
    </Dropdown>
  ),
}
