// src/components/ui/Drawer.tsx
import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { Slot } from '@radix-ui/react-slot'
import { cn } from '../../lib/cn'

const drawerVariants = cva(
  'fixed z-[1000] flex flex-col overflow-hidden border shadow-2xl transition-transform duration-300 ease-in-out bg-[var(--atom-card-bg)] border-[var(--atom-card-border)]',
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

export type DrawerVariant = 'right' | 'left' | 'bottom' | 'top'
export type DrawerSize = 'sm' | 'md' | 'lg' | 'xl'

export interface DrawerProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'>,
    VariantProps<typeof drawerVariants> {
  open: boolean
  onOpenChange?: (open: boolean) => void
  children?: React.ReactNode
  asChild?: boolean
  closeOnBackdropClick?: boolean
  closeOnEscape?: boolean
  showBackdrop?: boolean
}

const getTransformClass = (variant: DrawerVariant | undefined | null, open: boolean): string => {
  if (open) return 'translate-x-0 translate-y-0'
  
  switch (variant) {
    case 'right':
      return 'translate-x-full'
    case 'left':
      return '-translate-x-full'
    case 'bottom':
      return 'translate-y-full'
    case 'top':
      return '-translate-y-full'
    default:
      return 'translate-x-full'
  }
}

export const Drawer = React.forwardRef<HTMLDivElement, DrawerProps>(
  (
    {
      className,
      variant = 'right',
      size = 'md',
      open = false,
      onOpenChange,
      children,
      asChild = false,
      closeOnBackdropClick = true,
      closeOnEscape = true,
      showBackdrop = true,
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : 'div'

    // Handle escape key press
    React.useEffect(() => {
      if (!open || !closeOnEscape || !onOpenChange) return

      const handleEscape = (event: KeyboardEvent) => {
        if (event.key === 'Escape') {
          onOpenChange(false)
        }
      }

      document.addEventListener('keydown', handleEscape)
      return () => document.removeEventListener('keydown', handleEscape)
    }, [open, closeOnEscape, onOpenChange])

    // Prevent body scroll when drawer is open
    React.useEffect(() => {
      if (open) {
        const scrollbarWidth =
          window.innerWidth - document.documentElement.clientWidth
        document.body.style.overflow = 'hidden'
        document.body.style.paddingRight = `${scrollbarWidth}px`
      } else {
        document.body.style.overflow = ''
        document.body.style.paddingRight = ''
      }

      return () => {
        document.body.style.overflow = ''
        document.body.style.paddingRight = ''
      }
    }, [open])

    const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
      if (closeOnBackdropClick && onOpenChange) {
        e.stopPropagation()
        onOpenChange(false)
      }
    }

    return (
      <>
        {/* Backdrop */}
        {showBackdrop && open && (
          <div
            className="fixed inset-0 z-[999] bg-black/50 transition-opacity duration-300"
            onClick={handleBackdropClick}
            aria-hidden="true"
          />
        )}

        {/* Drawer */}
        <Comp
          ref={ref}
          data-state={open ? 'open' : 'closed'}
          data-variant={variant}
          className={cn(
            drawerVariants({ variant, size }),
            getTransformClass(variant, open),
            className,
          )}
          role="dialog"
          aria-modal={open}
          aria-hidden={!open}
          {...props}
        >
          <div className="h-full w-full flex flex-col overflow-auto">
            {children}
          </div>
        </Comp>
      </>
    )
  },
)

Drawer.displayName = 'Drawer'

// Drawer subcomponents for better composition
export const DrawerHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex flex-col space-y-1.5 p-6', className)}
    {...props}
  />
))
DrawerHeader.displayName = 'DrawerHeader'

export const DrawerTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h2
    ref={ref}
    id="drawer-title"
    className={cn(
      'text-lg font-semibold leading-none tracking-tight',
      className,
    )}
    {...props}
  />
))
DrawerTitle.displayName = 'DrawerTitle'

export const DrawerDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn('text-sm text-[var(--atom-text-secondary)]', className)}
    {...props}
  />
))
DrawerDescription.displayName = 'DrawerDescription'

export const DrawerBody = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex-1 overflow-auto p-6 pt-0', className)}
    {...props}
  />
))
DrawerBody.displayName = 'DrawerBody'

export const DrawerFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex items-center justify-end gap-2 p-6 pt-0', className)}
    {...props}
  />
))
DrawerFooter.displayName = 'DrawerFooter'
