// src/components/ui/Popover.stories.tsx
import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverTitle,
  PopoverDescription,
  PopoverClose,
} from './Popover'

const meta: Meta<typeof Popover> = {
  title: 'Components/Popover',
  component: Popover,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A popover component that displays rich content in a portal, positioned relative to a trigger element. Supports modal mode, flexible positioning, and smooth animations.',
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
    },
    modal: {
      control: 'boolean',
      description: 'Whether the popover is modal (blocks interaction with rest of page)',
    },
    onOpenChange: {
      action: 'onOpenChange',
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
  args: {},
  render: () => (
    <Popover>
      <PopoverTrigger className="px-4 py-2 bg-[var(--atom-primary)] text-white rounded-md hover:opacity-90">
        Open Popover
      </PopoverTrigger>
      <PopoverContent>
        <PopoverHeader>
          <PopoverTitle>Popover Title</PopoverTitle>
          <PopoverClose />
        </PopoverHeader>
        <PopoverBody>
          <PopoverDescription>
            This is a basic popover with header, body, and footer sections.
          </PopoverDescription>
        </PopoverBody>
        <PopoverFooter>
          <PopoverClose asChild>
            <button className="px-4 py-2 bg-[var(--atom-primary)] text-white rounded-md text-sm">
              Got it
            </button>
          </PopoverClose>
        </PopoverFooter>
      </PopoverContent>
    </Popover>
  ),
}

export const WithArrow: Story = {
  args: {},
  render: () => (
    <Popover>
      <PopoverTrigger className="px-4 py-2 bg-[var(--atom-primary)] text-white rounded-md hover:opacity-90">
        Open with Arrow
      </PopoverTrigger>
      <PopoverContent showArrow>
        <PopoverBody>
          <PopoverDescription>
            This popover has an arrow pointing to the trigger element.
          </PopoverDescription>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  ),
}

export const SimpleContent: Story = {
  args: {},
  render: () => (
    <Popover>
      <PopoverTrigger className="px-4 py-2 bg-[var(--atom-theme-bg)] border border-[var(--atom-theme-border)] rounded-md hover:bg-[var(--atom-card-hover)]">
        Quick Info
      </PopoverTrigger>
      <PopoverContent showArrow>
        <PopoverBody>
          <p className="text-sm">This is a simple popover with just body content.</p>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  ),
}

// ============================================================================
// POSITIONING
// ============================================================================

