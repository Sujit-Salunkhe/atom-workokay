import * as React from 'react'
import { cva } from 'class-variance-authority'
import { Slot } from '@radix-ui/react-slot'
import { cn } from '../../lib/cn'

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap select-none ' +
    'disabled:opacity-50 disabled:pointer-events-none ' +
    'rounded-md font-medium leading-none focus:outline-none ' +
    'focus-visible:ring-2 focus-visible:ring-offset-2 ' +
    'focus-visible:ring-[var(--atom-ring-color)] focus-visible:ring-offset-[var(--atom-ring-offset)] ' +
    'transition-colors transition-transform duration-150 ease-in-out ' +
    'relative overflow-hidden isolate ' +
    '[&>svg]:fill-current [&>svg]:stroke-current ' +
    'motion-reduce:transform-none motion-reduce:transition-none',
  {
    variants: {
      variant: {
        primary:
          'text-[var(--atom-button-fg)] bg-[var(--atom-button-bg)] hover:bg-[var(--atom-button-bg-hover)]',
        ghost:
          'text-[var(--atom-button-ghost-fg)] bg-[var(--atom-button-ghost-bg)] hover:bg-[var(--atom-button-ghost-hover-bg)]',

        // Semantic solid variants
        success:
          'text-[var(--atom-button-success-fg)] bg-[var(--atom-button-success-bg)] hover:bg-[var(--atom-button-success-bg-hover)]',
        danger:
          'text-[var(--atom-button-danger-fg)] bg-[var(--atom-button-danger-bg)] hover:bg-[var(--atom-button-danger-bg-hover)]',
        warning:
          'text-[var(--atom-button-warning-fg)] bg-[var(--atom-button-warning-bg)] hover:bg-[var(--atom-button-warning-bg-hover)]',
        info: 'text-[var(--atom-button-info-fg)] bg-[var(--atom-button-info-bg)] hover:bg-[var(--atom-button-info-bg-hover)]',

        // Round icon buttons (transparent by default)
        icon: 'rounded-full p-0 text-[var(--atom-button-ghost-fg)] bg-transparent hover:bg-[var(--atom-button-ghost-hover-bg)]',
        iconGhost:
          'rounded-full p-0 text-[var(--atom-button-ghost-fg)] bg-transparent hover:bg-[var(--atom-button-ghost-hover-bg)]',

        // Square icon buttons (rounded-md)
        iconSquare:
          'rounded-md p-0 text-[var(--atom-button-ghost-fg)] bg-transparent hover:bg-[var(--atom-button-ghost-hover-bg)]',
        iconSquareGhost:
          'rounded-md p-0 text-[var(--atom-button-ghost-fg)] bg-transparent hover:bg-[var(--atom-button-ghost-hover-bg)]',

        // Outlined secondary
        secondary:
          'border border-[var(--atom-border)] text-[var(--atom-primary)] bg-transparent ' +
          'hover:border-[color-mix(in srgb, var(--atom-primary) 80%, black)] ' +
          'hover:text-[color-mix(in srgb, var(--atom-primary) 90%, black)] ' +
          'hover:bg-[var(--atom-button-ghost-hover-bg)] hover:text-[var(--atom-primary)]',
      },
      size: {
        sm: 'h-8 px-3 text-sm [&>svg]:size-4',
        md: 'h-10 px-4 text-sm [&>svg]:size-5',
        lg: 'h-12 px-5 text-base [&>svg]:size-6', 
      },
      fullWidth: { true: 'w-full' },
    },
    compoundVariants: [
      { variant: 'icon', size: 'sm', class: 'w-8 h-8 !px-0 aspect-square' },
      { variant: 'icon', size: 'md', class: 'w-10 h-10 !px-0 aspect-square' },
      { variant: 'icon', size: 'lg', class: 'w-12 h-12 !px-0 aspect-square' },

      {
        variant: 'iconGhost',
        size: 'sm',
        class: 'w-8 h-8 !px-0 aspect-square',
      },
      {
        variant: 'iconGhost',
        size: 'md',
        class: 'w-10 h-10 !px-0 aspect-square',
      },
      {
        variant: 'iconGhost',
        size: 'lg',
        class: 'w-12 h-12 !px-0 aspect-square',
      },

      {
        variant: 'iconSquare',
        size: 'sm',
        class: 'w-8 h-8 !px-0 aspect-square',
      },
      {
        variant: 'iconSquare',
        size: 'md',
        class: 'w-10 h-10 !px-0 aspect-square',
      },
      {
        variant: 'iconSquare',
        size: 'lg',
        class: 'w-12 h-12 !px-0 aspect-square',
      },

      {
        variant: 'iconSquareGhost',
        size: 'sm',
        class: 'w-8 h-8 !px-0 aspect-square',
      },
      {
        variant: 'iconSquareGhost',
        size: 'md',
        class: 'w-10 h-10 !px-0 aspect-square',
      },
      {
        variant: 'iconSquareGhost',
        size: 'lg',
        class: 'w-12 h-12 !px-0 aspect-square',
      },

      {
        variant: 'icon',
        class: 'hover:scale-105 active:scale-95 hover:opacity-90',
      },
      {
        variant: 'iconGhost',
        class: 'hover:scale-105 active:scale-95 hover:opacity-90',
      },
      {
        variant: 'iconSquare',
        class: 'hover:scale-105 active:scale-95 hover:opacity-90',
      },
      {
        variant: 'iconSquareGhost',
        class: 'hover:scale-105 active:scale-95 hover:opacity-90',
      },
    ],
    defaultVariants: { variant: 'primary', size: 'md' },
  },
)

