import * as React from 'react'
import * as SwitchPrimitive from '@radix-ui/react-switch'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../../lib/cn'

/**
 * SWITCH VARIANTS
 * - variant: semantic tone (primary / success / warning / danger / info / neutral)
 * - size: thumb/track size
 * - fullWidth: allow stretching in flex layouts (optional)
 */
export const switchVariants = cva(
  // Base track
  'peer inline-flex shrink-0 cursor-pointer items-center rounded-full ' +
    'border border-transparent bg-[var(--atom-border)] ' +
    'transition-colors focus-visible:outline-none focus-visible:ring-2 ' +
    'focus-visible:ring-[var(--atom-ring-color)] focus-visible:ring-offset-2 ' +
    'focus-visible:ring-offset-[var(--atom-ring-offset)] ' +
    'data-[state=unchecked]:bg-[var(--atom-border)] ' +
    'data-[state=unchecked]:border-[var(--atom-border)] ' +
    'disabled:opacity-50 disabled:cursor-not-allowed',
  {
    variants: {
      /** Semantic tone when checked */
      variant: {
        primary:
          'data-[state=checked]:bg-[var(--atom-primary)] ' +
          'data-[state=checked]:border-[var(--atom-primary)]',
        success:
          'data-[state=checked]:bg-[var(--atom-success)] ' +
          'data-[state=checked]:border-[var(--atom-success)]',
        warning:
          'data-[state=checked]:bg-[var(--atom-warning)] ' +
          'data-[state=checked]:border-[var(--atom-warning)]',
        danger:
          'data-[state=checked]:bg-[var(--atom-error)] ' +
          'data-[state=checked]:border-[var(--atom-error)]',
        info:
          'data-[state=checked]:bg-[var(--atom-info)] ' +
          'data-[state=checked]:border-[var(--atom-info)]',
        neutral:
          'data-[state=checked]:bg-[var(--atom-text-muted)] ' +
          'data-[state=checked]:border-[var(--atom-text-muted)]',
      },

      /** Track & thumb size */
      size: {
        sm: 'h-4 w-7',  // 16 x 28
        md: 'h-5 w-9',  // 20 x 36
        lg: 'h-6 w-11', // 24 x 44
      },

      fullWidth: {
        true: 'w-full',
        false: '',
      },
    },

    defaultVariants: {
      variant: 'primary',
      size: 'md',
      fullWidth: false,
    },
  },
)

/**
 * Thumb variants are derived from size for consistent movement.
 * Use data-slot to target from parent if you want, but easier to
 * just map sizes here.
 */
const thumbSizeByVariant: Record<
  NonNullable<VariantProps<typeof switchVariants>['size']>,
  string
> = {
  sm: 'h-3 w-3 data-[state=checked]:translate-x-3',
  md: 'h-4 w-4 data-[state=checked]:translate-x-4',
  lg: 'h-5 w-5 data-[state=checked]:translate-x-5',
}

export type SwitchVariant =
  | 'primary'
  | 'success'
  | 'warning'
  | 'danger'
  | 'info'
  | 'neutral'

export type SwitchSize = 'sm' | 'md' | 'lg'

export interface SwitchProps
  extends React.ComponentPropsWithoutRef<typeof SwitchPrimitive.Root>,
    VariantProps<typeof switchVariants> {}

/**
 * FINAL SWITCH COMPONENT
 */
export const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitive.Root>,
  SwitchProps
>(({ className, variant, size, fullWidth, ...props }, ref) => {
  const thumbClasses =
    thumbSizeByVariant[size ?? 'md'] +
    ' block translate-x-0 rounded-full bg-[var(--atom-bg)] ' +
    'shadow-sm ring-0 transition-transform data-[state=unchecked]:translate-x-0'

  return (
    <SwitchPrimitive.Root
      ref={ref}
      data-slot="switch"
      className={cn(switchVariants({ variant, size, fullWidth }), className)}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className={thumbClasses}
      />
    </SwitchPrimitive.Root>
  )
})

Switch.displayName = 'Switch'
