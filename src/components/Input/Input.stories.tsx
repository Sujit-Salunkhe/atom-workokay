// src/components/ui/input.stories.tsx
import type { Meta, StoryObj } from "@storybook/react"
// import { useArgs } from "@storybook/preview-api"
import { Input} from "./Input"

const meta: Meta<typeof Input> = {
  title: "Input/Input",
  component: Input,
  args: {
    size: "md",
    tone: "default",
    placeholder: "Type here…",
    value: "",
    disabled: false,
    readOnly: false,
    loading: false,
    hint: "",
    errorText: "",
    leftIcon: undefined,
    rightIcon: undefined,
  },
  argTypes: {
    size: { control: "select", options: ["sm", "md", "lg"] },
    tone: { control: "select", options: ["default", "invalid", "success"] },

    value: { control: "text" },
    placeholder: { control: "text" },
    disabled: { control: "boolean" },
    readOnly: { control: "boolean" },
    loading: { control: "boolean" },

    hint: { control: "text" },
    errorText: { control: "text" },

    // icons are ReactNodes -> don’t try to control directly
    leftIcon: { control: false, table: { disable: true } },
    rightIcon: { control: false, table: { disable: true } },

    onChange: { action: "onChange" },
  },
}
export default meta

type Story = StoryObj<typeof Input>



export const WithHint: Story = {
  args: {
    hint: "This will be shown below the input and announced via aria-describedby.",
  },
  render: (args) => (
    <div style={{ width: 360 }}>
      <Input {...args} />
    </div>
  ),
}

export const InvalidWithError: Story = {
  args: {
    tone: "invalid",
    value: "wrong@email",
    errorText: "Please enter a valid email address.",
  },
  render: (args) => (
    <div style={{ width: 360 }}>
      <Input {...args} />
    </div>
  ),
}

export const Success: Story = {
  args: {
    tone: "success",
    value: "Looks good",
    hint: "Saved successfully.",
  },
  render: (args) => (
    <div style={{ width: 360 }}>
      <Input {...args} />
    </div>
  ),
}

export const Loading: Story = {
  args: {
    loading: true,
    value: "Fetching…",
  },
  render: (args) => (
    <div style={{ width: 360 }}>
      <Input {...args} />
    </div>
  ),
}

export const WithIcons: Story = {
  args: {
    placeholder: "Search…",
  },
  render: (args) => (
    <div style={{ width: 360 }}>
      <Input
        {...args}
        leftIcon={
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <circle cx="11" cy="11" r="7" strokeWidth="2" />
            <path d="M20 20l-3.5-3.5" strokeWidth="2" strokeLinecap="round" />
          </svg>
        }
        rightIcon={
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M6 12h12" strokeWidth="2" strokeLinecap="round" />
          </svg>
        }
      />
    </div>
  ),
}

export const Disabled: Story = {
  args: {
    disabled: true,
    value: "Disabled",
  },
  render: (args) => (
    <div style={{ width: 360 }}>
      <Input {...args} />
    </div>
  ),
}

export const ReadOnly: Story = {
  args: {
    readOnly: true,
    value: "This is Read-only",
  },
  render: (args) => (
    <div style={{ width: 360 }}>
      <Input {...args} />
    </div>
  ),
}
