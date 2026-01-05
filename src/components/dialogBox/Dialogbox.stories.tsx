// src/components/ui/Dialog.stories.tsx
import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { useArgs } from 'storybook/preview-api'
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogBody,
  DialogFooter,
  type DialogProps,
} from './Dialogbox'
import { cn } from '../../lib/cn'

type DialogStoryProps = Omit<DialogProps, 'children'> & {
  children?: React.ReactNode
}

const meta = {
  title: 'Components/Dialog',
  component: Dialog,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A fully accessible modal dialog component with portal rendering, focus trap, body scroll lock, smooth animations, and customizable backdrop variants. Supports both controlled and uncontrolled modes.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    open: {
      control: 'boolean',
      description: 'Controlled open state',
      table: {
        category: 'Controlled',
      },
    },
    defaultOpen: {
      control: 'boolean',
      description: 'Default open state (uncontrolled)',
      table: {
        category: 'Uncontrolled',
      },
    },
    onOpenChange: {
      action: 'onOpenChange',
      description: 'Callback when open state changes',
      table: {
        category: 'Events',
      },
    },
  },
  decorators: [
    function Component(Story, ctx) {
      const [, updateArgs] = useArgs()

      const onOpenChange = (open: boolean) => {
        ctx.args.onOpenChange?.(open)
        // Update controlled state in Storybook
        if (ctx.args.open !== undefined) {
          updateArgs({ open })
        }
      }

      return <Story args={{ ...ctx.args, onOpenChange }} />
    },
  ],
} satisfies Meta<DialogStoryProps>

export default meta
type Story = StoryObj<DialogStoryProps>

// ============================================================================
// BASIC EXAMPLES
// ============================================================================