export const Positioning: Story = {
  args: {},
  render: () => (
    <div className="flex flex-col items-center gap-32">
      <div className="flex items-center gap-32">
        {/* Top positions */}
        <Popover>
          <PopoverTrigger className="px-4 py-2 border border-[var(--atom-theme-border)] rounded-md">
            Top Start
          </PopoverTrigger>
          <PopoverContent side="top" align="start" showArrow>
            <PopoverBody>
              <p className="text-sm">Positioned at top-start</p>
            </PopoverBody>
          </PopoverContent>
        </Popover>

        <Popover>
          <PopoverTrigger className="px-4 py-2 border border-[var(--atom-theme-border)] rounded-md">
            Top Center
          </PopoverTrigger>
          <PopoverContent side="top" align="center" showArrow>
            <PopoverBody>
              <p className="text-sm">Positioned at top-center</p>
            </PopoverBody>
          </PopoverContent>
        </Popover>

        <Popover>
          <PopoverTrigger className="px-4 py-2 border border-[var(--atom-theme-border)] rounded-md">
            Top End
          </PopoverTrigger>
          <PopoverContent side="top" align="end" showArrow>
            <PopoverBody>
              <p className="text-sm">Positioned at top-end</p>
            </PopoverBody>
          </PopoverContent>
        </Popover>
      </div>

      <div className="flex items-center gap-32">
        {/* Bottom positions */}
        <Popover>
          <PopoverTrigger className="px-4 py-2 border border-[var(--atom-theme-border)] rounded-md">
            Bottom Start
          </PopoverTrigger>
          <PopoverContent side="bottom" align="start" showArrow>
            <PopoverBody>
              <p className="text-sm">Positioned at bottom-start</p>
            </PopoverBody>
          </PopoverContent>
        </Popover>

        <Popover>
          <PopoverTrigger className="px-4 py-2 border border-[var(--atom-theme-border)] rounded-md">
            Bottom Center
          </PopoverTrigger>
          <PopoverContent side="bottom" align="center" showArrow>
            <PopoverBody>
              <p className="text-sm">Positioned at bottom-center</p>
            </PopoverBody>
          </PopoverContent>
        </Popover>

        <Popover>
          <PopoverTrigger className="px-4 py-2 border border-[var(--atom-theme-border)] rounded-md">
            Bottom End
          </PopoverTrigger>
          <PopoverContent side="bottom" align="end" showArrow>
            <PopoverBody>
              <p className="text-sm">Positioned at bottom-end</p>
            </PopoverBody>
          </PopoverContent>
        </Popover>
      </div>

      <div className="flex items-center gap-32">
        {/* Left and Right */}
        <Popover>
          <PopoverTrigger className="px-4 py-2 border border-[var(--atom-theme-border)] rounded-md">
            Left
          </PopoverTrigger>
          <PopoverContent side="left" align="center" showArrow>
            <PopoverBody>
              <p className="text-sm">Positioned on the left</p>
            </PopoverBody>
          </PopoverContent>
        </Popover>

        <Popover>
          <PopoverTrigger className="px-4 py-2 border border-[var(--atom-theme-border)] rounded-md">
            Right
          </PopoverTrigger>
          <PopoverContent side="right" align="center" showArrow>
            <PopoverBody>
              <p className="text-sm">Positioned on the right</p>
            </PopoverBody>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  ),
  parameters: {
    layout: 'centered',
  },
}

// ============================================================================
// SIZES
// ============================================================================

export const Sizes: Story = {
  args: {},
  render: () => (
    <div className="flex items-center gap-4">
      <Popover>
        <PopoverTrigger className="px-4 py-2 border border-[var(--atom-theme-border)] rounded-md">
          Small
        </PopoverTrigger>
        <PopoverContent size="sm">
          <PopoverBody>
            <p className="text-sm">This is a small popover (256px width)</p>
          </PopoverBody>
        </PopoverContent>
      </Popover>

      <Popover>
        <PopoverTrigger className="px-4 py-2 border border-[var(--atom-theme-border)] rounded-md">
          Medium
        </PopoverTrigger>
        <PopoverContent size="md">
          <PopoverBody>
            <p className="text-sm">This is a medium popover (320px width)</p>
          </PopoverBody>
        </PopoverContent>
      </Popover>

      <Popover>
        <PopoverTrigger className="px-4 py-2 border border-[var(--atom-theme-border)] rounded-md">
          Large
        </PopoverTrigger>
        <PopoverContent size="lg">
          <PopoverBody>
            <p className="text-sm">This is a large popover (384px width)</p>
          </PopoverBody>
        </PopoverContent>
      </Popover>

      <Popover>
        <PopoverTrigger className="px-4 py-2 border border-[var(--atom-theme-border)] rounded-md">
          Extra Large
        </PopoverTrigger>
        <PopoverContent size="xl">
          <PopoverBody>
            <p className="text-sm">This is an extra large popover (512px width)</p>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </div>
  ),
}

// ============================================================================
// MODAL MODE
// ============================================================================

