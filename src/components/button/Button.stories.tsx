import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "./Button";
import ProfileCircle from "../../assets/icons/ProfileCircle";


const meta: Meta<typeof Button> = {
  title: "Components/Button",
  component: Button,
  args: {
    children: "Click me",
    variant: "primary",
    size: "md",
    fullWidth: false,
    ripple: true,
  },
  argTypes: {
    variant: {
      control: "select",
      options: [
        "primary",
        "secondary",
        "ghost",
        "success",
        "danger",
        "warning",
        "info",
        "icon",
        "iconGhost",
        "iconSquare",
        "iconSquareGhost",
      ],
    },
    size: {
      control: "inline-radio",
      options: ["sm", "md", "lg"],
    },
    fullWidth: { control: "boolean" },
    ripple: { control: "boolean" },
    asChild: { control: "boolean" },
    onClick: {
      action: "clicked",
    },
  },
  parameters: {
    layout: "centered",
    controls: { expanded: true },
  },
};
export default meta;

type Story = StoryObj<typeof Button>;

export const Primary: Story = { args: { variant: "primary" } };
export const Secondary: Story = { args: { variant: "secondary" } };
export const Ghost: Story = { args: { variant: "ghost" } };

export const Success: Story = {
  args: { variant: "success", children: "Success" },
};

export const Danger: Story = {
  args: { variant: "danger", children: "Delete" },
};

export const Warning: Story = {
  args: { variant: "warning", children: "Warning" },
};

export const Info: Story = {
  args: { variant: "info", children: "Info" },
};

/** ✅ Now uses args, so Actions panel logs clicks */
export const Sizes: Story = {
  render: (args) => (
    <div className="flex items-center gap-3">
      <Button {...args} size="sm">
        Small
      </Button>
      <Button {...args} size="md">
        Medium
      </Button>
      <Button {...args} size="lg">
        Large
      </Button>
    </div>
  ),
};

/** ✅ Now uses args, so Actions panel logs clicks for icon buttons too */
export const IconButtons: Story = {
  render: (args) => (
    <div className="flex gap-4">
      <Button
        {...args}
        variant="icon"
        size="md"
        aria-label="Profile circular"
      >
        <ProfileCircle className="w-5 h-5" />
      </Button>
      <Button
        {...args}
        variant="iconSquare"
        size="md"
        aria-label="Profile square"
      >
        <ProfileCircle className="w-5 h-5" />
      </Button>
      <Button
        {...args}
        variant="iconGhost"
        size="md"
        aria-label="Profile ghost"
      >
        <ProfileCircle className="w-5 h-5" />
      </Button>
    </div>
  ),
};

export const FullWidth: Story = {
  args: { fullWidth: true, children: "Full width" },
};

export const AsChildLink: Story = {
  render: () => (
    <Button asChild>
      <a href="#settings">Go to Settings</a>
    </Button>
  ),
};

export const KeyboardFocus: Story = {
  args: { children: "Focusable" },
  play: async ({ canvasElement }) => {
    const button = canvasElement.querySelector("button");
    if (button instanceof HTMLButtonElement) {
      button.focus();
    }
  },
};

/** ✅ Toggle example now calls args.onClick so Actions logs too */
export const ToggleExample: Story = {
  render: (args) => {
    const [pressed, setPressed] = React.useState(false);
    return (
      <Button
        {...args}
        variant={pressed ? "secondary" : "primary"}
        aria-pressed={pressed}
        data-pressed={pressed ? "on" : "off"}
        onClick={(event) => {
          // log to Actions
          args.onClick?.(event);
          // update local state
          setPressed((p) => !p);
        }}
      >
        {pressed ? "On" : "Off"}
      </Button>
    );
  },
};
