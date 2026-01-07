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
          'A versatile input component with keyboard arrow support and optional spinner buttons. Supports three variants: numeric (numbers), alphanumeric (letters + numbers), and alpha (letters only).',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['numeric', 'alphanumeric', 'alpha'],
      description: 'Input behavior variant',
      table: { defaultValue: { summary: 'numeric' } },
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Visual size of the input',
      table: { defaultValue: { summary: 'md' } },
    },
    showSpinners: {
      control: 'boolean',
      description: 'Show inline increment/decrement buttons',
      table: { defaultValue: { summary: 'false' } },
    },
    value: {
      control: 'text',
      description: 'Current value',
    },
    min: {
      control: 'number',
      description: 'Minimum value (numeric only)',
    },
    max: {
      control: 'number',
      description: 'Maximum value (numeric only)',
    },
    step: {
      control: 'number',
      description: 'Step for increment/decrement (numeric only)',
      table: { defaultValue: { summary: "1" } },
    },
    placeholder: {
      control: 'text',
    },
    disabled: {
      control: 'boolean',
      table: { defaultValue: { summary: " " } },
    },
    onChange: {
      action: 'changed',
    },
  },
} satisfies Meta<typeof NumberInput>

export default meta
type Story = StoryObj<typeof meta>

// Controlled wrapper component
const Controlled = (args: React.ComponentProps<typeof NumberInput>) => {
  const [value, setValue] = useState<string>(String(args.value ?? ''))

  return (
    <div className="space-y-2 w-full">
      <NumberInput
        {...args}
        value={value}
        onChange={(val) => {
          setValue(val)
          args.onChange?.(val as any)
        }}
      />
      <p className="text-sm text-muted-foreground">
        Current: <code className="rounded bg-muted px-1 py-0.5">{value || '(empty)'}</code>
      </p>
      <p className="text-xs text-muted-foreground">
        {args.showSpinners ? 'Use ↑↓ keys or click buttons' : 'Use ↑↓ arrow keys'}
      </p>
    </div>
  )
}

/* ========== NUMERIC VARIANT ========== */

export const NumericDefault: Story = {
  render: (args) => <Controlled {...args} />,
  args: {
    variant: 'numeric',
    value: '10',
    placeholder: 'Enter number',
  },
  parameters: {
    docs: {
      description: {
        story: 'Basic numeric input with keyboard arrow support. Press ↑ to increment, ↓ to decrement.',
      },
    },
  },
}

export const NumericWithSpinners: Story = {
  render: (args) => <Controlled {...args} />,
  args: {
    variant: 'numeric',
    value: '10',
    showSpinners: true,
    placeholder: 'Enter number',
  },
  parameters: {
    docs: {
      description: {
        story: 'Numeric input with visible spinner buttons for increment/decrement.',
      },
    },
  },
}

export const NumericWithMinMax: Story = {
  render: (args) => <Controlled {...args} />,
  args: {
    variant: 'numeric',
    value: '50',
    min: 0,
    max: 100,
    showSpinners: true,
    placeholder: '0-100',
  },
  parameters: {
    docs: {
      description: {
        story: 'Numeric input with min/max boundaries. Cannot go below 0 or above 100.',
      },
    },
  },
}

export const NumericWithStep: Story = {
  render: (args) => <Controlled {...args} />,
  args: {
    variant: 'numeric',
    value: '0',
    step: 5,
    showSpinners: true,
    placeholder: 'Step by 5',
  },
  parameters: {
    docs: {
      description: {
        story: 'Numeric input with custom step value. Increments/decrements by 5.',
      },
    },
  },
}

