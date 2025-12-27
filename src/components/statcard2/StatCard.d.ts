import * as React from 'react';
import { type VariantProps } from 'class-variance-authority';
export declare const statCardVariants: (props?: ({
    variant?: "info" | "primary" | "success" | "danger" | "warning" | "neutral" | "accent" | null | undefined;
    size?: "sm" | "md" | "lg" | null | undefined;
    appearance?: "ghost" | "soft" | "outlined" | "elevated" | null | undefined;
    fullWidth?: boolean | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
export type StatCardVariant = 'neutral' | 'success' | 'warning' | 'danger' | 'info' | 'accent';
export type StatCardSize = 'sm' | 'md' | 'lg';
export type StatCardAppearance = 'elevated' | 'outlined' | 'ghost' | 'soft';
export interface StatCardProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof statCardVariants> {
    /** Title like "Validated", "Failed" */
    label: string;
    /** Main metric value like 4, 15, 2 */
    value: React.ReactNode;
    /** Optional icon in top-right */
    icon?: React.ReactNode;
    /** Use Slot to render as <a>, <Link>, etc. */
    asChild?: boolean;
}
export declare const StatCard: React.ForwardRefExoticComponent<StatCardProps & React.RefAttributes<HTMLDivElement>>;
