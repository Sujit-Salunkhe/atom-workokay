// src/components/ui/switch.stories.tsx
import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { Switch } from './Switch'

const meta = {
  title: 'Components/Switch',
  component: Switch,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A toggle switch component built on Radix UI with ripple animation effects. Fully accessible with keyboard support [web:98][web:100].',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'success', 'warning', 'danger', 'info', 'neutral'],
      description: 'Color variant',
      table: {
        defaultValue: { summary: 'primary' },
      },
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Switch size',
      table: {
        defaultValue: { summary: 'md' },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'Disable the switch',
    },
    defaultChecked: {
      control: 'boolean',
      description: 'Default checked state (uncontrolled)',
    },
  },
  decorators: [
    (Story) => (
      <div className="p-8">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Switch>

export default meta
type Story = StoryObj<typeof meta>

// ============================================================================
// BASIC EXAMPLES
// ============================================================================

export const Default: Story = {
  args: {},
}

export const Checked: Story = {
  args: {
    defaultChecked: true,
  },
}

export const Disabled: Story = {
  args: {
    disabled: true,
  },
}

export const DisabledChecked: Story = {
  args: {
    disabled: true,
    defaultChecked: true,
  },
}

// ============================================================================
// VARIANTS
// ============================================================================

export const Variants: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-3">
        <Switch variant="primary" defaultChecked />
        <span className="text-sm">Primary</span>
      </div>
      <div className="flex items-center gap-3">
        <Switch variant="success" defaultChecked />
        <span className="text-sm">Success</span>
      </div>
      <div className="flex items-center gap-3">
        <Switch variant="warning" defaultChecked />
        <span className="text-sm">Warning</span>
      </div>
      <div className="flex items-center gap-3">
        <Switch variant="danger" defaultChecked />
        <span className="text-sm">Danger</span>
      </div>
      <div className="flex items-center gap-3">
        <Switch variant="info" defaultChecked />
        <span className="text-sm">Info</span>
      </div>
      <div className="flex items-center gap-3">
        <Switch variant="neutral" defaultChecked />
        <span className="text-sm">Neutral</span>
      </div>
    </div>
  ),
}

// ============================================================================
// SIZES
// ============================================================================

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-6">
      <div className="flex items-center gap-2">
        <Switch size="sm" defaultChecked />
        <span className="text-sm">Small</span>
      </div>
      <div className="flex items-center gap-2">
        <Switch size="md" defaultChecked />
        <span className="text-sm">Medium</span>
      </div>
      <div className="flex items-center gap-2">
        <Switch size="lg" defaultChecked />
        <span className="text-sm">Large</span>
      </div>
    </div>
  ),
}

// ============================================================================
// CONTROLLED SWITCH
// ============================================================================

export const Controlled: Story = {
  render: function ControlledSwitch() {
    const [checked, setChecked] = useState(false)

    return (
      <div className="space-y-4">
        <div className="flex gap-2">
          <button
            onClick={() => setChecked(true)}
            className="px-3 py-1.5 bg-green-600 text-white text-sm rounded-md hover:bg-green-700"
          >
            Turn On
          </button>
          <button
            onClick={() => setChecked(false)}
            className="px-3 py-1.5 bg-red-600 text-white text-sm rounded-md hover:bg-red-700"
          >
            Turn Off
          </button>
          <button
            onClick={() => setChecked(!checked)}
            className="px-3 py-1.5 bg-gray-600 text-white text-sm rounded-md hover:bg-gray-700"
          >
            Toggle
          </button>
        </div>
        <div className="p-3 bg-gray-100 rounded-md">
          <p className="text-sm">
            State:{' '}
            <strong className={checked ? 'text-green-600' : 'text-red-600'}>
              {checked ? 'ON' : 'OFF'}
            </strong>
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Switch
            checked={checked}
            onCheckedChange={setChecked}
            variant="primary"
          />
          <span className="text-sm">Controlled switch</span>
        </div>
      </div>
    )
  },
}

// ============================================================================
// WITH LABELS
// ============================================================================

export const WithLabel: Story = {
  render: function WithLabelSwitch() {
    const [enabled, setEnabled] = useState(false)

    return (
      <label className="flex items-center gap-3 cursor-pointer">
        <Switch checked={enabled} onCheckedChange={setEnabled} />
        <span className="text-sm font-medium">
          {enabled ? 'Notifications enabled' : 'Notifications disabled'}
        </span>
      </label>
    )
  },
}