export const NumericDecimal: Story = {
  render: (args) => <Controlled {...args} />,
  args: {
    variant: 'numeric',
    value: '3.14',
    step: 0.1,
    showSpinners: true,
    placeholder: 'Decimal',
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
  render: (args) => <Controlled {...args} />,
  args: {
    variant: 'numeric',
    value: '-10',
    min: -100,
    max: 100,
    showSpinners: true,
    placeholder: 'Negative allowed',
  },
  parameters: {
    docs: {
      description: {
        story: 'Allows negative numbers with proper min/max validation.',
      },
    },
  },
}

export const NumericSmall: Story = {
  render: (args) => <Controlled {...args} />,
  args: {
    variant: 'numeric',
    size: 'sm',
    value: '5',
    showSpinners: true,
  },
}

export const NumericMedium: Story = {
  render: (args) => <Controlled {...args} />,
  args: {
    variant: 'numeric',
    size: 'md',
    value: '10',
    showSpinners: true,
  },
}

export const NumericLarge: Story = {
  render: (args) => <Controlled {...args} />,
  args: {
    variant: 'numeric',
    size: 'lg',
    value: '15',
    showSpinners: true,
  },
}

export const NumericDisabled: Story = {
  render: (args) => <Controlled {...args} />,
  args: {
    variant: 'numeric',
    value: '42',
    disabled: true,
    showSpinners: true,
  },
}

/* ========== ALPHANUMERIC VARIANT ========== */

export const AlphanumericDefault: Story = {
  render: (args) => <Controlled {...args} />,
  args: {
    variant: 'alphanumeric',
    value: 'A1',
    placeholder: 'Enter code',
  },
  parameters: {
    docs: {
      description: {
        story: 'Alphanumeric input where arrow keys increment only the letter part: A1 → B1 → C1.',
      },
    },
  },
}

export const AlphanumericWithSpinners: Story = {
  render: (args) => <Controlled {...args} />,
  args: {
    variant: 'alphanumeric',
    value: 'A1',
    showSpinners: true,
    placeholder: 'Enter code',
  },
  parameters: {
    docs: {
      description: {
        story: 'Alphanumeric with spinner buttons. Increments letters while preserving numbers.',
      },
    },
  },
}

export const AlphanumericMultiChar: Story = {
  render: (args) => <Controlled {...args} />,
  args: {
    variant: 'alphanumeric',
    value: 'AB12',
    showSpinners: true,
    placeholder: 'Multi-char code',
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
  render: (args) => <Controlled {...args} />,
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

export const AlphanumericSmall: Story = {
  render: (args) => <Controlled {...args} />,
  args: {
    variant: 'alphanumeric',
    size: 'sm',
    value: 'C5',
    showSpinners: true,
  },
}

export const AlphanumericMedium: Story = {
  render: (args) => <Controlled {...args} />,
  args: {
    variant: 'alphanumeric',
    size: 'md',
    value: 'D10',
    showSpinners: true,
  },
}

export const AlphanumericLarge: Story = {
  render: (args) => <Controlled {...args} />,
  args: {
    variant: 'alphanumeric',
    size: 'lg',
    value: 'E15',
    showSpinners: true,
  },
}

export const AlphanumericDisabled: Story = {
  render: (args) => <Controlled {...args} />,
  args: {
    variant: 'alphanumeric',
    value: 'F20',
    disabled: true,
    showSpinners: true,
  },
}

/* ========== ALPHA VARIANT (Letters Only) ========== */

export const AlphaDefault: Story = {
  render: (args) => <Controlled {...args} />,
  args: {
    variant: 'alpha',
    value: 'A',
    placeholder: 'Enter letter',
  },
  parameters: {
    docs: {
      description: {
        story: 'Letter-only input where arrow keys increment letters: A → B → C → ... → Z → AA.',
      },
    },
  },
}

export const AlphaWithSpinners: Story = {
  render: (args) => <Controlled {...args} />,
  args: {
    variant: 'alpha',
    value: 'A',
    showSpinners: true,
    placeholder: 'Enter letter',
  },
  parameters: {
    docs: {
      description: {
        story: 'Letter-only input with spinner buttons for easy navigation.',
      },
    },
  },
}

export const AlphaMultiChar: Story = {
  render: (args) => <Controlled {...args} />,
  args: {
    variant: 'alpha',
    value: 'AB',
    showSpinners: true,
    placeholder: 'Multi-letter',
  },
  parameters: {
    docs: {
      description: {
        story: 'Handles multi-letter values: AB → AC → AD → ... → AZ → BA.',
      },
    },
  },
}

export const AlphaEdgeCase: Story = {
  render: (args) => <Controlled {...args} />,
  args: {
    variant: 'alpha',
    value: 'Z',
    showSpinners: true,
    placeholder: 'Edge case',
  },
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates wrap-around at Z: Z → AA. Decrement: AA → Z.',
      },
    },
  },
}

