import * as React from 'react';
import { type VariantProps } from 'class-variance-authority';
declare const headingVariants: (props?: ({
    variant?: "info" | "error" | "primary" | "success" | "warning" | "secondary" | "disabled" | "neutral" | "tertiary" | null | undefined;
    size?: "sm" | "md" | "lg" | "none" | "xs" | "xl" | null | undefined;
    weight?: "medium" | "none" | "bold" | "normal" | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
export interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement>, VariantProps<typeof headingVariants> {
    asChild?: boolean;
    size?: 'xs' | 'sm' | 'md' | 'xl' | 'lg' | 'none';
}
export declare const Text: React.ForwardRefExoticComponent<HeadingProps & React.RefAttributes<HTMLHeadingElement>>;
export {};