export const Default: Story = {
  render: (args) => (
    <Dialog {...args}>
      <DialogTrigger className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
        Open Dialog
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Dialog Title</DialogTitle>
          <DialogDescription>
            This is a description of what this dialog is about.
          </DialogDescription>
        </DialogHeader>
        <DialogBody>
          <p className="text-sm">
            This is the main content area of the dialog. You can put any
            content here including forms, lists, or complex layouts.
          </p>
        </DialogBody>
        <DialogFooter>
          <button className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100 transition-colors">
            Cancel
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
            Confirm
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
}

// ============================================================================
// UNCONTROLLED EXAMPLES
// ============================================================================

export const UncontrolledDefault: Story = {
  args: {
    defaultOpen: false,
  },
  argTypes: {
    open: {
      control: { disable: true },
      table: { disable: true },
    },
  },
  render: (args) => (
    <Dialog {...args}>
      <DialogTrigger className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors">
        Open Uncontrolled Dialog
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Uncontrolled Dialog</DialogTitle>
          <DialogDescription>
            This dialog manages its own state internally using defaultOpen prop.
          </DialogDescription>
        </DialogHeader>
        <DialogBody>
          <p className="text-sm text-gray-600 mb-3">
            Uncontrolled components handle their own state. You set the initial
            state with <code className="px-1.5 py-0.5 bg-gray-100 rounded text-xs">defaultOpen</code> and
            the component manages opening/closing internally.
          </p>
          <div className="p-3 bg-purple-50 border border-purple-200 rounded-md">
            <p className="text-xs font-medium text-purple-900">
              Use uncontrolled mode when:
            </p>
            <ul className="mt-2 space-y-1 text-xs text-purple-800 list-disc list-inside">
              <li>You don't need to programmatically control the dialog</li>
              <li>Simple user-triggered interactions are sufficient</li>
              <li>You want less boilerplate code</li>
            </ul>
          </div>
        </DialogBody>
        <DialogFooter>
          <button className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors">
            Close
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
}

export const UncontrolledStartsOpen: Story = {
  args: {
    defaultOpen: true,
  },
  argTypes: {
    open: {
      control: { disable: true },
      table: { disable: true },
    },
  },
  render: (args) => (
    <Dialog {...args}>
      <DialogTrigger className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors">
        Trigger (Dialog Already Open)
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Welcome!</DialogTitle>
          <DialogDescription>
            This dialog opens automatically when the component mounts.
          </DialogDescription>
        </DialogHeader>
        <DialogBody>
          <p className="text-sm text-gray-600">
            Set <code className="px-1.5 py-0.5 bg-gray-100 rounded text-xs">defaultOpen={'{'}true{'}'}</code> to
            show the dialog immediately. Perfect for welcome messages, important announcements,
            or first-time user onboarding.
          </p>
        </DialogBody>
        <DialogFooter>
          <button className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors">
            Get Started
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
}

export const UncontrolledUserProfile: Story = {
  args: {
    defaultOpen: false,
  },
  argTypes: {
    open: {
      control: { disable: true },
      table: { disable: true },
    },
  },
  render: (args) => {
    const [formData, setFormData] = useState({
      firstName: 'Sarah',
      lastName: 'Chen',
      email: 'sarah.chen@company.com',
      role: 'Senior Product Designer',
      department: 'Design',
      bio: 'Passionate about creating intuitive user experiences and leading design systems.',
    })

    return (
      <Dialog {...args}>
        <DialogTrigger className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
          Edit Profile
        </DialogTrigger>
        <DialogContent size="lg">
          <DialogHeader>
            <DialogTitle>Edit Your Profile</DialogTitle>
            <DialogDescription>
              Update your personal information and preferences.
            </DialogDescription>
          </DialogHeader>
          <DialogBody>
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium mb-1.5">
                    First Name
                  </label>
                  <input
                    id="firstName"
                    type="text"
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium mb-1.5">
                    Last Name
                  </label>
                  <input
                    id="lastName"
                    type="text"
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-1.5">
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label htmlFor="role" className="block text-sm font-medium mb-1.5">
                  Job Title
                </label>
                <input
                  id="role"
                  type="text"
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label htmlFor="department" className="block text-sm font-medium mb-1.5">
                  Department
                </label>
                <select
                  id="department"
                  value={formData.department}
                  onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option>Design</option>
                  <option>Engineering</option>
                  <option>Product</option>
                  <option>Marketing</option>
                  <option>Sales</option>
                </select>
              </div>
              <div>
                <label htmlFor="bio" className="block text-sm font-medium mb-1.5">
                  Bio
                </label>
                <textarea
                  id="bio"
                  rows={4}
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                />
              </div>
            </form>
          </DialogBody>
          <DialogFooter>
            <button className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100 transition-colors">
              Cancel
            </button>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
              Save Changes
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    )
  },
}

// ============================================================================
// CONTROLLED EXAMPLES
// ============================================================================

export const ControlledDialog: Story = {
  args: {
    open: false,
  },
  argTypes: {
    defaultOpen: {
      control: { disable: true },
      table: { disable: true },
    },
  },
  render: function ControlledExample(args) {
    const [open, setOpen] = useState(args.open ?? false)

    return (
      <div className="space-y-4">
        <div className="flex gap-2">
          <button
            onClick={() => setOpen(true)}
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
          >
            Open Dialog
          </button>
          <button
            onClick={() => setOpen(false)}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
          >
            Close Dialog
          </button>
          <button
            onClick={() => setOpen(!open)}
            className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
          >
            Toggle
          </button>
        </div>
        <div className="p-3 bg-gray-100 rounded-md">
          <p className="text-sm">
            Dialog state: <strong className={open ? 'text-green-600' : 'text-red-600'}>{open ? 'Open' : 'Closed'}</strong>
          </p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Controlled Dialog</DialogTitle>
              <DialogDescription>
                This dialog's state is controlled externally via useState.
              </DialogDescription>
            </DialogHeader>
            <DialogBody>
              <p className="text-sm text-gray-600 mb-3">
                Controlled components receive their state from props and notify
                changes via callbacks. The parent component manages the state.
              </p>
              <div className="p-3 bg-green-50 border border-green-200 rounded-md">
                <p className="text-xs font-medium text-green-900">
                  Use controlled mode when:
                </p>
                <ul className="mt-2 space-y-1 text-xs text-green-800 list-disc list-inside">
                  <li>You need to programmatically open/close the dialog</li>
                  <li>Dialog state affects other parts of your UI</li>
                  <li>You want to validate before closing</li>
                  <li>You need to track open/close events</li>
                </ul>
              </div>
            </DialogBody>
            <DialogFooter>
              <button
                onClick={() => setOpen(false)}
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
              >
                Close from Inside
              </button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    )
  },
}

export const ControlledMultiStep: Story = {
  args: {
    open: false,
  },
  argTypes: {
    defaultOpen: {
      control: { disable: true },
      table: { disable: true },
    },
  },
  render: function MultiStepExample(args) {
    const [open, setOpen] = useState(args.open ?? false)
    const [step, setStep] = useState(1)
    const [formData, setFormData] = useState({
      projectName: 'E-commerce Redesign',
      projectType: 'Web Application',
      budget: '$50,000 - $100,000',
      timeline: '3-6 months',
      teamSize: '5-10',
      description: 'Complete redesign of our e-commerce platform with focus on mobile experience',
    })

    const handleClose = () => {
      setOpen(false)
      setTimeout(() => setStep(1), 300) // Reset after animation
    }

    const handleNext = () => {
      if (step < 3) setStep(step + 1)
    }

    const handleBack = () => {
      if (step > 1) setStep(step - 1)
    }

    return (
      <div className="space-y-4">
        <button
          onClick={() => setOpen(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          Create New Project
        </button>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent size="xl">
            <DialogHeader>
              <DialogTitle>Create New Project - Step {step} of 3</DialogTitle>
              <DialogDescription>
                {step === 1 && 'Enter basic project information'}
                {step === 2 && 'Define project scope and budget'}
                {step === 3 && 'Review and confirm details'}
              </DialogDescription>
            </DialogHeader>
            <DialogBody>
              {/* Progress indicator */}
              <div className="flex gap-2 mb-6">
                {[1, 2, 3].map((s) => (
                  <div
                    key={s}
                    className={cn(
                      'flex-1 h-2 rounded-full transition-colors',
                      s <= step ? 'bg-blue-600' : 'bg-gray-200'
                    )}
                  />
                ))}
              </div>

              {/* Step 1 */}
              {step === 1 && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1.5">
                      Project Name
                    </label>
                    <input
                      type="text"
                      value={formData.projectName}
                      onChange={(e) =>
                        setFormData({ ...formData, projectName: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1.5">
                      Project Type
                    </label>
                    <select
                      value={formData.projectType}
                      onChange={(e) =>
                        setFormData({ ...formData, projectType: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option>Web Application</option>
                      <option>Mobile App</option>
                      <option>Desktop Software</option>
                      <option>API Development</option>
                    </select>
                  </div>
                </div>
              )}

              {/* Step 2 */}
              {step === 2 && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1.5">
                      Budget Range
                    </label>
                    <select
                      value={formData.budget}
                      onChange={(e) =>
                        setFormData({ ...formData, budget: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option>$10,000 - $25,000</option>
                      <option>$25,000 - $50,000</option>
                      <option>$50,000 - $100,000</option>
                      <option>$100,000+</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1.5">
                      Timeline
                    </label>
                    <select
                      value={formData.timeline}
                      onChange={(e) =>
                        setFormData({ ...formData, timeline: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option>1-3 months</option>
                      <option>3-6 months</option>
                      <option>6-12 months</option>
                      <option>12+ months</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1.5">
                      Team Size
                    </label>
                    <select
                      value={formData.teamSize}
                      onChange={(e) =>
                        setFormData({ ...formData, teamSize: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option>1-5</option>
                      <option>5-10</option>
                      <option>10-20</option>
                      <option>20+</option>
                    </select>
                  </div>
                </div>
              )}

              {/* Step 3 */}
              {step === 3 && (
                <div className="space-y-4">
                  <div className="p-4 bg-gray-50 rounded-md space-y-3">
                    <div>
                      <p className="text-xs text-gray-500">Project Name</p>
                      <p className="text-sm font-medium">{formData.projectName}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Project Type</p>
                      <p className="text-sm font-medium">{formData.projectType}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Budget</p>
                      <p className="text-sm font-medium">{formData.budget}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Timeline</p>
                      <p className="text-sm font-medium">{formData.timeline}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Team Size</p>
                      <p className="text-sm font-medium">{formData.teamSize}</p>
                    </div>
                  </div>
                  <div className="p-3 bg-blue-50 border border-blue-200 rounded-md">
                    <p className="text-xs text-blue-800">
                      ✓ Review your information and click "Create Project" to continue.
                    </p>
                  </div>
                </div>
              )}
            </DialogBody>
            <DialogFooter>
              <button
                onClick={handleClose}
                className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100 transition-colors"
              >
                Cancel
              </button>
              {step > 1 && (
                <button
                  onClick={handleBack}
                  className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100 transition-colors"
                >
                  Back
                </button>
              )}
              {step < 3 ? (
                <button
                  onClick={handleNext}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                  Next
                </button>
              ) : (
                <button
                  onClick={handleClose}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                  Create Project
                </button>
              )}
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    )
  },
}

export const ControlledDeleteConfirmation: Story = {
  args: {
    open: false,
  },
  argTypes: {
    defaultOpen: {
      control: { disable: true },
      table: { disable: true },
    },
  },
  render: function DeleteExample(args) {
    const [open, setOpen] = useState(args.open ?? false)
    const [confirmText, setConfirmText] = useState('')
    const [isDeleting, setIsDeleting] = useState(false)

    const projectName = 'Production Database'
    const canDelete = confirmText === projectName

    const handleDelete = () => {
      setIsDeleting(true)
      // Simulate API call
      setTimeout(() => {
        setIsDeleting(false)
        setOpen(false)
        setConfirmText('')
      }, 2000)
    }

    return (
      <div className="space-y-4">
        <button
          onClick={() => setOpen(true)}
          className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
        >
          Delete Project
        </button>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent size="md" disableClose={isDeleting}>
            <DialogHeader>
              <DialogTitle>Delete Project</DialogTitle>
              <DialogDescription>
                This action cannot be undone. This will permanently delete your project.
              </DialogDescription>
            </DialogHeader>
            <DialogBody>
              <div className="space-y-4">
                <div className="p-4 bg-red-50 border border-red-200 rounded-md">
                  <p className="text-sm font-medium text-red-900 mb-2">
                    ⚠️ Warning: This is a destructive action
                  </p>
                  <ul className="text-xs text-red-800 space-y-1 list-disc list-inside">
                    <li>All project data will be permanently deleted</li>
                    <li>This includes all files, settings, and history</li>
                    <li>Team members will lose access immediately</li>
                    <li>This action cannot be reversed</li>
                  </ul>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Type <code className="px-1.5 py-0.5 bg-gray-100 rounded font-mono text-xs">{projectName}</code> to confirm:
                  </label>
                  <input
                    type="text"
                    value={confirmText}
                    onChange={(e) => setConfirmText(e.target.value)}
                    placeholder="Enter project name"
                    disabled={isDeleting}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 disabled:bg-gray-100"
                  />
                </div>
              </div>
            </DialogBody>
            <DialogFooter>
              <button
                onClick={() => {
                  setOpen(false)
                  setConfirmText('')
                }}
                disabled={isDeleting}
                className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={!canDelete || isDeleting}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isDeleting ? 'Deleting...' : 'Delete Project'}
              </button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    )
  },
}

// ============================================================================
// ADDITIONAL EXAMPLES
// ============================================================================

export const WithAsChildTrigger: Story = {
  render: (args) => (
    <Dialog {...args}>
      <DialogTrigger asChild>
        <div className="group cursor-pointer">
          <div className="flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all shadow-md hover:shadow-lg">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
            <div>
              <p className="font-semibold">Add New Item</p>
              <p className="text-xs text-purple-100">Click to open dialog</p>
            </div>
          </div>
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Custom Trigger Example</DialogTitle>
          <DialogDescription>
            Using asChild prop to render a custom trigger element.
          </DialogDescription>
        </DialogHeader>
        <DialogBody>
          <p className="text-sm text-gray-600">
            The <code className="px-1.5 py-0.5 bg-gray-100 rounded text-xs">asChild</code> prop
            allows you to use any element as the trigger by using Radix UI's Slot component.
          </p>
        </DialogBody>
        <DialogFooter>
          <button className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors">
            Close
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
}

export const BackdropVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      {(['blur', 'dark', 'light', 'none'] as const).map((backdrop) => (
        <Dialog key={backdrop}>
          <DialogTrigger className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm transition-colors capitalize">
            {backdrop}
          </DialogTrigger>
          <DialogContent backdrop={backdrop}>
            <DialogHeader>
              <DialogTitle>Backdrop: {backdrop}</DialogTitle>
              <DialogDescription>
                This dialog uses the "{backdrop}" backdrop variant.
              </DialogDescription>
            </DialogHeader>
            <DialogBody>
              <p className="text-sm mb-3">
                The backdrop affects the overlay appearance behind the dialog.
              </p>
              <ul className="space-y-1.5 text-sm list-disc list-inside text-gray-600">
                <li><strong>blur</strong>: Blurred background with 50% opacity</li>
                <li><strong>dark</strong>: Solid dark background</li>
                <li><strong>light</strong>: Semi-transparent light overlay</li>
                <li><strong>none</strong>: No backdrop overlay</li>
              </ul>
            </DialogBody>
            <DialogFooter>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                Close
              </button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      ))}
    </div>
  ),
  parameters: {
    layout: 'padded',
  },
}

export const SizeVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      {(['sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl', 'full'] as const).map(
        (size) => (
          <Dialog key={size}>
            <DialogTrigger className="px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm transition-colors">
              {size.toUpperCase()}
            </DialogTrigger>
            <DialogContent size={size}>
              <DialogHeader>
                <DialogTitle>Size: {size}</DialogTitle>
                <DialogDescription>
                  This dialog has size variant: {size}
                </DialogDescription>
              </DialogHeader>
              <DialogBody>
                <p className="text-sm">
                  Maximum width for this size is <code className="px-1.5 py-0.5 bg-gray-100 rounded text-xs">max-w-{size}</code>.
                </p>
              </DialogBody>
              <DialogFooter>
                <button className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100 transition-colors">
                  Close
                </button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        ),
      )}
    </div>
  ),
  parameters: {
    layout: 'padded',
  },
}
