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
  DropdownGroup,
} from './DropDown'
import {
  ChevronDown,
  User,
  Settings,
  LogOut,
  Mail,
  MessageSquare,
  Plus,
} from 'lucide-react'

const meta = {
  title: 'Components/Dropdown',
  component: Dropdown,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A fully accessible dropdown menu component with keyboard navigation, portal rendering, and animation support. Built with Framer Motion and Radix UI primitives.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Dropdown>

export default meta
type Story = StoryObj<typeof meta>

// ============================================================================
// BASIC STORIES
// ============================================================================

export const Default: Story = {
  args: {
    children: (
      <>
        <DropdownTrigger>
          Open Menu <ChevronDown className="h-4 w-4" />
        </DropdownTrigger>
        <DropdownContent>
          <DropdownItem>Profile</DropdownItem>
          <DropdownItem>Settings</DropdownItem>
          <DropdownItem>Logout</DropdownItem>
        </DropdownContent>
      </>
    ),
  },
}

export const WithIcons: Story = {
  args: {
    children: (
      <>
        <DropdownTrigger>
          Account <ChevronDown className="h-4 w-4" />
        </DropdownTrigger>
        <DropdownContent>
          <DropdownItem>
            <User className="mr-2 h-4 w-4" />
            Profile
          </DropdownItem>
          <DropdownItem>
            <Mail className="mr-2 h-4 w-4" />
            Messages
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
      </>
    ),
  },
}

export const WithGroups: Story = {
  args: {
    children: (
      <>
        <DropdownTrigger variant="default">
          Options <ChevronDown className="h-4 w-4" />
        </DropdownTrigger>
        <DropdownContent>
          <DropdownLabel>Account</DropdownLabel>
          <DropdownGroup>
            <DropdownItem>
              <User className="mr-2 h-4 w-4" />
              Profile
            </DropdownItem>
            <DropdownItem>
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </DropdownItem>
          </DropdownGroup>
          <DropdownSeparator />
          <DropdownLabel>Communication</DropdownLabel>
          <DropdownGroup>
            <DropdownItem>
              <Mail className="mr-2 h-4 w-4" />
              Email
            </DropdownItem>
            <DropdownItem>
              <MessageSquare className="mr-2 h-4 w-4" />
              Messages
            </DropdownItem>
          </DropdownGroup>
          <DropdownSeparator />
          <DropdownItem>
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </DropdownItem>
        </DropdownContent>
      </>
    ),
  },
}

// ============================================================================
// POSITIONING STORIES
// ============================================================================

export const PositionTop: Story = {
  args: {
    children: (
      <>
        <DropdownTrigger>
          Open Above <ChevronDown className="h-4 w-4" />
        </DropdownTrigger>
        <DropdownContent side="top">
          <DropdownItem>Item 1</DropdownItem>
          <DropdownItem>Item 2</DropdownItem>
          <DropdownItem>Item 3</DropdownItem>
        </DropdownContent>
      </>
    ),
  },
}

export const PositionRight: Story = {
  args: {
    children: (
      <>
        <DropdownTrigger>
          Open Right <ChevronDown className="h-4 w-4" />
        </DropdownTrigger>
        <DropdownContent side="right" sideOffset={8}>
          <DropdownItem>Item 1</DropdownItem>
          <DropdownItem>Item 2</DropdownItem>
          <DropdownItem>Item 3</DropdownItem>
        </DropdownContent>
      </>
    ),
  },
}

export const PositionLeft: Story = {
  args: {
    children: (
      <>
        <DropdownTrigger>
          Open Left <ChevronDown className="h-4 w-4" />
        </DropdownTrigger>
        <DropdownContent side="left" sideOffset={8}>
          <DropdownItem>Item 1</DropdownItem>
          <DropdownItem>Item 2</DropdownItem>
          <DropdownItem>Item 3</DropdownItem>
        </DropdownContent>
      </>
    ),
  },
}

export const AlignCenter: Story = {
  args: {
    children: (
      <>
        <DropdownTrigger>
          Center Aligned <ChevronDown className="h-4 w-4" />
        </DropdownTrigger>
        <DropdownContent align="center">
          <DropdownItem>Short</DropdownItem>
          <DropdownItem>Medium Item</DropdownItem>
          <DropdownItem>Very Long Item Name Here</DropdownItem>
        </DropdownContent>
      </>
    ),
  },
}

export const AlignEnd: Story = {
  args: {
    children: (
      <>
        <DropdownTrigger>
          End Aligned <ChevronDown className="h-4 w-4" />
        </DropdownTrigger>
        <DropdownContent align="end">
          <DropdownItem>Short</DropdownItem>
          <DropdownItem>Medium Item</DropdownItem>
          <DropdownItem>Very Long Item Name Here</DropdownItem>
        </DropdownContent>
      </>
    ),
  },
}

// ============================================================================
// INTERACTIVE STATES
// ============================================================================

export const WithDisabledItems: Story = {
  args: {
    children: (
      <>
        <DropdownTrigger>
          Actions <ChevronDown className="h-4 w-4" />
        </DropdownTrigger>
        <DropdownContent>
          <DropdownItem>Edit</DropdownItem>
          <DropdownItem>Duplicate</DropdownItem>
          <DropdownItem disabled>Archive (disabled)</DropdownItem>
          <DropdownSeparator />
          <DropdownItem disabled>Delete (disabled)</DropdownItem>
        </DropdownContent>
      </>
    ),
  },
}

export const DisabledDropdown: Story = {
  args: {
    disabled: true,
    children: (
      <>
        <DropdownTrigger disabled>
          Disabled Menu <ChevronDown className="h-4 w-4" />
        </DropdownTrigger>
        <DropdownContent>
          <DropdownItem>This won't open</DropdownItem>
        </DropdownContent>
      </>
    ),
  },
}

export const WithItemAnimations: Story = {
  args: {
    animateItems: true,
    children: (
      <>
        <DropdownTrigger>
          Animated Items <ChevronDown className="h-4 w-4" />
        </DropdownTrigger>
        <DropdownContent>
          <DropdownItem>Hover me!</DropdownItem>
          <DropdownItem>I scale on hover</DropdownItem>
          <DropdownItem>And on click</DropdownItem>
        </DropdownContent>
      </>
    ),
  },
}

// ============================================================================
// CONTROLLED STATE STORIES (use render for hooks)
// ============================================================================

export const ControlledState: Story = {
  render: () => {
    const [open, setOpen] = useState(false)

    return (
      <div className="flex flex-col items-center gap-4">
        <p className="text-sm text-[var(--atom-text-secondary)]">
          State: {open ? 'Open' : 'Closed'}
        </p>
        <Dropdown open={open} onOpenChange={setOpen}>
          <DropdownTrigger>
            Controlled Menu <ChevronDown className="h-4 w-4" />
          </DropdownTrigger>
          <DropdownContent>
            <DropdownItem>Item 1</DropdownItem>
            <DropdownItem>Item 2</DropdownItem>
            <DropdownItem>Item 3</DropdownItem>
          </DropdownContent>
        </Dropdown>
        <button
          onClick={() => setOpen(!open)}
          className="px-4 py-2 text-sm rounded-md bg-[var(--atom-primary)] text-white"
        >
          Toggle from outside
        </button>
      </div>
    )
  },
  args: {
    children: null as any, // Placeholder since render overrides it
  },
}

export const WithValueSelection: Story = {
  render: () => {
    const [selected, setSelected] = useState('profile')

    return (
      <div className="flex flex-col items-center gap-4">
        <p className="text-sm text-[var(--atom-text-secondary)]">
          Selected: <strong>{selected}</strong>
        </p>
        <Dropdown value={selected} onValueChange={setSelected}>
          <DropdownTrigger>
            Select Option <ChevronDown className="h-4 w-4" />
          </DropdownTrigger>
          <DropdownContent closeOnSelect>
            <DropdownItem value="profile">
              <User className="mr-2 h-4 w-4" />
              Profile
            </DropdownItem>
            <DropdownItem value="settings">
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </DropdownItem>
            <DropdownItem value="messages">
              <Mail className="mr-2 h-4 w-4" />
              Messages
            </DropdownItem>
          </DropdownContent>
        </Dropdown>
      </div>
    )
  },
  args: {
    children: null as any, // Placeholder since render overrides it
  },
}

export const PreventCloseOnClick: Story = {
  args: {
    children: (
      <>
        <DropdownTrigger>
          Stay Open <ChevronDown className="h-4 w-4" />
        </DropdownTrigger>
        <DropdownContent preventClose>
          <DropdownLabel>Click items below - menu stays open</DropdownLabel>
          <DropdownItem preventClose>
            <input type="checkbox" className="mr-2" />
            Option 1
          </DropdownItem>
          <DropdownItem preventClose>
            <input type="checkbox" className="mr-2" />
            Option 2
          </DropdownItem>
          <DropdownItem preventClose>
            <input type="checkbox" className="mr-2" />
            Option 3
          </DropdownItem>
          <DropdownSeparator />
          <DropdownItem>Close Menu</DropdownItem>
        </DropdownContent>
      </>
    ),
  },
}

// ============================================================================
// VARIANT STORIES
// ============================================================================

export const TriggerVariants: Story = {
  render: () => (
    <div className="flex gap-4">
      <Dropdown>
        <DropdownTrigger variant="default">
          Default Variant <ChevronDown className="h-4 w-4" />
        </DropdownTrigger>
        <DropdownContent>
          <DropdownItem>Item 1</DropdownItem>
          <DropdownItem>Item 2</DropdownItem>
        </DropdownContent>
      </Dropdown>

      <Dropdown>
        <DropdownTrigger variant="ghost">
          Ghost Variant <ChevronDown className="h-4 w-4" />
        </DropdownTrigger>
        <DropdownContent>
          <DropdownItem>Item 1</DropdownItem>
          <DropdownItem>Item 2</DropdownItem>
        </DropdownContent>
      </Dropdown>
    </div>
  ),
  args: {
    children: null as any, // Placeholder since render overrides it
  },
}

export const CustomTrigger: Story = {
  args: {
    children: (
      <>
        <DropdownTrigger asChild>
          <button className="px-4 py-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold hover:opacity-90 transition-opacity">
            Custom Button <Plus className="inline h-4 w-4 ml-2" />
          </button>
        </DropdownTrigger>
        <DropdownContent>
          <DropdownItem>Create New</DropdownItem>
          <DropdownItem>Import</DropdownItem>
          <DropdownItem>From Template</DropdownItem>
        </DropdownContent>
      </>
    ),
  },
}

// ============================================================================
// COMPLEX EXAMPLES
// ============================================================================

export const NestedContent: Story = {
  args: {
    children: (
      <>
        <DropdownTrigger variant="default">
          User Menu <ChevronDown className="h-4 w-4" />
        </DropdownTrigger>
        <DropdownContent className="w-56">
          <DropdownLabel>My Account</DropdownLabel>
          <DropdownGroup>
            <DropdownItem>
              <User className="mr-2 h-4 w-4" />
              <div className="flex flex-col">
                <span className="font-medium">John Doe</span>
                <span className="text-xs text-[var(--atom-text-secondary)]">
                  john@example.com
                </span>
              </div>
            </DropdownItem>
          </DropdownGroup>
          <DropdownSeparator />
          <DropdownLabel>Options</DropdownLabel>
          <DropdownGroup>
            <DropdownItem>
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </DropdownItem>
            <DropdownItem>
              <Mail className="mr-2 h-4 w-4" />
              Messages
              <span className="ml-auto text-xs bg-red-500 text-white px-2 py-0.5 rounded-full">
                3
              </span>
            </DropdownItem>
          </DropdownGroup>
          <DropdownSeparator />
          <DropdownItem>
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </DropdownItem>
        </DropdownContent>
      </>
    ),
  },
}

export const LongMenu: Story = {
  args: {
    children: (
      <>
        <DropdownTrigger>
          Long Menu <ChevronDown className="h-4 w-4" />
        </DropdownTrigger>
        <DropdownContent className="max-h-[300px] overflow-y-auto">
          {Array.from({ length: 20 }, (_, i) => (
            <DropdownItem key={i} value={`item-${i + 1}`}>
              Item {i + 1}
            </DropdownItem>
          ))}
        </DropdownContent>
      </>
    ),
  },
}

// ============================================================================
// ACCESSIBILITY DEMONSTRATION
// ============================================================================

export const KeyboardNavigation: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'This dropdown supports full keyboard navigation:\n- Arrow keys to navigate items\n- Enter/Space to select\n- Escape to close\n- Home/End to jump to first/last item',
      },
    },
  },
  args: {
    children: (
      <>
        <DropdownTrigger>
          Keyboard Navigation <ChevronDown className="h-4 w-4" />
        </DropdownTrigger>
        <DropdownContent>
          <DropdownLabel>Try keyboard navigation</DropdownLabel>
          <DropdownItem value="1">First Item (Home)</DropdownItem>
          <DropdownItem value="2">Second Item (↓)</DropdownItem>
          <DropdownItem value="3">Third Item (↓)</DropdownItem>
          <DropdownItem value="4">Fourth Item (↓)</DropdownItem>
          <DropdownItem value="5">Last Item (End)</DropdownItem>
          <DropdownSeparator />
          <DropdownLabel className="text-xs">Press Esc to close</DropdownLabel>
        </DropdownContent>
      </>
    ),
  },
}

