import * as React from "react";
import { type VariantProps } from "class-variance-authority";
declare const progressTrackVariants: (props?: ({
    trackVariant?: "default" | "subtle" | "outline" | null | undefined;
    size?: "sm" | "md" | "lg" | null | undefined;
    fullWidth?: boolean | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
declare const progressIndicatorVariants: (props?: ({
    indicatorVariant?: "default" | "subtle" | "outline" | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
export type ProgressBarTrackVariant = NonNullable<VariantProps<typeof progressTrackVariants>["trackVariant"]>;
export type ProgressBarIndicatorVariant = NonNullable<VariantProps<typeof progressIndicatorVariants>["indicatorVariant"]>;
export type ProgressBarSize = NonNullable<VariantProps<typeof progressTrackVariants>["size"]>;
export interface ProgressBarProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "children">, VariantProps<typeof progressTrackVariants> {
    /** 0..100 */
    value?: number;
    /** If true, omit aria-valuenow (indeterminate) */
    indeterminate?: boolean;
    /** Optional label for screen readers */
    ariaLabel?: string;
    /** If omitted, indicatorVariant will follow trackVariant */
    variant?: 'default' | 'outline' | 'subtle';
}
export declare function ProgressBar({ className, variant, size, fullWidth, value, indeterminate, ariaLabel, ...props }: ProgressBarProps): import("react/jsx-runtime").JSX.Element;
export {};