// Explicit unions – these are what consumers will see
export type ButtonVariant =
  | 'primary'
  | 'ghost'
  | 'success'
  | 'danger'
  | 'warning'
  | 'info'
  | 'icon'
  | 'iconGhost'
  | 'iconSquare'
  | 'iconSquareGhost'
  | 'secondary'

export type ButtonSize = 'sm' | 'md' | 'lg'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Render as child element via Radix Slot (e.g. <a>, <Link>) */
  asChild?: boolean
  /** Enable/disable ripple ink (true by default) */
  ripple?: boolean
  /** Optional toggle state hint for styling */
  'data-pressed'?: 'on' | 'off' | boolean

  // Variants exposed to consumers
  variant?: ButtonVariant
  size?: ButtonSize
  fullWidth?: boolean
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      fullWidth,
      asChild,
      ripple = true,
      onPointerDown,
      disabled,
      type,
      ...props
    },
    ref,
  ) => {
    const isAsChild = !!asChild
    const Comp = isAsChild ? Slot : 'button'
    const btnRef = React.useRef<HTMLButtonElement | null>(null)

    // Styling/a11y helpers
    const dataDisabled = disabled ? '' : undefined

    // Default to type="button" to avoid accidental form submits in forms
    const resolvedType = isAsChild ? undefined : (type ?? 'button')

    const handlePointerDown = (e: React.PointerEvent<HTMLButtonElement>) => {
      onPointerDown?.(e)
      // Only left button, not disabled, and only when ripple enabled
      if (!ripple || disabled || e.button !== 0) return

      const el = btnRef.current

      if (!el) return

      const rect = el.getBoundingClientRect()
      const maxDim = Math.max(rect.width, rect.height)
      const factor = size === 'sm' ? 0.5 : size === 'lg' ? 0.7 : 0.6
      const radius = maxDim * factor

      const x = e.clientX - rect.left - radius
      const y = e.clientY - rect.top - radius

      const span = document.createElement('span')
      span.className = 'atom-ripple'
      span.style.width = `${radius * 2}px`
      span.style.height = `${radius * 2}px`
      span.style.left = `${x}px`
      span.style.top = `${y}px`

      // Transparent-like variants use brand-colored ink
      const isGhostLike =
        (variant ?? 'primary') === 'ghost' ||
        variant === 'icon' ||
        variant === 'iconGhost' ||
        variant === 'iconSquare' ||
        variant === 'iconSquareGhost' ||
        variant === 'secondary'

      const color = getComputedStyle(el)
        .getPropertyValue(
          isGhostLike
            ? '--atom-ripple-color-ghost'
            : '--atom-ripple-color-solid',
        )
        .trim()
      span.style.background = color || 'currentColor'

      el.appendChild(span)
      span.addEventListener('animationend', () => span.remove(), {
        once: true,
      })
    }

    return (
      <Comp
        {...props}
        // a11y + styling
        data-disabled={dataDisabled}
        aria-disabled={isAsChild && disabled ? true : undefined}
        type={resolvedType}
        ref={(node: HTMLButtonElement | null) => {
          btnRef.current = node
          if (typeof ref === 'function') ref(node)
          else if (ref)
            (ref as React.MutableRefObject<HTMLButtonElement | null>).current =
              node
        }}
        onPointerDown={handlePointerDown}
        className={cn(buttonVariants({ variant, size, fullWidth }), className)}
        // only apply real disabled attribute for native button
        disabled={isAsChild ? undefined : disabled}
      />
    )
  },
)

Button.displayName = 'Button'
