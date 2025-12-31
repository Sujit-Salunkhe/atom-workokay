import * as React from 'react';
import { type VariantProps } from 'class-variance-authority';
declare const textareaVariants: (props?: ({
    variant?: "default" | "subtle" | "outline" | null | undefined;
    size?: "sm" | "md" | "lg" | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
export type TextareaVariant = NonNullable<VariantProps<typeof textareaVariants>['variant']>;
export type TextareaSize = NonNullable<VariantProps<typeof textareaVariants>['size']>;
export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement>, VariantProps<typeof textareaVariants> {
    placeholder?: string;
}
/**
 * Variant-aware Textarea
 */
export declare const Textarea: React.ForwardRefExoticComponent<TextareaProps & React.RefAttributes<HTMLTextAreaElement>>;
export {};
