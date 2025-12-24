// src/components/ui/paper.tsx
import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { Slot } from '@radix-ui/react-slot'
import { cn } from '../../lib/cn'

const paperVariants = cva(
  'transition-colors duration-200 bg-(--atom-bg) border-1',
  {
    variants: {
      variant: {
        outlined: 'bg-(--atom-surface) border border-(--atom-border)',
        flat: 'bg-(--atom-surface) ',
        dashed: 'bg-transparent border border-dashed border-(--atom-border) ',
      },
      size: {
        none: '',
        sm: 'text-sm',
        md: 'text-base',
        lg: 'text-lg',
      },
      padding: {
        none: 'p-0',
        sm: 'p-4',
        md: 'p-6',
        lg: 'p-8',
      },
      radius: {
        none: 'rounded-none',
        sm: 'rounded-sm',
        md: 'rounded-md',
        lg: 'rounded-lg',
    },
    defaultVariants: {
      variant: 'outlined',
      size: 'md',
      padding: 'md',
      radius: 'md',
    },
  },
  })

export interface PaperProps
  extends
    React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof paperVariants> {
  asChild?: boolean
}

export const Paper = React.forwardRef<HTMLDivElement, PaperProps>(
  ({ className, variant, size, padding, radius, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'div'

    return (
      <Comp
        ref={ref}
        data-slot="paper"
        className={cn(paperVariants({ variant, size, padding, radius }), className)}
        {...props}
      />
    )
  },
)

Paper.displayName = 'Paper'
