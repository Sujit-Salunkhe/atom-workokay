// src/components/ui/checkbox.stories.tsx
import type { Meta, StoryObj } from "@storybook/react"
import { Checkbox, type CheckboxProps } from "./Checkbox"

const meta: Meta<typeof Checkbox> = {
  title: "Input/Checkbox",
  component: Checkbox,
  argTypes: {
    size: { control: "select", options: ["sm", "md", "lg"] },
    checked: { control: "boolean" },
    disabled: { control: "boolean" },
    label: { control: "text" },
    onChange: { action: "onChange" }, // Actions tab
  },
  args: {
    size: "md",
    checked: false,
    disabled: false,
    label: "Accept terms",
  },
}
export default meta

type Story = StoryObj<typeof Checkbox>

/**
 * Controlled story: clicking updates Storybook Controls (checked).
 */
export const Playground: Story = {
  render: function Render(args) {
    // const [, setArgs] = useArgs<CheckboxProps>()

    return (
      <Checkbox
        {...args}
        onChange={(e) => {
          args.onChange?.(e) // keep Actions working
          // setArgs({ checked: e.currentTarget.checked })
        }}
      />
    )
  },
}

export const Disabled: Story = {
  args: {
    disabled: true,
    checked: true,
    label: "Disabled checked",
  },
}

export const Sizes: Story = {
  render: () => (
    <div style={{ display: "grid", gap: 12 }}>
      <Checkbox size="sm" label="Small" />
      <Checkbox size="md" label="Medium" />
      <Checkbox size="lg" label="Large" />
    </div>
  ),
}
