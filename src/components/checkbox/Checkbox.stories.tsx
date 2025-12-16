// src/components/checkbox-card/CheckboxCard.stories.tsx
import type { Meta, StoryObj } from '@storybook/react'
import { CheckboxCard } from './Checkbox'

const meta: Meta<typeof CheckboxCard> = {
  title: 'Components/CheckboxCard',
  component: CheckboxCard,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: [
        'neutral',
        'primary',
        'success',
        'warning',
        'danger',
        'info',
        'accent',
      ],
    },
    size: {
      control: 'inline-radio',
      options: ['sm', 'md', 'lg'],
    },
    appearance: {
      control: 'select',
      options: ['elevated', 'outlined', 'ghost', 'soft'],
    },
    fullWidth: {
      control: 'boolean',
    },
    disabled: {
      control: 'boolean',
    },
    checked: {
      control: 'boolean',
    },
    label: {
      control: 'text',
    },
    description: {
      control: 'text',
    },
  },
}

export default meta
type Story = StoryObj<typeof CheckboxCard>

/**
 * Basic checkbox row like in your screenshot.
 */
export const Default: Story = {
  args: {
    label: 'Incoming',
    checked: true,
    variant: 'primary',
    size: 'md',
    appearance: 'elevated',
    fullWidth: false,
    disabled: false,
  },
}

/**
 * Variants that match your statuses – use Controls panel to tweak props.
 */
export const AllStates: Story = {
  render: (args) => (
    <div className="flex flex-col gap-2 max-w-xs">
      <CheckboxCard
        {...args}
        label="Incoming"
        checked
        variant="primary"
      />
      <CheckboxCard
        {...args}
        label="Validated"
        variant="success"
      />
      <CheckboxCard
        {...args}
        label="Quarantined"
        variant="warning"
      />
      <CheckboxCard
        {...args}
        label="Failed"
        variant="danger"
      />
      <CheckboxCard
        {...args}
        label="Archived"
        variant="neutral"
      />
    </div>
  ),
  args: {
    size: 'md',
    appearance: 'elevated',
    fullWidth: true,
  },
}

/**
 * Compact version for dense lists.
 */
export const SmallSoft: Story = {
  args: {
    label: 'Incoming',
    checked: false,
    size: 'sm',
    appearance: 'soft',
    variant: 'neutral',
    fullWidth: true,
  },
}

/**
 * Disabled state.
 */
export const Disabled: Story = {
  args: {
    label: 'Incoming',
    checked: true,
    disabled: true,
    variant: 'primary',
    appearance: 'elevated',
  },
}
