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
} from './DropdownTest'
import {
  ChevronDown,
  User,
  Settings,
  LogOut,
  Mail,
  MessageSquare,
  Plus,
  Edit,
  Trash,
  Check,
} from 'lucide-react'

const meta: Meta<typeof Dropdown> = {
  title: 'Components/DropdownTest',
  component: Dropdown,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A fully accessible dropdown menu component with smooth Framer Motion animations. Supports keyboard navigation, positioning, selected values, and custom content.',
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
    value: {
      control: 'text',
      description: 'Selected value (controlled)',
    },
    onOpenChange: {
      control: false,
      description: 'Callback when open state changes',
    },
    onValueChange: {
      control: false,
      description: 'Callback when selected value changes',
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
        <DropdownItem value="profile">
          <User className="mr-2 h-4 w-4" />
          Profile
        </DropdownItem>
        <DropdownItem value="settings">
          <Settings className="mr-2 h-4 w-4" />
          Settings
        </DropdownItem>
        <DropdownSeparator />
        <DropdownItem value="logout">
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </DropdownItem>
      </DropdownContent>
    </Dropdown>
  ),
}

export const WithSelectedValue: Story = {
  render: () => {
    const [selected, setSelected] = useState('settings')

    return (
      <div className="space-y-4">
        <p className="text-sm">
          Selected: <strong>{selected}</strong>
        </p>
        <Dropdown value={selected} onValueChange={setSelected}>
          <DropdownTrigger className="px-4 py-2 border rounded-md hover:bg-gray-50">
            Account Menu <ChevronDown className="ml-2 h-4 w-4" />
          </DropdownTrigger>
          <DropdownContent className="w-48">
            <DropdownItem value="profile">
              <User className="mr-2 h-4 w-4" />
              Profile
              {selected === 'profile' && <Check className="ml-auto h-4 w-4" />}
            </DropdownItem>
            <DropdownItem value="settings">
              <Settings className="mr-2 h-4 w-4" />
              Settings
              {selected === 'settings' && <Check className="ml-auto h-4 w-4" />}
            </DropdownItem>
            <DropdownSeparator />
            <DropdownItem value="logout">
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </DropdownItem>
          </DropdownContent>
        </Dropdown>
      </div>
    )
  },
}

export const SelectDropdown: Story = {
  render: () => {
    const [selectedCountry, setSelectedCountry] = useState('us')

    const countries = [
      { value: 'us', label: 'United States', flag: '🇺🇸' },
      { value: 'uk', label: 'United Kingdom', flag: '🇬🇧' },
      { value: 'ca', label: 'Canada', flag: '🇨🇦' },
      { value: 'au', label: 'Australia', flag: '🇦🇺' },
      { value: 'de', label: 'Germany', flag: '🇩🇪' },
    ]

    const selected = countries.find((c) => c.value === selectedCountry)

    return (
      <Dropdown value={selectedCountry} onValueChange={setSelectedCountry}>
        <DropdownTrigger className="px-4 py-2 border rounded-md hover:bg-gray-50 min-w-[200px] justify-between">
          <span className="flex items-center gap-2">
            <span>{selected?.flag}</span>
            <span>{selected?.label}</span>
          </span>
          <ChevronDown className="h-4 w-4" />
        </DropdownTrigger>
        <DropdownContent className="w-[200px]">
          {countries.map((country) => (
            <DropdownItem
              key={country.value}
              value={country.value}
              className="justify-between"
            >
              <span className="flex items-center gap-2">
                <span>{country.flag}</span>
                <span>{country.label}</span>
              </span>
              {selectedCountry === country.value && (
                <Check className="h-4 w-4" />
              )}
            </DropdownItem>
          ))}
        </DropdownContent>
      </Dropdown>
    )
  },
}

export const WithLabels: Story = {
  render: () => {
    const [selected, setSelected] = useState('profile')

    return (
      <Dropdown value={selected} onValueChange={setSelected}>
        <DropdownTrigger className="px-4 py-2 border rounded-md hover:bg-gray-50">
          Account Options <ChevronDown className="ml-2 h-4 w-4" />
        </DropdownTrigger>
        <DropdownContent className="w-56">
          <DropdownLabel>My Account</DropdownLabel>
          <DropdownItem value="profile">
            <User className="mr-2 h-4 w-4" />
            Profile
          </DropdownItem>
          <DropdownItem value="settings">
            <Settings className="mr-2 h-4 w-4" />
            Settings
          </DropdownItem>
          <DropdownSeparator />
          <DropdownLabel>Communication</DropdownLabel>
          <DropdownItem value="email">
            <Mail className="mr-2 h-4 w-4" />
            Email
          </DropdownItem>
          <DropdownItem value="messages">
            <MessageSquare className="mr-2 h-4 w-4" />
            Messages
          </DropdownItem>
          <DropdownSeparator />
          <DropdownItem value="logout">
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </DropdownItem>
        </DropdownContent>
      </Dropdown>
    )
  },
}

