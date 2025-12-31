// src/components/ui/heading.tsx
import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { Slot } from '@radix-ui/react-slot'
import { cn } from '../../lib/cn'

const headingVariants = cva(
  'text-[var(--atom-text)] leading-tight tracking-tight',
  {
    variants: {
      as: {
        h1: 'text-4xl',
        h2: 'text-3xl',
        h3: 'text-2xl',
        h4: 'text-xl',
        h5: 'text-lg',
        h6: 'text-base',
      },
      size: {
        none: '',
        xs: 'text-[calc(var(--atom-text-xs))]',
        sm: 'text-[calc(var(--atom-text-sm))]',
        md: 'text-[calc(var(--atom-text-md))]',
        lg: 'text-[calc(var(--atom-text-lg))]',
        xl: 'text-[calc(var(--atom-text-xl))]',
      },
      weight: {
        normal: 'font-[var(--atom-font-weight-normal)]',
        medium: 'font-[var(--atom-font-weight-medium)]',
        bold: 'font-[var(--atom-font-weight-bold)]',
      },
    },
    defaultVariants: {
      as: 'h2',
    },
  },
)

export interface HeadingProps
  extends
    React.HTMLAttributes<HTMLHeadingElement>,
    VariantProps<typeof headingVariants> {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  asChild?: boolean
  size?: 'xs' | 'sm' | 'md' | 'xl' | 'lg'
}

export const Heading = React.forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ className, as, asChild = false, size, weight, ...props }, ref) => {
    const Comp = asChild ? Slot : 'span'

    return (
      <Comp
        ref={ref}
        data-slot="heading"
        className={cn(headingVariants({ as, size, weight }), className)}
        {...props}
      />
    )
  },
)

Heading.displayName = 'Heading'
