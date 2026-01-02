// src/components/ui/Tabs.stories.tsx
import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { Tabs, TabsList, TabTrigger, TabContent } from './Tabs'

const meta: Meta<typeof Tabs> = {
  title: 'Components/Tabs',
  component: Tabs,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'A fully accessible tabs component with keyboard navigation, multiple variants, and support for both horizontal and vertical orientations. Follows WAI-ARIA design patterns.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'pills', 'underline'],
      description: 'Visual style variant',
      table: {
        defaultValue: { summary: 'default' },
      },
    },
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
      description: 'Layout orientation',
      table: {
        defaultValue: { summary: 'horizontal' },
      },
    },
    defaultValue: {
      control: 'text',
      description: 'The default active tab (uncontrolled mode)',
    },
    value: {
      control: false,
      description: 'The active tab (controlled mode)',
    },
    onValueChange: {
      control: false,
      description: 'Callback when active tab changes',
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

// ============================================================================
// BASIC EXAMPLES
// ============================================================================

export const Default: Story = {
  render: (args) => (
    <Tabs  {...args}>
      <TabsList aria-label="Main navigation">
        <TabTrigger value="tab1">Account</TabTrigger>
        <TabTrigger value="tab2">Settings</TabTrigger>
        <TabTrigger value="tab3">Notifications</TabTrigger>
      </TabsList>
      <TabContent value="tab1">
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Account Settings</h3>
          <p>Manage your account information and preferences.</p>
        </div>
      </TabContent>
      <TabContent value="tab2">
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">General Settings</h3>
          <p>Configure your application settings and defaults.</p>
        </div>
      </TabContent>
      <TabContent value="tab3">
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Notification Preferences</h3>
          <p>Control how and when you receive notifications.</p>
        </div>
      </TabContent>
    </Tabs>
  ),
  args: {
    variant: 'default',
    orientation: 'horizontal',
    defaultValue: "tab1"
  },
}

export const PillsVariant: Story = {
  render: (args) => (
    <Tabs {...args}>
      <TabsList aria-label="Dashboard sections">
        <TabTrigger value="overview">Overview</TabTrigger>
        <TabTrigger value="analytics">Analytics</TabTrigger>
        <TabTrigger value="reports">Reports</TabTrigger>
        <TabTrigger value="settings">Settings</TabTrigger>
      </TabsList>
      <TabContent value="overview">
        <div className="p-4 border rounded-lg">
          <h3 className="font-semibold mb-2">Dashboard Overview</h3>
          <p className="text-sm">Key metrics and recent activity summary.</p>
        </div>
      </TabContent>
      <TabContent value="analytics">
        <div className="p-4 border rounded-lg">
          <h3 className="font-semibold mb-2">Analytics Dashboard</h3>
          <p className="text-sm">Detailed analytics and insights.</p>
        </div>
      </TabContent>
      <TabContent value="reports">
        <div className="p-4 border rounded-lg">
          <h3 className="font-semibold mb-2">Reports</h3>
          <p className="text-sm">Generate and view reports.</p>
        </div>
      </TabContent>
      <TabContent value="settings">
        <div className="p-4 border rounded-lg">
          <h3 className="font-semibold mb-2">Settings</h3>
          <p className="text-sm">Configure dashboard preferences.</p>
        </div>
      </TabContent>
    </Tabs>
  ),
  args: {
    variant: 'pills',
    orientation: 'horizontal',
    defaultValue:"overview"
  },
}

export const UnderlineVariant: Story = {
  render: (args) => (
    <Tabs  {...args}>
      <TabsList aria-label="Product categories">
        <TabTrigger value="all">All Products</TabTrigger>
        <TabTrigger value="electronics">Electronics</TabTrigger>
        <TabTrigger value="clothing">Clothing</TabTrigger>
        <TabTrigger value="books">Books</TabTrigger>
      </TabsList>
      <TabContent value="all">
        <p>Showing all products from all categories.</p>
      </TabContent>
      <TabContent value="electronics">
        <p>Browse our selection of electronic devices and accessories.</p>
      </TabContent>
      <TabContent value="clothing">
        <p>Explore our fashion and clothing collection.</p>
      </TabContent>
      <TabContent value="books">
        <p>Discover books across all genres.</p>
      </TabContent>
    </Tabs>
  ),
  args: {
    variant: 'underline',
    orientation: 'horizontal',
    defaultValue:"all"
  },
}

// ============================================================================
// ORIENTATION
// ============================================================================

export const VerticalOrientation: Story = {
  render: (args) => (
    <div className="flex min-h-75">
      <Tabs  {...args}>
        <TabsList aria-label="User settings">
          <TabTrigger value="profile">Profile</TabTrigger>
          <TabTrigger value="security">Security</TabTrigger>
          <TabTrigger value="privacy">Privacy</TabTrigger>
          <TabTrigger value="billing">Billing</TabTrigger>
        </TabsList>
        <TabContent value="profile">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Profile Information</h3>
            <p>Update your personal information and profile picture.</p>
            <div className="space-y-2">
              <div>
                <label className="block text-sm font-medium mb-1">Name</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border rounded"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <input
                  type="email"
                  className="w-full px-3 py-2 border rounded"
                  placeholder="john@example.com"
                />
              </div>
            </div>
          </div>
        </TabContent>
        <TabContent value="security">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Security Settings</h3>
            <p>Manage your password and authentication methods.</p>
          </div>
        </TabContent>
        <TabContent value="privacy">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Privacy Controls</h3>
            <p>Configure your privacy and data sharing preferences.</p>
          </div>
        </TabContent>
        <TabContent value="billing">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Billing Information</h3>
            <p>Manage payment methods and view billing history.</p>
          </div>
        </TabContent>
      </Tabs>
    </div>
  ),
  args: {
    variant: 'default',
    orientation: 'vertical',
    defaultValue: "profile"
  },
}

export const VerticalPills: Story = {
  render: (args) => (
    <div className="flex min-h-75">
      <Tabs  {...args}>
        <TabsList aria-label="Settings navigation">
          <TabTrigger value="general">General</TabTrigger>
          <TabTrigger value="appearance">Appearance</TabTrigger>
          <TabTrigger value="notifications">Notifications</TabTrigger>
          <TabTrigger value="advanced">Advanced</TabTrigger>
        </TabsList>
        <TabContent value="general">
          <h3 className="font-semibold mb-2">General Settings</h3>
          <p>Configure basic application settings.</p>
        </TabContent>
        <TabContent value="appearance">
          <h3 className="font-semibold mb-2">Appearance</h3>
          <p>Customize the look and feel of your application.</p>
        </TabContent>
        <TabContent value="notifications">
          <h3 className="font-semibold mb-2">Notifications</h3>
          <p>Manage notification preferences.</p>
        </TabContent>
        <TabContent value="advanced">
          <h3 className="font-semibold mb-2">Advanced Settings</h3>
          <p>Configure advanced options and developer settings.</p>
        </TabContent>
      </Tabs>
    </div>
  ),
  args: {
    variant: 'pills',
    orientation: 'vertical',
    defaultValue: "general"
  },
}

// ============================================================================
// CONTROLLED MODE
// ============================================================================

export const Controlled: Story = {
  render: (args) => {
    const [activeTab, setActiveTab] = useState('tab1')

    return (
      <div className="space-y-4">
        <div className="flex gap-2">
          <button
            onClick={() => setActiveTab('tab1')}
            className="px-3 py-1 bg-blue-600 text-white rounded text-sm"
          >
            Go to Tab 1
          </button>
          <button
            onClick={() => setActiveTab('tab2')}
            className="px-3 py-1 bg-blue-600 text-white rounded text-sm"
          >
            Go to Tab 2
          </button>
          <button
            onClick={() => setActiveTab('tab3')}
            className="px-3 py-1 bg-blue-600 text-white rounded text-sm"
          >
            Go to Tab 3
          </button>
        </div>
        <p className="text-sm">Active tab: <strong>{activeTab}</strong></p>
        <Tabs value={activeTab} onValueChange={setActiveTab} {...args}>
          <TabsList aria-label="Controlled tabs">
            <TabTrigger value="tab1">Tab 1</TabTrigger>
            <TabTrigger value="tab2">Tab 2</TabTrigger>
            <TabTrigger value="tab3">Tab 3</TabTrigger>
          </TabsList>
          <TabContent value="tab1">
            <p>Content for tab 1 (controlled externally)</p>
          </TabContent>
          <TabContent value="tab2">
            <p>Content for tab 2 (controlled externally)</p>
          </TabContent>
          <TabContent value="tab3">
            <p>Content for tab 3 (controlled externally)</p>
          </TabContent>
        </Tabs>
      </div>
    )
  },
  args: {
    variant: 'default',
    orientation: 'horizontal',
    defaultValue: "general"
  },
}

// ============================================================================
// DISABLED TABS
// ============================================================================

export const WithDisabledTabs: Story = {
  render: (args) => (
    <Tabs  {...args}>
      <TabsList aria-label="Feature tabs">
        <TabTrigger value="available">Available</TabTrigger>
        <TabTrigger value="disabled" disabled>
          Disabled
        </TabTrigger>
        <TabTrigger value="comingSoon" disabled>
          Coming Soon
        </TabTrigger>
        <TabTrigger value="active">Active</TabTrigger>
      </TabsList>
      <TabContent value="available">
        <p>This feature is available and ready to use.</p>
      </TabContent>
      <TabContent value="disabled">
        <p>This feature is temporarily disabled.</p>
      </TabContent>
      <TabContent value="comingSoon">
        <p>This feature is coming soon!</p>
      </TabContent>
      <TabContent value="active">
        <p>This feature is currently active.</p>
      </TabContent>
    </Tabs>
  ),
  args: {
    variant: 'pills',
    orientation: 'horizontal',
    defaultValue:"available"
  },
}

// ============================================================================
// COMPLEX CONTENT
// ============================================================================

export const WithForms: Story = {
  render: (args) => (
    <Tabs {...args}>
      <TabsList aria-label="Authentication">
        <TabTrigger value="login">Login</TabTrigger>
        <TabTrigger value="register">Register</TabTrigger>
      </TabsList>
      <TabContent value="login">
        <form className="space-y-4 max-w-md">
          <div>
            <label htmlFor="login-email" className="block text-sm font-medium mb-1">
              Email
            </label>
            <input
              type="email"
              id="login-email"
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2"
              placeholder="Enter your email"
            />
          </div>
          <div>
            <label htmlFor="login-password" className="block text-sm font-medium mb-1">
              Password
            </label>
            <input
              type="password"
              id="login-password"
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2"
              placeholder="Enter your password"
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Login
          </button>
        </form>
      </TabContent>
      <TabContent value="register">
        <form className="space-y-4 max-w-md">
          <div>
            <label htmlFor="register-name" className="block text-sm font-medium mb-1">
              Full Name
            </label>
            <input
              type="text"
              id="register-name"
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2"
              placeholder="Enter your full name"
            />
          </div>
          <div>
            <label htmlFor="register-email" className="block text-sm font-medium mb-1">
              Email
            </label>
            <input
              type="email"
              id="register-email"
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2"
              placeholder="Enter your email"
            />
          </div>
          <div>
            <label htmlFor="register-password" className="block text-sm font-medium mb-1">
              Password
            </label>
            <input
              type="password"
              id="register-password"
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2"
              placeholder="Create a password"
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Register
          </button>
        </form>
      </TabContent>
    </Tabs>
  ),
  args: {
    variant: 'default',
    orientation: 'horizontal',
    defaultValue:"login" 
  },
}

export const ManyTabs: Story = {
  render: (args) => (
    <Tabs  {...args}>
      <TabsList aria-label="Monthly data">
        <TabTrigger value="jan">January</TabTrigger>
        <TabTrigger value="feb">February</TabTrigger>
        <TabTrigger value="mar">March</TabTrigger>
        <TabTrigger value="apr">April</TabTrigger>
        <TabTrigger value="may">May</TabTrigger>
        <TabTrigger value="jun">June</TabTrigger>
        <TabTrigger value="jul">July</TabTrigger>
        <TabTrigger value="aug">August</TabTrigger>
      </TabsList>
      <TabContent value="jan">January data and statistics</TabContent>
      <TabContent value="feb">February data and statistics</TabContent>
      <TabContent value="mar">March data and statistics</TabContent>
      <TabContent value="apr">April data and statistics</TabContent>
      <TabContent value="may">May data and statistics</TabContent>
      <TabContent value="jun">June data and statistics</TabContent>
      <TabContent value="jul">July data and statistics</TabContent>
      <TabContent value="aug">August data and statistics</TabContent>
    </Tabs>
  ),
  args: {
    variant: 'underline',
    orientation: 'horizontal',
    defaultValue:"jan"
  },
}
