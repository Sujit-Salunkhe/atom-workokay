import type { Meta, StoryObj } from "@storybook/react";
import React from "react";


import { DobDatePicker } from "./Calendar";

const meta = {
  title: "Components/DobDatePicker",
  component: DobDatePicker,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    onChange: { action: "onChange" },
  },
} satisfies Meta<typeof DobDatePicker>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Controlled wrapper so Storybook shows selection changes when user clicks a date.
 */
function Controlled(args: React.ComponentProps<typeof DobDatePicker>) {
  const [value, setValue] = React.useState<Date | undefined>(
    // args.value ?? new Date(2025, 11, 4) // Dec 4, 2025
  );

  return (
    <div style={{ width: 320 }}>
      <DobDatePicker
        {...args}
        value={value}
        onChange={(d) => {
          setValue(d);
          args.onChange?.(d);
        }}
      />
      <div style={{ marginTop: 10, fontSize: 12, color: "#626468" }}>
        Selected: {value ? value.toDateString() : "none"}
      </div>
    </div>
  );
}

export const Default: Story = {
  render: (args) => <Controlled {...args} />,
  args: {
    placeholder: "Select Start Date",
    value: new Date(2025, 11, 4),
    icon:true,
  },
};

export const Empty: Story = {
  render: (args) => <Controlled {...args} />,
  args: {
    placeholder: "mm/dd/yyyy",
    value: undefined,
  },
};


