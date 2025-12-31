// src/components/ui/Skeleton.stories.tsx
import type { Meta, StoryObj } from '@storybook/react'
import { Skeleton } from './Skeleton'

const meta: Meta<typeof Skeleton> = {
  title: 'Components/Skeleton',
  component: Skeleton,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'rounded', 'card', 'circle'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'full'],
    },
  },
}

export default meta
type Story = StoryObj<typeof Skeleton>

/**
 * Single skeleton block with controls.
 */
export const Default: Story = {
  args: {
    variant: 'default',
    size: 'md',
    className: '',
  },
}

/**
 * Common text layout: title + 2 lines.
 */
export const TextLines: Story = {
  render: (args) => (
    <div className="space-y-2 w-72">
      <Skeleton {...args} size="lg" />
      <Skeleton {...args} size="md" />
      <Skeleton {...args} size="sm" className="w-40" />
    </div>
  ),
  args: {
    variant: 'default',
  },
}

/**
 * Card-like skeleton (header + body).
 */
export const Card: Story = {
  render: (args) => (
    <div className="w-80 space-y-3 rounded-lg border border-[var(--atom-border)] p-4">
      <Skeleton {...args} variant="card" size="lg" className="w-40" />
      <div className="space-y-2">
        <Skeleton {...args} size="md" className="w-full" />
        <Skeleton {...args} size="sm" className="w-3/4" />
        <Skeleton {...args} size="sm" className="w-2/3" />
      </div>
    </div>
  ),
  args: {
    variant: 'card',
  },
}

/**
 * Avatar + text skeleton (common for list items).
 */
export const AvatarWithText: Story = {
  render: (args) => (
    <div className="flex items-center gap-3 w-80">
      <Skeleton {...args} variant="circle" size="lg" className="h-10 w-10" />
      <div className="flex-1 space-y-2">
        <Skeleton {...args} size="sm" className="w-32" />
        <Skeleton {...args} size="sm" className="w-48" />
      </div>
    </div>
  ),
  args: {
    variant: 'circle',
  },
}

/**
 * Full-width skeleton bar (e.g. for table header).
 */
export const FullWidthBar: Story = {
  args: {
    variant: 'default',
    size: 'full',
    className: 'h-4',
  },
}
