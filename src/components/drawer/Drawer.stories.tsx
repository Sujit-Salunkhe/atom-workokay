// src/components/ui/Drawer.stories.tsx
import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import {
  Drawer,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerBody,
  DrawerFooter,
  type DrawerProps,
} from './Drawer'

// Custom args type that omits children since we provide it in render
type DrawerStoryArgs = Omit<DrawerProps, 'children' | 'open' | 'onOpenChange'>

const meta: Meta<DrawerProps> = {
  title: 'Components/Drawer',
  component: Drawer,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'A fully controlled drawer component that slides in from any side of the screen. Supports backdrop, keyboard navigation, and customizable sizes.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['right', 'left', 'top', 'bottom'],
      description: 'The side from which the drawer appears',
      table: {
        defaultValue: { summary: 'right' },
      },
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl'],
      description: 'The size of the drawer',
      table: {
        defaultValue: { summary: 'md' },
      },
    },
    open: {
      control: false,
      description: 'Controls whether the drawer is open or closed',
    },
    showBackdrop: {
      control: 'boolean',
      description: 'Show/hide the backdrop overlay',
      table: {
        defaultValue: { summary: 'true' },
      },
    },
    closeOnBackdropClick: {
      control: 'boolean',
      description: 'Close drawer when clicking the backdrop',
      table: {
        defaultValue: { summary: 'true' },
      },
    },
    closeOnEscape: {
      control: 'boolean',
      description: 'Close drawer when pressing Escape key',
      table: {
        defaultValue: { summary: 'true' },
      },
    },
    children: {
      control: false,
      description: 'The content to display inside the drawer',
    },
    onOpenChange: {
      control: false,
      description: 'Callback fired when the drawer open state changes',
    },
  },
}

export default meta

// Use StoryObj without typeof meta to avoid strict args checking
type Story = StoryObj<DrawerStoryArgs>

// Wrapper component to handle state
const DrawerWithState = (args: DrawerStoryArgs) => {
  const [open, setOpen] = useState(false)

  return (
    <div className="p-4">
      <button
        onClick={() => setOpen(true)}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Open Drawer
      </button>

      <Drawer {...args} open={open} onOpenChange={setOpen}>
        <DrawerHeader>
          <DrawerTitle>Drawer Title</DrawerTitle>
          <DrawerDescription>
            This is a drawer description with additional context about the content.
          </DrawerDescription>
        </DrawerHeader>
        <DrawerBody>
          <div className="space-y-4">
            <p>
              This is the drawer body content. You can place any content here including
              forms, lists, or other components.
            </p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
              tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </div>
        </DrawerBody>
        <DrawerFooter>
          <button
            onClick={() => setOpen(false)}
            className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            onClick={() => setOpen(false)}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Confirm
          </button>
        </DrawerFooter>
      </Drawer>
    </div>
  )
}

export const Default: Story = {
  render: (args) => <DrawerWithState {...args} />,
  args: {
    variant: 'right',
    size: 'md',
    showBackdrop: true,
    closeOnBackdropClick: true,
    closeOnEscape: true,
  },
}

export const RightDrawer: Story = {
  render: (args) => <DrawerWithState {...args} />,
  args: {
    variant: 'right',
    size: 'md',
    showBackdrop: true,
    closeOnBackdropClick: true,
    closeOnEscape: true,
  },
}

export const LeftDrawer: Story = {
  render: (args) => <DrawerWithState {...args} />,
  args: {
    variant: 'left',
    size: 'md',
    showBackdrop: true,
    closeOnBackdropClick: true,
    closeOnEscape: true,
  },
}

export const TopDrawer: Story = {
  render: (args) => <DrawerWithState {...args} />,
  args: {
    variant: 'top',
    size: 'md',
    showBackdrop: true,
    closeOnBackdropClick: true,
    closeOnEscape: true,
  },
}

export const BottomDrawer: Story = {
  render: (args) => <DrawerWithState {...args} />,
  args: {
    variant: 'bottom',
    size: 'md',
    showBackdrop: true,
    closeOnBackdropClick: true,
    closeOnEscape: true,
  },
}

export const SmallSize: Story = {
  render: (args) => <DrawerWithState {...args} />,
  args: {
    variant: 'right',
    size: 'sm',
  },
}

export const LargeSize: Story = {
  render: (args) => <DrawerWithState {...args} />,
  args: {
    variant: 'right',
    size: 'lg',
  },
}

