import * as React from 'react'
import * as SwitchPrimitive from '@radix-ui/react-switch'
import { cva, type VariantProps } from 'class-variance-authority'
import { motion } from 'framer-motion'
import { cn } from '../../lib/cn'

const MotionThumb = motion.create(SwitchPrimitive.Thumb)

export const switchVariants = cva(
  'peer inline-flex shrink-0 cursor-pointer items-center rounded-full ' +
    'border border-transparent bg-[var(--atom-border)] ' +
    'transition-colors duration-300 ease-in-out ' +
    'focus-visible:outline-none focus-visible:ring-2 ' +
    'focus-visible:ring-[var(--atom-ring-color)] focus-visible:ring-offset-2 ' +
    'focus-visible:ring-offset-[var(--atom-ring-offset)] ' +
    'data-[state=unchecked]:bg-[var(--atom-border)] ' +
    'data-[state=unchecked]:border-[var(--atom-border)] ' +
    'disabled:opacity-50 disabled:cursor-not-allowed',
  {
    variants: {
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
      size: {
        sm: 'h-4 w-7 p-0.5',
        md: 'h-5 w-9 p-0.5',
        lg: 'h-6 w-11 p-0.5',
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

const thumbConfig: Record<
  NonNullable<VariantProps<typeof switchVariants>['size']>,
  { size: string; translateX: number }
> = {
  sm: { size: 'h-3 w-3', translateX: 12 },
  md: { size: 'h-4 w-4', translateX: 16 },
  lg: { size: 'h-5 w-5', translateX: 20 },
}

export type SwitchVariant = 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'neutral'
export type SwitchSize = 'sm' | 'md' | 'lg'

export interface SwitchProps
  extends React.ComponentPropsWithoutRef<typeof SwitchPrimitive.Root>,
    VariantProps<typeof switchVariants> {}

export const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitive.Root>,
  SwitchProps
>(({ className, variant, size, fullWidth, checked, ...props }, ref) => {
  const [checkedState, setCheckedState] = React.useState(checked ?? false)
  const [shouldAnimate, setShouldAnimate] = React.useState(false)
  
  // Ensure size has a default value for type safety
  const currentSize = size ?? 'md'
  const config = thumbConfig[currentSize]

  React.useEffect(() => {
    if (checked !== undefined) {
      setCheckedState(checked)
    }
  }, [checked])

  const handleCheckedChange = (newChecked: boolean) => {
    // Only trigger squash animation when changing from false to true
    if (newChecked === true && checkedState === false) {
      setShouldAnimate(true)
      setTimeout(() => setShouldAnimate(false), 300)
    }
    
    setCheckedState(newChecked)
    props.onCheckedChange?.(newChecked)
  }

  return (
    <SwitchPrimitive.Root
      ref={ref}
      data-slot="switch"
      className={cn(switchVariants({ variant, size: currentSize, fullWidth }), className)}
      checked={checkedState}
      onCheckedChange={handleCheckedChange}
      {...props}
    >
      <MotionThumb
        data-slot="switch-thumb"
        className={cn(config.size, 'block rounded-full bg-(--atom-bg) shadow-lg')}
        animate={{
          x: checkedState ? config.translateX : 0,
          scaleX: shouldAnimate ? [1, 1.3, 1] : 1,
          scaleY: shouldAnimate ? [1, 0.9, 1] : 1,
        }}
        transition={{
          x: {
            type: 'spring',
            stiffness: 500,
            damping: 30,
          },
          scaleX: {
            duration: 0.3,
            ease: 'easeInOut',
          },
          scaleY: {
            duration: 0.3,
            ease: 'easeInOut',
          },
        }}
      />
    </SwitchPrimitive.Root>
  )
})

Switch.displayName = 'Switch'
