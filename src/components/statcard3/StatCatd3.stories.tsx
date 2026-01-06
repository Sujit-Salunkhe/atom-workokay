// src/components/stat-card/StatCardPriority.stories.tsx
import type { Meta, StoryObj } from '@storybook/react'
import {
  StatCardPriority,
  type StatCardPriorityProps,
} from './StatCard3'

const meta: Meta<StatCardPriorityProps> = {
  title: 'Components/StatCard3',
  component: StatCardPriority,
  tags: ['autodocs'],
  args: {
    label: 'High Priority',
    value: 6,
    variant: 'high',
    size: 'md',
    appearance: 'elevated',
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'high', 'medium', 'low', 'neutral'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    appearance: {
      control: 'select',
      options: ['elevated', 'outlined', 'ghost', 'soft'],
    },
    asChild: { control: false },
    className: { control: false },
    pillIcon: { control: false },
  },
}

export default meta
type Story = StoryObj<StatCardPriorityProps>

export const Playground: Story = {}

export const HighPriority: Story = {
  args: {
    label: 'High Priority',
    value: 6,
    variant: 'high',
  },
}

export const MediumPriority: Story = {
  args: {
    label: 'Medium Priority',
    value: 5,
    variant: 'medium',
  },
}

export const LowPriority: Story = {
  args: {
    label: 'Low Priority',
    value: 4,
    variant: 'low',
  },
}

export const PrimaryVariant: Story = {
  args: {
    label: 'Primary Metric',
    value: 10,
    variant: 'primary',
  },
}

export const Sizes: Story = {
  render: (args) => (
    <div className="flex flex-col gap-3 max-w-xl">
      <StatCardPriority {...args} size="sm" label="Small" />
      <StatCardPriority {...args} size="md" label="Medium" />
      <StatCardPriority {...args} size="lg" label="Large" />
    </div>
  ),
  args: {
    value: 6,
    variant: 'high',
  },
}

/** Row view like the screenshot */
export const PriorityRow: Story = {
  render: () => (
    <div className="flex flex-col gap-3 max-w-5xl">
      <StatCardPriority label="High Priority" variant="high" value={6} />
      <StatCardPriority label="Medium Priority" variant="medium" value={5} />
      <StatCardPriority label="Low Priority" variant="low" value={4} />
    </div>
  ),
}
