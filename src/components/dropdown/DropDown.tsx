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
} from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../../lib/cn'

// ============================================================================
// CONTEXT
// ============================================================================

interface DropdownContextValue {
  open: boolean
  setOpen: (open: boolean) => void
  triggerId: string
  contentId: string
}

const DropdownContext = createContext<DropdownContextValue | undefined>(
  undefined,
)

function useDropdownContext() {
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
    'bg-[var(--atom-card-bg)] border-[var(--atom-card-border)]',
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
    'hover:bg-[var(--atom-card-border)] hover:text-[var(--atom-text)]',
    'focus:bg-[var(--atom-card-border)] focus:text-[var(--atom-text)]',
    'data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
  ].join(' '),
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

export interface DropdownProps {
  /** Controlled open state */
  open?: boolean
  /** Callback when open state changes */
  onOpenChange?: (open: boolean) => void
  /** Default open state (uncontrolled) */
  defaultOpen?: boolean
  children: React.ReactNode
}

export interface DropdownTriggerProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean
}

export interface DropdownContentProps
  extends Omit<
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
  children?: React.ReactNode
}

export interface DropdownItemProps
  extends Omit<
    React.HTMLAttributes<HTMLDivElement>,
    'onDrag' | 'onDragStart' | 'onDragEnd' | 'onAnimationStart'
  > {
  disabled?: boolean
  /** Prevent closing on click */
  preventClose?: boolean
}

// ============================================================================
// HOOKS
// ============================================================================

function useClickOutside(
  ref: React.RefObject<HTMLElement>,
  handler: () => void,
) {
  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      if (!ref.current || ref.current.contains(event.target as Node)) {
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
  }, [ref, handler])
}

function usePosition(
  triggerRef: React.RefObject<HTMLElement | null>,
  contentRef: React.RefObject<HTMLDivElement | null>,
  open: boolean,
  side: DropdownSide,
  align: DropdownAlign,
  sideOffset: number,
  alignOffset: number,
) {
  const [position, setPosition] = useState({ top: 0, left: 0 })

  useEffect(() => {
    if (!open || !triggerRef.current || !contentRef.current) return

    const trigger = triggerRef.current.getBoundingClientRect()
    const content = contentRef.current.getBoundingClientRect()
    const viewport = {
      width: window.innerWidth,
      height: window.innerHeight,
    }

    let top = 0
    let left = 0

    // Calculate vertical position
    switch (side) {
      case 'top':
        top = trigger.top - content.height - sideOffset
        break
      case 'bottom':
        top = trigger.bottom + sideOffset
        break
      case 'left':
      case 'right':
        switch (align) {
          case 'start':
            top = trigger.top + alignOffset
            break
          case 'center':
            top = trigger.top + trigger.height / 2 - content.height / 2
            break
          case 'end':
            top = trigger.bottom - content.height - alignOffset
            break
        }
        break
    }

    // Calculate horizontal position
    switch (side) {
      case 'left':
        left = trigger.left - content.width - sideOffset
        break
      case 'right':
        left = trigger.right + sideOffset
        break
      case 'top':
      case 'bottom':
        switch (align) {
          case 'start':
            left = trigger.left + alignOffset
            break
          case 'center':
            left = trigger.left + trigger.width / 2 - content.width / 2
            break
          case 'end':
            left = trigger.right - content.width - alignOffset
            break
        }
        break
    }

    // Boundary detection - keep dropdown in viewport
    if (left < 0) left = 8
    if (left + content.width > viewport.width) {
      left = viewport.width - content.width - 8
    }
    if (top < 0) top = 8
    if (top + content.height > viewport.height) {
      top = viewport.height - content.height - 8
    }

    setPosition({ top, left })
  }, [open, side, align, sideOffset, alignOffset])

  return position
}

// ============================================================================
// COMPONENTS
// ============================================================================

