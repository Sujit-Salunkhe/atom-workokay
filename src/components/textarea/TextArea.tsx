// src/components/ui/textarea.tsx
import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from '../../lib/cn'

const textareaVariants = cva(
  "resize-none border-input placeholder:text-muted-foreground " +
  "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 " +
  "aria-invalid:border-destructive dark:bg-input/30 " +
  "flex field-sizing-content min-h-16 w-full rounded-md border " +
  "bg-input-background px-3 py-2 text-base transition-[color,box-shadow,border-color] " +
  "outline-none disabled:cursor-not-allowed " +
  "disabled:opacity-50 md:text-sm " +
  "border-[var(--atom-badge-archived-border)] " +
  "focus-visible:border-[color-mix(in_srgb,var(--atom-badge-archived-border)_82%,transparent)" ,
  {
    variants: {
      variant: {
        default: "",
        outline: "bg-transparent",
        subtle: "bg-input-background/60",
        danger: "border-[var(--atom-error)]",
      },
      size: {
        sm: "min-h-10 px-2 py-1 text-xs w-64",
        md: "min-h-16 px-3 py-2 text-sm w-80",
        lg: "min-h-24 px-4 py-3 text-base w-96",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
)

export type TextareaVariant = NonNullable<
  VariantProps<typeof textareaVariants>["variant"]
>
export type TextareaSize = NonNullable<
  VariantProps<typeof textareaVariants>["size"]
>

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    VariantProps<typeof textareaVariants> {}

/**
 * Variant-aware Textarea
 */
export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        data-slot="textarea"
        className={cn(textareaVariants({ variant, size }), className)}
        {...props}
      />
    )
  }
)

Textarea.displayName = "Textarea"
