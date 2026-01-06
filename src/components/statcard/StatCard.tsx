// src/components/ui/stat-card.tsx
import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { Slot } from '@radix-ui/react-slot'
import { cn } from '../../lib/cn'

/* ------------------------------------------------------
 * CVA
 * ------------------------------------------------------ */

// Wrapper/layout styles
const statCardVariants = cva(
  'flex bg-[color-mix(in_oklab,var(--atom-badge-archived-bg)_50%,transparent)]',
  {
    variants: {
      order: {
        col: 'flex-col items-center justify-center border-none shadow-none',
        colR: 'flex-col-reverse items-center justify-center border-none shadow-none',
        row: 'flex-row items-center justify-between border-none shadow-none',
        rowR: 'flex-row-reverse items-center justify-between border-none shadow-none',
      },
      size: {
        xs: 'text-center py-[calc(var(--spacing)*2)] px-[calc(var(--spacing)*3)] rounded-[var(--atom-radius-2)] h-[64px] w-[112px]',
        sm: 'text-center py-[calc(var(--spacing)*2)] px-[calc(var(--spacing)*4)] rounded-[var(--atom-radius-2)] h-[80px] w-[128px]',
        md: 'text-center p-[calc(var(--atom-space-1)*4)] border-[var(--atom-border)] border-[var(--atom-border-style)] rounded-[var(--atom-radius-2)] h-[96px] w-[160px]',
        lg: 'text-center p-[calc(var(--atom-space-1)*5)] rounded-[var(--atom-radius-2)] h-[112px] w-[192px]',
      },
    },
    defaultVariants: {
      order: 'col',
      size: 'sm',
    },
  }
)

// Top "stat value" text styles
const statValueVariants = cva('', {
  variants: {
    variant: {
      primary:
        'text-[var(--atom-info-card-jobstatus-primary-text)] text-[calc(var(--atom-text-2xl))] font-semibold leading-[var(--atom-info-card-jobstatus-line-height)]',
      secondary:
        'text-[var(--atom-info-card-jobstatus-secondary-text)] font-[600] text-[calc(var(--atom-text-2xl))] leading-[var(--atom-info-card-jobstatus-line-height)]',
      success:
        'text-[var(--atom-info-card-jobstatus-success-text)] font-[600] text-[calc(var(--atom-text-2xl))] leading-[var(--atom-info-card-jobstatus-line-height)]',
    },
  },
  defaultVariants: {
    variant: 'primary',
  },
})

// Bottom "label" text styles
const statLabelVariants = cva('', {
  variants: {
    variant: {
      primary:
        'text-[var(--atom-info-card-jobstatus-label-text)] leading-[var(--atom-info-card-jobstatus-label-line-height)] font-[var(--atom-text-xs)]',
      secondary:
        'text-[var(--atom-info-card-jobstatus-label-text)] leading-[var(--atom-info-card-jobstatus-label-line-height)] font-[var(--atom-text-xs)]',
      success:
        'text-[var(--atom-info-card-jobstatus-label-text)] leading-[var(--atom-info-card-jobstatus-label-line-height)] font-[var(--atom-text-xs)]',
    },
  },
  defaultVariants: {
    variant: 'primary',
  },
})

/* ------------------------------------------------------
 * TYPES
 * ------------------------------------------------------ */

export type StatCardVariant = NonNullable<
  VariantProps<typeof statValueVariants>['variant']
>

export type StatCardOrder = NonNullable<
  VariantProps<typeof statCardVariants>['order']
>

export type StatCardSize = NonNullable<
  VariantProps<typeof statCardVariants>['size']
>

export interface StatCardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof statCardVariants> {
  /**
   * Semantic color variant used for both value and label
   * @default 'primary'
   */
  variant?: StatCardVariant

  /**
   * Label text displayed below the stat value
   */
  label?: React.ReactNode

  /**
   * Main stat value/number displayed prominently
   */
  value?: React.ReactNode

  /**
   * Status indicator (future-proof, currently unused)
   */
  status?: 'high' | 'medium' | 'low'

  /**
   * Change the default rendered element for the one passed as a child,
   * merging their props and behavior.
   * @default false
   */
  asChild?: boolean
}

/* ------------------------------------------------------
 * COMPONENT
 * ------------------------------------------------------ */

/**
 * StatCard component - Displays a statistic with a value and label.
 * 
 * @example
 * ```tsx
 * <StatCard 
 *   variant="success" 
 *   value="1,234" 
 *   label="Total Users" 
 *   size="md"
 * />
 * ```
 */
export const StatCard = React.forwardRef<HTMLDivElement, StatCardProps>(
  (
    {
      variant = 'primary',
      order = 'col',
      size = 'sm',
      label,
      value,
      asChild = false,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : 'div'

    return (
      <Comp
        ref={ref}
        data-slot="stat-card"
        className={cn(statCardVariants({ order, size }), className)}
        {...props}
      >
        {children ?? (
          <>
            <div className={statValueVariants({ variant })}>{value}</div>
            <div className={statLabelVariants({ variant })}>{label}</div>
          </>
        )}
      </Comp>
    )
  }
)

StatCard.displayName = 'StatCard'
