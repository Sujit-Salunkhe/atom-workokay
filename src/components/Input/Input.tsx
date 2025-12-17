import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../../lib/cn'

const inputVariants = cva(
  [
    'block w-full rounded-md outline-none leading-none',
    'bg-[var(--atom-input-bg)] text-[var(--atom-input-fg)]',
    'border border-[var(--atom-badge-archived-border)]',
    'transition-[background-color,border-color,box-shadow,color] duration-150 ease-in-out',

    // placeholder / caret / selection
    'placeholder:text-[color-mix(in_srgb,var(--atom-input-fg)_55%,transparent)]',
    'caret-[var(--atom-primary)]',
    'selection:bg-[color-mix(in_srgb,var(--atom-primary)_30%,transparent)]',

    // hover/focus
    'hover:bg-[color-mix(in_srgb,var(--atom-primary)_1%,transparent)]',
    'hover:border-[color-mix(in_srgb,var(--atom-input-border)_70%,var(--atom-primary)_30%)]',
    'focus-visible:border-[var(--atom-input-focus,var(--atom-primary))]',
    'focus-visible:ring-1 focus-visible:ring-[color-mix(in_srgb,var(--atom-primary)_35%,transparent)]',
    'focus-visible:ring-offset-0',

    // disabled / readonly
    'disabled:opacity-60 disabled:cursor-not-allowed',
    'disabled:hover:bg-[var(--atom-input-bg)] disabled:hover:border-[var(--atom-input-border)]',
    'read-only:bg-[color-mix(in_srgb,var(--atom-input-bg)_90%,var(--atom-border)_10%)] read-only:cursor-default',
    'read-only:hover:bg-[color-mix(in_srgb,var(--atom-input-bg)_90%,var(--atom-border)_10%)]',

    //filled state
    'placeholder:text-muted-foreground ' +
    '[&:not(:placeholder-shown)]:border-[color-mix(in_srgb,var(--atom-badge-archived-border)_70%,var(--atom-primary))]' +
    'focus-visible:border-[var(--atom-primary)]',
  ].join(' '),
  {
    variants: {
      size: {
        sm: 'h-9 px-3 text-sm',
        md: 'h-10 px-3.5 text-sm',
        lg: 'h-11 px-4 text-base',
      },
      tone: {
        default: '',
        invalid: 'border-[var(--atom-error)] focus-visible:border-[var(--atom-error)] [&:not(:placeholder-shown)]:border-[color-mix(in_srgb,var(--atom-error)_1%,transparent]',
        success: 'border-[var(--atom-success)]',
      },
      hasLeft: { true: 'pl-9' },
      hasRight: { true: 'pr-9' },
    },
    defaultVariants: { size: 'md', tone: 'default' },
  },
)

export interface InputProps
  extends
    Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>,
    VariantProps<typeof inputVariants> {
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  hint?: string
  errorText?: string
  loading?: boolean
  id?: string
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      size,
      tone = 'default',
      leftIcon,
      rightIcon,
      hint,
      errorText,
      loading = false,
      id: idProp,
      placeholder,
      ...props
    },
    ref,
  ) => {
    const reactId = React.useId()
    const inputId = idProp ?? `inp_${reactId}`

    const hasLeft = !!leftIcon
    const hasRight = !!rightIcon || loading

    const hintId = hint ? `${inputId}__hint` : undefined
    const errId = errorText ? `${inputId}__err` : undefined

    const describedBy = [hintId, errId].filter(Boolean).join(' ') || undefined

    const wrapW = size === 'lg' ? 'w-10' : size === 'sm' ? 'w-8' : 'w-9'
    const svgSize =
      size === 'lg'
        ? '[&>svg]:w-5 [&>svg]:h-5'
        : size === 'sm'
          ? '[&>svg]:w-4 [&>svg]:h-4'
          : '[&>svg]:w-5 [&>svg]:h-5'

    const toneClass =
      tone === 'invalid'
        ? [  
            'border-[color-mix(in_srgb,var(--atom-error)_35%,transparent)]',
            'hover:bg-[color-mix(in_srgb,var(--atom-error)_1%,transparent)]',
            'hover:border-[color-mix(in_srgb,var(--atom-input-border)_70%,var(--atom-error)_30%)]',
            'focus-visible:border-[color-mix(in_srgb,var(--atom-error)_40%,transparent)]',
            'focus-visible:ring-[color-mix(in_srgb,var(--atom-error)_15%,transparent)]',
          ].join(' ')
        : tone === 'success'
          ? [
              'hover:bg-[color-mix(in_srgb,var(--atom-success)_1%,transparent)]',
              'hover:border-[color-mix(in_srgb,var(--atom-input-border)_40%,var(--atom-success)_30%)]',
              'focus-visible:border-[var(--atom-success)]',
              'focus-visible:ring-[color-mix(in_srgb,var(--atom-success)_15%,transparent)]',
            ].join(' ')
          : ''

    const isInvalid = tone === 'invalid' || !!errorText

    return (
      <div>
        <div className="relative">
          {hasLeft && (
            <span
              className={cn(
                'pointer-events-none absolute left-0 top-1/2 -translate-y-1/2 flex items-center justify-center',
                wrapW,
              )}
              aria-hidden="true"
            >
              <span
                className={cn(
                  svgSize,
                  'text-[var(--atom-muted)] [&>svg]:fill-current [&>svg]:stroke-current',
                )}
              >
                {leftIcon}
              </span>
            </span>
          )}

          {hasRight && (
            <span
              className={cn(
                'absolute right-0 top-1/2 -translate-y-1/2 flex items-center justify-center',
                wrapW,
              )}
            >
              <span
                className={cn(
                  svgSize,
                  'text-[var(--atom-muted)] [&>svg]:fill-current [&>svg]:stroke-current',
                )}
              >
                {loading ? (
                  <svg
                    viewBox="0 0 24 24"
                    className="animate-spin"
                    fill="none"
                    stroke="currentColor"
                  >
                    <circle
                      cx="12"
                      cy="12"
                      r="9"
                      strokeOpacity=".2"
                      strokeWidth="3"
                    />
                    <path
                      d="M21 12a9 9 0 0 1-9 9"
                      strokeWidth="3"
                      strokeLinecap="round"
                    />
                  </svg>
                ) : (
                  rightIcon
                )}
              </span>
            </span>
          )}

          <input
            id={inputId}
            ref={ref}
            className={cn(
              inputVariants({ size, tone, hasLeft, hasRight }),
              toneClass,
              className,
            )}
            aria-invalid={isInvalid || undefined}
            aria-errormessage={errId} // dedicated error reference [web:612]
            aria-describedby={describedBy} // hint + error description [web:611]
            aria-readonly={props.readOnly || undefined}
            aria-busy={loading || undefined}
            placeholder={placeholder ? placeholder : ' '}
            {...props}
          />
        </div>

        {(hint || errorText) && (
          <div className="mt-1 text-xs leading-snug">
            {errorText && (
              <p id={errId} className="text-[var(--atom-error)]">
                {errorText}
              </p>
            )}
            {hint && (
              <p id={hintId} className="text-[var(--atom-text-muted)]">
                {hint}
              </p>
            )}
          </div>
        )}
      </div>
    )
  },
)
Input.displayName = 'Input'
