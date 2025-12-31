import * as React from "react";
import { type VariantProps } from "class-variance-authority";
declare const skeletonVariants: (props?: ({
    variant?: "default" | "circle" | "rounded" | "card" | null | undefined;
    size?: "sm" | "md" | "lg" | "full" | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof skeletonVariants> {
}
export declare function Skeleton({ className, variant, size, ...props }: SkeletonProps): import("react/jsx-runtime").JSX.Element;
export {};
