// src/components/ui/number-input.stories.tsx
import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { NumberInput } from './InputNumber'

const meta = {
  title: 'Input/NumberInput',
  component: NumberInput,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A custom input component with keyboard arrow support and optional spinner buttons for incrementing/decrementing values. Supports both numeric and alphanumeric variants.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['numeric', 'alphanumeric'],
      description: 'Type of input - numeric for numbers, alphanumeric for codes like A1, B1, etc.',
      table: {
        defaultValue: { summary: 'numeric' },
      },
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size of the input field',
      table: {
        defaultValue: { summary: 'md' },
      },
    },
    showSpinners: {
      control: 'boolean',
      description: 'Show increment/decrement spinner buttons inside the input',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    value: {
      control: 'text',
      description: 'Current value of the input',
    },
    min: {
      control: 'number',
      description: 'Minimum value (numeric variant only)',
    },
    max: {
      control: 'number',
      description: 'Maximum value (numeric variant only)',
    },
    step: {
      control: 'number',
      description: 'Increment/decrement step (numeric variant only)',
      table: {
        defaultValue: { summary: '1' },
      },
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text',
    },
    disabled: {
      control: 'boolean',
      description: 'Disable the input',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    onChange: {
      action: 'changed',
      description: 'Callback fired when value changes',
    },
  },
} satisfies Meta<typeof NumberInput>

export default meta
type Story = StoryObj<typeof meta>

// Wrapper component for controlled state
const ControlledNumberInput = (args: React.ComponentProps<typeof NumberInput>) => {
  const [value, setValue] = useState(args.value || '')
  
  return (
    <div className="space-y-2">
      <NumberInput {...args} value={value} onChange={setValue} />
      <p className="text-sm text-muted-foreground">
        Current value: <code className="bg-muted px-1 py-0.5 rounded">{value || '(empty)'}</code>
      </p>
      <p className="text-xs text-muted-foreground">
        {args.showSpinners ? 'Use ↑↓ keys or click spinner buttons' : 'Press ↑ to increment, ↓ to decrement'}
      </p>
    </div>
  )
}

// Basic Stories
export const NumericDefault: Story = {
  render: (args) => <ControlledNumberInput {...args} />,
  args: {
    variant: 'numeric',
    placeholder: 'Enter number',
    value: '10',
  },
}

export const NumericWithSpinners: Story = {
  render: (args) => <ControlledNumberInput {...args} />,
  args: {
    variant: 'numeric',
    placeholder: 'Enter number',
    value: '10',
    showSpinners: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Numeric input with visible spinner buttons for increment/decrement.',
      },
    },
  },
}

export const AlphanumericDefault: Story = {
  render: (args) => <ControlledNumberInput {...args} />,
  args: {
    variant: 'alphanumeric',
    placeholder: 'Enter code',
    value: 'A1',
  },
}

export const AlphanumericWithSpinners: Story = {
  render: (args) => <ControlledNumberInput {...args} />,
  args: {
    variant: 'alphanumeric',
    placeholder: 'Enter code',
    value: 'A1',
    showSpinners: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Alphanumeric input with spinner buttons. Increments letters: A1 → B1 → C1.',
      },
    },
  },
}

// Size Variants
export const SmallSize: Story = {
  render: (args) => <ControlledNumberInput {...args} />,
  args: {
    variant: 'numeric',
    size: 'sm',
    value: '5',
    placeholder: 'Small input',
  },
}

export const MediumSize: Story = {
  render: (args) => <ControlledNumberInput {...args} />,
  args: {
    variant: 'numeric',
    size: 'md',
    value: '10',
    placeholder: 'Medium input',
  },
}

export const LargeSize: Story = {
  render: (args) => <ControlledNumberInput {...args} />,
  args: {
    variant: 'numeric',
    size: 'lg',
    value: '15',
    placeholder: 'Large input',
  },
}

// Size Variants with Spinners
export const SmallWithSpinners: Story = {
  render: (args) => <ControlledNumberInput {...args} />,
  args: {
    variant: 'numeric',
    size: 'sm',
    value: '5',
    showSpinners: true,
    placeholder: 'Small input',
  },
}

