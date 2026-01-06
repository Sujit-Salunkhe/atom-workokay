// src/components/stat-card/StatCardPriority.tsx
import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { Slot } from '@radix-ui/react-slot'
import { cn } from '../../lib/cn'

/**
 * Priority Stat Card (row style)
 * Example: "High Priority   [ 6 ]"
 */
export const statCardPriorityVariants = cva(
  'flex items-center justify-between rounded-xl border bg-[var(--atom-theme-bg)] ' +
    'border-[var(--atom-theme-border)] px-4 py-3 w-full ' +
    'transition-colors duration-150 ease-in-out shadow-sm border-[var(--atom-badge-archived-border)]',
  {
    variants: {
      /** Semantic tone: primary + priority levels */
      variant: {
        primary:
          'text-[var(--atom-primary)]',  //border-[color-mix(in_srgb,var(--atom-primary)_18%,var(--atom-card-border))]',
        high: 'text-[var(--atom-error)]', //border-[color-mix(in_srgb,var(--atom-error)_18%,var(--atom-card-border))]',
        medium:
          'text-[var(--atom-warning)]', //border-[color-mix(in_srgb,var(--atom-warning)_18%,var(--atom-card-border))]',
        low: 'text-[var(--atom-success)]', //border-[color-mix(in_srgb,var(--atom-success)_18%,var(--atom-card-border))]',
        neutral: 'text-[var(--atom-text)]', //border-[var(--atom-card-border)]',
      },

      /** Size of the row and pill */
      size: {
        sm: 'h-10 text-sm gap-2 w-full max-w-[320px]',
        md: 'h-12 text-sm gap-3 w-full max-w-[400px]',
        lg: 'h-14 text-base gap-4 w-full max-w-[480px]',
      },
      /** Appearance of the container */
      appearance: {
        elevated: 'shadow-sm',
        outlined: 'shadow-none bg-transparent',
        ghost: 'shadow-none bg-transparent border-transparent',
        soft: 'shadow-none bg-[var(--atom-card-bg)] border-none',
      },
    },

    compoundVariants: [
      { appearance: 'outlined', class: 'bg-transparent' },
      {
        appearance: 'ghost',
        class:
          'bg-transparent border-transparent hover:bg-[var(--atom-card-bg)] border-[var(--atom-card-border)]',
      },
      {
        appearance: 'soft',
        class: 'shadow-none bg-[var(--atom-card-bg)] border-none',
      },
    ],

    defaultVariants: {
      variant: 'neutral',
      size: 'md',
      appearance: 'elevated',
    },
  },
)

export type StatCardPriorityVariant =
  | 'primary'
  | 'high'
  | 'medium'
  | 'low'
  | 'neutral'
export type StatCardPrioritySize = 'sm' | 'md' | 'lg'
export type StatCardPriorityAppearance =
  | 'elevated'
  | 'outlined'
  | 'ghost'
  | 'soft'

export interface StatCardPriorityProps
  extends
    React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof statCardPriorityVariants> {
  /** Label like "High Priority" */
  label: string
  /** Numeric value on the right pill */
  value: React.ReactNode
  /** Optional icon inside the pill (e.g. trend arrow) */
  pillIcon?: React.ReactNode
  /** Render as child via Slot */
  asChild?: boolean
}

export const StatCardPriority = React.forwardRef<
  HTMLDivElement,
  StatCardPriorityProps
>(
  (
    {
      className,
      variant,
      size,
      appearance,
      label,
      value,
      pillIcon,
      asChild,
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : 'div'

    return (
      <Comp
        ref={ref}
        data-slot="stat-card-priority"
        className={cn(
          statCardPriorityVariants({ variant, size, appearance }),
          className,
        )}
        {...props}
      >
        {/* Left: label */}
        <span className="text-(--atom-text)">{label}</span>

        {/* Right: colored pill with value */}
        <span
          className={cn(
            'inline-flex items-center justify-center rounded-md px-2.5 py-1 ' +
              'text-xs font-medium',
            // match priority variant colors for the pill
            variant === 'high' &&
              'bg-[color-mix(in_srgb,var(--atom-error)_10%,transparent)] text-(--atom-error)',
            variant === 'medium' &&
              'bg-[color-mix(in_srgb,var(--atom-warning)_10%,transparent)] text-(--atom-warning)',
            variant === 'low' &&
              'bg-[color-mix(in_srgb,var(--atom-success)_10%,transparent)] text-(--atom-success)',
            variant === 'primary' &&
              'bg-[color-mix(in_srgb,var(--atom-primary)_10%,transparent)] textvar(--atom-primary)',
            variant === 'neutral' &&
              'bg-[color-mix(in_srgb,var(--atom-border)_12%,transparent)] text-(--atom-text-muted)',
          )}
        >
          {pillIcon && (
            <span className="mr-1 flex items-center">{pillIcon}</span>
          )}
          {value}
        </span>
      </Comp>
    )
  },
)

StatCardPriority.displayName = 'StatCardPriority'
