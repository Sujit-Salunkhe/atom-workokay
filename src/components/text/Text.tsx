// src/components/ui/heading.tsx
import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { Slot } from '@radix-ui/react-slot'
import { cn } from '../../lib/cn'

const headingVariants = cva(
  'text-[var(--atom-text)] leading-tight tracking-tight',
  {
    variants: {
      variant:{
        primary:'text-[var(--atom-primary)]',
        secondary:'text-[var(--atom-info-card-jobstatus-secondary-text)]',
        tertiary:'text-[var(--atom-info-card-jobstatus-success-text)]',
        neutral: 'text-[var(--atom-text)]',
        success: 'text-[var(--atom-success)]',
        error: 'text-[var(--atom-error)]',
        info:'text-[var(--atom-info)]',
        warning:'text-[var(--atom-warning)]',
        disabled:'text-[var(--atom-badge-archived-text)]'
      },
      size: {
        none:'',
        xs: 'text-[calc(var(--atom-text-xs))]',
        sm: 'text-[calc(var(--atom-text-sm))]',
        md: 'text-[calc(var(--atom-text-md))]',
        lg: 'text-[calc(var(--atom-text-lg))]',
        xl: 'text-[calc(var(--atom-text-xl))]',
      },
      weight:{
       none:'',
       normal:'font-[var(--atom-font-weight-normal)]',
       medium:'font-[var(--atom-font-weight-medium)]',
       bold:  'font-[var(--atom-font-weight-bold)]',
      }
    },
    defaultVariants: {
      size: 'md',
      variant:'primary'
    },
  },
)

export interface HeadingProps
  extends
    React.HTMLAttributes<HTMLHeadingElement>,
    VariantProps<typeof headingVariants> {
  asChild?: boolean
  size?: 'xs' | 'sm' | 'md' | 'xl' | 'lg' | 'none'

}
  
export const Text = React.forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ className, asChild = false,size,weight,variant, ...props }, ref) => {
    const Comp = asChild ? Slot : 'span'

    return (
      <Comp
        ref={ref}
        data-slot="heading"
        className={cn(headingVariants({size,weight,variant }), className)}
        {...props}
      />
    )
  },
)

Text.displayName = 'Text'