export const Modal: Story = {
  args: {},
  render: () => (
    <Popover modal>
      <PopoverTrigger className="px-4 py-2 bg-[var(--atom-primary)] text-white rounded-md hover:opacity-90">
        Open Modal Popover
      </PopoverTrigger>
      <PopoverContent size="lg">
        <PopoverHeader>
          <PopoverTitle>Modal Popover</PopoverTitle>
          <PopoverClose />
        </PopoverHeader>
        <PopoverBody>
          <PopoverDescription>
            This popover is in modal mode with a backdrop. Clicking outside or pressing Escape will close it.
          </PopoverDescription>
          <div className="mt-4 space-y-2">
            <input
              type="text"
              placeholder="Focus trap demonstration"
              className="w-full px-3 py-2 border border-[var(--atom-theme-border)] rounded-md"
            />
            <input
              type="text"
              placeholder="Try tabbing through inputs"
              className="w-full px-3 py-2 border border-[var(--atom-theme-border)] rounded-md"
            />
          </div>
        </PopoverBody>
        <PopoverFooter>
          <PopoverClose asChild>
            <button className="px-4 py-2 border border-[var(--atom-theme-border)] rounded-md text-sm">
              Cancel
            </button>
          </PopoverClose>
          <button className="px-4 py-2 bg-[var(--atom-primary)] text-white rounded-md text-sm">
            Confirm
          </button>
        </PopoverFooter>
      </PopoverContent>
    </Popover>
  ),
}

// ============================================================================
// CONTROLLED
// ============================================================================

export const Controlled: Story = {
  args: {},
  render: function ControlledRender() {
    const [open, setOpen] = useState(false)

    return (
      <div className="flex flex-col items-center gap-4">
        <div className="flex gap-2">
          <button
            onClick={() => setOpen(true)}
            className="px-4 py-2 bg-green-500 text-white rounded-md text-sm"
          >
            Open
          </button>
          <button
            onClick={() => setOpen(false)}
            className="px-4 py-2 bg-red-500 text-white rounded-md text-sm"
          >
            Close
          </button>
          <button
            onClick={() => setOpen(!open)}
            className="px-4 py-2 bg-blue-500 text-white rounded-md text-sm"
          >
            Toggle
          </button>
        </div>

        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger className="px-4 py-2 border border-[var(--atom-theme-border)] rounded-md">
            Controlled Trigger
          </PopoverTrigger>
          <PopoverContent>
            <PopoverHeader>
              <PopoverTitle>Controlled Popover</PopoverTitle>
              <PopoverClose />
            </PopoverHeader>
            <PopoverBody>
              <p className="text-sm">
                State: <strong>{open ? 'Open' : 'Closed'}</strong>
              </p>
              <p className="text-sm mt-2">
                This popover is controlled externally using useState.
              </p>
            </PopoverBody>
          </PopoverContent>
        </Popover>
      </div>
    )
  },
}

// ============================================================================
// INTERACTIVE EXAMPLES
// ============================================================================

export const FormExample: Story = {
  args: {},
  render: function FormExampleRender() {
    const [formData, setFormData] = useState({ name: '', email: '' })

    return (
      <Popover>
        <PopoverTrigger className="px-4 py-2 bg-[var(--atom-primary)] text-white rounded-md hover:opacity-90">
          Edit Profile
        </PopoverTrigger>
        <PopoverContent size="lg">
          <PopoverHeader>
            <PopoverTitle>Edit Profile</PopoverTitle>
            <PopoverClose />
          </PopoverHeader>
          <PopoverBody>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-[var(--atom-theme-border)] rounded-md"
                  placeholder="Enter your name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-[var(--atom-theme-border)] rounded-md"
                  placeholder="Enter your email"
                />
              </div>
            </div>
          </PopoverBody>
          <PopoverFooter>
            <PopoverClose asChild>
              <button className="px-4 py-2 border border-[var(--atom-theme-border)] rounded-md text-sm">
                Cancel
              </button>
            </PopoverClose>
            <button
              onClick={() => console.log('Saved:', formData)}
              className="px-4 py-2 bg-[var(--atom-primary)] text-white rounded-md text-sm"
            >
              Save Changes
            </button>
          </PopoverFooter>
        </PopoverContent>
      </Popover>
    )
  },
}

