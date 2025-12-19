// CalendarTest.stories.tsx
import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { within, userEvent, expect } from "storybook/test";
import { CalendarTest } from "./CalendarTest";

const meta = {
  title: "Components/CalendarTest",
  component: CalendarTest,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    captionLayout: {
      control: "select",
      options: ["label", "dropdown", "dropdown-months", "dropdown-years"],
    },
    buttonVariant: {
      control: "select",
      options: ["ghost", "outline", "default"],
    },
    showOutsideDays: {
      control: "boolean",
    },
  },
} satisfies Meta<typeof CalendarTest>;

export default meta;
type Story = StoryObj<typeof meta>;

// Wrapper to handle state in stories
function ControlledCalendar(
  args: React.ComponentProps<typeof CalendarTest>
) {
  const [date, setDate] = React.useState<Date | undefined>(
    new Date(2025, 11, 19)
  );

  return (
    <div>
      <CalendarTest
        {...args}
        mode="single"
        selected={date}
        onSelect={setDate}
      />
      <div className="mt-4 text-sm text-muted-foreground">
        Selected: {date ? date.toLocaleDateString() : "none"}
      </div>
    </div>
  );
}

// Default single date picker with dropdown
export const Default: Story = {
  render: (args) => <ControlledCalendar {...args} />,
  args: {
    captionLayout: "dropdown",
    buttonVariant: "ghost",
    showOutsideDays: true,
  },
};

// With label caption layout (month/year navigation arrows only)
export const LabelLayout: Story = {
  render: (args) => <ControlledCalendar {...args} />,
  args: {
    captionLayout: "label",
    buttonVariant: "ghost",
    showOutsideDays: true,
  },
};

// With outline button variant
export const OutlineButtons: Story = {
  render: (args) => <ControlledCalendar {...args} />,
  args: {
    captionLayout: "dropdown",
    buttonVariant: "outline",
    showOutsideDays: true,
  },
};

// Date range picker
export const DateRange: Story = {
  render: (args) => {
    const [range, setRange] = React.useState<{
      from?: Date;
      to?: Date;
    }>({
      from: new Date(2025, 11, 15),
      to: new Date(2025, 11, 22),
    });

    return (
      <div>
        <CalendarTest
          {...args}
          mode="range"
          selected={range}
          onSelect={setRange}
        />
        <div className="mt-4 text-sm text-muted-foreground">
          From: {range?.from?.toLocaleDateString() || "none"} <br />
          To: {range?.to?.toLocaleDateString() || "none"}
        </div>
      </div>
    );
  },
  args: {
    captionLayout: "dropdown",
    buttonVariant: "ghost",
    showOutsideDays: true,
  },
};

// With custom styling (your CSS variables)
export const CustomStyling: Story = {
  render: (args) => <ControlledCalendar {...args} />,
  args: {
    captionLayout: "label",
    buttonVariant: "ghost",
    showOutsideDays: true,
    className:
      "p-3 bg-[var(--atom-card-bg)] text-[var(--atom-info-card-jobstatus-primary-text)] rounded-[calc(var(--atom-radius-2)-2px)] border shadow-md w-[208px]",
  },
};

// Without outside days
export const NoOutsideDays: Story = {
  render: (args) => <ControlledCalendar {...args} />,
  args: {
    captionLayout: "dropdown",
    buttonVariant: "ghost",
    showOutsideDays: false,
  },
};

// Interaction test: click to select a date
export const InteractiveSelection: Story = {
  render: (args) => <ControlledCalendar {...args} />,
  args: {
    captionLayout: "dropdown",
    buttonVariant: "ghost",
    showOutsideDays: true,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Wait for calendar to render
    const calendar = await canvas.findByRole("application");
    expect(calendar).toBeInTheDocument();

    // Find a specific date button (day 25)
    const buttons = canvas.getAllByRole("button");
    const dayButton = buttons.find((btn) =>
      btn.textContent?.includes("25")
    );

    if (dayButton) {
      await userEvent.click(dayButton);
      // After click, the button should have data-selected-single attribute
      expect(dayButton).toHaveAttribute("data-selected-single");
    }
  },
};

// Multiple months
export const MultipleMonths: Story = {
  render: (args) => <ControlledCalendar {...args} />,
  args: {
    captionLayout: "dropdown",
    buttonVariant: "ghost",
    showOutsideDays: true,
    numberOfMonths: 2,
  },
};