export const ExtraLargeSize: Story = {
  render: (args) => <DrawerWithState {...args} />,
  args: {
    variant: 'right',
    size: 'xl',
  },
}

export const NoBackdrop: Story = {
  render: (args) => <DrawerWithState {...args} />,
  args: {
    variant: 'right',
    size: 'md',
    showBackdrop: false,
  },
}

export const NoBackdropClose: Story = {
  render: (args) => <DrawerWithState {...args} />,
  args: {
    variant: 'right',
    size: 'md',
    closeOnBackdropClick: false,
    closeOnEscape: false,
  },
}

export const WithForm: Story = {
  render: (args) => {
    const [open, setOpen] = useState(false)

    return (
      <div className="p-4">
        <button
          onClick={() => setOpen(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Open Form Drawer
        </button>

        <Drawer {...args} open={open} onOpenChange={setOpen}>
          <DrawerHeader>
            <DrawerTitle>User Profile</DrawerTitle>
            <DrawerDescription>Update your profile information</DrawerDescription>
          </DrawerHeader>
          <DrawerBody>
            <form className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-1">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2"
                  placeholder="Enter your name"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-1">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2"
                  placeholder="Enter your email"
                />
              </div>
              <div>
                <label htmlFor="bio" className="block text-sm font-medium mb-1">
                  Bio
                </label>
                <textarea
                  id="bio"
                  rows={4}
                  className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2"
                  placeholder="Tell us about yourself"
                />
              </div>
            </form>
          </DrawerBody>
          <DrawerFooter>
            <button
              onClick={() => setOpen(false)}
              className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              onClick={() => setOpen(false)}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Save Changes
            </button>
          </DrawerFooter>
        </Drawer>
      </div>
    )
  },
  args: {
    variant: 'right',
    size: 'md',
  },
}

export const WithLongContent: Story = {
  render: (args) => {
    const [open, setOpen] = useState(false)

    return (
      <div className="p-4">
        <button
          onClick={() => setOpen(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Open Drawer with Long Content
        </button>

        <Drawer {...args} open={open} onOpenChange={setOpen}>
          <DrawerHeader>
            <DrawerTitle>Privacy Policy</DrawerTitle>
            <DrawerDescription>Last updated: January 2026</DrawerDescription>
          </DrawerHeader>
          <DrawerBody>
            <div className="space-y-4">
              {Array.from({ length: 10 }).map((_, i) => (
                <div key={i}>
                  <h3 className="font-semibold mb-2">Section {i + 1}</h3>
                  <p className="text-sm">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                    eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
                    ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                    aliquip ex ea commodo consequat.
                  </p>
                </div>
              ))}
            </div>
          </DrawerBody>
          <DrawerFooter>
            <button
              onClick={() => setOpen(false)}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              I Understand
            </button>
          </DrawerFooter>
        </Drawer>
      </div>
    )
  },
  args: {
    variant: 'right',
    size: 'lg',
  },
}

export const MultipleDrawers: Story = {
  render: () => {
    const [drawer1Open, setDrawer1Open] = useState(false)
    const [drawer2Open, setDrawer2Open] = useState(false)

    return (
      <div className="p-4 space-x-4">
        <button
          onClick={() => setDrawer1Open(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Open Right Drawer
        </button>
        <button
          onClick={() => setDrawer2Open(true)}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Open Left Drawer
        </button>

        <Drawer variant="right" size="md" open={drawer1Open} onOpenChange={setDrawer1Open}>
          <DrawerHeader>
            <DrawerTitle>Right Drawer</DrawerTitle>
          </DrawerHeader>
          <DrawerBody>
            <p>This is the right drawer content.</p>
          </DrawerBody>
          <DrawerFooter>
            <button
              onClick={() => setDrawer1Open(false)}
              className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100"
            >
              Close
            </button>
          </DrawerFooter>
        </Drawer>

        <Drawer variant="left" size="md" open={drawer2Open} onOpenChange={setDrawer2Open}>
          <DrawerHeader>
            <DrawerTitle>Left Drawer</DrawerTitle>
          </DrawerHeader>
          <DrawerBody>
            <p>This is the left drawer content.</p>
          </DrawerBody>
          <DrawerFooter>
            <button
              onClick={() => setDrawer2Open(false)}
              className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100"
            >
              Close
            </button>
          </DrawerFooter>
        </Drawer>
      </div>
    )
  },
}
