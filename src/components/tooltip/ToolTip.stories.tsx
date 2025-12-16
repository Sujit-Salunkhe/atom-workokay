// src/components/tooltip/Tooltip.stories.tsx
import type { Meta, StoryObj } from '@storybook/react'
import { Tooltip, type TooltipProps } from './ToolTip'

const meta: Meta<typeof Tooltip> = {
  title: 'Components/Tooltip',
  component: Tooltip,
  args: {
    content: 'Add to library',
    children: <button>Hover me</button>,
    side: 'top',
    align: 'center',
    showArrow: true,
  },  
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'soft', 'outline', 'primary','solid'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    
  },
}
export default meta

type Story = StoryObj<typeof Tooltip>

/* ----- Variant stories ----- */

export const Default: Story = {
  args: {
    variant: 'default',
  },
}

export const Soft: Story = {
  args: {
    variant: 'soft',
  },
}

export const Solid: Story = {
  args: {
    variant: 'solid',
  },
}

export const Outline: Story = {
  args: {
    variant: 'outline',
  },
}

export const PrimaryWhite: Story = {
  args: {
    variant: 'primary',
  },
}

/* ----- Sizes in one story ----- */

const SizeWrapper = (props: TooltipProps) => (
  <div
    style={{
      display: 'flex',
      gap: '1rem',
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    <Tooltip {...props} size="sm">
      <button>Small</button>
    </Tooltip>
    <Tooltip {...props} size="md">
      <button>Medium</button>
    </Tooltip>
    <Tooltip {...props} size="lg">
      <button>Large</button>
    </Tooltip>
  </div>
)

export const AllSizes: Story = {
  args: {
    variant: 'primary',
    content: 'Add to library',
    showArrow: true,
  },
  render: (args) => <SizeWrapper {...args} />,
}
