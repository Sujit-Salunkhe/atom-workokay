// src/components/tooltip/Tooltip.tsx
'use client'

import * as React from 'react'
import * as TooltipPrimitive from '@radix-ui/react-tooltip'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../../lib/cn'
import { useThemePortal } from '../../hooks/useTheme'

const tooltipContentVariants = cva(
  'z-50 rounded-lg border bg-[var(--atom-card-bg)] px-3 py-1.5 ' +
    'text-xs text-[var(--atom-text)] shadow-md ' +
    'data-[state=delayed-open]:animate-in data-[state=closed]:animate-out ' +
    'data-[state=delayed-open]:fade-in data-[state=closed]:fade-out ' +
    'data-[side=top]:slide-in-from-bottom-1 ' +
    'data-[side=bottom]:slide-in-from-top-1 ' +
    'data-[side=left]:slide-in-from-right-1 ' +
    'data-[side=right]:slide-in-from-left-1',
  {
    variants: {
      variant: {
        soft:
          'bg-[color-mix(in_srgb,var(--atom-muted)_40%,var(--atom-card-bg))] ' +
          'text-[var(--atom-text)] border-[var(--atom-border)]',

        solid:
          'bg-[var(--atom-primary)] text-[var(--atom-primary-contrast)] border-transparent',

        outline:
          'bg-transparent text-[var(--atom-text)] border-[var(--atom-border)]',

        primary:
          'bg-[var(--atom-theme-secondary-bg)] text-[var(--atom-theme-tooltip)] border-none',
      },

      size: {
        sm: 'px-2 py-1 text-[11px]',
        md: 'px-3 py-1.5 text-xs',
        lg: 'px-4 py-2 text-sm',
      },

      showArrow: {
        true: '',
        false: '',
      },
    },

    defaultVariants: {
      variant: 'primary',
      size: 'md',
      showArrow: false,
    },
  },
)

export type TooltipVariant = NonNullable<
  VariantProps<typeof tooltipContentVariants>['variant']
>
export type TooltipSize = NonNullable<
  VariantProps<typeof tooltipContentVariants>['size']
>

type RadixTooltipContentProps = React.ComponentPropsWithoutRef<
  typeof TooltipPrimitive.Content
>

export interface TooltipProps
  extends Omit<RadixTooltipContentProps, 'content'>,
    VariantProps<typeof tooltipContentVariants> {
  /** Text or React node to render inside the tooltip */
  content: React.ReactNode
  /** Trigger element */
  children: React.ReactNode
}

/**
 * Tooltip composed component:
 * - Wraps Radix TooltipProvider / Root / Trigger / Content
 * - Uses CVA for appearance variants
 */
export function Tooltip({
  children,
  content,
  variant,
  size,
  showArrow,
  className,
  side = 'right',
  align = 'center',
  sideOffset = 6,
  ...props
}: TooltipProps) {
  const portalContainer = useThemePortal()

  return (
    <TooltipPrimitive.Provider delayDuration={200}>
      <TooltipPrimitive.Root>
        <TooltipPrimitive.Trigger asChild>{children}</TooltipPrimitive.Trigger>
        
        <TooltipPrimitive.Portal container={portalContainer || undefined}>
          <TooltipPrimitive.Content
            side={side}
            align={align}
            sideOffset={sideOffset}
            className={cn(
              tooltipContentVariants({ variant, size, showArrow }),
              className,
            )}
            {...props}
          >
            {content}
            {showArrow && (
              <TooltipPrimitive.Arrow
                className="fill-(--atom-card-bg) stroke-(--atom-border)"
                width={12}
                height={6}
              />
            )}
          </TooltipPrimitive.Content>
        </TooltipPrimitive.Portal>
      </TooltipPrimitive.Root>
    </TooltipPrimitive.Provider>
  )
}

Tooltip.displayName = 'Tooltip'
