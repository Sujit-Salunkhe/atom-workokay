// src/components/stat-card/StatCard.tsx
import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { Slot } from '@radix-ui/react-slot'
import { cn } from '../../lib/cn'

export const statCardVariants = cva(
  // Base layout: like your screenshot
  'flex flex-col justify-center rounded-xl border bg-[var(--atom-theme-bg)] ' +
    'border-[var(--atom-theme-border)] px-4 py-3' +
    'transition-colors duration-150 ease-in-out ' +
    'shadow-sm ',
  {
    variants: {
      /** Semantic tone (matches your overview items) */
      variant: {
        primary:
        'text-[var(--atom-primary)] ' ,
        neutral:
          'text-[var(--atom-text)] ' // 'border-[var(--atom-card-border)]'
          ,
        success:
          'text-[var(--atom-success)] ',  // 'border-[color-mix(in_srgb,var(--atom-success)_18%,var(--atom-card-border))]',
        warning:
          'text-[var(--atom-warning)] ', //'border-[color-mix(in_srgb,var(--atom-warning)_18%,var(--atom-card-border))]',
        danger:
          'text-[var(--atom-error)]',  //border-[color-mix(in_srgb,var(--atom-error)_18%,var(--atom-card-border))]'
        info:
          'text-[var(--atom-info)]', //border-[color-mix(in_srgb,var(--atom-info)_18%,var(--atom-card-border))]',
        accent:
          'text-[var(--atom-accent)] ', //'border-[color-mix(in_srgb,var(--atom-accent)_18%,var(--atom-card-border))]',
      },

      /** Density / size of the card */
      size: {
        sm: 'h-[72px] gap-1 w-[160px]',
        md: 'h-[84px] gap-1.5 w-[200px]',
        lg: 'h-[96px] gap-2 w-[240px]',
      },

      /** Layout style – useful if you want a more minimal look somewhere */
      appearance: {
        elevated: 'shadow-sm',
        outlined: 'shadow-none bg-transparent',
        ghost: 'shadow-none bg-transparent border-transparent border-none ',
        soft: 'shadow-none bg-[var(--atom-card-bg)] border-none',
      },

      /** Stretch to fill grid column */
      fullWidth: {
        true: 'w-full',
        false: '',
      },
    },

    compoundVariants: [
      // Outlined keeps border but removes tinted bg
      {
        appearance: 'outlined',
        class: 'bg-transparent',
      },
      // Ghost removes border too
      {
        appearance: 'ghost',
        class: 'bg-transparent border-transparent hover:bg-[var(--atom-card-bg)] ',
      },
      // Soft keeps tint but no shadow (good for dense overviews)
      {
        appearance: 'soft',
        class: 'shadow-none bg-[var(--atom-card-bg)] border-none',
      },
    ],

    defaultVariants: {
      variant: 'neutral',
      size: 'md',
      appearance: 'elevated',
      fullWidth: false,
    },
  },
)

export type StatCardVariant =
  | 'neutral'
  | 'success'
  | 'warning'
  | 'danger'
  | 'info'
  | 'accent'

export type StatCardSize = 'sm' | 'md' | 'lg'

export type StatCardAppearance = 'elevated' | 'outlined' | 'ghost' | 'soft'

export interface StatCardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof statCardVariants> {
  /** Title like "Validated", "Failed" */
  label: string
  /** Main metric value like 4, 15, 2 */
  value: React.ReactNode
  /** Optional icon in top-right */
  icon?: React.ReactNode
  /** Use Slot to render as <a>, <Link>, etc. */
  asChild?: boolean
}

export const StatCard = React.forwardRef<HTMLDivElement, StatCardProps>(
  (
    {
      className,
      variant,
      size,
      appearance,
      fullWidth,
      label,
      value,
      icon,
      asChild,
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : 'div'

    return (
      <Comp
        ref={ref}
        data-slot="stat-card"
        className={cn(
          statCardVariants({ variant, size, appearance, fullWidth }),
          className,
        )}
        {...props}
      >
        <div className="flex items-start justify-between gap-2">
          <span className="text-xs font-medium text-(--atom-text-muted)">
            {label}
          </span>
          {icon && (
            <span className="shrink-0 text-[11px] opacity-80">{icon}</span>
          )}
        </div>

        <div className="mt-1 text-2xl font-semibold leading-tight">
          {value}
        </div>
      </Comp>
    )
  },
)

StatCard.displayName = 'StatCard'
