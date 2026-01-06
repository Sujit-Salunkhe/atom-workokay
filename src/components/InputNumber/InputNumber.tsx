// src/components/ui/number-input.tsx
import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../../lib/cn'
import { ChevronUp, ChevronDown } from 'lucide-react' // or your icon library

const numberInputVariants = cva(
  [
    // base layout
    'flex w-full rounded-md border px-3 py-2',
    'text-base md:text-sm',
    'outline-none disabled:cursor-not-allowed disabled:opacity-50',

    // base colors
    'border-[var(--atom-badge-archived-border)]',
    'placeholder:text-muted-foreground',

    // hover
    'hover:bg-[color-mix(in_srgb,var(--atom-badge-archived-border)_6%,transparent)]',
    'hover:border-[color-mix(in_srgb,var(--atom-badge-archived-border)_25%,transparent)]',

    // focus
    'focus-visible:border-[var(--atom-badge-archived-border)]',
    'focus-visible:ring-1 focus-visible:ring-[color-mix(in_srgb,var(--atom-badge-archived-border)_35%,transparent)]',
    'focus-visible:ring-offset-0',

    // invalid state
    'aria-invalid:border-destructive',
    'aria-invalid:ring-2 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40',

    // dark mode
    'dark:bg-input/30',

    // transitions
    'transition-[background-color,border-color,box-shadow,color]',

    // filled state
    'placeholder:text-muted-foreground',
    'placeholder-shown:border-[var(--atom-badge-archived-border)]',
    '[&:not(:placeholder-shown)]:border-[color-mix(in_srgb,var(--atom-badge-archived-border)_70%,var(--atom-primary))]',
    'focus-visible:border-[var(--atom-primary)]',

    // hide native spinners
    '[&::-webkit-inner-spin-button]:appearance-none',
    '[&::-webkit-outer-spin-button]:appearance-none',
  ].join(' '),
  {
    variants: {
      variant: {
        numeric: '',
        alphanumeric: '',
      },
      size: {
        sm: 'h-8 px-2 py-1 text-xs w-32',
        md: 'h-10 px-3 py-2 text-sm w-40',
        lg: 'h-12 px-4 py-3 text-base w-48',
      },
    },
    defaultVariants: {
      variant: 'numeric',
      size: 'md',
    },
  },
)

export type NumberInputVariant = NonNullable<
  VariantProps<typeof numberInputVariants>['variant']
>
export type NumberInputSize = NonNullable<
  VariantProps<typeof numberInputVariants>['size']
>

export interface NumberInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'onChange' | 'size'>,
    VariantProps<typeof numberInputVariants> {
  value?: string | number
  onChange?: (value: string) => void
  min?: number
  max?: number
  step?: number
  showSpinners?: boolean // NEW: Flag to show increment/decrement buttons
}

/**
 * Increment alphanumeric string - increments ONLY the letter part
 * A1 -> B1 -> C1 -> ... -> Z1 -> AA1
 */
const incrementAlphanumeric = (str: string): string => {
  if (!str) return 'A1'

  const match = str.match(/^([A-Za-z]+)(\d*)$/)
  if (!match) return str

  let letters = match[1].toUpperCase()
  const numbers = match[2]

  const chars = letters.split('')
  let carry = true
  
  for (let i = chars.length - 1; i >= 0 && carry; i--) {
    const code = chars[i].charCodeAt(0)
    
    if (code === 90) {
      chars[i] = 'A'
    } else {
      chars[i] = String.fromCharCode(code + 1)
      carry = false
    }
  }
  
  if (carry) {
    chars.unshift('A')
  }

  return chars.join('') + numbers
}

/**
 * Decrement alphanumeric string - decrements ONLY the letter part
 * C1 -> B1 -> A1 -> Z1
 */
const decrementAlphanumeric = (str: string): string => {
  if (!str) return 'A1'

  const match = str.match(/^([A-Za-z]+)(\d*)$/)
  if (!match) return str

  let letters = match[1].toUpperCase()
  const numbers = match[2]

  const chars = letters.split('')
  let borrow = true
  
  for (let i = chars.length - 1; i >= 0 && borrow; i--) {
    const code = chars[i].charCodeAt(0)
    
    if (code === 65) {
      chars[i] = 'Z'
    } else {
      chars[i] = String.fromCharCode(code - 1)
      borrow = false
    }
  }
  
  if (borrow && chars.length > 1) {
    chars.shift()
  }

  return chars.join('') + numbers
}

