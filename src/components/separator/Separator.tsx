// src/components/separator/Separator.tsx
import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../../lib/cn'

export const separatorVariants = cva(
  // base: thin, subtle line
  'w-full border-t border-[color-mix(in_srgb,var(--atom-border)_60%,white)]',
  {
    variants: {
      orientation: {
        horizontal: 'w-full border-t text-[var(--atom-primary)]',
        vertical: 'h-full border-l text-[var(--atom-primary)]',
      },
      inset: {
        none: '',
        sm: 'ml-2',
        md: 'ml-4',
      },
    },
    defaultVariants: {
      orientation: 'horizontal',
      inset: 'none',
    },
  },
)

export interface SeparatorProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof separatorVariants> {}

export function Separator({
  className,
  orientation,
  inset,
  ...props
}: SeparatorProps) {
  return (
    <div
      role="separator"
      aria-orientation={orientation === 'vertical' ? 'vertical' : 'horizontal'}
      className={cn(separatorVariants({ orientation, inset }), className)}
      {...props}
    />
  )
}
