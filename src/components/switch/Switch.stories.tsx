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
          'An animated toggle switch component with theme variant featuring sun/moon icons and smooth transitions. Built on Radix UI with Framer Motion animations [web:98][web:100].',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'theme'],
      description: 'Visual variant',
      table: {
        defaultValue: { summary: 'default' },
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
  args: {
    variant: 'default',
  },
}

export const DefaultChecked: Story = {
  args: {
    variant: 'default',
    defaultChecked: true,
  },
}

export const ThemeSwitch: Story = {
  args: {
    variant: 'theme',
  },
}

export const ThemeSwitchChecked: Story = {
  args: {
    variant: 'theme',
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
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-3">
        <Switch variant="default" defaultChecked />
        <span className="text-sm">Default variant</span>
      </div>
      <div className="flex items-center gap-3">
        <Switch variant="theme" defaultChecked />
        <span className="text-sm">Theme variant (with icons)</span>
      </div>
    </div>
  ),
}

// ============================================================================
// SIZES
// ============================================================================

export const Sizes: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h4 className="text-sm font-semibold mb-3">Default Variant</h4>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <Switch size="sm" variant="default" defaultChecked />
            <span className="text-sm">Small</span>
          </div>
          <div className="flex items-center gap-2">
            <Switch size="md" variant="default" defaultChecked />
            <span className="text-sm">Medium</span>
          </div>
          <div className="flex items-center gap-2">
            <Switch size="lg" variant="default" defaultChecked />
            <span className="text-sm">Large</span>
          </div>
        </div>
      </div>

      <div>
        <h4 className="text-sm font-semibold mb-3">Theme Variant</h4>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <Switch size="sm" variant="theme" defaultChecked />
            <span className="text-sm">Small</span>
          </div>
          <div className="flex items-center gap-2">
            <Switch size="md" variant="theme" defaultChecked />
            <span className="text-sm">Medium</span>
          </div>
          <div className="flex items-center gap-2">
            <Switch size="lg" variant="theme" defaultChecked />
            <span className="text-sm">Large</span>
          </div>
        </div>
      </div>
    </div>
  ),
}

// ============================================================================
// INTERACTIVE EXAMPLES
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
          <Switch checked={checked} onCheckedChange={setChecked} />
          <span className="text-sm">Controlled switch</span>
        </div>
      </div>
    )
  },
}

// ============================================================================
// DARK MODE TOGGLE
// ============================================================================

export const DarkModeToggle: Story = {
  render: function DarkModeExample() {
    const [isDark, setIsDark] = useState(false)

    return (
      <div className="space-y-4">
        <div
          className={`p-6 rounded-lg transition-colors duration-300 ${
            isDark ? 'bg-gray-900' : 'bg-gray-100'
          }`}
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3
                className={`text-lg font-semibold ${
                  isDark ? 'text-white' : 'text-gray-900'
                }`}
              >
                {isDark ? 'Dark Mode' : 'Light Mode'}
              </h3>
              <p
                className={`text-sm ${
                  isDark ? 'text-gray-400' : 'text-gray-600'
                }`}
              >
                {isDark ? 'Night theme enabled' : 'Day theme enabled'}
              </p>
            </div>
            <Switch
              variant="theme"
              size="lg"
              checked={isDark}
              onCheckedChange={setIsDark}
            />
          </div>

          <div
            className={`p-4 rounded-md ${isDark ? 'bg-gray-800' : 'bg-white'}`}
          >
            <p
              className={`text-sm ${
                isDark ? 'text-gray-300' : 'text-gray-700'
              }`}
            >
              This is sample content that changes based on the theme.
            </p>
          </div>
        </div>
      </div>
    )
  },
}

export const ThemeToggleWithLabel: Story = {
  render: function ThemeToggleWithLabelExample() {
    const [isDark, setIsDark] = useState(false)

    return (
      <label className="flex items-center gap-3 cursor-pointer select-none">
        <Switch variant="theme" checked={isDark} onCheckedChange={setIsDark} />
        <span className="text-sm font-medium">
          {isDark ? '🌙 Dark Mode' : '☀️ Light Mode'}
        </span>
      </label>
    )
  },
}

