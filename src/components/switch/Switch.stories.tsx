// src/components/switch/Switch.stories.tsx
import type { Meta, StoryObj } from '@storybook/react'
import { Switch, type SwitchProps } from './Switch'

const meta: Meta<SwitchProps> = {
  title: 'Components/Switch',
  component: Switch,
  tags: ['autodocs'],
  args: {
    checked: true,
    variant: 'primary',
    size: 'md',
    disabled: false,
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'success', 'warning', 'danger', 'info', 'neutral'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    disabled: { control: 'boolean' },
    fullWidth: { control: 'boolean' },
    asChild: { control: false },
    className: { control: false },
  },
}

export default meta
type Story = StoryObj<SwitchProps>

export const Playground: Story = {}

export const Primary: Story = {
  args: {
    variant: 'primary',
    checked: true,
  },
}

export const Success: Story = {
  args: {
    variant: 'success',
    checked: true,
  },
}

export const Warning: Story = {
  args: {
    variant: 'warning',
    checked: true,
  },
}

export const Danger: Story = {
  args: {
    variant: 'danger',
    checked: true,
  },
}

export const Info: Story = {
  args: {
    variant: 'info',
    checked: true,
  },
}

export const Neutral: Story = {
  args: {
    variant: 'neutral',
    checked: false,
  },
}

export const Sizes: Story = {
  render: (args) => (
    <div className="flex items-center gap-6">
      <div className="flex items-center gap-2">
        <span className="text-sm text-[var(--atom-text)]">Small</span>
        <Switch {...args} size="sm" />
      </div>
      <div className="flex items-center gap-2">
        <span className="text-sm text-[var(--atom-text)]">Medium</span>
        <Switch {...args} size="md" />
      </div>
      <div className="flex items-center gap-2">
        <span className="text-sm text-[var(--atom-text)]">Large</span>
        <Switch {...args} size="lg" />
      </div>
    </div>
  ),
  args: {
    variant: 'primary',
    checked: true,
  },
}

export const WithLabelRow: Story = {
  render: (args) => (
    <div className="flex items-center gap-2">
      <span className="text-sm text-[var(--atom-text)]">Active</span>
      <Switch {...args} />
    </div>
  ),
  args: {
    variant: 'primary',
    size: 'md',
    checked: true,
  },
}
