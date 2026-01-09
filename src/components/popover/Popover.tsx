// src/components/ui/Popover.tsx
import {
  useState,
  useRef,
  useEffect,
  useCallback,
  forwardRef,
  createContext,
  useContext,
  useMemo,
  useId,
  Suspense,
  Component,
} from 'react'
import type { ErrorInfo, ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../../lib/cn'
import { Slot } from '@radix-ui/react-slot'
import { useThemePortal } from '../../hooks/useTheme'


// ============================================================================
// ERROR BOUNDARY
// ============================================================================


interface ErrorBoundaryProps {
  children: ReactNode
  fallback?: ReactNode
  onError?: (error: Error, errorInfo: ErrorInfo) => void
}


interface ErrorBoundaryState {
  hasError: boolean
}


class PopoverErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false }
  }


  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true }
  }


  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error('Popover Error:', error, errorInfo)
    this.props.onError?.(error, errorInfo)
  }


  render(): ReactNode {
    if (this.state.hasError) {
      return this.props.fallback || null
    }
    return this.props.children
  }
}


// ============================================================================
// CONTEXT
// ============================================================================


interface PopoverContextValue {
  open: boolean
  setOpen: (open: boolean) => void
  triggerId: string
  contentId: string
  modal: boolean
}


const PopoverContext = createContext<PopoverContextValue | undefined>(
  undefined,
)


function usePopoverContext(): PopoverContextValue {
  const context = useContext(PopoverContext)
  if (!context) {
    throw new Error('Popover components must be used within Popover')
  }
  return context
}


// ============================================================================
// VARIANTS
// ============================================================================


const popoverContentVariants = cva(
  [
    'absolute z-[1000] rounded-lg border shadow-lg',
    'bg-[var(--atom-theme-bg)] border-[var(--atom-theme-border)]',
    'outline-none overflow-hidden',
  ].join(' '),
  {
    variants: {
      side: {
        top: '',
        bottom: '',
        left: '',
        right: '',
      },
      align: {
        start: '',
        center: '',
        end: '',
      },
      size: {
        sm: 'w-64',
        md: 'w-80',
        lg: 'w-96',
        xl: 'w-[32rem]',
        full: 'w-screen max-w-md',
      },
    },
    defaultVariants: {
      side: 'bottom',
      align: 'center',
      size: 'md',
    },
  },
)


const popoverTriggerVariants = cva(
  [
    'inline-flex items-center justify-center',
    'transition-colors duration-150',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--atom-primary)] focus-visible:ring-offset-2',
    'disabled:pointer-events-none disabled:opacity-50',
    'cursor-pointer',
  ].join(' '),
)


// ============================================================================
// ANIMATION VARIANTS
// ============================================================================


const getAnimationVariants = (side: PopoverSide) => {
  const slideDistance = 8

  const slideDirection = {
    top: { y: slideDistance, x: 0 },
    bottom: { y: -slideDistance, x: 0 },
    left: { y: 0, x: slideDistance },
    right: { y: 0, x: -slideDistance },
  }

  return {
    initial: {
      opacity: 0,
      scale: 0.96,
      ...slideDirection[side],
    },
    animate: {
      opacity: 1,
      scale: 1,
      x: 0,
      y: 0,
    },
    exit: {
      opacity: 0,
      scale: 0.95,
      ...slideDirection[side],
    },
  }
}


// ============================================================================
// TYPES
// ============================================================================


export type PopoverSide = 'top' | 'bottom' | 'left' | 'right'
export type PopoverAlign = 'start' | 'center' | 'end'
export type PopoverSize = 'sm' | 'md' | 'lg' | 'xl' | 'full'


export interface PopoverProps {
  /** Controlled open state */
  open?: boolean
  /** Callback when open state changes */
  onOpenChange?: (open: boolean) => void
  /** Default open state (uncontrolled) */
  defaultOpen?: boolean
  /** Whether the popover is modal (blocks interaction with rest of page) */
  modal?: boolean
  /** Custom error boundary fallback */
  errorFallback?: ReactNode
  /** Error handler callback */
  onError?: (error: Error, errorInfo: ErrorInfo) => void
  children: React.ReactNode
}


