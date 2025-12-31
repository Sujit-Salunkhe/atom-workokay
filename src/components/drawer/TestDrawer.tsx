// src/components/ui/Drawer.tsx
import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { ChevronRight, ChevronLeft, ChevronUp, ChevronDown } from 'lucide-react'
import { Slot } from '@radix-ui/react-slot'
import { cn } from '../../lib/cn'

// Drawer container variants - ADDED relative class
const drawerVariants = cva(
  'fixed z-[1000] relative flex flex-col overflow-hidden border shadow-2xl transition-all duration-300 ease-in-out bg-[var(--atom-card-bg)] border-[var(--atom-card-border)]',
  {
    variants: {
      variant: {
        right: 'top-0 right-0 h-screen border-l',
        left: 'top-0 left-0 h-screen border-r',
        bottom: 'left-0 bottom-0 w-screen border-t',
        top: 'left-0 top-0 w-screen border-b',
      },
      size: {
        sm: '',
        md: '',
        lg: '',
        xl: '',
      },
    },
    compoundVariants: [
      { variant: ['right', 'left'], size: 'sm', class: 'w-[239px]' },
      { variant: ['right', 'left'], size: 'md', class: 'w-[478px]' },
      { variant: ['right', 'left'], size: 'lg', class: 'w-[720px]' },
      { variant: ['right', 'left'], size: 'xl', class: 'w-[900px]' },
      { variant: ['top', 'bottom'], size: 'sm', class: 'h-80' },
      { variant: ['top', 'bottom'], size: 'md', class: 'h-96' },
      { variant: ['top', 'bottom'], size: 'lg', class: 'h-[500px]' },
      { variant: ['top', 'bottom'], size: 'xl', class: 'h-[600px]' },
    ],
    defaultVariants: {
      variant: 'right',
      size: 'md',
    },
  },
)

// Trigger button variants - positioned ON drawer border
const drawerTriggerVariants = cva(
  'absolute z-[1002] flex h-12 w-12 items-center justify-center rounded-full border-2 shadow-lg transition-all duration-300 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-[var(--atom-primary)] focus:ring-offset-2 pointer-events-auto',
  {
    variants: {
      variant: {
        right: 'left-0 top-1/2 -translate-x-1/2 -translate-y-1/2',
        left: 'right-0 top-1/2 translate-x-1/2 -translate-y-1/2',
        bottom: 'left-1/2 top-0 -translate-x-1/2 -translate-y-1/2',
        top: 'left-1/2 bottom-0 -translate-x-1/2 translate-y-1/2',
      },
      open: {
        true: 'bg-[var(--atom-primary)] text-white shadow-xl border-[var(--atom-primary)]',
        false:
          'bg-[var(--atom-card-bg)] border-[var(--atom-card-border)] hover:bg-[var(--atom-primary)/10]',
      },
    },
  },
)

export type DrawerVariant = 'right' | 'left' | 'bottom' | 'top'
export type DrawerSize = 'sm' | 'md' | 'lg' | 'xl'

export interface DrawerProps
  extends
    React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof drawerVariants> {
  open: boolean
  onOpenChange: (open: boolean) => void
  children: React.ReactNode
  asChild?: boolean
}

const getIcon = (
  variant: DrawerVariant,
  open: boolean,
): React.ComponentType<any> => {
  switch (variant) {
    case 'right':
      return open ? ChevronRight : ChevronLeft
    case 'left':
      return open ? ChevronLeft : ChevronRight
    case 'bottom':
      return open ? ChevronDown : ChevronUp
    case 'top':
      return open ? ChevronUp : ChevronDown
    default:
      return ChevronRight
  }
}

const getTransform = (variant: DrawerVariant, open: boolean): string => {
  if (open) return 'translateX(0) translateY(0)'
  switch (variant) {
    case 'right':
      return 'translateX(100%)'
    case 'left':
      return 'translateX(-100%)'
    case 'bottom':
      return 'translateY(100%)'
    case 'top':
      return 'translateY(-100%)'
    default:
      return 'translateX(100%)'
  }
}

export const Drawer = React.forwardRef<HTMLDivElement, DrawerProps>(
  (
    {
      className,
      variant = 'right',
      size,
      open,
      onOpenChange,
      children,
      asChild,
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : 'div'
    const Icon = getIcon(variant, open)

    return (
      <>
        {/* Backdrop */}
        {open && (
          <div
            className="fixed inset-0 z-[999] bg-black/30 transition-all duration-300"
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              onOpenChange(false)
            }}
            aria-hidden
          />
        )}

        {/* Drawer with trigger button ON border */}
        <Comp
          ref={ref}
          data-state={open ? 'open' : 'closed'}
          data-variant={variant}
          className={cn(
            drawerVariants({ variant, size }),
            'transform',
            open
              ? 'opacity-100 visible'
              : 'opacity-0 invisible pointer-events-none',
            className,
          )}
          style={{ transform: getTransform(variant, open) }}
          role="dialog"
          aria-modal={open}
          aria-labelledby="drawer-title"
          {...props}
        >
          {/* Trigger button - PERFECTLY ON BORDER */}
          <button
            className={cn(drawerTriggerVariants({ variant, open }))}
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              onOpenChange(!open)
            }}
            aria-label={`${open ? 'Close' : 'Open'} ${variant} drawer`}
            aria-expanded={open}
            type="button"
          >
            <Icon className="h-5 w-5 flex-shrink-0" />
          </button>

          {/* Content */}
          <div className="h-full w-full flex flex-col p-6 overflow-auto relative z-[1001]">
            {children}
          </div>
        </Comp>
      </>
    )
  },
)

Drawer.displayName = 'Drawer'