export const WithDisabledItems: Story = {
  render: () => (
    <Dropdown>
      <DropdownTrigger className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
        Actions <ChevronDown className="ml-2 h-4 w-4" />
      </DropdownTrigger>
      <DropdownContent className="w-48">
        <DropdownItem value="edit">
          <Edit className="mr-2 h-4 w-4" />
          Edit
        </DropdownItem>
        <DropdownItem value="delete" disabled>
          <Trash className="mr-2 h-4 w-4" />
          Delete (disabled)
        </DropdownItem>
        <DropdownSeparator />
        <DropdownItem value="add">
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
        <DropdownItem value="1">Option 1</DropdownItem>
        <DropdownItem value="2">Option 2</DropdownItem>
        <DropdownItem value="3">Option 3</DropdownItem>
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
        <DropdownItem value="1">Option 1</DropdownItem>
        <DropdownItem value="2">Option 2</DropdownItem>
        <DropdownItem value="3">Option 3</DropdownItem>
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
        <DropdownItem value="1">Option 1</DropdownItem>
        <DropdownItem value="2">Option 2</DropdownItem>
        <DropdownItem value="3">Option 3</DropdownItem>
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
        <DropdownItem value="1">Option 1</DropdownItem>
        <DropdownItem value="2">Option 2</DropdownItem>
        <DropdownItem value="3">Option 3</DropdownItem>
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
        <DropdownItem value="1">
          This dropdown aligns to the start of the trigger
        </DropdownItem>
        <DropdownItem value="2">Option 2</DropdownItem>
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
        <DropdownItem value="1">
          This dropdown is centered on the trigger
        </DropdownItem>
        <DropdownItem value="2">Option 2</DropdownItem>
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
        <DropdownItem value="1">
          This dropdown aligns to the end of the trigger
        </DropdownItem>
        <DropdownItem value="2">Option 2</DropdownItem>
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
            <DropdownItem value="1">Option 1</DropdownItem>
            <DropdownItem value="2">Option 2</DropdownItem>
            <DropdownItem value="3">Option 3</DropdownItem>
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
            <DropdownItem value="view">View Profile</DropdownItem>
            <DropdownItem value="account">Account Settings</DropdownItem>
            <DropdownItem value="billing">Billing</DropdownItem>
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
            <label
              htmlFor="item-name"
              className="block text-xs font-medium mb-1"
            >
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
            <label
              htmlFor="item-type"
              className="block text-xs font-medium mb-1"
            >
              Type
            </label>
            <select
              id="item-type"
              className="w-full px-2 py-1 border rounded text-sm"
            >
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
            preventClose
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
            preventClose
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
            preventClose
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

export const WithOffsets: Story = {
  render: () => (
    <div className="flex gap-4">
      <Dropdown>
        <DropdownTrigger className="px-4 py-2 border rounded-md hover:bg-gray-50">
          Default Offset
        </DropdownTrigger>
        <DropdownContent>
          <DropdownItem value="1">Option 1</DropdownItem>
          <DropdownItem value="2">Option 2</DropdownItem>
        </DropdownContent>
      </Dropdown>

      <Dropdown>
        <DropdownTrigger className="px-4 py-2 border rounded-md hover:bg-gray-50">
          Large Offset
        </DropdownTrigger>
        <DropdownContent sideOffset={20} alignOffset={10}>
          <DropdownItem value="1">Option 1</DropdownItem>
          <DropdownItem value="2">Option 2</DropdownItem>
        </DropdownContent>
      </Dropdown>
    </div>
  ),
}

export const ManyItems: Story = {
  render: () => {
    const [selected, setSelected] = useState('United States')

    return (
      <Dropdown value={selected} onValueChange={setSelected}>
        <DropdownTrigger className="px-4 py-2 border rounded-md hover:bg-gray-50 min-w-[200px] justify-between">
          {selected}
          <ChevronDown className="h-4 w-4" />
        </DropdownTrigger>
        <DropdownContent className="max-h-64 overflow-y-auto w-[200px]">
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
            <DropdownItem
              key={country}
              value={country}
              className="justify-between"
            >
              {country}
              {selected === country && <Check className="h-4 w-4" />}
            </DropdownItem>
          ))}
        </DropdownContent>
      </Dropdown>
    )
  },
}
