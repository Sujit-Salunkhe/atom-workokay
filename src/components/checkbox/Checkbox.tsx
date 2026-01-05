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

export type CheckboxSize = NonNullable<
  VariantProps<typeof checkboxVariants>["size"]
>

export interface CheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type" | "size">,
    VariantProps<typeof checkboxVariants> {
  /**
   * Label text or ReactNode to display next to the checkbox
   */
  label?: React.ReactNode
  /**
   * Indeterminate state for tri-state checkboxes (e.g., select all with partial selection)
   * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/checkbox#indeterminate_state_checkboxes
   */
  indeterminate?: boolean
  /**
   * Wrapper className for the container div
   */
  wrapperClassName?: string
  /**
   * Label className override
   */
  labelClassName?: string
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      className,
      size,
      id,
      label,
      indeterminate = false,
      wrapperClassName,
      labelClassName,
      disabled,
      ...props
    },
    ref
  ) => {
    const autoId = React.useId()
    const inputId = id ?? autoId
    const internalRef = React.useRef<HTMLInputElement>(null)

    // Merge external ref with internal ref for indeterminate handling
    React.useImperativeHandle(ref, () => internalRef.current!, [])

    // Handle indeterminate state (can only be set via JavaScript)
    React.useEffect(() => {
      if (internalRef.current) {
        internalRef.current.indeterminate = indeterminate
      }
    }, [indeterminate])

    return (
      <div className={cn("inline-flex items-center gap-2", wrapperClassName)}>
        <input
          ref={internalRef}
          id={inputId}
          type="checkbox"
          data-slot="checkbox"
          className={cn(checkboxVariants({ size }), className)}
          disabled={disabled}
          {...props}
        />
        {label != null && (
          <label
            htmlFor={inputId}
            className={cn(
              "select-none text-sm font-(--atom-font-weight-medium)",
              "text-(--atom-info-card-jobstatus-primary-text)",
              disabled
                ? "cursor-not-allowed opacity-50"
                : "hover:cursor-pointer",
              labelClassName
            )}
          >
            {label}
          </label>
        )}
      </div>
    )
  }
)

Checkbox.displayName = "Checkbox"
