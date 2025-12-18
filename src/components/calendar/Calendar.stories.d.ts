import type { StoryObj } from "@storybook/react";
import { DobDatePicker } from "./Calendar";
declare const meta: {
    title: string;
    component: typeof DobDatePicker;
    parameters: {
        layout: string;
    };
    argTypes: {
        onChange: {
            action: string;
        };
    };
};
export default meta;
type Story = StoryObj<typeof meta>;
export declare const Default: Story;
export declare const Empty: Story;
