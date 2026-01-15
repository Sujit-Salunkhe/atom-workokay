// src/components/ui/Drawer.tsx
import * as React from 'react'
import { createPortal } from 'react-dom'
import { cva, type VariantProps } from 'class-variance-authority'
import { Slot } from '@radix-ui/react-slot'
import { cn } from '../../lib/cn'
import { useThemePortal } from '../../hooks/useTheme'

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
  /** Optional label for accessibility. Falls back to DrawerTitle id if not provided */
  'aria-label'?: string
  /** Optional description for accessibility */
  'aria-describedby'?: string
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
      'aria-label': ariaLabel,
      'aria-describedby': ariaDescribedBy,
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : 'div'
    const container = useThemePortal()
    const drawerRef = React.useRef<HTMLDivElement>(null)
    const previousFocusRef = React.useRef<HTMLElement | null>(null)

    // Merge refs
    React.useImperativeHandle(ref, () => drawerRef.current as HTMLDivElement)

    // Store previous focus and manage focus trap
    React.useEffect(() => {
      if (!open) return

      // Store the element that had focus before drawer opened
      previousFocusRef.current = document.activeElement as HTMLElement

      // Focus the drawer container or first focusable element
      const drawer = drawerRef.current
      if (!drawer) return

      const focusableElements = drawer.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      )

      if (focusableElements.length > 0) {
        focusableElements[0].focus()
      } else {
        // Make drawer itself focusable if no focusable children
        drawer.setAttribute('tabindex', '-1')
        drawer.focus()
      }

      // Focus trap handler
      const handleTabKey = (e: KeyboardEvent) => {
        if (e.key !== 'Tab') return

        const focusableContent = drawer.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        )

        if (focusableContent.length === 0) return

        const firstFocusable = focusableContent[0]
        const lastFocusable = focusableContent[focusableContent.length - 1]

        if (e.shiftKey) {
          // Shift + Tab
          if (document.activeElement === firstFocusable) {
            lastFocusable.focus()
            e.preventDefault()
          }
        } else {
          // Tab
          if (document.activeElement === lastFocusable) {
            firstFocusable.focus()
            e.preventDefault()
          }
        }
      }

      document.addEventListener('keydown', handleTabKey)

      return () => {
        document.removeEventListener('keydown', handleTabKey)
        // Restore focus when drawer closes
        if (previousFocusRef.current) {
          previousFocusRef.current.focus()
        }
      }
    }, [open])

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

    const drawerContent = (
      <>
        {/* Backdrop */}
        {showBackdrop && open && (
          <div
            className="fixed inset-0 z-999 bg-black/50 transition-opacity duration-300"
            onClick={handleBackdropClick}
            aria-hidden="true"
          />
        )}

        {/* Drawer */}
        <Comp
          ref={drawerRef}
          data-state={open ? 'open' : 'closed'}
          data-variant={variant}
          className={cn(
            drawerVariants({ variant, size }),
            getTransformClass(variant, open),
            className,
          )}
          role="dialog"
          aria-modal={open ? 'true' : 'false'}
          aria-hidden={!open}
          aria-label={ariaLabel}
          aria-labelledby={!ariaLabel ? 'drawer-title' : undefined}
          aria-describedby={ariaDescribedBy}
          {...props}
        >
          <div className="h-full w-full flex flex-col overflow-auto">
            {children}
          </div>
        </Comp>
      </>
    )

    // Only render portal if container is available and drawer should be visible
    if (!container || !open) {
      // Return nothing for closed drawer to avoid SSR hydration issues
      return open && !container ? drawerContent : null
    }

    return createPortal(drawerContent, container)
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
    id="drawer-description"
    className={cn('text-sm text-(--atom-text)', className)}
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

export const DrawerClose = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, children, ...props }, ref) => (
  <button
    ref={ref}
    type="button"
    className={cn(
      'absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none',
      className,
    )}
    aria-label="Close drawer"
    {...props}
  >
    {children || (
      <svg
        width="15"
        height="15"
        viewBox="0 0 15 15"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-4 w-4"
      >
        <path
          d="M11.7816 4.03157C12.0062 3.80702 12.0062 3.44295 11.7816 3.2184C11.5571 2.99385 11.193 2.99385 10.9685 3.2184L7.50005 6.68682L4.03164 3.2184C3.80708 2.99385 3.44301 2.99385 3.21846 3.2184C2.99391 3.44295 2.99391 3.80702 3.21846 4.03157L6.68688 7.49999L3.21846 10.9684C2.99391 11.193 2.99391 11.557 3.21846 11.7816C3.44301 12.0061 3.80708 12.0061 4.03164 11.7816L7.50005 8.31316L10.9685 11.7816C11.193 12.0061 11.5571 12.0061 11.7816 11.7816C12.0062 11.557 12.0062 11.193 11.7816 10.9684L8.31322 7.49999L11.7816 4.03157Z"
          fill="currentColor"
          fillRule="evenodd"
          clipRule="evenodd"
        />
      </svg>
    )}
  </button>
))
DrawerClose.displayName = 'DrawerClose'
