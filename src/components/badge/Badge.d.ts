import * as React from 'react';
import { type VariantProps } from 'class-variance-authority';
/**
 * BASE BADGE CVA
 * Consistent with Button’s architecture and naming conventions
 */
export declare const badgeVariants: (props?: ({
    priority?: "high" | "medium" | "low" | null | undefined;
    status?: "validated" | "incoming" | "quarantined" | "failed" | "archieved" | "info" | null | undefined;
    withIcon?: boolean | null | undefined;
    size?: "sm" | "md" | "lg" | null | undefined;
    fullWidth?: boolean | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
/** EXPORTED UNIONS FOR PUBLIC API (Very important for library devs) */
export type BadgePriority = 'high' | 'medium' | 'low';
export type BadgeStatus = 'validated' | 'incoming' | 'quarantined' | 'failed' | 'archieved' | 'info';
export type BadgeSize = 'sm' | 'md' | 'lg';
export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement>, VariantProps<typeof badgeVariants> {
    asChild?: boolean;
}
/**
 * FINAL BADGE COMPONENT
 */
export declare const Badge: React.ForwardRefExoticComponent<BadgeProps & React.RefAttributes<HTMLSpanElement>>;
