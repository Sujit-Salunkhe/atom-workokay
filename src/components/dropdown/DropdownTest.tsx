// src/components/ui/Dropdown.tsx
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

class DropdownErrorBoundary extends Component<
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
    console.error('Dropdown Error:', error, errorInfo)
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

interface DropdownContextValue {
  open: boolean
  setOpen: (open: boolean) => void
  triggerId: string
  contentId: string
  selectedValue?: string
  setSelectedValue: (value: string) => void
  activeDescendant?: string
  setActiveDescendant?: (id: string) => void
  animateItems: boolean
}

const DropdownContext = createContext<DropdownContextValue | undefined>(
  undefined,
)

function useDropdownContext(): DropdownContextValue {
  const context = useContext(DropdownContext)
  if (!context) {
    throw new Error('Dropdown components must be used within Dropdown')
  }
  return context
}

// ============================================================================
// VARIANTS
// ============================================================================

const dropdownContentVariants = cva(
  [
    'absolute z-[1000] min-w-[8rem] overflow-hidden',
    'rounded-md border shadow-lg',
    'bg-[var(--atom-theme-bg)] border border-[var(--atom-theme-border)]',
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
    },
    defaultVariants: {
      side: 'bottom',
      align: 'start',
    },
  },
)

const dropdownItemVariants = cva(
  [
    'relative flex cursor-pointer select-none items-center',
    'rounded-sm px-3 py-2 text-sm outline-none',
    'transition-colors duration-150',
    'hover:bg-[var(--atom-card-hover)] hover:text-[var(--atom-text)]',
    'focus:bg-[var(--atom-card-hover)] focus:text-[var(--atom-text)]',
    'data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
    'data-[selected]:text-[var(--atom-primary)] data-[selected]:font-medium',
  ].join(' '),
)

const dropdownTriggerVariants = cva(
  [
    'inline-flex items-center justify-center gap-2',
    'px-4 py-2 rounded-md text-sm font-medium',
    'transition-colors duration-150',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--atom-primary)] focus-visible:ring-offset-2',
    'cursor-pointer',
    'disabled:pointer-events-none disabled:opacity-50',
  ].join(' '),
  {
    variants: {
      variant: {
        default: [
          'bg-[var(--atom-theme-bg)]',
          'border border-[var(--atom-theme-border)]',
          'text-[var(--atom-theme-text)]',
        ].join(' '),
        ghost: [
          'bg-transparent',
          'hover:bg-[var(--atom-card-hover)]',
          'text-[var(--atom-text)]',
        ].join(' '),
      },
    },
    defaultVariants: {
      variant: 'ghost',
    },
  },
)

// ============================================================================
// ANIMATION VARIANTS
// ============================================================================

