// src/components/ui/heading.stories.tsx
import type { Meta, StoryObj } from "@storybook/react"
import { Text } from "./Text"

const meta: Meta<typeof Text> = {
  title: "Components/Text",
  component: Text,
  args: {
    children: "Text text",
    size: "md",
    weight: "medium",
    variant: "primary",
    asChild: false,
  },
  argTypes: {
    children: { control: "text" },

    variant: {
      control: "select",
      options: [
        "primary",
        "secondary",
        "tertiary",
        "neutral",
        "success",
        "error",
        "info",
        "warning",
      ],
    },
    size: { control: "select", options: ["none", "xs", "sm", "md", "lg", "xl"] },
    weight: { control: "select", options: ["normal", "medium", "bold","none"] },
    asChild: { control: "boolean" },
  },
}
export default meta

type Story = StoryObj<typeof Text>

export const Playground: Story = {
  render: (args) => (
    <div style={{ padding: 16 }}>
      <Text {...args} />
    </div>
  ),
}

export const Variants: Story = {
  args: { size: "lg", weight: "bold" },
  render: (args) => (
    <div style={{ display: "grid", gap: 12, padding: 16 }}>
      <Text {...args} variant="primary">Primary</Text>
      <Text {...args} variant="secondary">Secondary</Text>
      <Text {...args} variant="tertiary">Tertiary</Text>
      <Text {...args} variant="neutral">Neutral</Text>
      <Text {...args} variant="success">Success</Text>
      <Text {...args} variant="warning">Warning</Text>
      <Text {...args} variant="info">Info</Text>
      <Text {...args} variant="error">Error</Text>
    </div>
  ),
}

export const Sizes: Story = {
  args: { variant: "neutral", weight: "medium" },
  render: (args) => (
    <div style={{ display: "grid", gap: 12, padding: 16 }}>
      <Text {...args} size="none">Size none (only base styles)</Text>
      <Text {...args} size="xs">Size xs</Text>
      <Text {...args} size="sm">Size sm</Text>
      <Text {...args} size="md">Size md</Text>
      <Text {...args} size="lg">Size lg</Text>
      <Text {...args} size="xl">Size xl</Text>
    </div>
  ),
}

export const Weights: Story = {
  args: { variant: "primary", size: "lg" },
  render: (args) => (
    <div style={{ display: "grid", gap: 12, padding: 16 }}>
      <Text {...args} weight="normal">Weight normal</Text>
      <Text {...args} weight="medium">Weight medium</Text>
      <Text {...args} weight="bold">Weight bold</Text>
    </div>
  ),
}

export const AsChildLink: Story = {
  args: { asChild: true, variant: "primary", size: "lg", weight: "bold" },
  render: (args) => (
    <div style={{ padding: 16 }}>
      <Text {...args}>
        <a href="https://example.com" target="_blank" rel="noreferrer">
          Text rendered as a link (asChild)
        </a>
      </Text>
    </div>
  ),
}
