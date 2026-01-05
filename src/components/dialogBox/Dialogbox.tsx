// src/components/ui/Dialog.tsx
"use client"
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
import { X } from 'lucide-react'
import { cn } from '../../lib/cn'
import { Slot } from '@radix-ui/react-slot'

// ============================================================================
// CONTEXT
// ============================================================================

interface DialogContextValue {
  open: boolean
  setOpen: (open: boolean) => void
  dialogId: string
  titleId: string
  descriptionId: string
}

const DialogContext = createContext<DialogContextValue | undefined>(undefined)

function useDialogContext() {
  const context = useContext(DialogContext)
  if (!context) {
    throw new Error('Dialog components must be used within Dialog')
  }
  return context
}

// ============================================================================
// VARIANTS
// ============================================================================

const dialogOverlayVariants = cva(
  'fixed inset-0 z-[9998]',
  {
    variants: {
      backdrop: {
        blur: 'bg-black/50 backdrop-blur-sm',
        dark: 'bg-black/50',
        light: 'bg-black/30',
        none: 'bg-transparent',
      },
    },
    defaultVariants: {
      backdrop: 'blur',
    },
  }
)

const dialogContentVariants = cva(
  [
    'relative z-9999 w-full max-h-[90vh] overflow-y-auto',
    'bg-(--atom-card-bg) border border-(--atom-card-border)',
    'rounded-lg shadow-2xl',
    'flex flex-col',
  ].join(' '),
  {
    variants: {
      size: {
        sm: 'max-w-sm',
        md: 'max-w-md',
        lg: 'max-w-lg',
        xl: 'max-w-xl',
        '2xl': 'max-w-2xl',
        '3xl': 'max-w-3xl',
        '4xl': 'max-w-4xl',
        full: 'max-w-[95vw]',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
)

// ============================================================================
// ANIMATION VARIANTS
// ============================================================================

const overlayAnimation = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
}

const contentAnimation = {
  initial: { opacity: 0, scale: 0.95, y: 20 },
  animate: { opacity: 1, scale: 1, y: 0 },
  exit: { opacity: 0, scale: 0.95, y: 20 },
}

// ============================================================================
// TYPES
// ============================================================================

export interface DialogProps {
  /** Controlled open state */
  open?: boolean
  /** Callback when open state changes */
  onOpenChange?: (open: boolean) => void
  /** Default open state (uncontrolled) */
  defaultOpen?: boolean
  children?: React.ReactNode
}

export interface DialogTriggerProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean
}

export interface DialogContentProps
  extends Omit<
      React.HTMLAttributes<HTMLDivElement>,
      'children' | 'onDrag' | 'onDragStart' | 'onDragEnd' | 'onAnimationStart'
    >,
    VariantProps<typeof dialogContentVariants> {
  /** Prevent closing when clicking outside */
  disableClose?: boolean
  /** Hide close button */
  hideCloseButton?: boolean
  /** Portal container (defaults to document.body) */
  container?: HTMLElement | null
  /** Backdrop variant */
  backdrop?: 'blur' | 'dark' | 'light' | 'none'
  children?: React.ReactNode
}

export interface DialogHeaderProps
  extends React.HTMLAttributes<HTMLDivElement> {}

export interface DialogBodyProps extends React.HTMLAttributes<HTMLDivElement> {}

export interface DialogFooterProps
  extends React.HTMLAttributes<HTMLDivElement> {}

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Merges multiple refs into a single callback ref
 */
function mergeRefs<T>(...refs: (React.Ref<T> | undefined)[]): React.RefCallback<T> {
  return (instance: T | null) => {
    refs.forEach((ref) => {
      if (typeof ref === 'function') {
        ref(instance)
      } else if (ref != null) {
        (ref as React.MutableRefObject<T | null>).current = instance
      }
    })
  }
}

// ============================================================================
// HOOKS
// ============================================================================

function useLockBodyScroll(lock: boolean) {
  useEffect(() => {
    if (!lock) return

    const originalOverflow = document.body.style.overflow
    const originalPaddingRight = document.body.style.paddingRight

    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth

    document.body.style.overflow = 'hidden'
    document.body.style.paddingRight = `${scrollbarWidth}px`

    return () => {
      document.body.style.overflow = originalOverflow
      document.body.style.paddingRight = originalPaddingRight
    }
  }, [lock])
}

function useFocusTrap(ref: React.RefObject<HTMLDivElement | null>, isActive: boolean) {
  useEffect(() => {
    if (!isActive || !ref.current) return

    const element = ref.current
    const focusableElements = element.querySelectorAll(
      'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"]):not([disabled])',
    )
    const firstElement = focusableElements[0] as HTMLElement
    const lastElement = focusableElements[
      focusableElements.length - 1
    ] as HTMLElement

    const handleTab = (e: KeyboardEvent) => {
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

    element.addEventListener('keydown', handleTab)
    
    // Focus first element after a brief delay to ensure DOM is ready
    const timeoutId = setTimeout(() => {
      firstElement?.focus()
    }, 100)

    return () => {
      element.removeEventListener('keydown', handleTab)
      clearTimeout(timeoutId)
    }
  }, [ref, isActive])
}

// ============================================================================
// COMPONENTS
// ============================================================================

export const Dialog = ({
  open: controlledOpen,
  onOpenChange,
  defaultOpen = false,
  children,
}: DialogProps) => {
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

  const dialogId = useRef(
    `dialog-${Math.random().toString(36).slice(2)}`,
  ).current
  
  const titleId = useRef(`${dialogId}-title`).current
  const descriptionId = useRef(`${dialogId}-description`).current

  const contextValue = useMemo(
    () => ({
      open,
      setOpen,
      dialogId,
      titleId,
      descriptionId,
    }),
    [open, setOpen, dialogId, titleId, descriptionId],
  )

  return (
    <DialogContext.Provider value={contextValue}>
      {children}
    </DialogContext.Provider>
  )
}

Dialog.displayName = 'Dialog'

export const DialogTrigger = forwardRef<HTMLButtonElement, DialogTriggerProps>(
  ({ className, children, onClick, disabled, asChild = false, ...props }, ref) => {
    const { setOpen, dialogId } = useDialogContext()

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (disabled) return
      setOpen(true)
      onClick?.(e)
    }

    const Comp = asChild ? Slot : 'button'

    return (
      <Comp
        ref={ref}
        type={asChild ? undefined : 'button'}
        disabled={disabled}
        aria-haspopup="dialog"
        aria-expanded={false}
        aria-controls={dialogId}
        className={cn(
          'inline-flex items-center justify-center cursor-pointer',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          className,
        )}
        onClick={handleClick}
        {...props}
      >
        {children}
      </Comp>
    )
  },
)

DialogTrigger.displayName = 'DialogTrigger'

export const DialogContent = forwardRef<HTMLDivElement, DialogContentProps>(
  (
    {
      className,
      children,
      size,
      disableClose = false,
      hideCloseButton = false,
      backdrop = 'blur',
      container,
      ...props
    },
    forwardedRef,
  ) => {
    const { open, setOpen, dialogId, titleId, descriptionId } = useDialogContext()
    const localRef = useRef<HTMLDivElement | null>(null)

    useLockBodyScroll(open)
    useFocusTrap(localRef, open)

    const handleClose = useCallback(() => {
      if (!disableClose) {
        setOpen(false)
      }
    }, [disableClose, setOpen])

    const handleOverlayClick = (e: React.MouseEvent) => {
      if (e.target === e.currentTarget && !disableClose) {
        handleClose()
      }
    }

    useEffect(() => {
      if (!open || disableClose) return

      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          handleClose()
        }
      }

      document.addEventListener('keydown', handleEscape)
      return () => document.removeEventListener('keydown', handleEscape)
    }, [open, disableClose, handleClose])

    const content = (
      <AnimatePresence mode="wait">
        {open && (
          <>
            {/* Overlay */}
            <motion.div
              className={dialogOverlayVariants({ backdrop })}
              onClick={handleOverlayClick}
              initial="initial"
              animate="animate"
              exit="exit"
              variants={overlayAnimation}
              transition={{ duration: 0.2 }}
              aria-hidden="true"
            />

            {/* Dialog Content */}
            <div 
              className="fixed inset-0 z-9999 flex items-center justify-center p-4 pointer-events-none"
              onClick={handleOverlayClick}
            >
              <motion.div
                ref={mergeRefs(localRef, forwardedRef)}
                id={dialogId}
                role="dialog"
                aria-modal="true"
                aria-labelledby={titleId}
                aria-describedby={descriptionId}
                className={cn(
                  dialogContentVariants({ size }),
                  'pointer-events-auto',
                  className
                )}
                initial="initial"
                animate="animate"
                exit="exit"
                variants={contentAnimation}
                transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                onClick={(e) => e.stopPropagation()}
                {...props}
              >
                {!hideCloseButton && (
                  <button
                    type="button"
                    onClick={handleClose}
                    disabled={disableClose}
                    className={cn(
                      'absolute top-4 right-4 z-10 rounded-md p-2',
                      'hover:bg-(--atom-card-hover) transition-colors',
                      'focus:outline-none focus:ring-2 focus:ring-(--atom-primary)',
                      'disabled:opacity-50 disabled:cursor-not-allowed',
                    )}
                    aria-label="Close dialog"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
                {children}
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    )

    return createPortal(content, container || document.body)
  },
)

DialogContent.displayName = 'DialogContent'

export const DialogHeader = forwardRef<HTMLDivElement, DialogHeaderProps>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'flex flex-col space-y-1.5 px-6 py-4 border-b border-(--atom-card-border)',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  ),
)

DialogHeader.displayName = 'DialogHeader'

export const DialogTitle = forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, children, ...props }, ref) => {
  const { titleId } = useDialogContext()
  
  return (
    <h2
      ref={ref}
      id={titleId}
      className={cn(
        'text-lg font-semibold leading-none tracking-tight text-(--atom-text)',
        className,
      )}
      {...props}
    >
      {children}
    </h2>
  )
})

DialogTitle.displayName = 'DialogTitle'

export const DialogDescription = forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, children, ...props }, ref) => {
  const { descriptionId } = useDialogContext()
  
  return (
    <p
      ref={ref}
      id={descriptionId}
      className={cn('text-sm text-(--atom-text-secondary)', className)}
      {...props}
    >
      {children}
    </p>
  )
})

DialogDescription.displayName = 'DialogDescription'

const DialogBody = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={[
      'px-6 py-4',
      'text-(--atom-card-fg)]',
      className,
    ]
      .filter(Boolean)
      .join(' ')}
    {...props}
  />
);
DialogBody.displayName = 'DialogBody';

export const DialogFooter = forwardRef<HTMLDivElement, DialogFooterProps>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'flex items-center justify-end gap-3 px-6 py-4 border-t border-(--atom-card-border)',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  ),
)

DialogFooter.displayName = 'DialogFooter'