export const Dropdown = ({
  open: controlledOpen,
  onOpenChange,
  defaultOpen = false,
  children,
}: DropdownProps) => {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen)
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

  const triggerId = useRef(
    `dropdown-trigger-${Math.random().toString(36).slice(2)}`,
  ).current
  const contentId = useRef(
    `dropdown-content-${Math.random().toString(36).slice(2)}`,
  ).current

  const contextValue = useMemo(
    () => ({
      open,
      setOpen,
      triggerId,
      contentId,
    }),
    [open, setOpen, triggerId, contentId],
  )

  return (
    <DropdownContext.Provider value={contextValue}>
      <div className="relative inline-block">{children}</div>
    </DropdownContext.Provider>
  )
}

Dropdown.displayName = 'Dropdown'

export const DropdownTrigger = forwardRef<
  HTMLButtonElement,
  DropdownTriggerProps
>(({ className, children, onClick, ...props }, ref) => {
  const { open, setOpen, triggerId, contentId } = useDropdownContext()

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setOpen(!open)
    onClick?.(e)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === 'ArrowDown' || e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      setOpen(true)
    }
  }

  return (
    <button
      ref={ref}
      id={triggerId}
      type="button"
      aria-haspopup="true"
      aria-expanded={open}
      aria-controls={contentId}
      className={cn(
        'inline-flex items-center justify-center gap-2',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--atom-primary)] focus-visible:ring-offset-2',
        className,
      )}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      {...props}
    >
      {children}
    </button>
  )
})

DropdownTrigger.displayName = 'DropdownTrigger'

export const DropdownContent = forwardRef<
  HTMLDivElement,
  DropdownContentProps
>(
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
      ...props
    },
    ref,
  ) => {
    const { open, setOpen, triggerId, contentId } = useDropdownContext()
    const contentRef = useRef<HTMLDivElement | null>(null)
    const triggerRef = useRef<HTMLElement | null>(null)

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
      triggerRef.current = document.getElementById(triggerId)
    }, [triggerId])

    useClickOutside(contentRef as React.RefObject<HTMLElement>, () => {
      if (open && !preventClose) setOpen(false)
    })

    useEffect(() => {
      if (!open) return

      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          setOpen(false)
          triggerRef.current?.focus()
        }
      }

      document.addEventListener('keydown', handleEscape)
      return () => document.removeEventListener('keydown', handleEscape)
    }, [open, setOpen])

    const animationVariants = getAnimationVariants(side ?? 'bottom')

    const content = (
      <AnimatePresence>
        {open && (
          <motion.div
            ref={contentRef}
            id={contentId}
            role="menu"
            aria-labelledby={triggerId}
            initial="initial"
            animate="animate"
            exit="exit"
            variants={animationVariants}
            transition={{
              duration: 0.2,
              ease: [0.16, 1, 0.3, 1],
            }}
            className={cn(
              dropdownContentVariants({ side, align }),
              className,
            )}
            style={{
              position: 'fixed',
              top: `${position.top}px`,
              left: `${position.left}px`,
            }}
            {...props}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    )

    return createPortal(content, container || document.body)
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
      onClick,
      ...props
    },
    ref,
  ) => {
    const { setOpen } = useDropdownContext()

    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
      if (disabled) return
      onClick?.(e)
      if (!preventClose) {
        setOpen(false)
      }
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (disabled) return
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault()
        handleClick(e as any)
      }
    }

    return (
      <motion.div
        ref={ref}
        role="menuitem"
        tabIndex={disabled ? -1 : 0}
        data-disabled={disabled ? '' : undefined}
        className={cn(dropdownItemVariants(), className)}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        whileHover={disabled ? undefined : { scale: 1.01 }}
        whileTap={disabled ? undefined : { scale: 0.98 }}
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
    className={cn('my-1 h-px bg-[var(--atom-card-border)]', className)}
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
    className={cn(
      'px-3 py-1.5 text-xs font-semibold text-[var(--atom-text-secondary)]',
      className,
    )}
    {...props}
  />
))

DropdownLabel.displayName = 'DropdownLabel'
