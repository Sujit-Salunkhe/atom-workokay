// src/components/ui/Tabs.tsx
import {
  useCallback,
  useContext,
  createContext,
  useImperativeHandle,
  useEffect,
  forwardRef,
  useRef,
  useState,
  useMemo,
} from 'react'
import { cva } from 'class-variance-authority'
import { cn } from '../../lib/cn'

// ============================================================================
// CONTEXT
// ============================================================================

interface TabsContextValue {
  activeTab: string
  setActiveTab: (id: string) => void
  orientation: 'horizontal' | 'vertical'
  variant: TabsVariant
}

const TabsContext = createContext<TabsContextValue | undefined>(undefined)

function useTabsContext() {
  const context = useContext(TabsContext)
  if (!context) {
    throw new Error('Tabs compound components must be used within Tabs')
  }
  return context
}

// ============================================================================
// VARIANTS
// ============================================================================

const tabsListVariants = cva(
  'flex gap-1 border-b border-[var(--atom-card-border)]',
  {
    variants: {
      variant: {
        default: '',
        pills: 'border-0 bg-[var(--atom-card-bg)] rounded-lg p-1',
        underline: '',
      },
      orientation: {
        horizontal: 'flex-row',
        vertical: 'flex-col border-b-0 border-r',
      },
    },
    defaultVariants: {
      variant: 'default',
      orientation: 'horizontal',
    },
  },
)

const tabTriggerVariants = cva(
  [
    'inline-flex items-center justify-center whitespace-nowrap px-4 py-2',
    'text-sm font-medium transition-all duration-200',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--atom-primary)] focus-visible:ring-offset-2',
    'disabled:pointer-events-none disabled:opacity-50',
  ].join(' '),
  {
    variants: {
      variant: {
        default: [
          'border-b-2 border-transparent rounded-t-md',
          'hover:bg-[var(--atom-card-bg)] hover:text-[var(--atom-text)]',
          'data-[state=active]:border-b-[3px] data-[state=active]:border-[var(--atom-primary)] data-[state=active]:text-[var(--atom-primary)]',
        ].join(' '),
        pills: [
          'rounded-md',
          'hover:bg-[var(--atom-card-bg)]',
          'data-[state=active]:bg-[var(--atom-primary)] data-[state=active]:text-white data-[state=active]:shadow-sm',
        ].join(' '),
        underline: [
          'border-b-2 border-transparent',
          'hover:border-[var(--atom-card-border)]',
          'data-[state=active]:border-[var(--atom-primary)] data-[state=active]:text-[var(--atom-primary)]',
        ].join(' '),
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
)

const tabContentVariants = cva(
  'mt-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--atom-primary)] focus-visible:ring-offset-2',
  {
    variants: {
      orientation: {
        horizontal: '',
        vertical: 'ml-4',
      },
    },
    defaultVariants: {
      orientation: 'horizontal',
    },
  },
)

// ============================================================================
// TYPES
// ============================================================================

export type TabsVariant = 'default' | 'pills' | 'underline'
export type TabsOrientation = 'horizontal' | 'vertical'

export interface TabsProps extends React.HTMLAttributes<HTMLDivElement> {
  /** The default active tab ID */
  defaultValue: string
  /** Controlled active tab ID */
  value?: string
  /** Callback when active tab changes */
  onValueChange?: (value: string) => void
  /** Visual variant */
  variant?: TabsVariant
  /** Layout orientation */
  orientation?: TabsOrientation
  children: React.ReactNode
}

export interface TabsListProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Label for screen readers */
  'aria-label': string
}

export interface TabTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Unique identifier for this tab */
  value: string
  /** If true, tab is disabled */
  disabled?: boolean
}

export interface TabContentProps extends React.HTMLAttributes<HTMLDivElement> {
  /** The tab value this content is associated with */
  value: string
}

// ============================================================================
// COMPONENTS
// ============================================================================

export const Tabs = forwardRef<HTMLDivElement, TabsProps>(
  (
    {
      defaultValue,
      value: controlledValue,
      onValueChange,
      variant = 'default',
      orientation = 'horizontal',
      className,
      children,
      ...props
    },
    ref,
  ) => {
    const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue)

    const isControlled = controlledValue !== undefined
    const activeTab = isControlled ? controlledValue : uncontrolledValue

    const setActiveTab = useCallback(
      (newValue: string) => {
        if (!isControlled) {
          setUncontrolledValue(newValue)
        }
        onValueChange?.(newValue)
      },
      [isControlled, onValueChange],
    )

    const contextValue = useMemo(
      () => ({
        activeTab,
        setActiveTab,
        orientation,
        variant,
      }),
      [activeTab, setActiveTab, orientation, variant],
    )

    return (
      <TabsContext.Provider value={contextValue}>
        <div
          ref={ref}
          data-orientation={orientation}
          className={cn('w-full ', className)}
          {...props}
        >
          {children}
        </div>
      </TabsContext.Provider>
    )
  },
)

