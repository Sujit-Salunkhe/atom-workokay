import type { Meta, StoryObj } from '@storybook/react';
import { Skeleton } from './Skeleton';
declare const meta: Meta<typeof Skeleton>;
export default meta;
type Story = StoryObj<typeof Skeleton>;
/**
 * Single skeleton block with controls.
 */
export declare const Default: Story;
/**
 * Common text layout: title + 2 lines.
 */
export declare const TextLines: Story;
/**
 * Card-like skeleton (header + body).
 */
export declare const Card: Story;
/**
 * Avatar + text skeleton (common for list items).
 */
export declare const AvatarWithText: Story;
/**
 * Full-width skeleton bar (e.g. for table header).
 */
export declare const FullWidthBar: Story;
