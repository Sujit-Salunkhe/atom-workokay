// src/components/avatar/Avatar.tsx
import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { Slot } from '@radix-ui/react-slot'
import { cn } from '../../lib/cn'

/**
 * Avatar base styles:
 * - circular by default
 * - center initials
 * - uses CSS vars for colors
 */
export const avatarVariants = cva(
  'inline-flex items-center justify-center select-none shrink-0 ' +
    'font-medium uppercase tracking-wide ' +
    'border bg-transparent overflow-hidden ' +
    'transition-colors transition-transform duration-150 ease-in-out ' +
    'motion-reduce:transition-none ' +
    'focus-visible:outline-none focus-visible:ring-2 ' +
    'focus-visible:ring-[var(--atom-ring-color)] focus-visible:ring-offset-2 ' +
    'focus-visible:ring-offset-[var(--atom-ring-offset)]',
  {
    variants: {
      /** Visual variant / semantic color */
      variant: {
        primary:
          'bg-[var(--atom-primary)] text[var(--atom-primary)] border-[var(--atom-primary)]',
        neutral:
          'bg-[var(--atom-badge-neutral-bg-low)] ' +
          'text-[var(--atom-badge-neutral-fg-low)] ' +
          'border-[var(--atom-badge-neutral-border-low)]',
        success:
          'bg-[var(--atom-badge-success-bg-low)] ' +
          'text-[var(--atom-badge-success-fg-low)] ' +
          'border-[var(--atom-badge-success-border-low)]',
        warning:
          'bg-[var(--atom-badge-warning-bg-low)] ' +
          'text-[var(--atom-badge-warning-fg-low)] ' +
          'border-[var(--atom-badge-warning-border-low)]',
        danger:
          'bg-[var(--atom-badge-danger-bg-low)] ' +
          'text-[var(--atom-badge-danger-fg-low)] ' +
          'border-[var(--atom-badge-danger-border-low)]',
        info:
          'bg-[var(--atom-badge-info-bg-low)] ' +
          'text-[var(--atom-badge-info-fg-low)] ' +
          'border-[var(--atom-badge-info-border-low)]',
        accent:
          'bg-[var(--atom-badge-accent-bg-low)] ' +
          'text-[var(--atom-badge-accent-fg-low)] ' +
          'border-[var(--atom-badge-accent-border-low)]',
      },

      /** Appearance / fill level */
      appearance: {
        subtle: '', // default uses *-low tokens above
        solid: 'text-[var(--atom-primary-contrast)] border-transparent',
        outline: 'bg-transparent',
        ghost: 'bg-transparent border-none hover:bg-[var(--atom-badge-neutral-bg-low)]  ',
        
      },

      /** Shape options */
      shape: {
        circle: 'rounded-full',
        square: 'rounded-md',
        pill: 'rounded-full px-3',
      },

      /** Size options */
      size: {
        sm: 'h-8 w-8 text-xs',
        md: 'h-10 w-10 text-sm',
        lg: 'h-12 w-12 text-base',
      },

      /** Full-width for pill / list layouts */
      fullWidth: {
        true: 'w-full',
        false: '',
      },

      /** Optional ring to highlight active/selected user */
      withRing: {
        true: 'ring-2 ring-[var(--atom-primary)] ring-offset-[var(--atom-bg)] ring-offset-2',
        false: '',
      },
    },

    compoundVariants: [
      // Solid appearance = use *-high tokens
      {
        appearance: 'solid',
        variant: 'success',
        class:
          'bg-[var(--atom-badge-success-bg-high)] ' +
          'text-[var(--atom-badge-success-fg-high)] ' +
          'border-[var(--atom-badge-success-border-high)]',
      },
      {
        appearance: 'solid',
        variant: 'danger',
        class:
          'bg-[var(--atom-badge-danger-bg-high)] ' +
          'text-[var(--atom-badge-danger-fg-high)] ' +
          'border-[var(--atom-badge-danger-border-high)]',
      },
      {
        appearance: 'solid',
        variant: 'warning',
        class:
          'bg-[var(--atom-badge-warning-bg-high)] ' +
          'text-[var(--atom-badge-warning-fg-high)] ' +
          'border-[var(--atom-badge-warning-border-high)]',
      },
      {
        appearance: 'solid',
        variant: 'info',
        class:
          'bg-[var(--atom-badge-info-bg-high)] ' +
          'text-[var(--atom-badge-info-fg-high)] ' +
          'border-[var(--atom-badge-info-border-high)]',
      },
      {
        appearance: 'solid',
        variant: 'neutral',
        class:
          'bg-[var(--atom-badge-neutral-bg-high)] ' +
          'text-[var(--atom-badge-neutral-fg-high)] ' +
          'border-[var(--atom-badge-neutral-border-high)]',
      },
      {
        appearance: 'solid',
        variant: 'accent',
        class:
          'bg-[var(--atom-badge-accent-bg-high)] ' +
          'text-[var(--atom-badge-accent-fg-high)] ' +
          'border-[var(--atom-badge-accent-border-high)]',
      },

      // Outline appearance = transparent bg, keep border+text
      {
        appearance: 'outline',
        class: 'bg-transparent',
      },

      // Ghost appearance = no border, tinted text only
      {
        appearance: 'ghost',
        class: 'bg-transparent border-transparent',
      },

      // Pill + fullWidth → chip-style avatar
      {
        shape: 'pill',
        fullWidth: true,
        class: 'justify-start gap-2 pl-3 pr-4',
      },
    ],

    defaultVariants: {
      variant: 'neutral',
      appearance: 'subtle',
      shape: 'circle',
      size: 'md',
      fullWidth: false,
      withRing: false,
    },
  },
)

// Public unions
export type AvatarStatus =
  | 'neutral'
  | 'success'
  | 'warning'
  | 'danger'
  | 'info'
  | 'accent'

export type AvatarAppearance = 'subtle' | 'solid' | 'outline' | 'ghost'

export type AvatarSize = 'sm' | 'md' | 'lg'

export type AvatarShape = 'circle' | 'square' | 'pill'

export interface AvatarProps
  extends
    React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof avatarVariants> {
  /** Render via Radix Slot (e.g. wrap an <img> or <Link>) */
  asChild?: boolean
  /** Initials or fallback text when no image is provided */
  initials?: string
  /** Optional image source; if provided you can layer an <img> */
  src?: string
  /** Accessible label if you hide the text */
  'aria-label'?: string
}

export const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
  (
    {
      className,
      variant,
      appearance,
      size,
      shape,
      fullWidth,
      withRing,
      asChild,
      initials,
      src,
      children,
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : 'div'

    const content =
      children ??
      (src ? (
        // If you want image support, style this with object-cover etc.
        <img
          src={src}
          alt={props['aria-label'] || initials || 'AZ'} //
          className="w-full h-full object-cover"
        />
      ) : (
        <span>{initials}</span>
      ))

    return (
      <Comp
        ref={ref}
        data-slot="avatar"
        className={cn(
          avatarVariants({
            variant,
            appearance,
            size,
            shape,
            fullWidth,
            withRing,
          }),
          className,
        )}
        {...props}
      >
        {content}
      </Comp>
    )
  },
)

Avatar.displayName = 'Avatar'