export const ConfirmationDialog: Story = {
  args: {},
  render: () => (
    <Popover modal>
      <PopoverTrigger className="px-4 py-2 bg-red-500 text-white rounded-md hover:opacity-90">
        Delete Account
      </PopoverTrigger>
      <PopoverContent size="md" preventOutsideClick>
        <PopoverHeader>
          <PopoverTitle>Confirm Deletion</PopoverTitle>
          <PopoverClose />
        </PopoverHeader>
        <PopoverBody>
          <PopoverDescription>
            Are you sure you want to delete your account? This action cannot be undone.
          </PopoverDescription>
          <div className="mt-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md">
            <p className="text-sm text-red-700 dark:text-red-300 font-medium">
              Warning: This will permanently delete all your data.
            </p>
          </div>
        </PopoverBody>
        <PopoverFooter>
          <PopoverClose asChild>
            <button className="px-4 py-2 border border-[var(--atom-theme-border)] rounded-md text-sm">
              Cancel
            </button>
          </PopoverClose>
          <button
            onClick={() => console.log('Account deleted')}
            className="px-4 py-2 bg-red-500 text-white rounded-md text-sm hover:bg-red-600"
          >
            Delete Account
          </button>
        </PopoverFooter>
      </PopoverContent>
    </Popover>
  ),
}

export const MenuExample: Story = {
  args: {},
  render: () => (
    <Popover>
      <PopoverTrigger className="px-4 py-2 border border-[var(--atom-theme-border)] rounded-md hover:bg-[var(--atom-card-hover)]">
        Options
      </PopoverTrigger>
      <PopoverContent side="bottom" align="end" size="sm">
        <PopoverBody className="p-2">
          <div className="space-y-1">
            <button className="w-full text-left px-3 py-2 rounded-md hover:bg-[var(--atom-card-hover)] text-sm">
              Edit
            </button>
            <button className="w-full text-left px-3 py-2 rounded-md hover:bg-[var(--atom-card-hover)] text-sm">
              Duplicate
            </button>
            <button className="w-full text-left px-3 py-2 rounded-md hover:bg-[var(--atom-card-hover)] text-sm">
              Archive
            </button>
            <hr className="my-1 border-[var(--atom-theme-border)]" />
            <button className="w-full text-left px-3 py-2 rounded-md hover:bg-red-50 dark:hover:bg-red-900/20 text-sm text-red-600">
              Delete
            </button>
          </div>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  ),
}

export const InfoTooltip: Story = {
  args: {},
  render: () => (
    <div className="flex items-center gap-2">
      <span className="text-sm">Account Status</span>
      <Popover>
        <PopoverTrigger className="inline-flex items-center justify-center w-5 h-5 rounded-full border border-[var(--atom-theme-border)] text-xs hover:bg-[var(--atom-card-hover)]">
          ?
        </PopoverTrigger>
        <PopoverContent size="sm" showArrow>
          <PopoverBody>
            <p className="text-sm">
              Your account status shows whether your subscription is active, pending, or expired.
            </p>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </div>
  ),
}

// ============================================================================
// COMPLEX CONTENT
// ============================================================================

export const RichContent: Story = {
  args: {},
  render: () => (
    <Popover>
      <PopoverTrigger className="px-4 py-2 bg-[var(--atom-primary)] text-white rounded-md hover:opacity-90">
        User Profile
      </PopoverTrigger>
      <PopoverContent size="lg">
        <PopoverBody>
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
              JD
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-lg">John Doe</h3>
              <p className="text-sm text-[var(--atom-text-secondary)]">john.doe@example.com</p>
              <div className="mt-3 flex gap-2">
                <button className="px-3 py-1.5 bg-[var(--atom-primary)] text-white rounded-md text-sm">
                  View Profile
                </button>
                <PopoverClose asChild>
                  <button className="px-3 py-1.5 border border-[var(--atom-theme-border)] rounded-md text-sm">
                    Close
                  </button>
                </PopoverClose>
              </div>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-[var(--atom-theme-border)]">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-2xl font-bold">1.2K</p>
                <p className="text-xs text-[var(--atom-text-secondary)]">Followers</p>
              </div>
              <div>
                <p className="text-2xl font-bold">856</p>
                <p className="text-xs text-[var(--atom-text-secondary)]">Following</p>
              </div>
              <div>
                <p className="text-2xl font-bold">42</p>
                <p className="text-xs text-[var(--atom-text-secondary)]">Posts</p>
              </div>
            </div>
          </div>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  ),
}

