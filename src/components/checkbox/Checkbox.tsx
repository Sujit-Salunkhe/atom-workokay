// src/components/ui/checkbox.tsx
import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "../../lib/cn"
 
 
export const checkboxVariants = cva(
  [
    // base
    "shrink-0 rounded-[var(--atom-radius-1)]",
    "border-[var(--atom-card-border)]",
    "bg-[var(--atom-input-bg)]",
    "transition-[background-color,border-color,box-shadow,color]",
    "disabled:cursor-not-allowed disabled:opacity-50",
 
    // interaction
    "hover:border-[color-mix(in_srgb,var(--atom-card-border)_70%,var(--atom-text))]",
    "hover:cursor-pointer",
    "focus-visible:outline-none focus-visible:ring-2",
    "focus-visible:ring-[color-mix(in_srgb,var(--atom-primary)_35%,transparent)]",
    "focus-visible:ring-offset-0",
 
    // checked styling (native)
    "accent-(--atom-primary)",
  ].join(" "),
  {
    variants: {
      size: {
        sm: "h-3.5 w-3.5",
        md: "h-4 w-4",
        lg: "h-5 w-5",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
)
 
 
export type CheckboxSize = NonNullable<VariantProps<typeof checkboxVariants>["size"]>
 
export interface CheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type" | "size">,
    VariantProps<typeof checkboxVariants> {
  label?: React.ReactNode
}
 
export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, size, id, label, ...props }, ref) => {
    const autoId = React.useId()
    const inputId = id ?? autoId
 
    return (
      <div className="inline-flex items-center gap-2">
        <input
          ref={ref}
          id={inputId}
          type="checkbox"
          data-slot="checkbox"
          className={cn(checkboxVariants({ size }), className)}
          {...props}
        />
        {label != null && (
          <label
            htmlFor={inputId}
            className="select-none text-sm text-[var(--atom-info-card-jobstatus-primary-text)] font-[var(--atom-font-weight-medium)] hover:cursor-pointer"
          >
            {label}
          </label>
        )}
      </div>
    )
  }
)
 
Checkbox.displayName = "Checkbox"