export interface PopoverTriggerProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Use child element as trigger */
  asChild?: boolean
}


export interface PopoverContentProps
  extends
    Omit<
      React.HTMLAttributes<HTMLDivElement>,
      'children' | 'onDrag' | 'onDragStart' | 'onDragEnd' | 'onAnimationStart'
    >,
    VariantProps<typeof popoverContentVariants> {
  /** Portal container (defaults to document.body) */
  container?: HTMLElement | null
  /** Offset from trigger in pixels */
  sideOffset?: number
  /** Align offset in pixels */
  alignOffset?: number
  /** Prevent closing when clicking inside content */
  preventClose?: boolean
  /** Enable arrow pointer */
  showArrow?: boolean
  /** Prevent closing on outside click */
  preventOutsideClick?: boolean
  children?: React.ReactNode
}


export interface PopoverCloseProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Use child element as close button */
  asChild?: boolean
}


export interface PopoverHeaderProps
  extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}


export interface PopoverBodyProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}


export interface PopoverFooterProps
  extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}


export interface PopoverTitleProps
  extends React.HTMLAttributes<HTMLHeadingElement> {
  children: React.ReactNode
}


export interface PopoverDescriptionProps
  extends React.HTMLAttributes<HTMLParagraphElement> {
  children: React.ReactNode
}


// ============================================================================
// HOOKS
// ============================================================================


function useClickOutside(
  ref: React.RefObject<HTMLElement>,
  triggerRef: React.RefObject<HTMLElement | null>,
  handler: () => void,
  enabled: boolean = true,
): void {
  useEffect(() => {
    if (!enabled || typeof document === 'undefined') return

    const listener = (event: MouseEvent | TouchEvent) => {
      const target = event.target as Node

      if (
        !ref.current ||
        ref.current.contains(target) ||
        (triggerRef.current && triggerRef.current.contains(target))
      ) {
        return
      }

      handler()
    }

    document.addEventListener('mousedown', listener)
    document.addEventListener('touchstart', listener)

    return () => {
      document.removeEventListener('mousedown', listener)
      document.removeEventListener('touchstart', listener)
    }
  }, [ref, triggerRef, handler, enabled])
}


function usePosition(
  triggerRef: React.RefObject<HTMLElement | null>,
  contentRef: React.RefObject<HTMLDivElement | null>,
  open: boolean,
  side: PopoverSide,
  align: PopoverAlign,
  sideOffset: number,
  alignOffset: number,
): { top: number; left: number } {
  const [position, setPosition] = useState({ top: 0, left: 0 })

  const calculatePosition = useCallback(() => {
    if (typeof window === 'undefined') return
    if (!open || !triggerRef.current || !contentRef.current) return

    const trigger = triggerRef.current.getBoundingClientRect()
    const content = contentRef.current.getBoundingClientRect()
    const viewport = {
      width: window.innerWidth,
      height: window.innerHeight,
    }
    const scrollY = window.scrollY
    const scrollX = window.scrollX

    let top = 0
    let left = 0

    // Calculate position based on side
    switch (side) {
      case 'top':
        top = trigger.top + scrollY - content.height - sideOffset
        break
      case 'bottom':
        top = trigger.bottom + scrollY + sideOffset
        break
      case 'left':
      case 'right':
        switch (align) {
          case 'start':
            top = trigger.top + scrollY + alignOffset
            break
          case 'center':
            top =
              trigger.top + scrollY + trigger.height / 2 - content.height / 2
            break
          case 'end':
            top = trigger.bottom + scrollY - content.height - alignOffset
            break
        }
        break
    }

    switch (side) {
      case 'left':
        left = trigger.left + scrollX - content.width - sideOffset
        break
      case 'right':
        left = trigger.right + scrollX + sideOffset
        break
      case 'top':
      case 'bottom':
        switch (align) {
          case 'start':
            left = trigger.left + scrollX + alignOffset
            break
          case 'center':
            left =
              trigger.left + scrollX + trigger.width / 2 - content.width / 2
            break
          case 'end':
            left = trigger.right + scrollX - content.width - alignOffset
            break
        }
        break
    }

    // Viewport boundary collision detection
    const EDGE_PADDING = 8

    if (left < EDGE_PADDING) {
      left = EDGE_PADDING
    }
    if (left + content.width > viewport.width - EDGE_PADDING) {
      left = viewport.width - content.width - EDGE_PADDING
    }
    if (top < scrollY + EDGE_PADDING) {
      top = scrollY + EDGE_PADDING
    }
    if (top + content.height > scrollY + viewport.height - EDGE_PADDING) {
      top = scrollY + viewport.height - content.height - EDGE_PADDING
    }

    setPosition({ top, left })
  }, [open, side, align, sideOffset, alignOffset])

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (!open || !triggerRef.current || !contentRef.current) return

    calculatePosition()

    let resizeObserver: ResizeObserver | null = null

    if (typeof ResizeObserver !== 'undefined' && contentRef.current) {
      resizeObserver = new ResizeObserver(calculatePosition)
      resizeObserver.observe(contentRef.current)
    }

    window.addEventListener('scroll', calculatePosition, {
      passive: true,
      capture: true,
    })
    window.addEventListener('resize', calculatePosition, { passive: true })

    return () => {
      resizeObserver?.disconnect()
      window.removeEventListener('scroll', calculatePosition, true)
      window.removeEventListener('resize', calculatePosition)
    }
  }, [calculatePosition, open])

  return position
}


