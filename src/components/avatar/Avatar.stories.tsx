// src/components/avatar/Avatar.stories.tsx
import type { Meta, StoryObj } from '@storybook/react'
import { Avatar, type AvatarProps } from './avatar'

const meta: Meta<AvatarProps> = {
  title: 'Components/Avatar',
  component: Avatar,
  tags: ['autodocs'],
  args: {
    initials: 'JD', 
    variant: 'neutral',
    appearance: 'subtle',
    size: 'md',
    shape: 'circle',
    fullWidth: false,
    withRing: false,
  },
  argTypes: {
    variant: {
      control: 'select',
      options: [
        'neutral',
        'success',
        'warning',
        'danger',
        'info',
        'accent',
        'primary',
      ],
    },
    appearance: {
      control: 'select',
      options: ['subtle', 'solid', 'outline', 'ghost','ghostSoft'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    shape: {
      control: 'select',
      options: ['circle', 'square', 'pill'],
    },
    fullWidth: { control: 'boolean' },
    withRing: { control: 'boolean' },
    asChild: { control: false },
    children: { control: false },
    src: { control: 'text' },
    className: { control: false },
  },
}

export default meta
type Story = StoryObj<AvatarProps>

export const Playground: Story = {}
export const Primary: Story = {
  args: {
    initials: 'JD',
    variant: 'primary',
    appearance: 'ghost',
  },
}

export const Neutral: Story = {
  args: {
    initials: 'JD',
    variant: 'neutral',
    appearance: 'subtle',
  },
}

export const Success: Story = {
  args: {
    initials: 'JD',
    variant: 'success',
    appearance: 'subtle',
  },
}

export const Danger: Story = {
  args: {
    initials: 'JD',
    variant: 'danger',
    appearance: 'subtle',
  },
}

export const Info: Story = {
  args: {
    initials: 'JD',
    variant: 'info',
    appearance: 'subtle',
  },
}

export const Sizes: Story = {
  render: (args) => (
    <div className="flex items-center gap-4">
      <Avatar {...args} size="sm" />
      <Avatar {...args} size="md" />
      <Avatar {...args} size="lg" />
    </div>
  ),
  args: {
    initials: 'JD',
    variant: 'accent',
    appearance: 'subtle',
  },
}

export const Shapes: Story = {
  render: (args) => (
    <div className="flex items-center gap-4">
      <Avatar {...args} shape="circle" />
      <Avatar {...args} shape="square" />
      <Avatar {...args} shape="pill" />
    </div>
  ),
  args: {
    initials: 'JD',
    variant: 'neutral',
    appearance: 'subtle',
    size: 'md',
  },
}

export const WithRing: Story = {
  args: {
    initials: 'JD',
    variant: 'success',
    appearance: 'solid',
    withRing: true,
  },
}