export const AlphaSmall: Story = {
  render: (args) => <Controlled {...args} />,
  args: {
    variant: 'alpha',
    size: 'sm',
    value: 'C',
    showSpinners: true,
  },
}

export const AlphaMedium: Story = {
  render: (args) => <Controlled {...args} />,
  args: {
    variant: 'alpha',
    size: 'md',
    value: 'D',
    showSpinners: true,
  },
}

export const AlphaLarge: Story = {
  render: (args) => <Controlled {...args} />,
  args: {
    variant: 'alpha',
    size: 'lg',
    value: 'E',
    showSpinners: true,
  },
}

export const AlphaDisabled: Story = {
  render: (args) => <Controlled {...args} />,
  args: {
    variant: 'alpha',
    value: 'F',
    disabled: true,
    showSpinners: true,
  },
}

/* ========== COMPARISON STORIES ========== */

export const AllVariantsComparison: Story = {
  render: () => {
    const [numeric, setNumeric] = useState('10')
    const [alphanumeric, setAlphanumeric] = useState('A1')
    const [alpha, setAlpha] = useState('A')

    return (
      <div className="space-y-6 w-96">
        <div>
          <h3 className="mb-2 text-sm font-medium">Numeric</h3>
          <NumberInput
            variant="numeric"
            value={numeric}
            onChange={setNumeric}
            showSpinners
            step={1}
          />
          <p className="mt-1 text-xs text-muted-foreground">
            Increments numbers: 10 → 11 → 12
          </p>
        </div>
        <div>
          <h3 className="mb-2 text-sm font-medium">Alphanumeric</h3>
          <NumberInput
            variant="alphanumeric"
            value={alphanumeric}
            onChange={setAlphanumeric}
            showSpinners
          />
          <p className="mt-1 text-xs text-muted-foreground">
            Increments letters only: A1 → B1 → C1
          </p>
        </div>
        <div>
          <h3 className="mb-2 text-sm font-medium">Alpha (Letters Only)</h3>
          <NumberInput
            variant="alpha"
            value={alpha}
            onChange={setAlpha}
            showSpinners
          />
          <p className="mt-1 text-xs text-muted-foreground">
            Increments letters: A → B → C
          </p>
        </div>
      </div>
    )
  },
  parameters: {
    docs: {
      description: {
        story: 'Side-by-side comparison of all three variants with spinners.',
      },
    },
  },
}

export const AllSizesComparison: Story = {
  render: () => {
    const [sm, setSm] = useState('5')
    const [md, setMd] = useState('10')
    const [lg, setLg] = useState('15')

    return (
      <div className="space-y-4">
        <div>
          <label className="mb-1 block text-sm font-medium">Small</label>
          <NumberInput
            variant="numeric"
            size="sm"
            value={sm}
            onChange={setSm}
            showSpinners
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium">Medium</label>
          <NumberInput
            variant="numeric"
            size="md"
            value={md}
            onChange={setMd}
            showSpinners
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium">Large</label>
          <NumberInput
            variant="numeric"
            size="lg"
            value={lg}
            onChange={setLg}
            showSpinners
          />
        </div>
      </div>
    )
  },
  parameters: {
    docs: {
      description: {
        story: 'All size variants (sm, md, lg) with responsive spinner icons.',
      },
    },
  },
}