// ============================================================================
// COMPONENTS
// ============================================================================


export const Popover = ({
  open: controlledOpen,
  onOpenChange,
  defaultOpen = false,
  modal = false,
  errorFallback,
  onError,
  children,
}: PopoverProps) => {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen)

  const uniqueId = useId()
  const triggerId = `popover-trigger-${uniqueId}`
  const contentId = `popover-content-${uniqueId}`

  const isControlled = controlledOpen !== undefined
  const open = isControlled ? controlledOpen : uncontrolledOpen

  const setOpen = useCallback(
    (value: boolean) => {
      if (!isControlled) {
        setUncontrolledOpen(value)
      }
      onOpenChange?.(value)
    },
    [isControlled, onOpenChange],
  )

  const contextValue = useMemo(
    () => ({
      open,
      setOpen,
      triggerId,
      contentId,
      modal,
    }),
    [open, setOpen, triggerId, contentId, modal],
  )

  return (
    <PopoverErrorBoundary fallback={errorFallback} onError={onError}>
      <PopoverContext.Provider value={contextValue}>
        <div className="relative inline-block">{children}</div>
      </PopoverContext.Provider>
    </PopoverErrorBoundary>
  )
}

Popover.displayName = 'Popover'


export const PopoverTrigger = forwardRef<
  HTMLButtonElement,
  PopoverTriggerProps
>(
  (
    {
      className,
      children,
      onClick,
      onKeyDown,
      asChild = false,
      disabled,
      ...props
    },
    ref,
  ) => {
    const { open, setOpen, triggerId, contentId } = usePopoverContext()
    const triggerRef = useRef<HTMLButtonElement>(null)

    useEffect(() => {
      if (ref) {
        if (typeof ref === 'function') {
          ref(triggerRef.current)
        } else {
          ;(ref as React.MutableRefObject<HTMLButtonElement | null>).current =
            triggerRef.current
        }
      }
    }, [ref])

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (disabled) return
      e.stopPropagation()
      setOpen(!open)
      onClick?.(e)
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
      if (disabled) return

      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault()
        setOpen(!open)
      }

      onKeyDown?.(e)
    }

    const Comp = asChild ? Slot : 'button'

    return (
      <Comp
        ref={triggerRef}
        id={triggerId}
        type={asChild ? undefined : 'button'}
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls={open ? contentId : undefined}
        disabled={disabled}
        data-state={open ? 'open' : 'closed'}
        data-testid="popover-trigger"
        className={
          asChild ? className : cn(popoverTriggerVariants(), className)
        }
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        {...props}
      >
        {children}
      </Comp>
    )
  },
)

