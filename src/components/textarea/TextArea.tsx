// src/components/TextArea.tsx
import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../../lib/cn'

const TextAreaVariants = cva(
  [
    // allow resizing (change from resize-none)
    'resize',

    // base layout
    'flex field-sizing-content w-full rounded-md border px-3 py-2',
    'min-h-16 text-base md:text-sm',
    'outline-none disabled:cursor-not-allowed disabled:opacity-50',

    // base colors (your tokens)
    'border-[var(--atom-theme-border-primary)]',
    'placeholder:text-muted-foreground',

    // hover: change bg + border only
    'hover:bg-[color-mix(in_srgb,var(--atom-theme-border-primary)_6%,transparent)]',
    'hover:border-[color-mix(in_srgb,var(--atom-theme-border-primary)_25%,transparent)] ',

    // focus: change border + ring only (keep your fixed color)
    'focus-visible:border-[var(--atom-theme-border-primary))]',
    'focus-visible:ring-1 focus-visible:ring-[color-mix(in_srgb,var(--atom-theme-border-primary)_35%,transparent)]',
    'focus-visible:ring-offset-0',

    // invalid state (keep your existing logic)
    'aria-invalid:border-destructive',
    'aria-invalid:ring-2 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40',

    // dark base tweak you already had
    'dark:bg-input/30',

    // smoother transitions
    'transition-[background-color,border-color,box-shadow,color]',

    // NEW: filled state (data-filled="true")
      'placeholder:text-muted-foreground ' +
      'placeholder-shown:border-[var(--atom-theme-border-primary)] ' +
      '[&:not(:placeholder-shown)]:border-[color-mix(in_srgb,var(--atom-theme-border-primary)_70%,var(--atom-primary))] ' +
      'focus-visible:border-[var(--atom-primary)] ',
  ].join(' '),
  {
    variants: {
      variant: {
        default: '',
        outline: 'bg-transparent',
        subtle: 'bg-input-background/60',
      },
      size: {
        sm: 'min-h-10 px-2 py-1 text-xs w-64',
        md: 'min-h-16 px-3 py-2 text-sm w-80',
        lg: 'min-h-24 px-4 py-3 text-base w-96',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  },
)

export type TextAreaVariant = NonNullable<
  VariantProps<typeof TextAreaVariants>['variant']
>
export type TextAreaSize = NonNullable<
  VariantProps<typeof TextAreaVariants>['size']
>

export interface TextAreaProps
  extends
    React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    VariantProps<typeof TextAreaVariants> {
  placeholder?: string
}

/**
 * Variant-aware TextArea
 */
export const TextArea = React.forwardRef<
  HTMLTextAreaElement,
  TextAreaProps
>(({ className, variant, size, placeholder, ...props }, ref) => {
  return (
    <textarea
      ref={ref}
      data-slot="textarea"
      placeholder={placeholder ?? ' '}
      className={cn(TextAreaVariants({ variant, size }), className)}
      {...props}
    />
  )
})

TextArea.displayName = 'TextArea'
