// Calendar.stories.tsx
import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { within, userEvent, expect } from "storybook/test";
import { Calendar } from "./Calendar";
import type { DateRange } from "react-day-picker";

const meta = {
  title: "Components/Calendar",
  component: Calendar,
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
} satisfies Meta<typeof Calendar>;

export default meta;
type Story = StoryObj<typeof meta>;

// Wrapper to handle state in stories
function ControlledCalendar(
  args: React.ComponentProps<typeof Calendar>
) {
  const [date, setDate] = React.useState<Date | undefined>(
    new Date(2025, 11, 19)
  );

  return (
    <div>
      <Calendar
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

// Date range picker - RENAMED to avoid conflict
export const RangePicker: Story = {
  render: (args) => {
    const [range, setRange] = React.useState<DateRange | undefined>({
      from: new Date(2025, 11, 15),
      to: new Date(2025, 11, 22),
    });

    return (
      <div>
        <Calendar
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

// Disabled dates example
export const DisabledDates: Story = {
  render: (args) => {
    const [date, setDate] = React.useState<Date | undefined>();

    // Disable weekends
    const disabledDays = { dayOfWeek: [0, 6] };

    return (
      <div>
        <Calendar
          {...args}
          mode="single"
          selected={date}
          onSelect={setDate}
          disabled={disabledDays}
        />
        <div className="mt-4 text-sm text-muted-foreground">
          Selected: {date ? date.toLocaleDateString() : "none"}
          <br />
          <span className="text-xs">Weekends are disabled</span>
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

// Min/Max date example
export const MinMaxDates: Story = {
  render: (args) => {
    const [date, setDate] = React.useState<Date | undefined>();
    const today = new Date();
    const nextMonth = new Date(today.getFullYear(), today.getMonth() + 1, today.getDate());

    return (
      <div>
        <Calendar
          {...args}
          mode="single"
          selected={date}
          onSelect={setDate}
          fromDate={today}
          toDate={nextMonth}
        />
        <div className="mt-4 text-sm text-muted-foreground">
          Selected: {date ? date.toLocaleDateString() : "none"}
          <br />
          <span className="text-xs">Only next 30 days available</span>
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
