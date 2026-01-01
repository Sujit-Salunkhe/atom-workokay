// src/components/ui/heading.stories.tsx
import type { Meta, StoryObj } from "@storybook/react-vite"
import { Heading } from "./Heading"

const meta: Meta<typeof Heading> = {
  title: "Components/Heading",
  component: Heading,
  args: {
    as: "h2",
    size: "md",
    weight: "medium",
    asChild: false,
    children: "Heading text",
  },
  argTypes: {
    as: { control: "select", options: ["h1", "h2", "h3", "h4", "h5", "h6"] },
    size: { control: "select", options: ["xs", "sm", "md", "lg", "xl","none"] },
    weight: { control: "select", options: ["normal", "medium", "bold"] },
    asChild: { control: "boolean" },
    children: { control: "text" },
  },
}
export default meta

type Story = StoryObj<typeof Heading>

export const Playground: Story = {
  render: (args) => (
    <div style={{ padding: 16 }}>
      <Heading {...args} />
    </div>
  ),
}

export const AllHeadingLevels: Story = {
  args: { size: undefined, weight: undefined }, // show default size/weight from the heading tag styles
  render: () => (
    <div style={{ display: "grid", gap: 12, padding: 16 }}>
      <Heading as="h1">H1 Heading</Heading>
      <Heading as="h2">H2 Heading</Heading>
      <Heading as="h3">H3 Heading</Heading>
      <Heading as="h4">H4 Heading</Heading>
      <Heading as="h5">H5 Heading</Heading>
      <Heading as="h6">H6 Heading</Heading>
    </div>
  ),
}

export const Sizes: Story = {
  args: { as: "h3" },
  render: (args) => (
    <div style={{ display: "grid", gap: 12, padding: 16 }}>
      <Heading {...args} size="xs">Size xs</Heading>
      <Heading {...args} size="sm">Size sm</Heading>
      <Heading {...args} size="md">Size md</Heading>
      <Heading {...args} size="lg">Size lg</Heading>
      <Heading {...args} size="xl">Size xl</Heading>
    </div>
  ),
}

export const Weights: Story = {
  args: { as: "h3", size: "lg" },
  render: (args) => (
    <div style={{ display: "grid", gap: 12, padding: 16 }}>
      <Heading {...args} weight="normal">Weight normal (400)</Heading>
      <Heading {...args} weight="medium">Weight medium (500)</Heading>
      <Heading {...args} weight="bold">Weight bold (700)</Heading>
    </div>
  ),
}

export const AsChildLink: Story = {
  args: {
    as: "h3",
    asChild: true,
    size: "lg",
    weight: "bold",
  },
  render: (args) => (
    <div style={{ padding: 16 }}>
      <Heading {...args}>
        <a href="https://example.com" target="_blank" rel="noreferrer">
          asChild link (Slot)
        </a>
      </Heading>
    </div>
  ),
}
