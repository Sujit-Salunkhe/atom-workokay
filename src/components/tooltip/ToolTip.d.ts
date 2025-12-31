import * as React from 'react';
import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import { type VariantProps } from 'class-variance-authority';
/**
 * Tooltip content variants
 * - variant: visual style (default/soft/solid/outline)
 * - size: padding + font size
 * - tone: optional semantic border accent
 * - showArrow: toggle arrow (styling hook)
 */
declare const tooltipContentVariants: (props?: ({
    variant?: "primary" | "solid" | "outline" | "soft" | null | undefined;
    size?: "sm" | "md" | "lg" | null | undefined;
    showArrow?: boolean | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
export type TooltipVariant = NonNullable<VariantProps<typeof tooltipContentVariants>['variant']>;
export type TooltipSize = NonNullable<VariantProps<typeof tooltipContentVariants>['size']>;
type RadixTooltipContentProps = React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>;
export interface TooltipProps extends Omit<RadixTooltipContentProps, 'content'>, VariantProps<typeof tooltipContentVariants> {
    /** Text or React node to render inside the tooltip */
    content: React.ReactNode;
    /** Trigger element */
    children: React.ReactNode;
}
/**
 * Tooltip composed component:
 * - Wraps Radix TooltipProvider / Root / Trigger / Content
 * - Uses CVA for appearance variants
 */
export declare function Tooltip({ children, content, variant, size, showArrow, className, side, align, sideOffset, ...props }: TooltipProps): import("react/jsx-runtime").JSX.Element;
export {};
