// Dialog.stories.tsx
import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  DialogBody,
} from './Dialogbox'

const meta = {
  title: 'Components/Dialog',
  component: Dialog,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A modal dialog built on Radix UI primitives with custom styling. Fully accessible with keyboard navigation, focus trapping, and ARIA attributes.',
      },
    },
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="atom-theme">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Dialog>

export default meta
type Story = StoryObj<typeof meta>

// ============================================================================
// BASIC EXAMPLES
// ============================================================================

export const Default: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
        Open Dialog
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <DialogBody>
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-1.5">
                Name
              </label>
              <input
                id="name"
                type="text"
                defaultValue="John Doe"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-1.5">
                Email
              </label>
              <input
                id="email"
                type="email"
                defaultValue="john@example.com"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
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
  ),
}

// ============================================================================
// CONTROLLED DIALOG
// ============================================================================

export const Controlled: Story = {
  render: function ControlledExample() {
    const [open, setOpen] = useState(false)

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
        </div>
        <div className="p-3 bg-gray-100 rounded-md">
          <p className="text-sm">
            Dialog state:{' '}
            <strong className={open ? 'text-green-600' : 'text-red-600'}>
              {open ? 'Open' : 'Closed'}
            </strong>
          </p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Controlled Dialog</DialogTitle>
              <DialogDescription>
                This dialog's open state is controlled by parent component state.
              </DialogDescription>
            </DialogHeader>
            <DialogBody>
              <p className="text-sm text-gray-600 mb-3">
                You can control the dialog programmatically using external buttons
                or close it by clicking outside, pressing Escape, or using the X button.
              </p>
              <div className="p-3 bg-blue-50 border border-blue-200 rounded-md">
                <p className="text-xs font-medium text-blue-900">
                  Use controlled mode when:
                </p>
                <ul className="mt-2 space-y-1 text-xs text-blue-800 list-disc list-inside">
                  <li>You need to programmatically open/close the dialog</li>
                  <li>Dialog state affects other parts of your UI</li>
                  <li>You want to track open/close events</li>
                </ul>
              </div>
            </DialogBody>
            <DialogFooter>
              <button
                onClick={() => setOpen(false)}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
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

// ============================================================================
// FORM DIALOGS
// ============================================================================

export const UserProfileForm: Story = {
  render: function ProfileExample() {
    const [formData, setFormData] = useState({
      firstName: 'Sarah',
      lastName: 'Chen',
      email: 'sarah.chen@company.com',
      role: 'Senior Product Designer',
      department: 'Design',
      location: 'San Francisco, CA',
      phone: '+1 (555) 123-4567',
      bio: 'Passionate about creating intuitive user experiences and leading design systems.',
    })

    return (
      <Dialog>
        <DialogTrigger className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
          Edit Profile
        </DialogTrigger>
        <DialogContent className="max-w-2xl">
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
              <div className="grid grid-cols-2 gap-4">
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
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="location" className="block text-sm font-medium mb-1.5">
                    Location
                  </label>
                  <input
                    id="location"
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium mb-1.5">
                    Phone
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
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

export const CreateProjectForm: Story = {
  render: function CreateProjectExample() {
    const [formData, setFormData] = useState({
      projectName: '',
      projectType: 'Web Application',
      client: '',
      budget: '',
      startDate: '',
      endDate: '',
      description: '',
    })

    return (
      <Dialog>
        <DialogTrigger className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors">
          Create New Project
        </DialogTrigger>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Create New Project</DialogTitle>
            <DialogDescription>
              Enter the details for your new project.
            </DialogDescription>
          </DialogHeader>
          <DialogBody>
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label htmlFor="projectName" className="block text-sm font-medium mb-1.5">
                  Project Name <span className="text-red-500">*</span>
                </label>
                <input
                  id="projectName"
                  type="text"
                  placeholder="E.g., Website Redesign"
                  value={formData.projectName}
                  onChange={(e) => setFormData({ ...formData, projectName: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="projectType" className="block text-sm font-medium mb-1.5">
                    Project Type
                  </label>
                  <select
                    id="projectType"
                    value={formData.projectType}
                    onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    <option>Web Application</option>
                    <option>Mobile App</option>
                    <option>Desktop Software</option>
                    <option>API Development</option>
                    <option>Design System</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="client" className="block text-sm font-medium mb-1.5">
                    Client Name
                  </label>
                  <input
                    id="client"
                    type="text"
                    placeholder="E.g., Acme Corp"
                    value={formData.client}
                    onChange={(e) => setFormData({ ...formData, client: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="startDate" className="block text-sm font-medium mb-1.5">
                    Start Date
                  </label>
                  <input
                    id="startDate"
                    type="date"
                    value={formData.startDate}
                    onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
                <div>
                  <label htmlFor="endDate" className="block text-sm font-medium mb-1.5">
                    End Date
                  </label>
                  <input
                    id="endDate"
                    type="date"
                    value={formData.endDate}
                    onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="budget" className="block text-sm font-medium mb-1.5">
                  Budget (USD)
                </label>
                <input
                  id="budget"
                  type="text"
                  placeholder="E.g., $50,000"
                  value={formData.budget}
                  onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div>
                <label htmlFor="description" className="block text-sm font-medium mb-1.5">
                  Description
                </label>
                <textarea
                  id="description"
                  rows={4}
                  placeholder="Describe the project goals and requirements..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 resize-none"
                />
              </div>
            </form>
          </DialogBody>
          <DialogFooter>
            <button className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100 transition-colors">
              Cancel
            </button>
            <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors">
              Create Project
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    )
  },
}

// ============================================================================
// CONFIRMATION DIALOGS
// ============================================================================

export const DeleteConfirmation: Story = {
  render: function DeleteExample() {
    const [confirmText, setConfirmText] = useState('')
    const projectName = 'Production Database'
    const canDelete = confirmText === projectName

    return (
      <Dialog>
        <DialogTrigger className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors">
          Delete Project
        </DialogTrigger>
        <DialogContent className="max-w-md">
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
                  Type{' '}
                  <code className="px-1.5 py-0.5 bg-gray-100 rounded font-mono text-xs">
                    {projectName}
                  </code>{' '}
                  to confirm:
                </label>
                <input
                  type="text"
                  value={confirmText}
                  onChange={(e) => setConfirmText(e.target.value)}
                  placeholder="Enter project name"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
            </div>
          </DialogBody>
          <DialogFooter>
            <button className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100 transition-colors">
              Cancel
            </button>
            <button
              disabled={!canDelete}
              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Delete Project
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    )
  },
}

export const LogoutConfirmation: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors">
        Logout
      </DialogTrigger>
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle>Confirm Logout</DialogTitle>
          <DialogDescription>
            Are you sure you want to log out of your account?
          </DialogDescription>
        </DialogHeader>
        <DialogBody>
          <div className="flex items-center gap-3 text-gray-600">
            <svg
              className="w-12 h-12 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              />
            </svg>
            <p className="text-sm">
              You'll need to sign in again to access your account.
            </p>
          </div>
        </DialogBody>
        <DialogFooter>
          <button className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100 transition-colors">
            Cancel
          </button>
          <button className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors">
            Logout
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
}

// ============================================================================
// SUCCESS/INFO DIALOGS
// ============================================================================

export const SuccessMessage: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors">
        Show Success
      </DialogTrigger>
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle>Success!</DialogTitle>
          <DialogDescription>
            Your changes have been saved successfully.
          </DialogDescription>
        </DialogHeader>
        <DialogBody>
          <div className="flex items-center gap-3 text-green-600">
            <svg
              className="w-16 h-16"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <div>
              <p className="text-sm font-medium text-gray-900">
                All changes are now live
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Your updates are visible to all users
              </p>
            </div>
          </div>
        </DialogBody>
        <DialogFooter>
          <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors w-full">
            Got it
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
}

// ============================================================================
// MULTI-STEP DIALOG
// ============================================================================

export const MultiStepWizard: Story = {
  render: function MultiStepExample() {
    const [open, setOpen] = useState(false)
    const [step, setStep] = useState(1)
    const [formData, setFormData] = useState({
      accountType: 'personal',
      fullName: '',
      email: '',
      password: '',
      company: '',
      agreeToTerms: false,
    })

    const handleClose = () => {
      setOpen(false)
      setTimeout(() => setStep(1), 300)
    }

    const handleNext = () => {
      if (step < 3) setStep(step + 1)
    }

    const handleBack = () => {
      if (step > 1) setStep(step - 1)
    }

    return (
      <>
        <button
          onClick={() => setOpen(true)}
          className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
        >
          Create Account
        </button>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent className="max-w-xl">
            <DialogHeader>
              <DialogTitle>Create Account - Step {step} of 3</DialogTitle>
              <DialogDescription>
                {step === 1 && 'Choose your account type'}
                {step === 2 && 'Enter your personal information'}
                {step === 3 && 'Review and confirm'}
              </DialogDescription>
            </DialogHeader>
            <DialogBody>
              {/* Progress indicator */}
              <div className="flex gap-2 mb-6">
                {[1, 2, 3].map((s) => (
                  <div
                    key={s}
                    className={`flex-1 h-2 rounded-full transition-colors ${
                      s <= step ? 'bg-purple-600' : 'bg-gray-200'
                    }`}
                  />
                ))}
              </div>

              {/* Step 1 */}
              {step === 1 && (
                <div className="space-y-4">
                  <label className="flex items-center p-4 border-2 border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 has-[:checked]:border-purple-600 has-[:checked]:bg-purple-50">
                    <input
                      type="radio"
                      name="accountType"
                      value="personal"
                      checked={formData.accountType === 'personal'}
                      onChange={(e) =>
                        setFormData({ ...formData, accountType: e.target.value })
                      }
                      className="mr-3"
                    />
                    <div>
                      <p className="font-medium">Personal Account</p>
                      <p className="text-sm text-gray-500">
                        For individual use and personal projects
                      </p>
                    </div>
                  </label>
                  <label className="flex items-center p-4 border-2 border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 has-[:checked]:border-purple-600 has-[:checked]:bg-purple-50">
                    <input
                      type="radio"
                      name="accountType"
                      value="business"
                      checked={formData.accountType === 'business'}
                      onChange={(e) =>
                        setFormData({ ...formData, accountType: e.target.value })
                      }
                      className="mr-3"
                    />
                    <div>
                      <p className="font-medium">Business Account</p>
                      <p className="text-sm text-gray-500">
                        For teams and organizations
                      </p>
                    </div>
                  </label>
                </div>
              )}

              {/* Step 2 */}
              {step === 2 && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1.5">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={formData.fullName}
                      onChange={(e) =>
                        setFormData({ ...formData, fullName: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1.5">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1.5">
                      Password
                    </label>
                    <input
                      type="password"
                      value={formData.password}
                      onChange={(e) =>
                        setFormData({ ...formData, password: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                  {formData.accountType === 'business' && (
                    <div>
                      <label className="block text-sm font-medium mb-1.5">
                        Company Name
                      </label>
                      <input
                        type="text"
                        value={formData.company}
                        onChange={(e) =>
                          setFormData({ ...formData, company: e.target.value })
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />
                    </div>
                  )}
                </div>
              )}

              {/* Step 3 */}
              {step === 3 && (
                <div className="space-y-4">
                  <div className="p-4 bg-gray-50 rounded-md space-y-3">
                    <div>
                      <p className="text-xs text-gray-500">Account Type</p>
                      <p className="text-sm font-medium capitalize">
                        {formData.accountType}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Full Name</p>
                      <p className="text-sm font-medium">
                        {formData.fullName || 'Not provided'}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Email</p>
                      <p className="text-sm font-medium">
                        {formData.email || 'Not provided'}
                      </p>
                    </div>
                    {formData.accountType === 'business' && (
                      <div>
                        <p className="text-xs text-gray-500">Company</p>
                        <p className="text-sm font-medium">
                          {formData.company || 'Not provided'}
                        </p>
                      </div>
                    )}
                  </div>
                  <label className="flex items-start gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.agreeToTerms}
                      onChange={(e) =>
                        setFormData({ ...formData, agreeToTerms: e.target.checked })
                      }
                      className="mt-1"
                    />
                    <span className="text-sm text-gray-600">
                      I agree to the terms of service and privacy policy
                    </span>
                  </label>
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
                  className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
                >
                  Next
                </button>
              ) : (
                <button
                  onClick={handleClose}
                  disabled={!formData.agreeToTerms}
                  className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Create Account
                </button>
              )}
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </>
    )
  },
}

// ============================================================================
// WITHOUT CLOSE BUTTON
// ============================================================================

export const WithoutCloseButton: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger className="px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 transition-colors">
        No Close Button
      </DialogTrigger>
      <DialogContent showClose={false}>
        <DialogHeader>
          <DialogTitle>Required Action</DialogTitle>
          <DialogDescription>
            This dialog requires you to make a choice. There is no close button.
          </DialogDescription>
        </DialogHeader>
        <DialogBody>
          <p className="text-sm text-gray-600">
            You can still close this dialog by pressing Escape or clicking outside,
            but there is no X button in the top-right corner.
          </p>
        </DialogBody>
        <DialogFooter>
          <button className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100 transition-colors">
            Decline
          </button>
          <button className="px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 transition-colors">
            Accept
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
}

// ============================================================================
// SCROLLABLE CONTENT
// ============================================================================

export const ScrollableContent: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
        Terms & Conditions
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Terms and Conditions</DialogTitle>
          <DialogDescription>
            Please read our terms and conditions carefully.
          </DialogDescription>
        </DialogHeader>
        <DialogBody>
          <div className="space-y-4 text-sm">
            {Array.from({ length: 15 }, (_, i) => (
              <div key={i}>
                <h4 className="font-semibold mb-1">Section {i + 1}</h4>
                <p className="text-gray-600">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                  eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                  enim ad minim veniam, quis nostrud exercitation ullamco laboris
                  nisi ut aliquip ex ea commodo consequat.
                </p>
              </div>
            ))}
          </div>
        </DialogBody>
        <DialogFooter>
          <button className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100 transition-colors">
            Decline
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
            Accept
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
}

// ============================================================================
// MINIMAL DIALOG
// ============================================================================

export const MinimalDialog: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors">
        Simple Message
      </DialogTrigger>
      <DialogContent className="max-w-sm">
        <DialogBody>
          <p className="text-sm text-center">
            This is a minimal dialog with just body content and no header or footer.
          </p>
        </DialogBody>
      </DialogContent>
    </Dialog>
  ),
}