export const FormLabels: Story = {
  render: function FormLabelsExample() {
    const [settings, setSettings] = useState({
      notifications: true,
      autoSave: false,
      darkMode: true,
    })

    return (
      <div className="space-y-4 max-w-sm">
        <label className="flex items-center justify-between cursor-pointer p-3 rounded-md hover:bg-gray-50">
          <div>
            <p className="text-sm font-medium">Push Notifications</p>
            <p className="text-xs text-gray-500">Receive push notifications</p>
          </div>
          <Switch
            checked={settings.notifications}
            onCheckedChange={(checked) =>
              setSettings({ ...settings, notifications: checked })
            }
            variant="primary"
          />
        </label>

        <label className="flex items-center justify-between cursor-pointer p-3 rounded-md hover:bg-gray-50">
          <div>
            <p className="text-sm font-medium">Auto Save</p>
            <p className="text-xs text-gray-500">Automatically save changes</p>
          </div>
          <Switch
            checked={settings.autoSave}
            onCheckedChange={(checked) =>
              setSettings({ ...settings, autoSave: checked })
            }
            variant="success"
          />
        </label>

        <label className="flex items-center justify-between cursor-pointer p-3 rounded-md hover:bg-gray-50">
          <div>
            <p className="text-sm font-medium">Dark Mode</p>
            <p className="text-xs text-gray-500">Use dark theme</p>
          </div>
          <Switch
            checked={settings.darkMode}
            onCheckedChange={(checked) =>
              setSettings({ ...settings, darkMode: checked })
            }
            variant="neutral"
          />
        </label>
      </div>
    )
  },
}

// ============================================================================
// SETTINGS PANEL
// ============================================================================

export const SettingsPanel: Story = {
  render: function SettingsPanelExample() {
    const [settings, setSettings] = useState({
      emailNotifications: true,
      pushNotifications: false,
      smsNotifications: false,
      weeklyDigest: true,
      productUpdates: true,
      securityAlerts: true,
    })

    return (
      <div className="max-w-md border border-gray-200 rounded-lg overflow-hidden">
        <div className="p-4 bg-gray-50 border-b border-gray-200">
          <h3 className="text-lg font-semibold">Notification Settings</h3>
          <p className="text-sm text-gray-600">
            Manage how you receive notifications
          </p>
        </div>

        <div className="divide-y divide-gray-200">
          <div className="p-4">
            <h4 className="text-sm font-semibold mb-3">General</h4>
            <div className="space-y-3">
              <label className="flex items-center justify-between cursor-pointer">
                <span className="text-sm">Email Notifications</span>
                <Switch
                  checked={settings.emailNotifications}
                  onCheckedChange={(checked) =>
                    setSettings({ ...settings, emailNotifications: checked })
                  }
                  variant="primary"
                />
              </label>
              <label className="flex items-center justify-between cursor-pointer">
                <span className="text-sm">Push Notifications</span>
                <Switch
                  checked={settings.pushNotifications}
                  onCheckedChange={(checked) =>
                    setSettings({ ...settings, pushNotifications: checked })
                  }
                  variant="primary"
                />
              </label>
              <label className="flex items-center justify-between cursor-pointer">
                <span className="text-sm">SMS Notifications</span>
                <Switch
                  checked={settings.smsNotifications}
                  onCheckedChange={(checked) =>
                    setSettings({ ...settings, smsNotifications: checked })
                  }
                  variant="primary"
                />
              </label>
            </div>
          </div>

          <div className="p-4">
            <h4 className="text-sm font-semibold mb-3">Content</h4>
            <div className="space-y-3">
              <label className="flex items-center justify-between cursor-pointer">
                <span className="text-sm">Weekly Digest</span>
                <Switch
                  checked={settings.weeklyDigest}
                  onCheckedChange={(checked) =>
                    setSettings({ ...settings, weeklyDigest: checked })
                  }
                  variant="info"
                />
              </label>
              <label className="flex items-center justify-between cursor-pointer">
                <span className="text-sm">Product Updates</span>
                <Switch
                  checked={settings.productUpdates}
                  onCheckedChange={(checked) =>
                    setSettings({ ...settings, productUpdates: checked })
                  }
                  variant="info"
                />
              </label>
            </div>
          </div>

          <div className="p-4">
            <h4 className="text-sm font-semibold mb-3">Security</h4>
            <label className="flex items-center justify-between cursor-pointer">
              <div>
                <p className="text-sm">Security Alerts</p>
                <p className="text-xs text-gray-500">
                  Recommended to keep enabled
                </p>
              </div>
              <Switch
                checked={settings.securityAlerts}
                onCheckedChange={(checked) =>
                  setSettings({ ...settings, securityAlerts: checked })
                }
                variant="danger"
              />
            </label>
          </div>
        </div>
      </div>
    )
  },
}

// ============================================================================
// FEATURE TOGGLES
// ============================================================================

export const FeatureToggles: Story = {
  render: function FeatureTogglesExample() {
    const [features, setFeatures] = useState({
      analytics: true,
      api: false,
      collaboration: true,
      customDomain: false,
      sso: false,
    })

    const featuresList = [
      { key: 'analytics', label: 'Advanced Analytics', variant: 'primary' as const },
      { key: 'api', label: 'API Access', variant: 'success' as const },
      { key: 'collaboration', label: 'Team Collaboration', variant: 'info' as const },
      { key: 'customDomain', label: 'Custom Domain', variant: 'warning' as const },
      { key: 'sso', label: 'Single Sign-On (SSO)', variant: 'danger' as const },
    ]

    const activeCount = Object.values(features).filter(Boolean).length

    return (
      <div className="space-y-4 max-w-md">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Feature Toggles</h3>
          <span className="text-sm text-gray-500">
            {activeCount} / {featuresList.length} enabled
          </span>
        </div>

        <div className="space-y-2">
          {featuresList.map((feature) => (
            <label
              key={feature.key}
              className="flex items-center justify-between p-3 border border-gray-200 rounded-md cursor-pointer hover:bg-gray-50 transition-colors"
            >
              <span className="text-sm font-medium">{feature.label}</span>
              <Switch
                checked={features[feature.key as keyof typeof features]}
                onCheckedChange={(checked) =>
                  setFeatures({ ...features, [feature.key]: checked })
                }
                variant={feature.variant}
                size="md"
              />
            </label>
          ))}
        </div>
      </div>
    )
  },
}

