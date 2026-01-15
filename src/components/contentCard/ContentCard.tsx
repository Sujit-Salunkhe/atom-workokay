// src/components/ui/content-card.tsx
import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../../lib/cn'

const contentCardVariants = cva(
  'flex flex-col rounded-md border p-4 outline-none select-text text-sm md:text-sm transition-[background-color,border-color,box-shadow] duration-200',
  {
    variants: {
      variant: {
        default:
          'bg-(--atom-theme-bg) border-(--atom-theme-border) text-(--atom-theme-text-primary)',

        info: 'bg-[color-mix(in_srgb,var(--atom-info)_8%,transparent)]  border-[color-mix(in_srgb,var(--atom-info)_25%,transparent)] text-[color-mix(in_srgb,var(--atom-info)_90%,black)] border-(--atom-theme-border)',

        success:
          'bg-[color-mix(in_srgb,var(--atom-success)_8%,transparent)] border-[color-mix(in_srgb,var(--atom-success)_25%,transparent)] text-[color-mix(in_srgb,var(--atom-success)_90%,black)] border-(--atom-theme-border)',

        warning:
          'bg-[color-mix(in_srgb,var(--atom-warning)_8%,transparent)] border-[color-mix(in_srgb,var(--atom-warning)_25%,transparent)] text-[color-mix(in_srgb,var(--atom-warning)_90%,black)] border-(--atom-theme-border)',

        error:
          'bg-[color-mix(in_srgb,var(--atom-error)_8%,transparent)] border-[color-mix(in_srgb,var(--atom-error)_25%,transparent)] text-[color-mix(in_srgb,var(--atom-error)_90%,black)] border-(--atom-theme-border)',

        neutral:
          'bg-[color-mix(in_srgb,var(--atom-badge-archived-border)_6%,transparent)] border-[color-mix(in_srgb,var(--atom-badge-archived-border)_75%,transparent)] text-muted-foreground border-(--atom-theme-border)',
     
      },

      size: {
        sm: 'p-3 text-xs gap-2 ',
        md: 'p-4 text-sm gap-3 ',
        lg: 'p-6 text-base gap-4 ',
      },
    },

    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  },
)

export type ContentCardVariant = NonNullable<
  VariantProps<typeof contentCardVariants>['variant']
>

export type ContentCardSize = NonNullable<
  VariantProps<typeof contentCardVariants>['size']
>

export interface ContentCardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof contentCardVariants> {
  title?: string
  icon?: React.ReactNode
  children: React.ReactNode
  footer?: React.ReactNode
}

export const ContentCard = React.forwardRef<HTMLDivElement, ContentCardProps>(
  (
    { className, variant, size, title, icon, children, footer, ...props },
    ref,
  ) => {
    return (
      <div
        ref={ref}
        role="region"
        aria-live={
          variant === 'error' || variant === 'warning' ? 'polite' : 'off'
        }
        data-slot="content-card"
        className={cn(contentCardVariants({ variant, size }), className)}
        {...props}
      >
        {/* Header section with optional icon and title */}
        {(title || icon) && (
          <div className="flex items-start gap-2">
            {icon && (
              <span
                className={cn(
                  'shrink-0 mt-0.5',
                  variant === 'info' && 'text-(--atom-info)',
                  variant === 'success' && 'text-(--atom-success)',
                  variant === 'warning' && 'text-(--atom-warning)',
                  variant === 'error' && 'text-(--atom-error)',
                  variant === 'neutral' && 'text-muted-foreground',
                  variant === 'default' && 'text-(--atom-theme-text-primary)',
                 
                 )}
                aria-hidden="true"
              >
                {icon}
              </span>
            )}
            {title && (
              <h3 className="font-semibold text-base md:text-sm leading-tight">
                {title}
              </h3>
            )}
          </div>
        )}

        {/* Main content */}
        <div className="flex-1 leading-relaxed">{children}</div>

        {/* Optional footer */}
        {footer && (
          <div className="text-xs opacity-80 mt-1 border-t border-current/10 pt-2">
            {footer}
          </div>
        )}
      </div>
    )
  },
)

ContentCard.displayName = 'ContentCard'
