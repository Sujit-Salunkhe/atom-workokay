// src/components/text.tsx
import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { Slot } from '@radix-ui/react-slot'
import { cn } from '../../lib/cn'

const textVariants = cva(
  'text-[var(--atom-text)] leading-tight tracking-tight', // ✅ Fixed syntax
  {
    variants: {
      variant: {
        primary: 'text-[var(--atom-primary)]',
        secondary: 'text-[var(--atom-theme-surface-secondary)]',
        tertiary: 'text-[var(--atom-theme-surface-secondary)]',
        neutral: 'text-[var(--atom-text)]',
        success: 'text-[var(--atom-success)]',
        error: 'text-[var(--atom-error)]',
        info: 'text-[var(--atom-info)]',
        warning: 'text-[var(--atom-warning)]',
        disabled: 'text-[var(--atom-theme-text-secondary)]'
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
        none: '',
        normal: 'font-[var(--atom-font-weight-normal)]',  // ✅ Fixed syntax
        medium: 'font-[var(--atom-font-weight-medium)]',
        bold: 'font-[var(--atom-font-weight-bold)]',
      }
    },
    defaultVariants: {
      size: 'md',
      variant: 'primary'
    },
  },
)

// ✅ FIXED: HTMLElement + PascalCase interface
export interface TextProps
  extends React.HTMLAttributes<HTMLElement>,      // ← CHANGE 1: HTMLElement
  VariantProps<typeof textVariants> {
  asChild?: boolean
  size?: 'xs' | 'sm' | 'md' | 'xl' | 'lg' | 'none'
}

export const Text = React.forwardRef<HTMLElement, TextProps>(  // ← CHANGE 2: HTMLElement
  ({ className, asChild = false, size, weight, variant, ...props }, ref) => {
    const Comp = asChild ? Slot : 'span'

    return (
      <Comp
        ref={ref}
        data-slot="text"
        className={cn(textVariants({ size, weight, variant }), className)}
        {...props}
      />
    )
  },
)

Text.displayName = 'Text'