// ============================================================================
// AIRPLANE MODE
// ============================================================================

export const AirplaneMode: Story = {
  render: function AirplaneModeExample() {
    const [airplaneMode, setAirplaneMode] = useState(false)

    return (
      <div className="space-y-4 max-w-sm">
        <div className="p-4 border border-gray-200 rounded-lg">
          <label className="flex items-center justify-between cursor-pointer">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-full">
                <svg
                  className="w-5 h-5 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                  />
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium">Airplane Mode</p>
                <p className="text-xs text-gray-500">
                  {airplaneMode ? 'All wireless off' : 'Wireless enabled'}
                </p>
              </div>
            </div>
            <Switch
              checked={airplaneMode}
              onCheckedChange={setAirplaneMode}
              variant="primary"
              size="lg"
            />
          </label>
        </div>

        {airplaneMode && (
          <div className="p-3 bg-blue-50 border border-blue-200 rounded-md">
            <p className="text-sm text-blue-800">
              ✈️ Airplane mode is on. Wi-Fi, Bluetooth, and cellular are
              disabled.
            </p>
          </div>
        )}
      </div>
    )
  },
}

// ============================================================================
// PRIVACY SETTINGS
// ============================================================================

export const PrivacySettings: Story = {
  render: function PrivacySettingsExample() {
    const [privacy, setPrivacy] = useState({
      profileVisible: true,
      showEmail: false,
      showPhone: false,
      activityStatus: true,
      readReceipts: false,
    })

    return (
      <div className="max-w-md space-y-4">
        <h3 className="text-lg font-semibold">Privacy Settings</h3>

        <div className="border border-gray-200 rounded-lg divide-y divide-gray-200">
          <label className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50">
            <div>
              <p className="text-sm font-medium">Public Profile</p>
              <p className="text-xs text-gray-500">
                Make your profile visible to everyone
              </p>
            </div>
            <Switch
              checked={privacy.profileVisible}
              onCheckedChange={(checked) =>
                setPrivacy({ ...privacy, profileVisible: checked })
              }
              variant="success"
            />
          </label>

          <label className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50">
            <div>
              <p className="text-sm font-medium">Show Email Address</p>
              <p className="text-xs text-gray-500">
                Display email on your profile
              </p>
            </div>
            <Switch
              checked={privacy.showEmail}
              onCheckedChange={(checked) =>
                setPrivacy({ ...privacy, showEmail: checked })
              }
              variant="warning"
            />
          </label>

          <label className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50">
            <div>
              <p className="text-sm font-medium">Show Phone Number</p>
              <p className="text-xs text-gray-500">
                Display phone on your profile
              </p>
            </div>
            <Switch
              checked={privacy.showPhone}
              onCheckedChange={(checked) =>
                setPrivacy({ ...privacy, showPhone: checked })
              }
              variant="warning"
            />
          </label>

          <label className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50">
            <div>
              <p className="text-sm font-medium">Activity Status</p>
              <p className="text-xs text-gray-500">
                Show when you're online
              </p>
            </div>
            <Switch
              checked={privacy.activityStatus}
              onCheckedChange={(checked) =>
                setPrivacy({ ...privacy, activityStatus: checked })
              }
              variant="info"
            />
          </label>

          <label className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50">
            <div>
              <p className="text-sm font-medium">Read Receipts</p>
              <p className="text-xs text-gray-500">
                Let others know when you read messages
              </p>
            </div>
            <Switch
              checked={privacy.readReceipts}
              onCheckedChange={(checked) =>
                setPrivacy({ ...privacy, readReceipts: checked })
              }
              variant="neutral"
            />
          </label>
        </div>
      </div>
    )
  },
}

// ============================================================================
// KEYBOARD ACCESSIBILITY
// ============================================================================

export const KeyboardAccessible: Story = {
  render: () => (
    <div className="space-y-4">
      <p className="text-sm text-gray-600">
        Tab through these switches and use Space to toggle
      </p>
      <div className="space-y-3">
        <label className="flex items-center gap-3">
          <Switch variant="primary" />
          <span className="text-sm">First switch</span>
        </label>
        <label className="flex items-center gap-3">
          <Switch variant="success" />
          <span className="text-sm">Second switch</span>
        </label>
        <label className="flex items-center gap-3">
          <Switch variant="info" />
          <span className="text-sm">Third switch</span>
        </label>
      </div>
    </div>
  ),
}
