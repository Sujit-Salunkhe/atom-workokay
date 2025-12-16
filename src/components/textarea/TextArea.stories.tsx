// src/components/ui/textarea.stories.tsx
import type { Meta, StoryObj } from "@storybook/react"
import { Textarea, type TextareaProps } from "./TextArea"

const meta: Meta<typeof Textarea> = {
  title: "Components/Textarea",
  component: Textarea,
  args: {
    placeholder: "Type something…",
  },
}
export default meta

type Story = StoryObj<typeof Textarea>

/* Basic stories */

export const Default: Story = {
  args: {
    variant: "default",
  },
}

export const Outline: Story = {
  args: {
    variant: "outline",
    placeholder: "Outline textarea",
  },
}

export const Subtle: Story = {
  args: {
    variant: "subtle",
    placeholder: "Subtle textarea",
  },
}

export const Danger: Story = {
  args: {
    variant: "danger",
    "aria-invalid": true,
    placeholder: "Danger / error textarea",
  } as TextareaProps,
}

/* Sizes in one story */

const SizesDemo = (props: TextareaProps) => (
  <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
    <Textarea {...props} size="sm" placeholder="Small textarea" />
    <Textarea {...props} size="md" placeholder="Medium textarea" />
    <Textarea {...props} size="lg" placeholder="Large textarea" />
  </div>
)

export const Sizes: Story = {
  args: {
    variant: "default",
  },
  render: (args) => <SizesDemo {...args} />,
}

