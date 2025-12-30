import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { ChevronRight, ChevronLeft, ChevronUp, ChevronDown } from 'lucide-react'
import { Slot } from '@radix-ui/react-slot'
import { cn } from '../../lib/cn'

const drawerVariants = cva(
  'fixed z-[1000] flex flex-col overflow-hidden border shadow-2xl transition-all duration-300 ease-in-out bg-[var(--atom-card-bg)] border-[var(--atom-card-border)]',
  {
    variants: {
      variant: {
        right: 'top-0 right-0 h-screen border-l h-full',
        left: 'top-0 left-0 h-screen border-r h-full',
        bottom: 'left-0 bottom-0 w-screen border-t w-full',
        top: 'left-0 top-0 w-screen border-b w-full'
      },
      size: {
        sm: '',
        md: '',
        lg: '',
        xl: '',
      },
    },
    compoundVariants: [
      // Right/Left: Width variants (height = h-screen always)
      { variant: ['right', 'left'], size: 'sm', class: 'w-[239px]' },
      { variant: ['right', 'left'], size: 'md', class: 'w-[478px]' },
      { variant: ['right', 'left'], size: 'lg', class: 'w-[720px]' },
      { variant: ['right', 'left'], size: 'xl', class: 'w-[900px]' },

      // Top/Bottom: Height variants (width = w-screen always)
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

const drawerTriggerVariants = cva(
  'z-[1001] flex h-12 w-12 items-center justify-center rounded-full border-2 shadow-lg transition-all duration-300 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-[var(--atom-primary)] focus:ring-offset-2',
  {
    variants: {
      variant: {
        //  Right drawer: Button on LEFT side (outside)
        right: '-left-6 top-1/2 -translate-y-1/2 bg-[var(--atom-card-bg)]',
        //  Left drawer: Button on RIGHT side (outside)
        left: '-right-6 top-1/2 -translate-y-1/2 bg-[var(--atom-card-bg)]',
        // Bottom drawer: Button on TOP side (outside)
        bottom: 'left-1/2 -top-6 -translate-x-1/2 bg-[var(--atom-card-bg)]',
        // Top drawer: Button on BOTTOM side (outside)
        top: 'left-1/2 -bottom-6 -translate-x-1/2 bg-[var(--atom-card-bg)]',
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
      return open ? ChevronLeft : ChevronRight
    case 'left':
      return open ? ChevronRight : ChevronLeft
    case 'bottom':
      return open ? ChevronUp : ChevronDown
    case 'top':
      return open ? ChevronDown : ChevronUp
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
            className="fixed inset-0 z-[999] bg-black/30 backdrop-blur-sm transition-all duration-300"
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              onOpenChange(false)
            }}
            aria-hidden
          />
        )}

        {/* Trigger Button - ALWAYS VISIBLE, positioned OUTSIDE drawer */}
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

        {/* Drawer Content */}
        <Comp
          ref={ref}
          data-state={open ? 'open' : 'closed'}
          data-variant={variant}
          className={cn(
            drawerVariants({ variant, size }),
            'transform',
            getTransform(variant, open),
            open ? 'opacity-100 visible' : 'opacity-0 invisible',
            className,
          )}
          style={{
            transform: getTransform(variant, open),
          }}
          role="dialog"
          aria-modal={open}
          aria-labelledby="drawer-title"
          {...props}
        >
          <div className="h-full w-full flex flex-col p-6 overflow-auto">
            {children}
          </div>
        </Comp>
      </>
    )
  },
)

Drawer.displayName = 'Drawer'
