import * as React from 'react';
import * as SwitchPrimitive from '@radix-ui/react-switch';
import { type VariantProps } from 'class-variance-authority';
/**
 * SWITCH VARIANTS
 * - variant: semantic tone (primary / success / warning / danger / info / neutral)
 * - size: thumb/track size
 * - fullWidth: allow stretching in flex layouts (optional)
 */
export declare const switchVariants: (props?: ({
    variant?: "info" | "primary" | "success" | "danger" | "warning" | "neutral" | null | undefined;
    size?: "sm" | "md" | "lg" | null | undefined;
    fullWidth?: boolean | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
export type SwitchVariant = 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'neutral';
export type SwitchSize = 'sm' | 'md' | 'lg';
export interface SwitchProps extends React.ComponentPropsWithoutRef<typeof SwitchPrimitive.Root>, VariantProps<typeof switchVariants> {
}
/**
 * FINAL SWITCH COMPONENT
 */
export declare const Switch: React.ForwardRefExoticComponent<SwitchProps & React.RefAttributes<HTMLButtonElement>>;
