import * as React from 'react';
import { type VariantProps } from 'class-variance-authority';
declare const headingVariants: (props?: ({
    as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | null | undefined;
    size?: "sm" | "md" | "lg" | "none" | "xs" | "xl" | null | undefined;
    weight?: "medium" | "bold" | "normal" | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
export interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement>, VariantProps<typeof headingVariants> {
    as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
    asChild?: boolean;
    size?: 'xs' | 'sm' | 'md' | 'xl' | 'lg';
}
export declare const Heading: React.ForwardRefExoticComponent<HeadingProps & React.RefAttributes<HTMLHeadingElement>>;
export {};
