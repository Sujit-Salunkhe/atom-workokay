import * as React from 'react';
import { type VariantProps } from 'class-variance-authority';
export declare const separatorVariants: (props?: ({
    orientation?: "horizontal" | "vertical" | null | undefined;
    inset?: "sm" | "md" | "none" | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
export interface SeparatorProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof separatorVariants> {
}
export declare function Separator({ className, orientation, inset, ...props }: SeparatorProps): import("react/jsx-runtime").JSX.Element;
