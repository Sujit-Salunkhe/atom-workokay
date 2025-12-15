import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../../lib/cn'
import { Slot } from '@radix-ui/react-slot'

/**
 * BASE BADGE CVA
 * Consistent with Button’s architecture and naming conventions
 */
export const badgeVariants = cva(
  'inline-flex items-center justify-center rounded-[calc(var(--atom-radius-2)-2px)] border font-medium ' +
    'whitespace-nowrap shrink-0 gap-1 overflow-hidden ' +
    'text-xs px-2 py-0.5 [&>svg]:size-3 [&>svg]:pointer-events-none ' +
    'focus-visible:outline-none focus-visible:ring-ring/50 ' +
    'focus-visible:ring-[3px] transition-colors',
  {
    variants: {
      /** PRIORITY (High / Medium / Low) */
      priority: {
        high: 'bg-red-500/10 text-[var(--atom-badge-high-text)]  border-red-500/20',
        medium:
          'bg-amber-500/10 text-[var(--atom-badge-medium-text)] border-amber-500/20',
        low: 'bg-green-500/10 text-[var(--atom-badge-low-text)]  border-green-500/20',
      },

      /** STATUS VARIANTS (Workflow-based) */
      status: {
        validated:
          'bg-[color-mix(in_oklab,var(--atom-info-card-jobstatus-success-text)_10%,transparent)] text-[var(--atom-info-card-jobstatus-success-text)] border-[color-mix(in_oklab,var(--atom-info-card-jobstatus-success-text)_20%,transparent)]',
        incoming:
          'bg-[color-mix(in_oklab,var(--atom-info-card-jobstatus-secondary-text)_10%,transparent)] text-[var(--atom-info-card-jobstatus-secondary-text)] border-[color-mix(in_oklab,var(--atom-info-card-jobstatus-secondary-text)_20%,transparent)]',
        quarantined:
          'bg-[color-mix(in_oklab,var(--color-amber-500)_10%,transparent))] text-[var(--atom-badge-quarantined-text)]  border-[color-mix(in_oklab,var(--color-amber-500)_20%,transparent))]',
        failed:
          'bg-[color-mix(in_oklab,var(--atom-badge-failed-text)_10%,transparent)] text-[var(--atom-badge-failed-text)]  border-[color-mix(in_oklab,var(--atom-badge-failed-text)_20%,transparent)]',
        archieved:
          'bg-[var(--atom-badge-archived-bg)] text-[var(--atom-badge-archived-text)] border-[var(--atom-badge-archived-border)]',
        info:
           "bg-[color-mix(in_oklab,var(--atom-info)_10%,transparent)] text-[var(--atom-info)] border-[color-mix(in_oklab,var(--atom-info)_20%,transparent)]",

      },

      /** ICON PLACEMENT */
      withIcon: {
        true: 'inline-flex items-center [&>svg]:mr-1',
        false: '',
      },

      /** SIZE OPTIONS */
      size: {
        sm: 'text-[10px] px-1.5 py-0.5 [&>svg]:size-[10px]',
        md: 'text-xs px-2 py-0.5 [&>svg]:size-3',
        lg: 'text-sm px-2.5 py-1 [&>svg]:size-4',
      },

      /** FULL WIDTH (rare, but consistent with Button API) */
      fullWidth: {
        true: 'w-full',
        false: '',
      },
    },

    /** DEFAULTS */
    defaultVariants: {
      size: 'md',
      withIcon: false,
    },
  },
)

/** EXPORTED UNIONS FOR PUBLIC API (Very important for library devs) */
export type BadgePriority = 'high' | 'medium' | 'low'
export type BadgeStatus = 'validated' | 'incoming' | 'quarantined' | 'failed'

export type BadgeSize = 'sm' | 'md' | 'lg'

export interface BadgeProps
  extends
    React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {
  asChild?: boolean
}

/**
 * FINAL BADGE COMPONENT
 */
export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  (
    {
      className,
      priority,
      status,
      size,
      fullWidth,
      withIcon,
      asChild,
      children,
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : 'span'

    return (
      <Comp
        ref={ref}
        data-slot="badge"
        className={cn(
          badgeVariants({
            priority,
            status,
            size,
            fullWidth,
            withIcon,
          }),
          className,
        )}
        {...props}
      >
        {' '}
        {children}
      </Comp>
    )
  },
)

Badge.displayName = 'Badge'
