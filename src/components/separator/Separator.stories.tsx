// src/components/separator/Separator.stories.tsx
import type { Meta, StoryObj } from '@storybook/react'
import { Separator } from './separator'

const meta: Meta<typeof Separator> = {
  title: 'Components/Separator',
  component: Separator,
  tags: ['autodocs'],
  argTypes: {
    orientation: {
      control: 'inline-radio',
      options: ['horizontal', 'vertical'],
    },
    inset: {
      control: 'inline-radio',
      options: ['none', 'sm', 'md'],
    },
  },
}

export default meta
type Story = StoryObj<typeof Separator>

export const Horizontal: Story = {
  args: {
    orientation: 'horizontal',
    inset: 'none',
    className: 'my-3',
  },
}

export const Vertical: Story = {
  args: {
    orientation: 'vertical',
    inset: 'none',
    className: 'mx-3 h-4',
  },
}

export const CardExample: Story = {
  render: () => (
    <div className="w-[260px] space-y-3 text-sm">
      <div className="space-y-1">
        <h4 className="font-medium leading-none">Radix Primitives</h4>
        <p className="text-xs text-[var(--atom-text-muted)]">
          An open-source UI component library.
        </p>
      </div>

      <Separator className="my-2" />

      <div className="flex h-5 items-center space-x-4 text-xs text-[var(--atom-text-muted)]">
        <button className="hover:text-[var(--atom-text)]">Blog</button>
        <Separator orientation="vertical" className="h-3" />
        <button className="hover:text-[var(--atom-text)]">Docs</button>
        <Separator orientation="vertical" className="h-3" />
        <button className="hover:text-[var(--atom-text)]">Source</button>
      </div>
    </div>
  ),
}