const getAnimationVariants = (side: DropdownSide) => {
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
      scale: 0.95,
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

export type DropdownSide = 'top' | 'bottom' | 'left' | 'right'
export type DropdownAlign = 'start' | 'center' | 'end'
export type DropdownTriggerVariant = 'default' | 'ghost'

export interface DropdownProps {
  /** Controlled open state */
  open?: boolean
  /** Callback when open state changes */
  onOpenChange?: (open: boolean) => void
  /** Default open state (uncontrolled) */
  defaultOpen?: boolean
  /** Selected value for highlighting */
  value?: string
  /** Callback when value changes */
  onValueChange?: (value: string) => void
  /** Disable the entire dropdown */
  disabled?: boolean
  /** Enable scale animation on dropdown items (hover/tap) */
  animateItems?: boolean
  /** Custom error boundary fallback */
  errorFallback?: ReactNode
  /** Error handler callback */
  onError?: (error: Error, errorInfo: ErrorInfo) => void
  children: React.ReactNode
}

export interface DropdownTriggerProps
  extends
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof dropdownTriggerVariants> {
  asChild?: boolean
}

export interface DropdownContentProps
  extends
    Omit<
      React.HTMLAttributes<HTMLDivElement>,
      'children' | 'onDrag' | 'onDragStart' | 'onDragEnd' | 'onAnimationStart'
    >,
    VariantProps<typeof dropdownContentVariants> {
  /** Portal container (defaults to document.body) */
  container?: HTMLElement | null
  /** Offset from trigger in pixels */
  sideOffset?: number
  /** Align offset in pixels */
  alignOffset?: number
  /** Prevent closing on content click */
  preventClose?: boolean
  /** Close dropdown when an item is selected */
  closeOnSelect?: boolean
  children?: React.ReactNode
}

export interface DropdownItemProps extends Omit<
  React.HTMLAttributes<HTMLDivElement>,
  'onDrag' | 'onDragStart' | 'onDragEnd' | 'onAnimationStart'
> {
  disabled?: boolean
  /** Prevent closing on click */
  preventClose?: boolean
  /** Value for this item */
  value?: string
}

export interface DropdownGroupProps extends React.HTMLAttributes<HTMLDivElement> {
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
  side: DropdownSide,
  align: DropdownAlign,
  sideOffset: number,
  alignOffset: number,
): { top: number; left: number } {
  const [position, setPosition] = useState({ top: 0, left: 0 })

  const calculatePosition = useCallback(() => {
    // SSR check
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

    // Calculate initial position based on side
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

    // ResizeObserver with polyfill check
    let resizeObserver: ResizeObserver | null = null

    if (typeof ResizeObserver !== 'undefined' && contentRef.current) {
      resizeObserver = new ResizeObserver(calculatePosition)
      resizeObserver.observe(contentRef.current)
    }

    // Listen to scroll and resize events
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

export const Dropdown = ({
  open: controlledOpen,
  onOpenChange,
  defaultOpen = false,
  value: controlledValue,
  onValueChange,
  disabled = false,
  animateItems = false,
  errorFallback,
  onError,
  children,
}: DropdownProps) => {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen)
  const [selectedValue, setSelectedValue] = useState(controlledValue || '')
  const [activeDescendant, setActiveDescendant] = useState<string>()

  const uniqueId = useId()
  const triggerId = `dropdown-trigger-${uniqueId}`
  const contentId = `dropdown-content-${uniqueId}`

  const isControlled = controlledOpen !== undefined
  const open = disabled
    ? false
    : isControlled
      ? controlledOpen
      : uncontrolledOpen

  const setOpen = useCallback(
    (value: boolean) => {
      if (disabled) return
      if (!isControlled) {
        setUncontrolledOpen(value)
      }
      onOpenChange?.(value)
    },
    [isControlled, onOpenChange, disabled],
  )

  const handleValueChange = useCallback(
    (value: string) => {
      setSelectedValue(value)
      onValueChange?.(value)
    },
    [onValueChange],
  )

  // Sync controlled value with internal state
  useEffect(() => {
    if (controlledValue !== undefined) {
      setSelectedValue(controlledValue)
    }
  }, [controlledValue])

  const contextValue = useMemo(
    () => ({
      open,
      setOpen,
      triggerId,
      contentId,
      selectedValue: controlledValue || selectedValue,
      setSelectedValue: handleValueChange,
      activeDescendant,
      setActiveDescendant,
      animateItems,
    }),
    [
      open,
      setOpen,
      triggerId,
      contentId,
      controlledValue,
      selectedValue,
      handleValueChange,
      activeDescendant,
      animateItems,
    ],
  )

  return (
    <DropdownErrorBoundary fallback={errorFallback} onError={onError}>
      <DropdownContext.Provider value={contextValue}>
        <div className="relative inline-block">
          {children}
          {/* Screen reader live region */}
          <div
            role="status"
            aria-live="polite"
            aria-atomic="true"
            className="sr-only"
          >
            {selectedValue && `Selected: ${selectedValue}`}
          </div>
        </div>
      </DropdownContext.Provider>
    </DropdownErrorBoundary>
  )
}

Dropdown.displayName = 'Dropdown'

export const DropdownTrigger = forwardRef<
  HTMLButtonElement,
  DropdownTriggerProps
>(
  (
    {
      className,
      children,
      onClick,
      onMouseDown,
      onKeyDown,
      variant,
      asChild = false,
      disabled,
      ...props
    },
    ref,
  ) => {
    const { open, setOpen, triggerId, contentId } = useDropdownContext()
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

    const handleMouseDown = (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault()
      onMouseDown?.(e)
    }

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (disabled) return
      e.stopPropagation()
      setOpen(!open)
      onClick?.(e)
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
      if (disabled) return

      if (e.key === 'ArrowDown' || e.key === 'Enter' || e.key === ' ') {
        e.preventDefault()
        setOpen(true)
      } else if (e.key === 'ArrowUp') {
        e.preventDefault()
        setOpen(true)
      }

      onKeyDown?.(e)
    }

    const Comp = asChild ? Slot : 'button'

    return (
      <Comp
        ref={triggerRef}
        id={triggerId}
        type={asChild ? undefined : 'button'}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={open ? contentId : undefined}
        disabled={disabled}
        data-testid="dropdown-trigger"
        className={
          asChild
            ? className
            : cn(dropdownTriggerVariants({ variant }), className)
        }
        onMouseDown={handleMouseDown}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        {...props}
      >
        {children}
      </Comp>
    )
  },
)

DropdownTrigger.displayName = 'DropdownTrigger'

export const DropdownContent = forwardRef<HTMLDivElement, DropdownContentProps>(
  (
    {
      className,
      children,
      side = 'bottom',
      align = 'start',
      sideOffset = 4,
      alignOffset = 0,
      container,
      preventClose = false,
      closeOnSelect = true,
      ...props
    },
    ref,
  ) => {
    const { open, setOpen, triggerId, contentId, activeDescendant } =
      useDropdownContext()
    const contentRef = useRef<HTMLDivElement | null>(null)
    const triggerRef = useRef<HTMLElement | null>(null)
    const dropdownContainer = useThemePortal()

    // Combine external ref with internal ref
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
      align ?? 'start',
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
        if (open && !preventClose) setOpen(false)
      },
      open,
    )

    // Focus management and keyboard handling
    useEffect(() => {
      if (typeof document === 'undefined') return
      if (!open || !contentRef.current) return

      // Focus first non-disabled item when opened
      const focusableElements = contentRef.current.querySelectorAll(
        '[role="menuitem"]:not([aria-disabled="true"])',
      )

      if (focusableElements.length > 0) {
        ;(focusableElements[0] as HTMLElement).focus()
      }

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

    // Memoize animation variants
    const animationVariants = useMemo(
      () => getAnimationVariants(side ?? 'bottom'),
      [side],
    )

    // Determine the portal container with SSR check
    const portalContainer =
      container ||
      dropdownContainer ||
      (typeof document !== 'undefined' ? document.body : null)

    // SSR safety check
    if (!portalContainer) return null

    const content = (
      <AnimatePresence mode="wait">
        {open && (
          <motion.div
            ref={contentRef}
            id={contentId}
            role="menu"
            aria-labelledby={triggerId}
            aria-orientation="vertical"
            aria-activedescendant={activeDescendant}
            data-testid="dropdown-content"
            initial="initial"
            animate="animate"
            exit="exit"
            variants={animationVariants}
            transition={{
              duration: 0.4,
              ease: [0.16, 1, 0.3, 1],
            }}
            className={cn(dropdownContentVariants({ side, align }), className)}
            style={{
              position: 'fixed',
              top: `${position.top}px`,
              left: `${position.left}px`,
              pointerEvents: 'auto',
            }}
            {...props}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    )

    return createPortal(
      <Suspense fallback={null}>{content}</Suspense>,
      portalContainer,
    )
  },
)

DropdownContent.displayName = 'DropdownContent'

export const DropdownItem = forwardRef<HTMLDivElement, DropdownItemProps>(
  (
    {
      className,
      children,
      disabled,
      preventClose = false,
      value,
      onClick,
      onKeyDown,
      ...props
    },
    ref,
  ) => {
    const {
      setOpen,
      selectedValue,
      setSelectedValue,
      setActiveDescendant,
      animateItems,
    } = useDropdownContext()
    const isSelected = value !== undefined && value === selectedValue
    const itemRef = useRef<HTMLDivElement>(null)
    const uniqueId = useId()
    const itemId = `dropdown-item-${uniqueId}`
    const [isProcessing, setIsProcessing] = useState(false)

    // Combine external ref with internal ref
    useEffect(() => {
      if (ref) {
        if (typeof ref === 'function') {
          ref(itemRef.current)
        } else {
          ref.current = itemRef.current
        }
      }
    }, [ref])

    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
      if (disabled || isProcessing) return

      setIsProcessing(true)
      e.stopPropagation()

      if (value !== undefined) {
        setSelectedValue(value)
      }

      onClick?.(e)

      if (!preventClose) {
        setOpen(false)
      }

      // Prevent rapid clicks
      setTimeout(() => setIsProcessing(false), 300)
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (disabled) return

      const currentItem = itemRef.current
      if (!currentItem) return

      const menuItems = Array.from(
        currentItem
          .closest('[role="menu"]')
          ?.querySelectorAll('[role="menuitem"]:not([aria-disabled="true"])') ||
          [],
      )
      const currentIndex = menuItems.indexOf(currentItem)

      switch (e.key) {
        case 'Enter':
        case ' ':
          e.preventDefault()
          e.stopPropagation()
          handleClick(e as any)
          break
        case 'ArrowDown':
          e.preventDefault()
          if (menuItems.length > 0) {
            const nextIndex = (currentIndex + 1) % menuItems.length
            const nextItem = menuItems[nextIndex] as HTMLElement
            nextItem?.focus()
            setActiveDescendant?.(nextItem.id)
          }
          break
        case 'ArrowUp':
          e.preventDefault()
          if (menuItems.length > 0) {
            const prevIndex =
              currentIndex === 0 ? menuItems.length - 1 : currentIndex - 1
            const prevItem = menuItems[prevIndex] as HTMLElement
            prevItem?.focus()
            setActiveDescendant?.(prevItem.id)
          }
          break
        case 'Home':
          e.preventDefault()
          if (menuItems.length > 0) {
            const firstItem = menuItems[0] as HTMLElement
            firstItem?.focus()
            setActiveDescendant?.(firstItem.id)
          }
          break
        case 'End':
          e.preventDefault()
          if (menuItems.length > 0) {
            const lastItem = menuItems[menuItems.length - 1] as HTMLElement
            lastItem?.focus()
            setActiveDescendant?.(lastItem.id)
          }
          break
      }

      onKeyDown?.(e)
    }

    const handleFocus = () => {
      setActiveDescendant?.(itemId)
    }

    return (
      <motion.div
        ref={itemRef}
        id={itemId}
        role="menuitem"
        tabIndex={disabled ? -1 : 0}
        aria-disabled={disabled}
        data-disabled={disabled ? '' : undefined}
        data-selected={isSelected ? '' : undefined}
        data-testid={`dropdown-item-${value || itemId}`}
        className={cn(dropdownItemVariants(), className)}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        onFocus={handleFocus}
        whileHover={disabled || !animateItems ? undefined : { scale: 1.01 }}
        whileTap={disabled || !animateItems ? undefined : { scale: 0.98 }}
        {...props}
      >
        {children}
      </motion.div>
    )
  },
)

DropdownItem.displayName = 'DropdownItem'

export const DropdownSeparator = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    role="separator"
    aria-orientation="horizontal"
    data-testid="dropdown-separator"
    className={cn('my-1 h-px bg-(--atom-theme-border)', className)}
    {...props}
  />
))

DropdownSeparator.displayName = 'DropdownSeparator'

export const DropdownLabel = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    role="presentation"
    data-testid="dropdown-label"
    className={cn(
      'px-3 py-1.5 text-xs font-semibold text-(--atom-text-secondary)',
      className,
    )}
    {...props}
  />
))

DropdownLabel.displayName = 'DropdownLabel'

export const DropdownGroup = forwardRef<HTMLDivElement, DropdownGroupProps>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      role="group"
      data-testid="dropdown-group"
      className={cn('py-1', className)}
      {...props}
    >
      {children}
    </div>
  ),
)

DropdownGroup.displayName = 'DropdownGroup'
