// src/components/ui/progress-bar.tsx
import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "../../lib/cn"

const progressTrackVariants = cva(
  [
    // layout
    "w-full overflow-hidden",

    // shape + border
    "border border-[var(--atom-badge-archived-border)] rounded-[var(--atom-radius-1)]",

    // default background (can be overridden by variants)
    "bg-[color-mix(in_srgb,var(--atom-info-card-jobstatus-secondary-text)_20%,transparent)]",
  ].join(" "),
  {
    variants: {
      trackVariant: {
        default: "bg-[color-mix(in_srgb,var(--atom-badge-archived-border)_8%,transparent)]",
        outline: "bg-transparent bg-none",
        subtle:
          "bg-[color-mix(in_srgb,var(--atom-badge-archived-border)_6%,var(--atom-bg))]",
      },
      size: {
        sm: "h-3",
        md: "h-3.5",
        lg: "h-4",
      },
      fullWidth: {
        true: "w-full",
        false: "",
      },
    },
    defaultVariants: {
      trackVariant: "default",
      size: "sm",
      fullWidth: true,
    },
  }
)

const progressIndicatorVariants = cva(
  ["h-full transition-none"].join(" "),
  {
    variants: {
      indicatorVariant: {
        default: "bg-[var(--atom-progressbar-bg)]",
        outline: "bg-[var(--atom-primary)]",
        subtle: "bg-[color-mix(in_srgb,var(--atom-primary)_45%,transparent)]",
      },
    },
    defaultVariants: {
      indicatorVariant: "default",
    },
  }
)

export type ProgressBarTrackVariant = NonNullable<
  VariantProps<typeof progressTrackVariants>["trackVariant"]
>
export type ProgressBarIndicatorVariant = NonNullable<
  VariantProps<typeof progressIndicatorVariants>["indicatorVariant"]
>
export type ProgressBarSize = NonNullable<
  VariantProps<typeof progressTrackVariants>["size"]
>

export interface ProgressBarProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "children">,
    VariantProps<typeof progressTrackVariants> {
  /** 0..100 */
  value?: number
  /** If true, omit aria-valuenow (indeterminate) */
  indeterminate?: boolean
  /** Optional label for screen readers */
  ariaLabel?: string
  /** If omitted, indicatorVariant will follow trackVariant */
  variant?: 'default' | 'outline' | 'subtle'
}

export function ProgressBar({
  className,
  variant,
  size,
  fullWidth,
  value = 0,
  indeterminate = false,
  ariaLabel = "Progress",
  ...props
}: ProgressBarProps) {
  const clamped = Math.max(0, Math.min(100, value));

  return (
    <div
      data-slot="progress-track"
      role="progressbar"
      aria-label={ariaLabel}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={indeterminate ? undefined : clamped}
      className={cn(
        progressTrackVariants({trackVariant:variant, size, fullWidth }),
        className
      )}
      {...props}
    >
      <div
        data-slot="progress-indicator"
        className={cn(progressIndicatorVariants({indicatorVariant:variant}))}
        style={{
          width: indeterminate ? "40%" : `${clamped}%`,
          transform: indeterminate ? "translateX(-60%)" : undefined,
        }}
      />
    </div>
  )
}
