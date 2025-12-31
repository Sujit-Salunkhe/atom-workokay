// src/components/ui/progress-bar.stories.tsx
import type { Meta, StoryObj } from "@storybook/react"
import { ProgressBar } from "./Progressbar"

const meta: Meta<typeof ProgressBar> = {
  title: "Components/ProgressBar",
  component: ProgressBar,
  args: {
    value: 45,
    indeterminate: false,
    ariaLabel: "Progress",
    variant: "default",
    size: "sm",
    fullWidth: true,
  },
  argTypes: {
    value: { control: { type: "range", min: 0, max: 100, step: 1 } },
    indeterminate: { control: "boolean" },
    ariaLabel: { control: "text" },

    variant: {
      control: "select",
      options: ["default", "outline", "subtle"],
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
    fullWidth: { control: "boolean" },
  },
}
export default meta

type Story = StoryObj<typeof ProgressBar>

export const Playground: Story = {
  render: (args) => (
    <div style={{ width: 320 }}>
      <ProgressBar {...args} />
    </div>
  ),
}

export const Variants: Story = {
  render: (args) => (
    <div style={{ width: 320, display: "grid", gap: 12 }}>
      <ProgressBar {...args} variant="default" value={30} />
      <ProgressBar {...args} variant="outline" value={60} />
      <ProgressBar {...args} variant="subtle" value={90} />
    </div>
  ),
}

export const Sizes: Story = {
  args: { variant: "default", value: 60 },
  render: (args) => (
    <div style={{ width: 320, display: "grid", gap: 12 }}>
      <ProgressBar {...args} size="sm" />
      <ProgressBar {...args} size="md" />
      <ProgressBar {...args} size="lg" />
    </div>
  ),
}

export const Indeterminate: Story = {
  args: {
    indeterminate: true,
    value: 40, // ignored visually in your component, but ok to keep
    variant: "default",
  },
  render: (args) => (
    <div style={{ width: 320 }}>
      <ProgressBar {...args} />
    </div>
  ),
}
