import * as React from 'react';
import { type VariantProps } from 'class-variance-authority';
/**
 * Priority Stat Card (row style)
 * Example: "High Priority   [ 6 ]"
 */
export declare const statCardPriorityVariants: (props?: ({
    variant?: "high" | "medium" | "low" | "primary" | "neutral" | null | undefined;
    size?: "sm" | "md" | "lg" | null | undefined;
    appearance?: "ghost" | "soft" | "outlined" | "elevated" | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
export type StatCardPriorityVariant = 'primary' | 'high' | 'medium' | 'low' | 'neutral';
export type StatCardPrioritySize = 'sm' | 'md' | 'lg';
export type StatCardPriorityAppearance = 'elevated' | 'outlined' | 'ghost' | 'soft';
export interface StatCardPriorityProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof statCardPriorityVariants> {
    /** Label like "High Priority" */
    label: string;
    /** Numeric value on the right pill */
    value: React.ReactNode;
    /** Optional icon inside the pill (e.g. trend arrow) */
    pillIcon?: React.ReactNode;
    /** Render as child via Slot */
    asChild?: boolean;
}
export declare const StatCardPriority: React.ForwardRefExoticComponent<StatCardPriorityProps & React.RefAttributes<HTMLDivElement>>;
