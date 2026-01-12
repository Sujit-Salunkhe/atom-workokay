// src/components/ui/number-input.tsx
import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../../lib/cn'
import { ChevronUp, ChevronDown } from 'lucide-react'

const numberInputVariants = cva(
  [
    // base layout
    'flex w-full rounded-md border px-3 py-2',
    'text-base md:text-sm',
    'outline-none disabled:cursor-not-allowed disabled:opacity-50',

    // base colors
    'border-[var(--atom-theme-border-primary)]',
    'placeholder:text-muted-foreground',

    // hover
    'hover:bg-[color-mix(in_srgb,var(--atom-theme-border-primary)_6%,transparent)]',
    'hover:border-[color-mix(in_srgb,var(--atom-theme-border-primary)_25%,transparent)]',

    // focus
    'focus-visible:border-[var(--atom-theme-border-primary)]',
    'focus-visible:ring-1 focus-visible:ring-[color-mix(in_srgb,var(--atom-theme-border-primary)_35%,transparent)]',
    'focus-visible:ring-offset-0',

    // invalid state
    'aria-[invalid=true]:border-destructive',
    'aria-[invalid=true]:ring-2 aria-[invalid=true]:ring-destructive/20',
    'dark:aria-[invalid=true]:ring-destructive/40',

    // dark mode
    'dark:bg-input/30',

    // transitions
    'transition-[background-color,border-color,box-shadow,color]',

    // filled state
    'placeholder:text-muted-foreground',
    'placeholder-shown:border-[var(--atom-theme-border-primary)]',
    '[&:not(:placeholder-shown)]:border-[color-mix(in_srgb,var(--atom-theme-border-primary)_70%,var(--atom-primary))]',
    'focus-visible:border-[var(--atom-primary)]',

    // hide native spinners
    '[&::-webkit-inner-spin-button]:appearance-none',
    '[&::-webkit-outer-spin-button]:appearance-none',
    '[&::-webkit-inner-spin-button]:m-0',
    '[&::-webkit-outer-spin-button]:m-0',
  ].join(' '),
  {
    variants: {
      variant: {
        numeric: '',
        alphanumeric: '',
        alpha: '',
      },
      size: {
        sm: 'h-9 px-2 py-1 text-xs w-38',
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
  extends Omit<
      React.InputHTMLAttributes<HTMLInputElement>,
      'type' | 'onChange' | 'size' | 'value'
    >,
    VariantProps<typeof numberInputVariants> {
  value?: string | number
  onChange?: (value: string) => void
  min?: number
  max?: number
  step?: number
  showSpinners?: boolean
  decimalPlaces?: number
}

const formatDecimal = (value: string, maxDecimals: number = 3): string => {
  if (!value || value === '' || value === '-') return value

  const parts = value.split('.')
  if (parts.length === 1) return value

  const integerPart = parts[0]
  const decimalPart = parts[1]

  const limitedDecimal = decimalPart.slice(0, maxDecimals)

  return `${integerPart}.${limitedDecimal}`
}

const incrementAlpha = (str: string): string => {
  if (!str) return 'A'

  const match = str.match(/^([A-Za-z]+)$/)
  if (!match) return str

  const letters = match[1].toUpperCase()
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

  return chars.join('')
}

const decrementAlpha = (str: string): string => {
  if (!str) return 'A'

  const match = str.match(/^([A-Za-z]+)$/)
  if (!match) return str

  const letters = match[1].toUpperCase()
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

  return chars.join('')
}

const incrementAlphanumeric = (str: string): string => {
  if (!str) return 'A'

  const match = str.match(/^([A-Za-z]+)(\d*)$/)
  if (!match) return str

  const letters = match[1].toUpperCase()
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

const decrementAlphanumeric = (str: string): string => {
  if (!str) return 'A'

  const match = str.match(/^([A-Za-z]+)(\d*)$/)
  if (!match) return str

  const letters = match[1].toUpperCase()
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

export const NumberInput = React.forwardRef<HTMLInputElement, NumberInputProps>(
  (
    {
      className,
      variant = 'numeric',
      size = 'md',
      value,
      onChange,
      min,
      max,
      step = 1,
      placeholder,
      disabled = false,
      showSpinners = false,
      decimalPlaces = 3,
      ...props
    },
    ref,
  ) => {
    const handleIncrement = React.useCallback(() => {
      if (disabled) return

      const currentValue = String(value ?? '')

      if (variant === 'numeric') {
        const numValue = parseFloat(currentValue) || 0
        const newValue = numValue + step
        const finalValue = max !== undefined ? Math.min(newValue, max) : newValue
        const formatted = formatDecimal(String(finalValue), decimalPlaces)
        onChange?.(formatted)
      } else if (variant === 'alphanumeric') {
        const newValue = incrementAlphanumeric(currentValue)
        onChange?.(newValue)
      } else if (variant === 'alpha') {
        const newValue = incrementAlpha(currentValue)
        onChange?.(newValue)
      }
    }, [disabled, value, variant, step, max, decimalPlaces, onChange])

    const handleDecrement = React.useCallback(() => {
      if (disabled) return

      const currentValue = String(value ?? '')

      if (variant === 'numeric') {
        const numValue = parseFloat(currentValue) || 0
        const newValue = numValue - step
        const finalValue = min !== undefined ? Math.max(newValue, min) : newValue
        const formatted = formatDecimal(String(finalValue), decimalPlaces)
        onChange?.(formatted)
      } else if (variant === 'alphanumeric') {
        const newValue = decrementAlphanumeric(currentValue)
        onChange?.(newValue)
      } else if (variant === 'alpha') {
        const newValue = decrementAlpha(currentValue)
        onChange?.(newValue)
      }
    }, [disabled, value, variant, step, min, decimalPlaces, onChange])

    const handleKeyDown = React.useCallback(
      (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (disabled) return

        if (e.key === 'ArrowUp') {
          e.preventDefault()
          handleIncrement()
        } else if (e.key === 'ArrowDown') {
          e.preventDefault()
          handleDecrement()
        }

        props.onKeyDown?.(e)
      },
      [disabled, handleIncrement, handleDecrement, props],
    )

    const handleChange = React.useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value

        if (variant === 'numeric') {
          if (newValue === '' || /^-?\d*\.?\d*$/.test(newValue)) {
            const formatted = formatDecimal(newValue, decimalPlaces)
            onChange?.(formatted)
          }
        } else if (variant === 'alphanumeric') {
          if (newValue === '' || /^[A-Za-z0-9]*$/.test(newValue)) {
            onChange?.(newValue.toUpperCase())
          }
        } else if (variant === 'alpha') {
          if (newValue === '' || /^[A-Za-z]*$/.test(newValue)) {
            onChange?.(newValue.toUpperCase())
          }
        }
      },
      [variant, decimalPlaces, onChange],
    )

    const spinnerConfig = React.useMemo(() => {
      switch (size) {
        case 'sm':
          return {
            iconSize: 14,
            spinnerWidth: 'w-[20px]',
            inputPadding: 'pr-[22px]',
          }
        case 'lg':
          return {
            iconSize: 18,
            spinnerWidth: 'w-[28px]',
            inputPadding: 'pr-[30px]',
          }
        default: // md
          return {
            iconSize: 16,
            spinnerWidth: 'w-[24px]',
            inputPadding: 'pr-[26px]',
          }
      }
    }, [size])

    const inputMode = React.useMemo(() => {
      return variant === 'numeric' ? 'numeric' : 'text'
    }, [variant])

    if (showSpinners) {
      return (
        <div className="relative w-full">
          <input
            ref={ref}
            type="text"
            inputMode={inputMode}
            data-slot="number-input"
            data-variant={variant}
            value={value ?? ''}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            placeholder={placeholder ?? ' '}
            disabled={disabled}
            aria-valuemin={min}
            aria-valuemax={max}
            role="spinbutton"
            className={cn(
              numberInputVariants({ variant, size }),
              spinnerConfig.inputPadding,
              className,
            )}
            {...props}
          />
          <div
            className={cn(
              'absolute top-px right-px bottom-px flex flex-col',
              'border-l border-(--atom-theme-border-primary)',
              'rounded-r-[calc(0.375rem-1px)] overflow-hidden',
              spinnerConfig.spinnerWidth,
            )}
            role="group"
            aria-label="Increment and decrement controls"
          >
            <button
              type="button"
              onClick={handleIncrement}
              disabled={disabled || (max !== undefined && Number(value) >= max)}
              aria-label="Increment value"
              tabIndex={-1}
              className={cn(
                'flex items-center justify-center flex-1',
                'hover:bg-[color-mix(in_srgb,var(--atom-theme-border-primary)_10%,transparent)]',
                'active:bg-[color-mix(in_srgb,var(--atom-theme-border-primary)_20%,transparent)]',
                'disabled:opacity-50 disabled:cursor-not-allowed',
                'transition-colors border-b border-(--atom-theme-border-primary)',
                'focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-(--atom-primary) focus-visible:ring-inset',
                'cursor-pointer',
              )}
            >
              <ChevronUp
                size={spinnerConfig.iconSize}
                className="text-muted-foreground"
                strokeWidth={2}
                aria-hidden="true"
              />
            </button>
            <button
              type="button"
              onClick={handleDecrement}
              disabled={disabled || (min !== undefined && Number(value) <= min)}
              aria-label="Decrement value"
              tabIndex={-1}
              className={cn(
                'flex items-center justify-center flex-1',
                'hover:bg-[color-mix(in_srgb,var(--atom-theme-border-primary)_10%,transparent)]',
                'active:bg-[color-mix(in_srgb,var(--atom-theme-border-primary)_20%,transparent)]',
                'disabled:opacity-50 disabled:cursor-not-allowed',
                'transition-colors',
                'focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-(--atom-primary) focus-visible:ring-inset',
                'cursor-pointer',
              )}
            >
              <ChevronDown
                size={spinnerConfig.iconSize}
                className="text-muted-foreground"
                strokeWidth={2}
                aria-hidden="true"
              />
            </button>
          </div>
        </div>
      )
    }

    return (
      <input
        ref={ref}
        type="text"
        inputMode={inputMode}
        data-slot="number-input"
        data-variant={variant}
        value={value ?? ''}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder={placeholder ?? ' '}
        disabled={disabled}
        aria-valuemin={min}
        aria-valuemax={max}
        className={cn(numberInputVariants({ variant, size }), className)}
        {...props}
      />
    )
  },
)

NumberInput.displayName = 'NumberInput'