PopoverTrigger.displayName = 'PopoverTrigger'


export const PopoverContent = forwardRef<HTMLDivElement, PopoverContentProps>(
  (
    {
      className,
      children,
      side = 'bottom',
      align = 'center',
      size = 'md',
      sideOffset = 8,
      alignOffset = 0,
      container,
      preventClose = false,
      preventOutsideClick = false,
      showArrow = false,
      ...props
    },
    ref,
  ) => {
    const { open, setOpen, triggerId, contentId, modal } = usePopoverContext()
    const contentRef = useRef<HTMLDivElement | null>(null)
    const triggerRef = useRef<HTMLElement | null>(null)
    const portalContainer = useThemePortal()

    useEffect(() => {
      if (ref) {
        if (typeof ref === 'function') {
          ref(contentRef.current)
        } else {
          ref.current = contentRef.current
        }
      }
    }, [ref])

    const position = usePosition(
      triggerRef,
      contentRef,
      open,
      side ?? 'bottom',
      align ?? 'center',
      sideOffset,
      alignOffset,
    )

    useEffect(() => {
      if (typeof document === 'undefined') return
      const trigger = document.getElementById(triggerId)
      if (trigger) {
        triggerRef.current = trigger
      }
    }, [triggerId])

    useClickOutside(
      contentRef as React.RefObject<HTMLElement>,
      triggerRef,
      () => {
        if (open && !preventClose && !preventOutsideClick) setOpen(false)
      },
      open,
    )

    // Escape key handler
    useEffect(() => {
      if (typeof document === 'undefined') return
      if (!open) return

      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          e.preventDefault()
          e.stopPropagation()
          setOpen(false)
          triggerRef.current?.focus()
        }
      }

      document.addEventListener('keydown', handleEscape)
      return () => document.removeEventListener('keydown', handleEscape)
    }, [open, setOpen])

    // Lock body scroll if modal
    useEffect(() => {
      if (typeof document === 'undefined') return
      if (!open || !modal) return

      const originalStyle = window.getComputedStyle(document.body).overflow
      document.body.style.overflow = 'hidden'

      return () => {
        document.body.style.overflow = originalStyle
      }
    }, [open, modal])

    // Focus trap for modal
    useEffect(() => {
      if (typeof document === 'undefined') return
      if (!open || !modal || !contentRef.current) return

      const focusableElements = contentRef.current.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
      )

      const firstElement = focusableElements[0] as HTMLElement
      const lastElement = focusableElements[
        focusableElements.length - 1
      ] as HTMLElement

      const handleTabKey = (e: KeyboardEvent) => {
        if (e.key !== 'Tab') return

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault()
            lastElement?.focus()
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault()
            firstElement?.focus()
          }
        }
      }

      firstElement?.focus()

      document.addEventListener('keydown', handleTabKey)
      return () => document.removeEventListener('keydown', handleTabKey)
    }, [open, modal])

    const animationVariants = useMemo(
      () => getAnimationVariants(side ?? 'bottom'),
      [side],
    )

    const targetContainer =
      container ||
      portalContainer ||
      (typeof document !== 'undefined' ? document.body : null)

    if (!targetContainer) return null

    const getArrowStyles = () => {
      const baseStyles = 'absolute h-2 w-2 rotate-45 bg-[var(--atom-theme-bg)] border-[var(--atom-theme-border)]'
      
      const positionStyles = {
        top: 'bottom-[-5px] border-r border-b',
        bottom: 'top-[-5px] border-l border-t',
        left: 'right-[-5px] border-t border-r',
        right: 'left-[-5px] border-b border-l',
      }

      return cn(baseStyles, positionStyles[side ?? 'bottom'])
    }

    const getArrowPosition = () => {
      if (align === 'center') {
        return { left: 'calc(50% - 4px)' }
      }
      if (align === 'start') {
        return { left: '16px' }
      }
      if (align === 'end') {
        return { right: '16px' }
      }
      return {}
    }

    const content = (
      <AnimatePresence mode="wait">
        {open && (
          <>
            {modal && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="fixed inset-0 z-999 bg-black/50 backdrop-blur-sm"
                data-testid="popover-backdrop"
                onClick={() => !preventClose && !preventOutsideClick && setOpen(false)}
                aria-hidden="true"
              />
            )}

            <motion.div
              ref={contentRef}
              id={contentId}
              role="dialog"
              aria-labelledby={triggerId}
              aria-modal={modal}
              data-state={open ? 'open' : 'closed'}
              data-testid="popover-content"
              initial="initial"
              animate="animate"
              exit="exit"
              variants={animationVariants}
              transition={{
                duration: 0.2,
                ease: [0.16, 1, 0.3, 1],
              }}
              className={cn(
                popoverContentVariants({ side, align, size }),
                className,
              )}
              style={{
                position: 'fixed',
                top: `${position.top}px`,
                left: `${position.left}px`,
                pointerEvents: 'auto',
              }}
              {...props}
            >
              {showArrow && (
                <div
                  className={getArrowStyles()}
                  style={getArrowPosition()}
                  aria-hidden="true"
                />
              )}
              {children}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    )

    return createPortal(
      <Suspense fallback={null}>{content}</Suspense>,
      targetContainer,
    )
  },
)

