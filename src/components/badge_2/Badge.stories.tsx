import type { Meta, StoryObj } from "@storybook/react-vite";
import { Badge } from "./Badge";

const meta: Meta<typeof Badge> = {
  title: "Components/Badge",
  component: Badge,
  args: {
    children: "Badge",
    variant: "primary",
    tone: "low",
  },
  argTypes: {
    variant: {
      control: "select",
      options: [
        "primary",
        "secondary",
        "success",
        "warning",
        "danger",
        "info",
        "neutral",
        "accent",
      ],
    },
    tone: {
      control: "select",
      options: ["low", "medium", "high"],
    },
    asChild: { control: "boolean" },
  },
  parameters: {
    layout: "centered",
  },
  decorators: [
    (Story) => (
      // IMPORTANT: tokens are scoped to `.atom-theme`
      // And theme chosen via `data-theme`
      <div className="atom-theme" data-theme="light" style={{ padding: 24 }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof Badge>;

export const Primary: Story = {};

export const SuccessLow: Story = {
  args: { variant: "success", tone: "low", children: "Validated" },
};

export const WarningMedium: Story = {
  args: { variant: "warning", tone: "medium", children: "Quarantined" },
};

export const DangerHigh: Story = {
  args: { variant: "danger", tone: "high", children: "Failed" },
};

export const Neutral: Story = {
  args: { variant: "neutral", tone: "low", children: "Archived" },
};

export const Accent: Story = {
  args: { variant: "accent", tone: "low", children: "Accent" },
};

export const WithIcon: Story = {
  args: {
    variant: "info",
    tone: "low",
    children: (
      <>
        {/* Any icon works - we just demo with a simple SVG */}
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <circle cx="12" cy="12" r="10" fill="currentColor" />
        </svg>
        Info
      </>
    ),
  },
};

export const DarkTheme: Story = {
  decorators: [
    (Story) => (
      <div className="atom-theme" data-theme="dark" style={{ padding: 24 }}>
        <Story />
      </div>
    ),
  ],
  args: { variant: "success", tone: "low", children: "Validated (dark)" },
};