export const WithoutSpinnersComparison: Story = {
  render: () => {
    const [withSpinners, setWithSpinners] = useState('10')
    const [withoutSpinners, setWithoutSpinners] = useState('10')

    return (
      <div className="space-y-6 w-96">
        <div>
          <label className="mb-2 block text-sm font-medium">Without Spinners</label>
          <NumberInput
            variant="numeric"
            value={withoutSpinners}
            onChange={setWithoutSpinners}
            showSpinners={false}
          />
          <p className="mt-1 text-xs text-muted-foreground">
            Keyboard only (cleaner UI)
          </p>
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium">With Spinners</label>
          <NumberInput
            variant="numeric"
            value={withSpinners}
            onChange={setWithSpinners}
            showSpinners={true}
          />
          <p className="mt-1 text-xs text-muted-foreground">
            Keyboard + mouse (explicit controls)
          </p>
        </div>
      </div>
    )
  },
  parameters: {
    docs: {
      description: {
        story: 'Comparison between inputs with and without spinner buttons.',
      },
    },
  },
}

/* ========== DECIMAL PLACES (NUMERIC PRECISION) ========== */

export const DecimalPlacesDefault: Story = {
  render: (args) => <Controlled {...args} />,
  args: {
    variant: 'numeric',
    value: '3.14159',
    step: 0.1,
    showSpinners: true,
    decimalPlaces: 3,
    placeholder: 'Max 3 decimals',
  },
  parameters: {
    docs: {
      description: {
        story: 'Default behavior with 3 decimal places. Value 3.14159 is automatically limited to 3.141.',
      },
    },
  },
}

export const DecimalPlacesTwoDigits: Story = {
  render: (args) => <Controlled {...args} />,
  args: {
    variant: 'numeric',
    value: '99.99999',
    step: 0.05,
    showSpinners: true,
    decimalPlaces: 2,
    placeholder: 'Max 2 decimals',
  },
  parameters: {
    docs: {
      description: {
        story: 'Numeric input limited to 2 decimal places. Useful for currency or percentage values.',
      },
    },
  },
}

export const DecimalPlacesIntegerOnly: Story = {
  render: (args) => <Controlled {...args} />,
  args: {
    variant: 'numeric',
    value: '42.999',
    step: 1,
    showSpinners: true,
    decimalPlaces: 0,
    placeholder: 'Integer only',
  },
  parameters: {
    docs: {
      description: {
        story: 'Set decimalPlaces to 0 for integer-only input. Fractional parts are automatically trimmed.',
      },
    },
  },
}

export const DecimalPlacesFourDigits: Story = {
  render: (args) => <Controlled {...args} />,
  args: {
    variant: 'numeric',
    value: '1.234567',
    step: 0.0001,
    showSpinners: true,
    decimalPlaces: 4,
    placeholder: 'Max 4 decimals',
  },
  parameters: {
    docs: {
      description: {
        story: 'Extended precision with 4 decimal places. Useful for scientific calculations.',
      },
    },
  },
}

export const DecimalPlacesWithNegative: Story = {
  render: (args) => <Controlled {...args} />,
  args: {
    variant: 'numeric',
    value: '-5.99999',
    min: -100,
    max: 100,
    step: 0.1,
    showSpinners: true,
    decimalPlaces: 3,
    placeholder: 'Negative with decimals',
  },
  parameters: {
    docs: {
      description: {
        story: 'Decimal precision works correctly with negative numbers. -5.99999 becomes -5.999.',
      },
    },
  },
}

export const DecimalPlacesWithMinMax: Story = {
  render: (args) => <Controlled {...args} />,
  args: {
    variant: 'numeric',
    value: '50.12345',
    min: 0,
    max: 100,
    step: 0.1,
    showSpinners: true,
    decimalPlaces: 2,
    placeholder: '0-100, 2 decimals',
  },
  parameters: {
    docs: {
      description: {
        story: 'Combines min/max validation with decimal precision. Both constraints are enforced.',
      },
    },
  },
}