// ============================================================================
// PLAYGROUND
// ============================================================================

export const Playground: Story = {
  args: {
    defaultOpen: false,
    disabled: false,
    animateItems: true,

    children: (
      <>
        <DropdownTrigger variant="default">
          Playground Menu <ChevronDown className="h-4 w-4" />
        </DropdownTrigger>
        <DropdownContent>
          <DropdownLabel>Section 1</DropdownLabel>
          <DropdownGroup>
            <DropdownItem value="item1">
              <User className="mr-2 h-4 w-4" />
              Item 1
            </DropdownItem>
            <DropdownItem value="item2">
              <Settings className="mr-2 h-4 w-4" />
              Item 2
            </DropdownItem>
            <DropdownItem value="item3" disabled>
              <Mail className="mr-2 h-4 w-4" />
              Disabled Item
            </DropdownItem>
          </DropdownGroup>
          <DropdownSeparator />
          <DropdownItem value="logout">
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </DropdownItem>
        </DropdownContent>
      </>
    ),

    value: '',
  },
  argTypes: {
    defaultOpen: {
      control: 'boolean',
      description: 'Default open state (uncontrolled)',
    },
    disabled: {
      control: 'boolean',
      description: 'Disable the entire dropdown',
    },
    animateItems: {
      control: 'boolean',
      description: 'Enable scale animation on dropdown items',
    },
  },
}