export const MediumWithSpinners: Story = {
  render: (args) => <ControlledNumberInput {...args} />,
  args: {
    variant: 'numeric',
    size: 'md',
    value: '10',
    showSpinners: true,
    placeholder: 'Medium input',
  },
}

export const LargeWithSpinners: Story = {
  render: (args) => <ControlledNumberInput {...args} />,
  args: {
    variant: 'numeric',
    size: 'lg',
    value: '15',
    showSpinners: true,
    placeholder: 'Large input',
  },
}

// Numeric Variants
export const NumericWithMinMax: Story = {
  render: (args) => <ControlledNumberInput {...args} />,
  args: {
    variant: 'numeric',
    value: '50',
    min: 0,
    max: 100,
    showSpinners: true,
    placeholder: 'Value between 0-100',
  },
  parameters: {
    docs: {
      description: {
        story: 'Numeric input with min/max boundaries. Spinners and arrow keys respect these limits.',
      },
    },
  },
}

export const NumericWithStep: Story = {
  render: (args) => <ControlledNumberInput {...args} />,
  args: {
    variant: 'numeric',
    value: '0',
    step: 5,
    showSpinners: true,
    placeholder: 'Increment by 5',
  },
  parameters: {
    docs: {
      description: {
        story: 'Numeric input that increments/decrements by 5 with each button click or arrow key.',
      },
    },
  },
}

export const NumericDecimal: Story = {
  render: (args) => <ControlledNumberInput {...args} />,
  args: {
    variant: 'numeric',
    value: '3.14',
    step: 0.1,
    showSpinners: true,
    placeholder: 'Decimal values',
  },
  parameters: {
    docs: {
      description: {
        story: 'Supports decimal numbers with custom step increments (0.1).',
      },
    },
  },
}

export const NumericNegative: Story = {
  render: (args) => <ControlledNumberInput {...args} />,
  args: {
    variant: 'numeric',
    value: '-10',
    min: -100,
    max: 100,
    showSpinners: true,
    placeholder: 'Negative numbers',
  },
  parameters: {
    docs: {
      description: {
        story: 'Allows negative numbers with proper validation and boundaries.',
      },
    },
  },
}

export const NumericLargeStep: Story = {
  render: (args) => <ControlledNumberInput {...args} />,
  args: {
    variant: 'numeric',
    value: '0',
    step: 10,
    showSpinners: true,
    placeholder: 'Step by 10',
  },
  parameters: {
    docs: {
      description: {
        story: 'Large step increment (10) for quick value changes.',
      },
    },
  },
}

// Alphanumeric Variants
export const AlphanumericSimple: Story = {
  render: (args) => <ControlledNumberInput {...args} />,
  args: {
    variant: 'alphanumeric',
    value: 'A1',
    showSpinners: true,
    placeholder: 'Code (e.g., A1, B2)',
  },
  parameters: {
    docs: {
      description: {
        story: 'Alphanumeric input with spinners: A1 → B1 → C1. Auto-converts to uppercase.',
      },
    },
  },
}

export const AlphanumericMultiChar: Story = {
  render: (args) => <ControlledNumberInput {...args} />,
  args: {
    variant: 'alphanumeric',
    value: 'AB12',
    showSpinners: true,
    placeholder: 'Multi-character code',
  },
  parameters: {
    docs: {
      description: {
        story: 'Handles multi-character codes: AB12 → AC12 → AD12. Number part stays unchanged.',
      },
    },
  },
}

export const AlphanumericEdgeCase: Story = {
  render: (args) => <ControlledNumberInput {...args} />,
  args: {
    variant: 'alphanumeric',
    value: 'Z9',
    showSpinners: true,
    placeholder: 'Edge case',
  },
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates carry logic at boundaries: Z9 → AA9. Decrement: AA9 → Z9.',
      },
    },
  },
}

export const AlphanumericLetterOnly: Story = {
  render: (args) => <ControlledNumberInput {...args} />,
  args: {
    variant: 'alphanumeric',
    value: 'C',
    showSpinners: true,
    placeholder: 'Letter only',
  },
  parameters: {
    docs: {
      description: {
        story: 'Works with letter-only codes: C → D → E.',
      },
    },
  },
}

