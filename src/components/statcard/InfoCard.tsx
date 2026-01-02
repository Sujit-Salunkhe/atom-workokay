// src/components/ui/info-card.tsx
import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { Slot } from '@radix-ui/react-slot'
import { cn } from '../../lib/cn'

/* ------------------------------------------------------
 * CVA
 * (CSS strings unchanged; only reorganized for clarity)
 * ------------------------------------------------------ */

// Wrapper/layout styles
const infoCardVariants = cva(
  'flex bg-[color-mix(in_oklab,var(--atom-badge-archived-bg)_50%,transparent)] ',
  {
    variants: {
      order: {
        col: 'flex-col items-center justify-center border-none shadow-none',
        colR: 'flex-col-reverse items-center justify-center  border-none shadow-none',
        row: 'flex-row items-center justify-between  border-none shadow-none',
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
  },
)

// Top “info” text styles
const infoValueVariants = cva('', {
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

// Bottom “label” text styles
const infoLabelVariants = cva('', {
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

export type InfoCardVariant = VariantProps<typeof infoValueVariants>['variant']
export type InfoCardOrder = VariantProps<typeof infoCardVariants>['order']
export type InfoCardSize = VariantProps<typeof infoCardVariants>['size']

export interface InfoCardProps
  extends
    React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof infoCardVariants> {
  /** Semantic color variant used for both info and label */
  variant?: NonNullable<InfoCardVariant>

  /** Label text */
  label?: React.ReactNode

  /** Main info/number */
  info?: React.ReactNode

  /** Future-proof (kept), currently unused */
  status?: 'high' | 'medium' | 'low'

  /** Render as child using Radix Slot */
  asChild?: boolean
}

/* ------------------------------------------------------
 * COMPONENT
 * ------------------------------------------------------ */
export const InfoCard = React.forwardRef<HTMLDivElement, InfoCardProps>(
  (
    {
      variant = 'primary',
      order = 'col',
      size = 'sm',
      label,
      info,
      asChild = false,
      className,
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : 'div'

    return (
      <Comp
        ref={ref}
        className={cn(infoCardVariants({ order, size }), className)}
        {...props}
      >
        <div className={infoValueVariants({ variant })}>{info}</div>
        <div className={infoLabelVariants({ variant })}>{label}</div>
      </Comp>
    )
  },
)

InfoCard.displayName = 'InfoCard'
