import * as React from "react";
import { type VariantProps } from "class-variance-authority";
declare const buttonVariants: (props?: ({
    variant?: "primary" | "ghost" | "success" | "danger" | "warning" | "info" | "icon" | "iconGhost" | "iconSquare" | "iconSquareGhost" | "secondary" | null | undefined;
    size?: "sm" | "md" | "lg" | null | undefined;
    fullWidth?: boolean | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
    /** Render as child element via Radix Slot (e.g. <a>, <Link>) */
    asChild?: boolean;
    /** Enable/disable ripple ink (true by default) */
    ripple?: boolean;
    /** Optional toggle state hint for styling */
    "data-pressed"?: "on" | "off" | boolean;
}
export declare const Button: React.ForwardRefExoticComponent<ButtonProps & React.RefAttributes<HTMLButtonElement>>;
export {};