PopoverContent.displayName = 'PopoverContent'


export const PopoverHeader = forwardRef<HTMLDivElement, PopoverHeaderProps>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      data-testid="popover-header"
      className={cn(
        'flex items-center justify-between px-4 py-3 border-b border-[var(--atom-theme-border)]',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  ),
)

PopoverHeader.displayName = 'PopoverHeader'


export const PopoverBody = forwardRef<HTMLDivElement, PopoverBodyProps>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      data-testid="popover-body"
      className={cn('px-4 py-3', className)}
      {...props}
    >
      {children}
    </div>
  ),
)

PopoverBody.displayName = 'PopoverBody'


export const PopoverFooter = forwardRef<HTMLDivElement, PopoverFooterProps>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      data-testid="popover-footer"
      className={cn(
        'flex items-center justify-end gap-2 px-4 py-3 border-t border-[var(--atom-theme-border)]',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  ),
)

PopoverFooter.displayName = 'PopoverFooter'


export const PopoverTitle = forwardRef<HTMLHeadingElement, PopoverTitleProps>(
  ({ className, children, ...props }, ref) => (
    <h3
      ref={ref}
      data-testid="popover-title"
      className={cn(
        'text-lg font-semibold text-[var(--atom-text)]',
        className,
      )}
      {...props}
    >
      {children}
    </h3>
  ),
)

PopoverTitle.displayName = 'PopoverTitle'


export const PopoverDescription = forwardRef<
  HTMLParagraphElement,
  PopoverDescriptionProps
>(({ className, children, ...props }, ref) => (
  <p
    ref={ref}
    data-testid="popover-description"
    className={cn(
      'text-sm text-[var(--atom-text-secondary)]',
      className,
    )}
    {...props}
  >
    {children}
  </p>
))

PopoverDescription.displayName = 'PopoverDescription'


export const PopoverClose = forwardRef<HTMLButtonElement, PopoverCloseProps>(
  ({ className, children, onClick, asChild = false, ...props }, ref) => {
    const { setOpen } = usePopoverContext()

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      setOpen(false)
      onClick?.(e)
    }

    const Comp = asChild ? Slot : 'button'

    return (
      <Comp
        ref={ref}
        type={asChild ? undefined : 'button'}
        data-testid="popover-close"
        className={
          asChild
            ? className
            : cn(
                'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors',
                'hover:bg-(--atom-card-hover)',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--atom-primary)',
                'disabled:pointer-events-none disabled:opacity-50',
                'h-8 w-8',
                className,
              )
        }
        onClick={handleClick}
        aria-label="Close popover"
        {...props}
      >
        {children || (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        )}
      </Comp>
    )
  },
)

PopoverClose.displayName = 'PopoverClose'
