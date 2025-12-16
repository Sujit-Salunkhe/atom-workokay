// src/components/checkbox-card/CheckboxCard.tsx
import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { Slot } from '@radix-ui/react-slot'
import { cn } from '../../lib/cn'

export const checkboxCardVariants = cva(
  // base layout: horizontal row with custom checkbox + label
  'flex items-center gap-2 rounded-md border bg-[var(--atom-card-bg)] ' +
    'border-[var(--atom-card-border)] px-3 py-2 ' +
    'transition-colors duration-150 ease-in-out cursor-pointer select-none',
  {
    variants: {
      /** Semantic tone, aligned with StatCard */
      variant: {
        neutral: 'text-[var(--atom-text)]',
        success: 'text-[var(--atom-success)]',
        warning: 'text-[var(--atom-warning)]',
        danger: 'text-[var(--atom-error)]',
        info: 'text-[var(--atom-info)]',
        accent: 'text-[var(--atom-accent)]',
        primary: 'text-[var(--atom-primary)]',
      },

      /** Density / size of the row */
      size: {
        sm: 'h-8 text-xs',
        md: 'h-9 text-sm',
        lg: 'h-10 text-base',
      },

      /** Visual style, same idea as StatCard */
      appearance: {
        elevated: 'shadow-sm',
        outlined: 'shadow-none bg-transparent',
        ghost: 'shadow-none bg-transparent border-transparent',
        soft: 'shadow-none bg-[var(--atom-card-bg)] border-none',
      },

      /** Stretch to fill container width */
      fullWidth: {
        true: 'w-full',
        false: '',
      },

      /** Disabled state */
      disabled: {
        true: 'opacity-60 cursor-not-allowed',
        false: '',
      },
    },

    compoundVariants: [
      {
        appearance: 'outlined',
        class: 'bg-transparent',
      },
      { 
        appearance: 'ghost',
        class:
          'bg-transparent border-transparent hover:bg-[var(--atom-card-bg)]',
      },
      {
        appearance: 'soft',
        class: 'shadow-none bg-[var(--atom-card-bg)] border-none',
      },
    ],

    defaultVariants: {
      variant: 'neutral',
      size: 'md',
      appearance: 'elevated',
      fullWidth: false,
      disabled: false,
    },
  },
)

export type CheckboxCardVariant =
  | 'neutral'
  | 'success'
  | 'warning'
  | 'danger'
  | 'info'
  | 'accent'
  | 'primary'

export type CheckboxCardSize = 'sm' | 'md' | 'lg'

export type CheckboxCardAppearance = 'elevated' | 'outlined' | 'ghost' | 'soft'

export interface CheckboxCardProps
  extends Omit<React.HTMLAttributes<HTMLLabelElement>, 'onChange'>,
    VariantProps<typeof checkboxCardVariants> {
  /** Label like "Incoming", "Validated" */
  label: string
  /** Controlled checked state */
  checked?: boolean
  /** Called with new checked state */
  onCheckedChange?: (checked: boolean) => void
  /** Optional description under the label */
  description?: React.ReactNode
  /** Optional leading icon */
  icon?: React.ReactNode
  /** Use Slot to render as custom label wrapper */
  asChild?: boolean
  /** Native input props */
  name?: string
  value?: string
  disabled?: boolean
}

export const CheckboxCard = React.forwardRef<HTMLLabelElement, CheckboxCardProps>(
  (
    {
      className,
      variant,
      size,
      appearance,
      fullWidth,
      disabled,
      label,
      description,
      icon,
      checked = false,
      onCheckedChange,
      asChild,
      name,
      value,
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : 'label'

    const handleToggle = (e: React.MouseEvent) => {
      e.preventDefault()
      if (disabled) return
      onCheckedChange?.(!checked)
    }

    // checkbox square size based on row size
    const boxSize =
      size === 'sm' ? 'h-3.5 w-3.5' : size === 'lg' ? 'h-4.5 w-4.5' : 'h-4 w-4'

    return (
      <Comp
        ref={ref}
        data-slot="checkbox-card"
        onClick={handleToggle}
        className={cn(
          checkboxCardVariants({
            variant,
            size,
            appearance,
            fullWidth,
            disabled: disabled ? true : false,
          }),
          className,
        )}
        {...props}
      >
        {/* visual checkbox */}
        <span
          className={cn(
            'flex items-center justify-center rounded border bg-white ' +
              'transition-colors duration-150 ease-in-out',
            boxSize,
            checked
              ? 'bg-current text-white border-current'
              : 'border-[var(--atom-card-border)]',
          )}
          aria-hidden="true"
        >
          {checked && (
            <svg
              viewBox="0 0 16 16"
              className="h-3 w-3"
              aria-hidden="true"
              focusable="false"
            >
              <polyline
                points="3 9 6 12 13 4"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
        </span>

        {/* text content */}
        <div className="flex flex-1 items-center justify-between gap-2">
          <div className="flex flex-col">
            <span className="text-xs font-medium">{label}</span>
            {description && (
              <span className="text-[11px] text-[var(--atom-text-muted)]">
                {description}
              </span>
            )}
          </div>
          {icon && (
            <span className="shrink-0 text-[11px] opacity-80">{icon}</span>
          )}
        </div>

        {/* real checkbox for forms & a11y */}
        <input
          type="checkbox"
          className="sr-only"
          checked={checked}
          onChange={(e) => onCheckedChange?.(e.target.checked)}
          name={name}
          value={value}
          disabled={disabled}
        />
      </Comp>
    )
  },
)

CheckboxCard.displayName = 'CheckboxCard'