// ============================================================================
// EDGE CASES
// ============================================================================

export const LongContent: Story = {
  args: {},
  render: () => (
    <Popover>
      <PopoverTrigger className="px-4 py-2 border border-[var(--atom-theme-border)] rounded-md">
        Show Long Content
      </PopoverTrigger>
      <PopoverContent size="lg">
        <PopoverHeader>
          <PopoverTitle>Terms and Conditions</PopoverTitle>
          <PopoverClose />
        </PopoverHeader>
        <PopoverBody className="max-h-96 overflow-y-auto">
          <div className="space-y-4 text-sm">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
              exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
            <p>
              Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
              fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa
              qui officia deserunt mollit anim id est laborum.
            </p>
            <p>
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque
              laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi
              architecto beatae vitae dicta sunt explicabo.
            </p>
            <p>
              Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia
              consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.
            </p>
          </div>
        </PopoverBody>
        <PopoverFooter>
          <PopoverClose asChild>
            <button className="px-4 py-2 bg-[var(--atom-primary)] text-white rounded-md text-sm">
              I Agree
            </button>
          </PopoverClose>
        </PopoverFooter>
      </PopoverContent>
    </Popover>
  ),
}

export const PreventClose: Story = {
  args: {},
  render: () => (
    <Popover>
      <PopoverTrigger className="px-4 py-2 border border-[var(--atom-theme-border)] rounded-md">
        Persistent Popover
      </PopoverTrigger>
      <PopoverContent preventOutsideClick>
        <PopoverHeader>
          <PopoverTitle>Can't Click Outside</PopoverTitle>
          <PopoverClose />
        </PopoverHeader>
        <PopoverBody>
          <p className="text-sm">
            This popover won't close when clicking outside. You must use the close button or Escape key.
          </p>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  ),
}

export const AsChildTrigger: Story = {
  args: {},
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg cursor-pointer hover:opacity-90">
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <circle cx="12" cy="12" r="10" />
            <path d="M12 16v-4M12 8h.01" />
          </svg>
          Custom Trigger
        </div>
      </PopoverTrigger>
      <PopoverContent showArrow>
        <PopoverBody>
          <p className="text-sm">This trigger is a custom element using asChild prop.</p>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  ),
}

// ============================================================================
// PLAYGROUND
// ============================================================================

export const Playground: Story = {
  args: {
    modal: false,
    defaultOpen: false,
  },
  render: (args) => (
    <Popover {...args}>
      <PopoverTrigger className="px-4 py-2 bg-[var(--atom-primary)] text-white rounded-md hover:opacity-90">
        Open Popover
      </PopoverTrigger>
      <PopoverContent side="bottom" align="center" showArrow>
        <PopoverHeader>
          <PopoverTitle>Playground</PopoverTitle>
          <PopoverClose />
        </PopoverHeader>
        <PopoverBody>
          <PopoverDescription>
            Use the controls panel to experiment with different props and configurations.
          </PopoverDescription>
        </PopoverBody>
        <PopoverFooter>
          <PopoverClose asChild>
            <button className="px-4 py-2 bg-[var(--atom-primary)] text-white rounded-md text-sm">
              Close
            </button>
          </PopoverClose>
        </PopoverFooter>
      </PopoverContent>
    </Popover>
  ),
}