// State Variants
export const Disabled: Story = {
  render: (args) => <ControlledNumberInput {...args} />,
  args: {
    variant: 'numeric',
    value: '42',
    disabled: true,
    showSpinners: true,
    placeholder: 'Disabled input',
  },
  parameters: {
    docs: {
      description: {
        story: 'Disabled state prevents all interactions including spinner buttons and keyboard.',
      },
    },
  },
}

export const Empty: Story = {
  render: (args) => <ControlledNumberInput {...args} />,
  args: {
    variant: 'numeric',
    value: '',
    showSpinners: true,
    placeholder: 'Empty state',
  },
  parameters: {
    docs: {
      description: {
        story: 'Empty input starts at 0 (numeric) or A1 (alphanumeric) when arrow keys are pressed.',
      },
    },
  },
}

export const Invalid: Story = {
  render: (args) => <ControlledNumberInput {...args} />,
  args: {
    variant: 'numeric',
    value: '150',
    showSpinners: true,
    'aria-invalid': true,
    placeholder: 'Invalid state',
  },
  parameters: {
    docs: {
      description: {
        story: 'Invalid state with aria-invalid attribute for form validation.',
      },
    },
  },
}

// Comparison Stories
export const SpinnersComparison: Story = {
  render: () => {
    const [withoutSpinners, setWithoutSpinners] = useState('10')
    const [withSpinners, setWithSpinners] = useState('10')

    return (
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2">Without Spinners (Keyboard Only)</label>
          <NumberInput 
            variant="numeric" 
            value={withoutSpinners} 
            onChange={setWithoutSpinners}
            showSpinners={false}
          />
          <p className="text-xs text-muted-foreground mt-1">
            Use ↑↓ arrow keys to increment/decrement
          </p>
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">With Spinners (Keyboard + Buttons)</label>
          <NumberInput 
            variant="numeric" 
            value={withSpinners} 
            onChange={setWithSpinners}
            showSpinners={true}
          />
          <p className="text-xs text-muted-foreground mt-1">
            Use ↑↓ arrow keys or click spinner buttons
          </p>
        </div>
      </div>
    )
  },
  parameters: {
    docs: {
      description: {
        story: 'Side-by-side comparison showing the difference between inputs with and without spinner buttons.',
      },
    },
  },
}

export const AllSizeSpinnersComparison: Story = {
  render: () => {
    const [sm, setSm] = useState('5')
    const [md, setMd] = useState('10')
    const [lg, setLg] = useState('15')

    return (
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Small with Spinners</label>
          <NumberInput variant="numeric" size="sm" value={sm} onChange={setSm} showSpinners />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Medium with Spinners</label>
          <NumberInput variant="numeric" size="md" value={md} onChange={setMd} showSpinners />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Large with Spinners</label>
          <NumberInput variant="numeric" size="lg" value={lg} onChange={setLg} showSpinners />
        </div>
      </div>
    )
  },
  parameters: {
    docs: {
      description: {
        story: 'All size variants (sm, md, lg) with spinner buttons showing responsive icon sizing.',
      },
    },
  },
}

export const VariantComparison: Story = {
  render: () => {
    const [numeric, setNumeric] = useState('10')
    const [alpha, setAlpha] = useState('A1')

    return (
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Numeric Variant</label>
          <NumberInput 
            variant="numeric" 
            value={numeric} 
            onChange={setNumeric} 
            step={1}
            showSpinners
          />
          <p className="text-xs text-muted-foreground mt-1">
            Increments by 1: 10 → 11 → 12
          </p>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Alphanumeric Variant</label>
          <NumberInput 
            variant="alphanumeric" 
            value={alpha} 
            onChange={setAlpha}
            showSpinners
          />
          <p className="text-xs text-muted-foreground mt-1">
            Increments letters only: A1 → B1 → C1
          </p>
        </div>
      </div>
    )
  },
  parameters: {
    docs: {
      description: {
        story: 'Comparison between numeric and alphanumeric variants, both with spinner buttons.',
      },
    },
  },
}

// Interactive Playground
export const Playground: Story = {
  render: (args) => <ControlledNumberInput {...args} />,
  args: {
    variant: 'numeric',
    size: 'md',
    value: '10',
    min: 0,
    max: 100,
    step: 1,
    showSpinners: true,
    placeholder: 'Enter value',
    disabled: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive playground - use the controls panel to test all available configurations.',
      },
    },
  },
}
