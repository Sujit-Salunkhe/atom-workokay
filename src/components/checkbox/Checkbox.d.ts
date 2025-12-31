import * as React from "react";
import { type VariantProps } from "class-variance-authority";
export declare const checkboxVariants: (props?: ({
    size?: "sm" | "md" | "lg" | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
export type CheckboxSize = NonNullable<VariantProps<typeof checkboxVariants>["size"]>;
export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type" | "size">, VariantProps<typeof checkboxVariants> {
    label?: React.ReactNode;
}
export declare const Checkbox: React.ForwardRefExoticComponent<CheckboxProps & React.RefAttributes<HTMLInputElement>>;
