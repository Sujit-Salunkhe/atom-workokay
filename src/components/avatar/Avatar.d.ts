import * as React from 'react';
import { type VariantProps } from 'class-variance-authority';
/**
 * Avatar base styles:
 * - circular by default
 * - center initials
 * - uses CSS vars for colors
 */
export declare const avatarVariants: (props?: ({
    variant?: "info" | "primary" | "success" | "danger" | "warning" | "neutral" | "accent" | null | undefined;
    appearance?: "ghost" | "subtle" | "solid" | "outline" | "soft" | null | undefined;
    shape?: "circle" | "square" | "pill" | null | undefined;
    size?: "sm" | "md" | "lg" | null | undefined;
    fullWidth?: boolean | null | undefined;
    withRing?: boolean | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
export type AvatarStatus = 'neutral' | 'success' | 'warning' | 'danger' | 'info' | 'accent';
export type AvatarAppearance = 'subtle' | 'solid' | 'outline' | 'ghost' | 'soft';
export type AvatarSize = 'sm' | 'md' | 'lg';
export type AvatarShape = 'circle' | 'square' | 'pill';
export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof avatarVariants> {
    /** Render via Radix Slot (e.g. wrap an <img> or <Link>) */
    asChild?: boolean;
    /** Initials or fallback text when no image is provided */
    initials?: string;
    /** Optional image source; if provided you can layer an <img> */
    src?: string;
    /** Accessible label if you hide the text */
    'aria-label'?: string;
}
export declare const Avatar: React.ForwardRefExoticComponent<AvatarProps & React.RefAttributes<HTMLDivElement>>;
