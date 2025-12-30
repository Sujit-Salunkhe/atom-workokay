// src/components/ui/Drawer.stories.tsx
import type { Meta, StoryObj } from '@storybook/react'
import { Drawer, type DrawerProps } from './Drawer'
import { Button } from '../button/Button'
import { Input } from '../Input/Input'
import { Textarea } from '../textarea/TextArea'
import { Checkbox } from '../checkbox/Checkbox'
import React from 'react'

const meta: Meta<typeof Drawer> = {
  title: 'Components/Drawer',
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
    variant:{
      control:'select',
      options:["top","left","right","bottom"]
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
  <div className="flex flex-col gap-4">
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
      <Textarea id="message" placeholder="Enter your message" />
    </div>
  </div>
)

const defaultContent = (
  <div className="p-6 h-full flex flex-col justify-center items-center text-center">
    <div className="text-2xl mb-4">Drawer Content</div>
    <div className="text-sm opacity-75 max-w-sm">
      Drawer slides with contextual arrow trigger
    </div>
  </div>
)

export const DefaultRight: Story = {
  name: 'Default (Right)',
  args: {
    open: true,
    variant: 'right',
    size: 'md',
    children: defaultContent,
  },
}

export const RightSizes: Story = {
  name: 'Right - All Sizes',
  render: (args) => (
    <div className="grid grid-cols-2 gap-8 p-8 h-screen overflow-auto">
      {(['sm', 'md', 'lg', 'xl'] as DrawerProps['size'][]).map((size) => (
        <div key={size} className="relative h-96">
          <Drawer {...args} variant="right" size={size} open={true}>
            <div className="p-4 h-full flex items-center justify-center text-sm opacity-75">
              RIGHT - {size.toUpperCase()}
            </div>
          </Drawer>
          <div className="absolute -top-12 left-4 text-xs bg-background px-2 py-1 rounded-full shadow-sm">
            Right / {size}
          </div>
        </div>
      ))}
    </div>
  ),
}

export const InteractiveRight: Story = {
  name: 'Right - Interactive',
  render: (args) => {
    const [open, setOpen] = React.useState(false)
    return (
      <div className="flex items-center justify-center h-screen p-8">
        <Drawer {...args} open={open} onOpenChange={setOpen} variant="right">
          <Button variant="outline" onClick={() => setOpen(true)} className="mb-8">
            Open Right Drawer →
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
        <Button onClick={() => setOpen(true)} className="fixed top-8 right-8">
          New Profile →
        </Button>
        <Drawer {...args} open={open} onOpenChange={setOpen} variant="right" size="lg">
          <div className="max-w-md mx-auto w-full space-y-6">
            <div>
              <h2 className="text-2xl font-bold tracking-tight">Create Profile</h2>
              <p className="text-sm text-muted-foreground">Fill in the details.</p>
            </div>
            {formContent}
            <div className="flex gap-2 pt-4">
              <Button variant="outline" className="flex-1" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button className="flex-1">Create</Button>
            </div>
          </div>
        </Drawer>
      </>
    )
  },
}

export const DefaultLeft: Story = {
  name: 'Default (Left)',
  args: {
    open: true,
    variant: 'left',
    size: 'md',
    children: defaultContent,
  },
}

export const LeftSizes: Story = {
  name: 'Left - All Sizes',
  render: (args) => (
    <div className="grid grid-cols-2 gap-8 p-8 h-screen overflow-auto">
      {(['sm', 'md', 'lg', 'xl'] as DrawerProps['size'][]).map((size) => (
        <div key={size} className="relative h-96">
          <Drawer {...args} variant="left" size={size} open={true}>
            <div className="p-4 h-full flex items-center justify-center text-sm opacity-75">
              LEFT - {size.toUpperCase()}
            </div>
          </Drawer>
          <div className="absolute -top-12 left-4 text-xs bg-background px-2 py-1 rounded-full shadow-sm">
            Left / {size}
          </div>
        </div>
      ))}
    </div>
  ),
}

export const InteractiveLeft: Story = {
  name: 'Left - Interactive',
  render: (args) => {
    const [open, setOpen] = React.useState(false)
    return (
      <div className="flex items-center justify-center h-screen p-8">
        <Drawer {...args} open={open} onOpenChange={setOpen} variant="left">
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
        <Button onClick={() => setOpen(true)} className="fixed top-8 left-8">
          ← Menu
        </Button>
        <Drawer {...args} open={open} onOpenChange={setOpen} variant="left" size="sm">
          <div className="p-4 w-full">
            <div className="space-y-2">
              <Button variant="ghost" className="justify-start w-full">
                Dashboard
              </Button>
              <Button variant="ghost" className="justify-start w-full">
                Analytics
              </Button>
              <Button variant="ghost" className="justify-start w-full">
                Settings
              </Button>
            </div>
          </div>
        </Drawer>
      </>
    )
  },
}

export const DefaultBottom: Story = {
  name: 'Default (Bottom)',
  args: {
    open: true,
    variant: 'bottom',
    size: 'md',
    children: defaultContent,
  },
}

export const BottomSizes: Story = {
  name: 'Bottom - All Sizes',
  render: (args) => (
    <div className="grid grid-cols-2 gap-8 p-8 h-screen overflow-auto items-end">
      {(['sm', 'md', 'lg', 'xl'] as DrawerProps['size'][]).map((size) => (
        <div key={size} className="relative">
          <Drawer {...args} variant="bottom" size={size} open={true}>
            <div className="p-4 flex items-center justify-center text-sm opacity-75 h-full">
              BOTTOM - {size.toUpperCase()}
            </div>
          </Drawer>
          <div className="absolute -top-12 left-4 text-xs bg-background px-2 py-1 rounded-full shadow-sm">
            Bottom / {size}
          </div>
        </div>
      ))}
    </div>
  ),
}

export const BottomSheet: Story = {
  name: 'Bottom - Sheet Form',
  render: (args) => {
    const [open, setOpen] = React.useState(false)
    return (
      <>
        <Button onClick={() => setOpen(true)} className="fixed bottom-8 left-8">
          New Note ↑
        </Button>
        <Drawer {...args} open={open} onOpenChange={setOpen} variant="bottom" size="lg">
          <div className="max-w-md mx-auto w-full space-y-6 p-6">
            <div>
              <h2 className="text-2xl font-bold tracking-tight">Quick Note</h2>
              <p className="text-sm text-muted-foreground">Capture your thoughts instantly.</p>
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="title" className="text-sm font-medium">Title</label>
                <Input id="title" placeholder="What's on your mind?" />
              </div>
              <div className="space-y-2">
                <label htmlFor="note" className="text-sm font-medium">Note</label>
                <Textarea id="note" placeholder="Enter your note..." rows={4} />
              </div>
            </div>
            <div className="flex gap-2 pt-4">
              <Button variant="outline" className="flex-1" onClick={() => setOpen(false)}>
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

export const DefaultTop: Story = {
  name: 'Default (Top)',
  args: {
    open: true,
    variant: 'top',
    size: 'md',
    children: defaultContent,
  },
}

export const TopSizes: Story = {
  name: 'Top - All Sizes',
  render: (args) => (
    <div className="grid grid-cols-2 gap-8 p-8 h-screen overflow-auto items-start">
      {(['sm', 'md', 'lg', 'xl'] as DrawerProps['size'][]).map((size) => (
        <div key={size} className="relative">
          <Drawer {...args} variant="top" size={size} open={true}>
            <div className="p-4 flex items-center justify-center text-sm opacity-75 h-full">
              TOP - {size.toUpperCase()}
            </div>
          </Drawer>
          <div className="absolute -bottom-12 left-4 text-xs bg-background px-2 py-1 rounded-full shadow-sm">
            Top / {size}
          </div>
        </div>
      ))}
    </div>
  ),
}

export const TopNotifications: Story = {
  name: 'Top - Notifications',
  render: (args) => {
    const [open, setOpen] = React.useState(false)
    return (
      <>
        <Button onClick={() => setOpen(true)} className="fixed top-8 right-8">
          Notifications ↓
        </Button>
        <Drawer {...args} open={open} onOpenChange={setOpen} variant="top" size="md">
          <div className="p-6 w-full max-w-2xl">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Notifications</h3>
                <Button variant="ghost" size="sm">Mark all read</Button>
              </div>
              <div className="space-y-3">
                <div className="p-3 rounded-lg border hover:bg-accent">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <p className="font-medium">New message received</p>
                      <p className="text-sm opacity-75">2 minutes ago</p>
                    </div>
                  </div>
                </div>
                <div className="p-3 rounded-lg border bg-accent/50">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <p className="font-medium">Task completed</p>
                      <p className="text-sm opacity-75">1 hour ago</p>
                    </div>
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

export const ClosedStates: Story = {
  name: 'All Directions - Closed',
  render: (args) => (
    <div className="grid grid-cols-2 gap-8 p-12 h-screen items-start">
      {(['right', 'left', 'bottom', 'top'] as DrawerProps['variant'][]).map((variant) => (
        <div key={variant} className="relative border-2 border-dashed border-muted rounded-xl p-8 text-center min-h-[300px]">
          <Drawer {...args} variant={variant} open={false} />
          <div className="mt-20 text-sm opacity-75">
            {variant.toUpperCase()} (Closed)
          </div>
          <div className="text-xs opacity-50 mt-2">Trigger arrow visible</div>
        </div>
      ))}
    </div>
  ),
}

export const Playground: Story = {
  args: {
    open: true,
    variant: 'right',
    children: formContent,
  },
}
