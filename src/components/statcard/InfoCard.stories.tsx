// src/components/ui/info-card.stories.tsx
import type { Meta, StoryObj } from "@storybook/react"
import { InfoCard } from "./InfoCard"

const meta: Meta<typeof InfoCard> = {
  title: "Components/InfoCard",
  component: InfoCard,
  args: {
    variant: "primary",
    order: "col",
    size: "sm",
    info: 42,
    label: "Jobs",
    asChild: false,
  },
  argTypes: {
    variant: { control: "select", options: ["primary", "secondary", "success"] },
    order: { control: "select", options: ["row", "col", "rowR", "colR"] },
    size: { control: "select", options: ["xs", "sm", "md", "lg"] },
    info: { control: "text" },
    label: { control: "text" },
    asChild: { control: "boolean" },
    // usually not controlled in stories:
    className: { control: false },
  },
  decorators: [
    (Story) => (
      // Wrap with your theme root so CSS vars exist.
      <div className="atom-theme" data-theme="light" style={{ padding: 16 }}>
        <Story />
      </div>
    ),
  ],
}
export default meta

type Story = StoryObj<typeof InfoCard>

export const Playground: Story = {
  render: (args) => <InfoCard {...args} />,
}

export const Variants: Story = {
  args: { order: "col", size: "sm", info: 128, label: "Label" },
  render: (args) => (
    <div style={{ display: "flex", gap: 12, flexWrap: "wrap", padding: 16 }}>
      <InfoCard {...args} variant="primary" label="Primary" info={128} />
      <InfoCard {...args} variant="secondary" label="Secondary" info={64} />
      <InfoCard {...args} variant="success" label="Success" info={32} />
    </div>
  ),
}

export const Sizes: Story = {
  args: { variant: "primary", order: "col", label: "Jobs", info: 42 },
  render: (args) => (
    <div style={{ display: "flex", gap: 12, flexWrap: "wrap", padding: 16 }}>
      <InfoCard {...args} size="xs" />
      <InfoCard {...args} size="sm" />
      <InfoCard {...args} size="md" />
      <InfoCard {...args} size="lg" />
    </div>
  ),
}

export const Orders: Story = {
  args: { variant: "secondary", size: "md", label: "Open", info: 12 },
  render: (args) => (
    <div style={{ display: "grid", gap: 12, padding: 16 }}>
      <InfoCard {...args} order="row" />
      <InfoCard {...args} order="rowR" />
      <InfoCard {...args} order="col" />
      <InfoCard {...args} order="colR" />
    </div>
  ),
}

export const DarkTheme: Story = {
  args: { variant: "primary", order: "col", size: "md", label: "Jobs", info: 99 },
  decorators: [
    (Story) => (
      <div className="atom-theme" data-theme="dark" style={{ padding: 16 }}>
        <Story />
      </div>
    ),
  ],
  render: (args) => <InfoCard {...args} />,
}

export const AsChildLink: Story = {
  args: {
    asChild: true,
    variant: "primary",
    order: "col",
    size: "sm",
    label: "Clickable",
    info: "12",
  },
  render: (args) => (
    <InfoCard {...args}>
      <a
        href="https://example.com"
        target="_blank"
        rel="noreferrer"
        style={{ textDecoration: "none" }}
      />
    </InfoCard>
  ),
}