/**
 * Custom Number Input with keyboard arrow support and optional spinners
 */
export const NumberInput = React.forwardRef<HTMLInputElement, NumberInputProps>(
  (
    {
      className,
      variant = 'numeric',
      size,
      value,
      onChange,
      min,
      max,
      step = 1,
      placeholder,
      disabled,
      showSpinners = false,
      ...props
    },
    ref,
  ) => {
    const handleIncrement = () => {
      if (disabled) return
      
      const currentValue = String(value || '')

      if (variant === 'numeric') {
        const numValue = parseFloat(currentValue) || 0
        const newValue = numValue + step
        const finalValue = max !== undefined ? Math.min(newValue, max) : newValue
        onChange?.(String(finalValue))
      } else if (variant === 'alphanumeric') {
        const newValue = incrementAlphanumeric(currentValue)
        onChange?.(newValue)
      }
    }

    const handleDecrement = () => {
      if (disabled) return
      
      const currentValue = String(value || '')

      if (variant === 'numeric') {
        const numValue = parseFloat(currentValue) || 0
        const newValue = numValue - step
        const finalValue = min !== undefined ? Math.max(newValue, min) : newValue
        onChange?.(String(finalValue))
      } else if (variant === 'alphanumeric') {
        const newValue = decrementAlphanumeric(currentValue)
        onChange?.(newValue)
      }
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (disabled) return

      if (e.key === 'ArrowUp') {
        e.preventDefault()
        handleIncrement()
      } else if (e.key === 'ArrowDown') {
        e.preventDefault()
        handleDecrement()
      }

      props.onKeyDown?.(e)
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value

      if (variant === 'numeric') {
        if (newValue === '' || /^-?\d*\.?\d*$/.test(newValue)) {
          onChange?.(newValue)
        }
      } else if (variant === 'alphanumeric') {
        if (newValue === '' || /^[A-Za-z0-9]*$/.test(newValue)) {
          onChange?.(newValue.toUpperCase())
        }
      }
    }

    // Size-based icon dimensions
    const iconSize = size === 'sm' ? 12 : size === 'lg' ? 16 : 14

    if (showSpinners) {
      return (
        <div className="relative inline-flex items-center">
          <input
            ref={ref}
            type="text"
            inputMode={variant === 'numeric' ? 'numeric' : 'text'}
            data-slot="number-input"
            value={value}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            placeholder={placeholder ?? ' '}
            disabled={disabled}
            className={cn(
              numberInputVariants({ variant, size }),
              'pr-8', // Add padding for spinner buttons
              className
            )}
            {...props}
          />
          <div className="absolute right-0 top-0 bottom-0 flex flex-col border-l border-[var(--atom-badge-archived-border)]">
            <button
              type="button"
              onClick={handleIncrement}
              disabled={disabled}
              aria-label="Increment"
              className={cn(
                'flex items-center justify-center flex-1 px-2',
                'hover:bg-[color-mix(in_srgb,var(--atom-badge-archived-border)_10%,transparent)]',
                'active:bg-[color-mix(in_srgb,var(--atom-badge-archived-border)_20%,transparent)]',
                'disabled:opacity-50 disabled:cursor-not-allowed',
                'transition-colors border-b border-[var(--atom-badge-archived-border)]',
                'rounded-tr-md'
              )}
            >
              <ChevronUp size={iconSize} className="text-muted-foreground" />
            </button>
            <button
              type="button"
              onClick={handleDecrement}
              disabled={disabled}
              aria-label="Decrement"
              className={cn(
                'flex items-center justify-center flex-1 px-2',
                'hover:bg-[color-mix(in_srgb,var(--atom-badge-archived-border)_10%,transparent)]',
                'active:bg-[color-mix(in_srgb,var(--atom-badge-archived-border)_20%,transparent)]',
                'disabled:opacity-50 disabled:cursor-not-allowed',
                'transition-colors rounded-br-md'
              )}
            >
              <ChevronDown size={iconSize} className="text-muted-foreground" />
            </button>
          </div>
        </div>
      )
    }

    return (
      <input
        ref={ref}
        type="text"
        inputMode={variant === 'numeric' ? 'numeric' : 'text'}
        data-slot="number-input"
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder={placeholder ?? ' '}
        disabled={disabled}
        className={cn(numberInputVariants({ variant, size }), className)}
        {...props}
      />
    )
  },
)

NumberInput.displayName = 'NumberInput'