// ============================================================================
// SETTINGS PANEL
// ============================================================================

export const SettingsPanel: Story = {
  render: function SettingsPanelExample() {
    const [settings, setSettings] = useState({
      notifications: true,
      autoSave: false,
      darkMode: false,
    })

    return (
      <div className="max-w-md border border-gray-200 rounded-lg overflow-hidden">
        <div className="p-4 bg-gray-50 border-b border-gray-200">
          <h3 className="text-lg font-semibold">Settings</h3>
        </div>

        <div className="divide-y divide-gray-200">
          <label className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50">
            <div>
              <p className="text-sm font-medium">Notifications</p>
              <p className="text-xs text-gray-500">
                Receive push notifications
              </p>
            </div>
            <Switch
              variant="default"
              checked={settings.notifications}
              onCheckedChange={(checked) =>
                setSettings({ ...settings, notifications: checked })
              }
            />
          </label>

          <label className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50">
            <div>
              <p className="text-sm font-medium">Auto Save</p>
              <p className="text-xs text-gray-500">
                Automatically save changes
              </p>
            </div>
            <Switch
              variant="default"
              checked={settings.autoSave}
              onCheckedChange={(checked) =>
                setSettings({ ...settings, autoSave: checked })
              }
            />
          </label>

          <label className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50">
            <div>
              <p className="text-sm font-medium">Dark Mode</p>
              <p className="text-xs text-gray-500">Use dark theme</p>
            </div>
            <Switch
              variant="theme"
              checked={settings.darkMode}
              onCheckedChange={(checked) =>
                setSettings({ ...settings, darkMode: checked })
              }
            />
          </label>
        </div>
      </div>
    )
  },
}

// ============================================================================
// NOTIFICATION PREFERENCES
// ============================================================================

export const NotificationPreferences: Story = {
  render: function NotificationPreferencesExample() {
    const [preferences, setPreferences] = useState({
      email: true,
      push: false,
      sms: false,
      weekly: true,
    })

    return (
      <div className="max-w-md space-y-4">
        <h3 className="text-lg font-semibold">Notification Preferences</h3>

        <div className="border border-gray-200 rounded-lg divide-y divide-gray-200">
          <label className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50 transition-colors">
            <div>
              <p className="text-sm font-medium">Email Notifications</p>
              <p className="text-xs text-gray-500">Receive updates via email</p>
            </div>
            <Switch
              checked={preferences.email}
              onCheckedChange={(checked) =>
                setPreferences({ ...preferences, email: checked })
              }
            />
          </label>

          <label className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50 transition-colors">
            <div>
              <p className="text-sm font-medium">Push Notifications</p>
              <p className="text-xs text-gray-500">Get instant alerts</p>
            </div>
            <Switch
              checked={preferences.push}
              onCheckedChange={(checked) =>
                setPreferences({ ...preferences, push: checked })
              }
            />
          </label>

          <label className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50 transition-colors">
            <div>
              <p className="text-sm font-medium">SMS Notifications</p>
              <p className="text-xs text-gray-500">Receive text messages</p>
            </div>
            <Switch
              checked={preferences.sms}
              onCheckedChange={(checked) =>
                setPreferences({ ...preferences, sms: checked })
              }
            />
          </label>

          <label className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50 transition-colors">
            <div>
              <p className="text-sm font-medium">Weekly Digest</p>
              <p className="text-xs text-gray-500">Summary every week</p>
            </div>
            <Switch
              checked={preferences.weekly}
              onCheckedChange={(checked) =>
                setPreferences({ ...preferences, weekly: checked })
              }
            />
          </label>
        </div>

        <div className="p-3 bg-blue-50 border border-blue-200 rounded-md">
          <p className="text-sm text-blue-800">
            Active notifications:{' '}
            {Object.values(preferences).filter(Boolean).length} / 4
          </p>
        </div>
      </div>
    )
  },
}

// ============================================================================
// FEATURE FLAGS
// ============================================================================

