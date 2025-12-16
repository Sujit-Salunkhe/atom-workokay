// src/components/ui/checkbox.tsx
import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "../../lib/cn"
 
const checkboxBoxVariants = cva(
  [
    // base box
    "flex items-center justify-center",
    "rounded-[var(--atom-radius-1)]",
    "border border-[var(--atom-input-border)]",
    "bg-[var(--atom-input-bg)]",
    "text-[var(--atom-primary-contrast)]",
    "transition-[background-color,border-color,box-shadow,color]",
 
    // focus
    "peer-focus-visible:ring-2",
    "peer-focus-visible:ring-[var(--atom-ring-color)]",
    "peer-focus-visible:ring-offset-0",
 
    // checked
    "peer-checked:bg-[var(--atom-primary)]",
    "peer-checked:border-[var(--atom-primary)]",
 
    // disabled
    "peer-disabled:opacity-50",
    "peer-disabled:cursor-not-allowed",
  ].join(" "),
  {
    variants: {
      size: {
        sm: "h-3.5 w-3.5 text-[10px]",
        md: "h-4 w-4 text-xs",
        lg: "h-5 w-5 text-sm",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
)
 
export interface CheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type" | "size">,
    VariantProps<typeof checkboxBoxVariants> {
  label?: React.ReactNode
}
 
export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, size, id, label, ...props }, ref) => {
    const autoId = React.useId()
    const inputId = id ?? autoId
 
    return (
<label
        htmlFor={inputId}
        className="inline-flex items-center gap-2 cursor-pointer select-none"
>
        {/* Native input (accessible, hidden visually) */}
<input
          ref={ref}
          id={inputId}
          type="checkbox"
          className="peer sr-only"
          {...props}
        />
 
        {/* Custom checkbox UI */}
<span
          data-slot="checkbox"
          data-size={size}
          className={cn(checkboxBoxVariants({ size }), className)}
          aria-hidden="true"
>
          {/* Check icon */}
<svg
            viewBox="0 0 16 16"
            className="h-3 w-3 scale-75 opacity-0 peer-checked:opacity-100 transition-opacity"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
>
<path d="M3 8l3 3 7-7" />
</svg>
</span>
 
        {label && (
<span className="text-sm text-[var(--atom-text)] font-[var(--atom-font-weight-medium)]">
            {label}
</span>
        )}
</label>
    )
  }
)
 
Checkbox.displayName = "Checkbox"