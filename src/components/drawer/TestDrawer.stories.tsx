// src/components/ui/Drawer.stories.tsx
import type { Meta, StoryObj } from '@storybook/react'
import { Drawer, type DrawerProps } from './Drawer'
import { Button } from '../button/Button'
import { Input } from '../Input/Input'
import { Textarea } from '../textarea/TextArea'
import React from 'react'

const meta: Meta<typeof Drawer> = {
  title: 'Components/TestDrawer',
  component: Drawer,
  parameters: {
    layout: 'fullscreen',
    viewport: {
      viewports: {
        mobile: { name: 'Mobile', styles: { width: '375px', height: '667px' } },
        tablet: { name: 'Tablet', styles: { width: '768px', height: '1024px' } },
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['right', 'left', 'bottom', 'top'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl'],
    },
    open: { control: 'boolean' },
    onOpenChange: { action: 'onOpenChange' },
  },
  decorators: [
    (Story) => (
      <div className="p-8 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
        <Story />
      </div>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof meta>

const formContent = (
  <div className="flex flex-col gap-6">
    <div>
      <h2 className="text-2xl font-bold tracking-tight mb-2">Create Profile</h2>
      <p className="text-sm text-muted-foreground">Fill in the details below.</p>
    </div>
    <div className="space-y-4">
      <div className="space-y-2">
        <label htmlFor="name" className="text-sm font-medium">Name</label>
        <Input id="name" placeholder="Enter your name" />
      </div>
      <div className="space-y-2">
        <label htmlFor="email" className="text-sm font-medium">Email</label>
        <Input id="email" type="email" placeholder="your@email.com" />
      </div>
      <div className="space-y-2">
        <label htmlFor="message" className="text-sm font-medium">Message</label>
        <Textarea id="message" placeholder="Enter your message" rows={3} />
      </div>
    </div>
  </div>
)

export const RightDefault: Story = {
  name: 'Right - Default',
  args: {
    open: true,
    variant: 'right',
    size: 'md',
    children: (
      <div className="h-full flex flex-col justify-center items-center text-center p-8">
        <div className="text-3xl font-bold mb-4">Right Drawer</div>
        <div className="text-lg opacity-75 max-w-sm">
          Trigger button on left border with proper icon direction
        </div>
      </div>
    ),
  },
}

export const RightOpen: Story = {
  name: 'Right - Open (Interactive)',
  render: (args) => {
    const [open, setOpen] = React.useState(false)
    return (
      <div className="flex items-center justify-center min-h-screen p-8">
        <Drawer open={open} onOpenChange={setOpen} variant="right" size="md">
          <Button variant="outline" onClick={() => setOpen(true)} className="mb-8">
            → Open Right Drawer
          </Button>
          {formContent}
        </Drawer>
      </div>
    )
  },
}

export const RightForm: Story = {
  name: 'Right - Form',
  render: (args) => {
    const [open, setOpen] = React.useState(false)
    return (
      <>
        <Button onClick={() => setOpen(true)} className="fixed top-20 right-8 z-50">
          → New Profile
        </Button>
        <Drawer open={open} onOpenChange={setOpen} variant="right" size="lg">
          {formContent}
          <div className="flex gap-3 pt-6 mt-auto">
            <Button variant="outline" className="flex-1" onClick={() => open && args.onOpenChange?.(false)}>
              Cancel
            </Button>
            <Button className="flex-1">Create Profile</Button>
          </div>
        </Drawer>
      </>
    )
  },
}

export const RightSmall: Story = {
  name: 'Right - Small',
  args: {
    open: true,
    variant: 'right',
    size: 'sm',
    children: (
      <div className="h-full p-6 flex flex-col justify-center">
        <div className="text-xl font-bold mb-4">Compact Right Drawer</div>
        <div className="text-sm opacity-75">w-[239px] perfect for navigation</div>
      </div>
    ),
  },
}

export const LeftDefault: Story = {
  name: 'Left - Default',
  args: {
    open: true,
    variant: 'left',
    size: 'md',
    children: (
      <div className="h-full flex flex-col justify-center items-center text-center p-8">
        <div className="text-3xl font-bold mb-4">Left Drawer</div>
        <div className="text-lg opacity-75 max-w-sm">
          Trigger button on right border pointing correctly
        </div>
      </div>
    ),
  },
}

export const LeftOpen: Story = {
  name: 'Left - Open (Interactive)',
  render: (args) => {
    const [open, setOpen] = React.useState(false)
    return (
      <div className="flex items-center justify-center min-h-screen p-8">
        <Drawer open={open} onOpenChange={setOpen} variant="left" size="md">
          <Button variant="outline" onClick={() => setOpen(true)} className="mb-8">
            ← Open Left Drawer
          </Button>
          {formContent}
        </Drawer>
      </div>
    )
  },
}

export const LeftNavigation: Story = {
  name: 'Left - Navigation',
  render: (args) => {
    const [open, setOpen] = React.useState(false)
    return (
      <>
        <Button onClick={() => setOpen(true)} className="fixed top-20 left-8 z-50">
          ← Menu
        </Button>
        <Drawer open={open} onOpenChange={setOpen} variant="left" size="sm">
          <div className="p-6 space-y-2">
            <Button variant="ghost" className="justify-start w-full h-12">
              Dashboard
            </Button>
            <Button variant="ghost" className="justify-start w-full h-12">
              Analytics
            </Button>
            <Button variant="ghost" className="justify-start w-full h-12">
              Settings
            </Button>
            <Button variant="ghost" className="justify-start w-full h-12">
              Users
            </Button>
            <Button variant="ghost" className="justify-start w-full h-12">
              Billing
            </Button>
          </div>
        </Drawer>
      </>
    )
  },
}

export const BottomDefault: Story = {
  name: 'Bottom - Default',
  args: {
    open: true,
    variant: 'bottom',
    size: 'md',
    children: (
      <div className="h-full flex flex-col justify-center items-center text-center p-8">
        <div className="text-3xl font-bold mb-4">Bottom Sheet</div>
        <div className="text-lg opacity-75 max-w-sm">
          Trigger button on top border with upward arrow when closed
        </div>
      </div>
    ),
  },
}

export const BottomSheet: Story = {
  name: 'Bottom - Quick Note',
  render: (args) => {
    const [open, setOpen] = React.useState(false)
    return (
      <>
        <Button onClick={() => setOpen(true)} className="fixed bottom-20 left-8 z-50">
          ↑ New Note
        </Button>
        <Drawer open={open} onOpenChange={setOpen} variant="bottom" size="lg">
          <div className="space-y-6 p-6">
            <div>
              <h2 className="text-2xl font-bold tracking-tight">Quick Note</h2>
              <p className="text-sm text-muted-foreground">Capture your thoughts instantly.</p>
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Title</label>
                <Input id="title" placeholder="What's on your mind?" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Note</label>
                <Textarea id="note" placeholder="Enter your note..." rows={4} />
              </div>
            </div>
            <div className="flex gap-3 pt-4">
              <Button variant="outline" className="flex-1" onClick={() => open && args.onOpenChange?.(false)}>
                Cancel
              </Button>
              <Button className="flex-1">Save Note</Button>
            </div>
          </div>
        </Drawer>
      </>
    )
  },
}

export const TopDefault: Story = {
  name: 'Top - Default',
  args: {
    open: true,
    variant: 'top',
    size: 'md',
    children: (
      <div className="h-full flex flex-col justify-center items-center text-center p-8">
        <div className="text-3xl font-bold mb-4">Top Drawer</div>
        <div className="text-lg opacity-75 max-w-sm">
          Trigger button on bottom border pointing upward when open
        </div>
      </div>
    ),
  },
}

export const TopNotifications: Story = {
  name: 'Top - Notifications',
  render: (args) => {
    const [open, setOpen] = React.useState(false)
    return (
      <>
        <Button onClick={() => setOpen(true)} className="fixed top-20 right-8 z-50">
          ↓ Notifications
        </Button>
        <Drawer open={open} onOpenChange={setOpen} variant="top" size="lg">
          <div className="p-6 max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold">Notifications</h3>
              <Button variant="ghost" size="sm">Mark all read</Button>
            </div>
            <div className="space-y-4">
              <div className="p-4 rounded-xl border hover:bg-accent transition-colors">
                <div className="flex items-start gap-4">
                  <div className="w-3 h-3 bg-blue-500 rounded-full mt-1 flex-shrink-0"></div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm">New message received</p>
                    <p className="text-xs opacity-75 mt-1">2 minutes ago</p>
                  </div>
                </div>
              </div>
              <div className="p-4 rounded-xl border bg-accent/50">
                <div className="flex items-start gap-4">
                  <div className="w-3 h-3 bg-green-500 rounded-full mt-1 flex-shrink-0"></div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm">Task completed</p>
                    <p className="text-xs opacity-75 mt-1">1 hour ago</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Drawer>
      </>
    )
  },
}

export const ClosedRight: Story = {
  name: 'Right - Closed',
  args: {
    open: false,
    variant: 'right',
    size: 'md',
    children: <div>Hidden content</div>,
  },
}

export const Playground: Story = {
  name: 'Playground',
  args: {
    open: true,
    variant: 'right',
    size: 'md',
    children: formContent,
  },
}
