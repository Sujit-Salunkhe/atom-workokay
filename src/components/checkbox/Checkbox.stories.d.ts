import type { Meta, StoryObj } from "@storybook/react";
import { Checkbox } from "./Checkbox";
declare const meta: Meta<typeof Checkbox>;
export default meta;
type Story = StoryObj<typeof Checkbox>;
/**
 * Controlled story: clicking updates Storybook Controls (checked).
 */
export declare const Playground: Story;
export declare const Disabled: Story;
export declare const Sizes: Story;
