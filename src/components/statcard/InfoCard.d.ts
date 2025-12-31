import * as React from "react";
import { type VariantProps } from "class-variance-authority";
declare const infoCardVariants: (props?: ({
    order?: "row" | "col" | "colR" | "rowR" | null | undefined;
    size?: "sm" | "md" | "lg" | "xs" | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
declare const infoValueVariants: (props?: ({
    variant?: "primary" | "success" | "secondary" | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
export type InfoCardVariant = VariantProps<typeof infoValueVariants>["variant"];
export type InfoCardOrder = VariantProps<typeof infoCardVariants>["order"];
export type InfoCardSize = VariantProps<typeof infoCardVariants>["size"];
export interface InfoCardProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof infoCardVariants> {
    /** Semantic color variant used for both info and label */
    variant?: NonNullable<InfoCardVariant>;
    /** Label text */
    label?: React.ReactNode;
    /** Main info/number */
    info?: React.ReactNode;
    /** Future-proof (kept), currently unused */
    status?: "high" | "medium" | "low";
    /** Render as child using Radix Slot */
    asChild?: boolean;
}
export declare const InfoCard: React.ForwardRefExoticComponent<InfoCardProps & React.RefAttributes<HTMLDivElement>>;
export {};