export const DecimalPlacesComparison: Story = {
  render: () => {
    const [zero, setZero] = useState('3.14159')
    const [two, setTwo] = useState('3.14159')
    const [three, setThree] = useState('3.14159')
    const [four, setFour] = useState('3.14159')

    return (
      <div className="space-y-4 w-96">
        <div>
          <label className="mb-1 block text-sm font-medium">
            Integer Only (decimalPlaces=0)
          </label>
          <NumberInput
            variant="numeric"
            value={zero}
            onChange={setZero}
            showSpinners
            decimalPlaces={0}
            step={1}
          />
          <p className="mt-1 text-xs text-muted-foreground">
            Value: <code>{zero || '(empty)'}</code>
          </p>
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium">
            2 Decimal Places
          </label>
          <NumberInput
            variant="numeric"
            value={two}
            onChange={setTwo}
            showSpinners
            decimalPlaces={2}
            step={0.01}
          />
          <p className="mt-1 text-xs text-muted-foreground">
            Value: <code>{two || '(empty)'}</code>
          </p>
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium">
            3 Decimal Places (default)
          </label>
          <NumberInput
            variant="numeric"
            value={three}
            onChange={setThree}
            showSpinners
            decimalPlaces={3}
            step={0.001}
          />
          <p className="mt-1 text-xs text-muted-foreground">
            Value: <code>{three || '(empty)'}</code>
          </p>
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium">
            4 Decimal Places
          </label>
          <NumberInput
            variant="numeric"
            value={four}
            onChange={setFour}
            showSpinners
            decimalPlaces={4}
            step={0.0001}
          />
          <p className="mt-1 text-xs text-muted-foreground">
            Value: <code>{four || '(empty)'}</code>
          </p>
        </div>
      </div>
    )
  },
  parameters: {
    docs: {
      description: {
        story: 'Visual comparison of different decimal precision levels. All start with 3.14159 and format accordingly.',
      },
    },
  },
}

export const DecimalPlacesCurrency: Story = {
  render: (args) => <Controlled {...args} />,
  args: {
    variant: 'numeric',
    value: '1234.56',
    min: 0,
    step: 0.01,
    showSpinners: true,
    decimalPlaces: 2,
    placeholder: '$0.00',
  },
  parameters: {
    docs: {
      description: {
        story: 'Currency use case: 2 decimal places with 0.01 step for cents. Perfect for price inputs.',
      },
    },
  },
}

export const DecimalPlacesPercentage: Story = {
  render: (args) => <Controlled {...args} />,
  args: {
    variant: 'numeric',
    value: '85.75',
    min: 0,
    max: 100,
    step: 0.25,
    showSpinners: true,
    decimalPlaces: 2,
    placeholder: '0.00%',
  },
  parameters: {
    docs: {
      description: {
        story: 'Percentage use case: 2 decimal places with 0-100 range. Useful for interest rates or scores.',
      },
    },
  },
}

export const DecimalPlacesScientific: Story = {
  render: (args) => <Controlled {...args} />,
  args: {
    variant: 'numeric',
    value: '2.71828',
    step: 0.00001,
    showSpinners: true,
    decimalPlaces: 5,
    placeholder: 'Scientific precision',
  },
  parameters: {
    docs: {
      description: {
        story: 'Scientific calculations with 5 decimal places. For high-precision mathematical operations.',
      },
    },
  },
}

/* ========== PLAYGROUND ========== */

export const Playground: Story = {
  render: (args) => <Controlled {...args} />,
  args: {
    variant: 'numeric',
    size: 'md',
    value: '10',
    min: 0,
    max: 100,
    step: 1,
    showSpinners: true,
    placeholder: 'Try me!',
    disabled: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive playground - use controls panel to experiment with all props.',
      },
    },
  },
}
