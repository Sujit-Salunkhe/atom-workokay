import * as React from "react";
export type ButtonVariant = "primary" | "ghost" | "success" | "danger" | "warning" | "info" | "icon" | "iconGhost" | "iconSquare" | "iconSquareGhost" | "secondary";
export type ButtonSize = "sm" | "md" | "lg";
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    /** Render as child element via Radix Slot (e.g. <a>, <Link>) */
    asChild?: boolean;
    /** Enable/disable ripple ink (true by default) */
    ripple?: boolean;
    /** Optional toggle state hint for styling */
    "data-pressed"?: "on" | "off" | boolean;
    variant?: ButtonVariant;
    size?: ButtonSize;
    fullWidth?: boolean;
}
export declare const Button: React.ForwardRefExoticComponent<ButtonProps & React.RefAttributes<HTMLButtonElement>>;
