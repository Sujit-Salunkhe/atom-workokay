import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import {
  RadioGroup,
  RadioGroupItem,
  RadioGroupLabel,
  RadioGroupOption,
  RadioGroupDescription,
} from './Radio';

// Use simpler meta type without satisfies
const meta: Meta<typeof RadioGroup> = {
  title: 'Components/RadioGroup',
  component: RadioGroup,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    orientation: {
      control: 'inline-radio',
      options: ['horizontal', 'vertical'],
      description: 'Layout direction of radio options',
      table: {
        defaultValue: { summary: 'vertical' },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'Disable all radio options',
    },
    defaultValue: {
      control: 'text',
      description: 'Default selected value (uncontrolled)',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// ... rest of your stories remain the same


// Basic story
export const Default: Story = {
  args: {
    defaultValue: 'option1',
    orientation: 'vertical',
  },
  render: (args) => (
    <RadioGroup {...args}>
      <RadioGroupOption>
        <RadioGroupItem value="option1" id="option1" />
        <RadioGroupLabel htmlFor="option1">Option 1</RadioGroupLabel>
      </RadioGroupOption>
      <RadioGroupOption>
        <RadioGroupItem value="option2" id="option2" />
        <RadioGroupLabel htmlFor="option2">Option 2</RadioGroupLabel>
      </RadioGroupOption>
      <RadioGroupOption>
        <RadioGroupItem value="option3" id="option3" />
        <RadioGroupLabel htmlFor="option3">Option 3</RadioGroupLabel>
      </RadioGroupOption>
    </RadioGroup>
  ),
};

// Horizontal layout
export const Horizontal: Story = {
  args: {
    defaultValue: 'small',
    orientation: 'horizontal',
  },
  render: (args) => (
    <RadioGroup {...args}>
      <RadioGroupOption>
        <RadioGroupItem value="small" id="small" />
        <RadioGroupLabel htmlFor="small">Small</RadioGroupLabel>
      </RadioGroupOption>
      <RadioGroupOption>
        <RadioGroupItem value="medium" id="medium" />
        <RadioGroupLabel htmlFor="medium">Medium</RadioGroupLabel>
      </RadioGroupOption>
      <RadioGroupOption>
        <RadioGroupItem value="large" id="large" />
        <RadioGroupLabel htmlFor="large">Large</RadioGroupLabel>
      </RadioGroupOption>
    </RadioGroup>
  ),
};

// With descriptions
export const WithDescriptions: Story = {
  args: {
    defaultValue: 'default',
    orientation: 'vertical',
  },
  render: (args:any) => (
    <RadioGroup {...args} className="space-y-4">
      <div className="space-y-1">
        <RadioGroupOption>
          <RadioGroupItem value="default" id="r1" />
          <RadioGroupLabel htmlFor="r1">Default</RadioGroupLabel>
        </RadioGroupOption>
        <RadioGroupDescription className="ml-6">
          Standard density layout with normal spacing
        </RadioGroupDescription>
      </div>
      <div className="space-y-1">
        <RadioGroupOption>
          <RadioGroupItem value="comfortable" id="r2" />
          <RadioGroupLabel htmlFor="r2">Comfortable</RadioGroupLabel>
        </RadioGroupOption>
        <RadioGroupDescription className="ml-6">
          More spacing between items for better readability
        </RadioGroupDescription>
      </div>
      <div className="space-y-1">
        <RadioGroupOption>
          <RadioGroupItem value="compact" id="r3" />
          <RadioGroupLabel htmlFor="r3">Compact</RadioGroupLabel>
        </RadioGroupOption>
        <RadioGroupDescription className="ml-6">
          Reduced spacing for dense layouts
        </RadioGroupDescription>
      </div>
    </RadioGroup>
  ),
};

// Disabled options
export const Disabled: Story = {
  args: {
    defaultValue: 'option1',
    orientation: 'vertical',
  },
  render: (args:any) => (
    <RadioGroup {...args}>
      <RadioGroupOption>
        <RadioGroupItem value="option1" id="d1" />
        <RadioGroupLabel htmlFor="d1">Enabled Option</RadioGroupLabel>
      </RadioGroupOption>
      <RadioGroupOption>
        <RadioGroupItem value="option2" id="d2" disabled />
        <RadioGroupLabel htmlFor="d2">Disabled Option</RadioGroupLabel>
      </RadioGroupOption>
      <RadioGroupOption>
        <RadioGroupItem value="option3" id="d3" />
        <RadioGroupLabel htmlFor="d3">Another Enabled Option</RadioGroupLabel>
      </RadioGroupOption>
    </RadioGroup>
  ),
};

// Controlled state
export const Controlled: Story = {
  render: () => {
    const [value, setValue] = useState('option1');

    return (
      <div className="space-y-4">
        <RadioGroup value={value} onValueChange={setValue}>
          <RadioGroupOption>
            <RadioGroupItem value="option1" id="c1" />
            <RadioGroupLabel htmlFor="c1">Option 1</RadioGroupLabel>
          </RadioGroupOption>
          <RadioGroupOption>
            <RadioGroupItem value="option2" id="c2" />
            <RadioGroupLabel htmlFor="c2">Option 2</RadioGroupLabel>
          </RadioGroupOption>
          <RadioGroupOption>
            <RadioGroupItem value="option3" id="c3" />
            <RadioGroupLabel htmlFor="c3">Option 3</RadioGroupLabel>
          </RadioGroupOption>
        </RadioGroup>
        <div className="text-sm text-[var(--atom-text-muted)]">
          Selected value: <span className="font-semibold">{value}</span>
        </div>
      </div>
    );
  },
};

// Plan selection example
export const PlanSelection: Story = {
  args: {
    defaultValue: 'pro',
    orientation: 'vertical',
  },
  render: (args) => (
    <div className="w-[400px]">
      <RadioGroup {...args} className="space-y-3">
        <div className="space-y-1 rounded-lg border border-[var(--atom-theme-border)] p-4">
          <RadioGroupOption>
            <RadioGroupItem value="free" id="plan-free" />
            <div className="flex-1">
              <RadioGroupLabel htmlFor="plan-free" className="text-base">
                Free
              </RadioGroupLabel>
              <RadioGroupDescription>
                Basic features for personal use
              </RadioGroupDescription>
              <div className="mt-2 text-2xl font-bold text-[var(--atom-card-fg)]">
                $0<span className="text-sm font-normal">/month</span>
              </div>
            </div>
          </RadioGroupOption>
        </div>

        <div className="space-y-1 rounded-lg border border-[var(--atom-theme-border)] p-4">
          <RadioGroupOption>
            <RadioGroupItem value="pro" id="plan-pro" />
            <div className="flex-1">
              <RadioGroupLabel htmlFor="plan-pro" className="text-base">
                Pro
              </RadioGroupLabel>
              <RadioGroupDescription>
                Advanced features for professionals
              </RadioGroupDescription>
              <div className="mt-2 text-2xl font-bold text-[var(--atom-card-fg)]">
                $15<span className="text-sm font-normal">/month</span>
              </div>
            </div>
          </RadioGroupOption>
        </div>

        <div className="space-y-1 rounded-lg border border-[var(--atom-theme-border)] p-4">
          <RadioGroupOption>
            <RadioGroupItem value="enterprise" id="plan-enterprise" />
            <div className="flex-1">
              <RadioGroupLabel htmlFor="plan-enterprise" className="text-base">
                Enterprise
              </RadioGroupLabel>
              <RadioGroupDescription>
                Custom solutions for large teams
              </RadioGroupDescription>
              <div className="mt-2 text-2xl font-bold text-[var(--atom-card-fg)]">
                $99<span className="text-sm font-normal">/month</span>
              </div>
            </div>
          </RadioGroupOption>
        </div>
      </RadioGroup>
    </div>
  ),
};

// Settings example
export const SettingsExample: Story = {
  render: () => {
    const [theme, setTheme] = useState('system');
    const [density, setDensity] = useState('default');

    return (
      <div className="w-[400px] space-y-6">
        <div>
          <h3 className="mb-3 text-sm font-semibold text-[var(--atom-card-fg)]">
            Theme
          </h3>
          <RadioGroup value={theme} onValueChange={setTheme}>
            <RadioGroupOption>
              <RadioGroupItem value="light" id="theme-light" />
              <RadioGroupLabel htmlFor="theme-light">Light</RadioGroupLabel>
            </RadioGroupOption>
            <RadioGroupOption>
              <RadioGroupItem value="dark" id="theme-dark" />
              <RadioGroupLabel htmlFor="theme-dark">Dark</RadioGroupLabel>
            </RadioGroupOption>
            <RadioGroupOption>
              <RadioGroupItem value="system" id="theme-system" />
              <RadioGroupLabel htmlFor="theme-system">System</RadioGroupLabel>
            </RadioGroupOption>
          </RadioGroup>
        </div>

        <div>
          <h3 className="mb-3 text-sm font-semibold text-[var(--atom-card-fg)]">
            Density
          </h3>
          <RadioGroup value={density} onValueChange={setDensity}>
            <RadioGroupOption>
              <RadioGroupItem value="compact" id="density-compact" />
              <RadioGroupLabel htmlFor="density-compact">Compact</RadioGroupLabel>
            </RadioGroupOption>
            <RadioGroupOption>
              <RadioGroupItem value="default" id="density-default" />
              <RadioGroupLabel htmlFor="density-default">Default</RadioGroupLabel>
            </RadioGroupOption>
            <RadioGroupOption>
              <RadioGroupItem value="comfortable" id="density-comfortable" />
              <RadioGroupLabel htmlFor="density-comfortable">
                Comfortable
              </RadioGroupLabel>
            </RadioGroupOption>
          </RadioGroup>
        </div>
      </div>
    );
  },
};

// Form integration
export const InForm: Story = {
  render: () => {
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const formData = new FormData(e.currentTarget);
      alert(`Selected: ${formData.get('notification-preference')}`);
    };

    return (
      <form onSubmit={handleSubmit} className="w-[350px] space-y-6">
        <div>
          <label className="mb-3 block text-sm font-semibold text-[var(--atom-card-fg)]">
            Notification Preference
          </label>
          <RadioGroup
            name="notification-preference"
            defaultValue="email"
            className="space-y-3"
          >
            <RadioGroupOption>
              <RadioGroupItem value="email" id="notif-email" />
              <div className="flex-1">
                <RadioGroupLabel htmlFor="notif-email">Email</RadioGroupLabel>
                <RadioGroupDescription>
                  Receive notifications via email
                </RadioGroupDescription>
              </div>
            </RadioGroupOption>
            <RadioGroupOption>
              <RadioGroupItem value="push" id="notif-push" />
              <div className="flex-1">
                <RadioGroupLabel htmlFor="notif-push">Push</RadioGroupLabel>
                <RadioGroupDescription>
                  Receive push notifications in-app
                </RadioGroupDescription>
              </div>
            </RadioGroupOption>
            <RadioGroupOption>
              <RadioGroupItem value="none" id="notif-none" />
              <div className="flex-1">
                <RadioGroupLabel htmlFor="notif-none">None</RadioGroupLabel>
                <RadioGroupDescription>
                  Don't send any notifications
                </RadioGroupDescription>
              </div>
            </RadioGroupOption>
          </RadioGroup>
        </div>
        <button
          type="submit"
          className="w-full rounded-md bg-[var(--atom-primary)] px-4 py-2 text-sm font-medium text-white hover:opacity-90"
        >
          Save Preferences
        </button>
      </form>
    );
  },
};