export const FeatureFlags: Story = {
  render: function FeatureFlagsExample() {
    const [features, setFeatures] = useState({
      analytics: true,
      api: false,
      beta: false,
    })

    return (
      <div className="max-w-md space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Feature Flags</h3>
          <span className="text-sm text-gray-500">
            {Object.values(features).filter(Boolean).length} enabled
          </span>
        </div>

        <div className="space-y-2">
          <label className="flex items-center justify-between p-3 border border-gray-200 rounded-md cursor-pointer hover:bg-gray-50">
            <span className="text-sm font-medium">Advanced Analytics</span>
            <Switch
              checked={features.analytics}
              onCheckedChange={(checked) =>
                setFeatures({ ...features, analytics: checked })
              }
              size="sm"
            />
          </label>

          <label className="flex items-center justify-between p-3 border border-gray-200 rounded-md cursor-pointer hover:bg-gray-50">
            <span className="text-sm font-medium">API Access</span>
            <Switch
              checked={features.api}
              onCheckedChange={(checked) =>
                setFeatures({ ...features, api: checked })
              }
              size="sm"
            />
          </label>

          <label className="flex items-center justify-between p-3 border border-gray-200 rounded-md cursor-pointer hover:bg-gray-50">
            <span className="text-sm font-medium">Beta Features</span>
            <Switch
              checked={features.beta}
              onCheckedChange={(checked) =>
                setFeatures({ ...features, beta: checked })
              }
              size="sm"
            />
          </label>
        </div>
      </div>
    )
  },
}

// ============================================================================
// COMPARISON
// ============================================================================

export const Comparison: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h4 className="text-sm font-semibold mb-3">Default Variant</h4>
        <div className="flex items-center gap-4">
          <div className="flex flex-col items-center gap-2">
            <Switch variant="default" size="lg" />
            <span className="text-xs text-gray-500">OFF</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Switch variant="default" size="lg" defaultChecked />
            <span className="text-xs text-gray-500">ON</span>
          </div>
        </div>
      </div>

      <div>
        <h4 className="text-sm font-semibold mb-3">Theme Variant</h4>
        <div className="flex items-center gap-4">
          <div className="flex flex-col items-center gap-2">
            <Switch variant="theme" size="lg" />
            <span className="text-xs text-gray-500">Day Mode</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Switch variant="theme" size="lg" defaultChecked />
            <span className="text-xs text-gray-500">Night Mode</span>
          </div>
        </div>
      </div>
    </div>
  ),
}

// ============================================================================
// KEYBOARD ACCESSIBLE
// ============================================================================

export const KeyboardAccessible: Story = {
  render: () => (
    <div className="space-y-4">
      <p className="text-sm text-gray-600">
        Tab through these switches and press Space to toggle
      </p>
      <div className="space-y-3">
        <label className="flex items-center gap-3">
          <Switch variant="default" />
          <span className="text-sm">Default switch</span>
        </label>
        <label className="flex items-center gap-3">
          <Switch variant="theme" />
          <span className="text-sm">Theme switch</span>
        </label>
        <label className="flex items-center gap-3">
          <Switch variant="default" />
          <span className="text-sm">Another switch</span>
        </label>
      </div>
    </div>
  ),
}

// ============================================================================
// ANIMATION SHOWCASE
// ============================================================================

export const AnimationShowcase: Story = {
  render: function AnimationShowcaseExample() {
    return (
      <div className="space-y-6">
        <div>
          <h4 className="text-sm font-semibold mb-3">
            Toggle to see animations
          </h4>
          <p className="text-xs text-gray-500 mb-4">
            Watch the thumb squash animation and icon transitions
          </p>
        </div>

        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-4">
            <Switch variant="default" size="lg" />
            <span className="text-sm">Default - Squash animation</span>
          </div>

          <div className="flex items-center gap-4">
            <Switch variant="theme" size="lg" />
            <span className="text-sm">Theme - Icon rotation & stars</span>
          </div>
        </div>

        <div className="p-4 bg-gray-50 rounded-md">
          <p className="text-xs text-gray-600">
            💡 Tip: The theme variant shows sun/moon icons with rotating
            animation and twinkling stars in night mode!
          </p>
        </div>
      </div>
    )
  },
}
