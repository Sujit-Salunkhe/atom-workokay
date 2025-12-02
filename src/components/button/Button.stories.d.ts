import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "./Button";
declare const meta: Meta<typeof Button>;
export default meta;
type Story = StoryObj<typeof Button>;
export declare const Primary: Story;
export declare const Secondary: Story;
export declare const Ghost: Story;
export declare const Success: Story;
export declare const Danger: Story;
export declare const Warning: Story;
export declare const Info: Story;
/** ✅ Now uses args, so Actions panel logs clicks */
export declare const Sizes: Story;
/** ✅ Now uses args, so Actions panel logs clicks for icon buttons too */
export declare const IconButtons: Story;
export declare const FullWidth: Story;
export declare const AsChildLink: Story;
export declare const KeyboardFocus: Story;
/** ✅ Toggle example now calls args.onClick so Actions logs too */
export declare const ToggleExample: Story;