Tabs.displayName = 'Tabs'

export const TabsList = forwardRef<HTMLDivElement, TabsListProps>(
  ({ className, children, 'aria-label': ariaLabel, ...props }, ref) => {
    const { orientation, variant } = useTabsContext()

    return (
      <div
        ref={ref}
        role="tablist"
        aria-label={ariaLabel}
        aria-orientation={orientation}
        className={cn(tabsListVariants({ variant, orientation }), className)}
        {...props}
      >
        {children}
      </div>
    )
  },
)

TabsList.displayName = 'TabsList'

export const TabTrigger = forwardRef<HTMLButtonElement, TabTriggerProps>(
  ({ className, value, disabled, children, ...props }, ref) => {
    const { activeTab, setActiveTab, variant, orientation } = useTabsContext()
    const isActive = activeTab === value

    const tabListRef = useRef<HTMLElement | null>(null)
    const triggerRef = useRef<HTMLButtonElement | null>(null)

    useImperativeHandle(ref, () => triggerRef.current!, [])

    // Find tab list parent
    useEffect(() => {
      if (triggerRef.current) {
        tabListRef.current = triggerRef.current.closest('[role="tablist"]')
      }
    }, [])

    const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
      if (!tabListRef.current) return

      const tabs = Array.from(
        tabListRef.current.querySelectorAll<HTMLButtonElement>(
          '[role="tab"]:not([disabled])',
        ),
      )
      const currentIndex = tabs.indexOf(triggerRef.current!)

      let nextIndex = -1

      const isHorizontal = orientation === 'horizontal'

      switch (e.key) {
        case 'ArrowLeft':
          if (isHorizontal) {
            e.preventDefault()
            nextIndex = currentIndex - 1
            if (nextIndex < 0) nextIndex = tabs.length - 1
          }
          break
        case 'ArrowRight':
          if (isHorizontal) {
            e.preventDefault()
            nextIndex = (currentIndex + 1) % tabs.length
          }
          break
        case 'ArrowUp':
          if (!isHorizontal) {
            e.preventDefault()
            nextIndex = currentIndex - 1
            if (nextIndex < 0) nextIndex = tabs.length - 1
          }
          break
        case 'ArrowDown':
          if (!isHorizontal) {
            e.preventDefault()
            nextIndex = (currentIndex + 1) % tabs.length
          }
          break
        case 'Home':
          e.preventDefault()
          nextIndex = 0
          break
        case 'End':
          e.preventDefault()
          nextIndex = tabs.length - 1
          break
      }

      if (nextIndex !== -1 && tabs[nextIndex]) {
        tabs[nextIndex].focus()
        const nextValue = tabs[nextIndex].getAttribute('data-value')
        if (nextValue) setActiveTab(nextValue)
      }
    }

    return (
      <button
        ref={triggerRef}
        role="tab"
        type="button"
        id={`tab-${value}`}
        aria-selected={isActive}
        aria-controls={`tabpanel-${value}`}
        data-state={isActive ? 'active' : 'inactive'}
        data-value={value}
        tabIndex={isActive ? 0 : -1}
        disabled={disabled}
        className={cn(tabTriggerVariants({ variant }), className)}
        onClick={() => setActiveTab(value)}
        onKeyDown={handleKeyDown}
        {...props}
      >
        {children}
      </button>
    )
  },
)

TabTrigger.displayName = 'TabTrigger'

export const TabContent = forwardRef<HTMLDivElement, TabContentProps>(
  ({ className, value, children, ...props }, ref) => {
    const { activeTab, orientation } = useTabsContext()
    const isActive = activeTab === value

    if (!isActive) return null

    return (
      <div
        ref={ref}
        role="tabpanel"
        id={`tabpanel-${value}`}
        aria-labelledby={`tab-${value}`}
        tabIndex={0}
        className={cn(tabContentVariants({ orientation }), className)}
        {...props}
      >
        {children}
      </div>
    )
  },
)

TabContent.displayName = 'TabContent'
