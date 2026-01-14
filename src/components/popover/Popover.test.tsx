// src/components/popover/Popover.test.tsx
import React  from 'react'
import type {ReactNode} from 'react'
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'

import { 
  Popover, 
  PopoverTrigger, 
  PopoverContent, 
  PopoverHeader, 
  PopoverBody, 
  PopoverFooter, 
  PopoverTitle, 
  PopoverClose,
  type PopoverSide, 
  type PopoverAlign, 
  type PopoverSize 
} from './Popover'

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

interface TestPopoverProps {
  open?: boolean
  modal?: boolean
  side?: PopoverSide
  align?: PopoverAlign
  size?: PopoverSize
  sideOffset?: number
  alignOffset?: number
  preventClose?: boolean
  preventOutsideClick?: boolean
  showArrow?: boolean
}

// ============================================================================
// MOCKS - PERFECTLY TYPED (NO ANY)
// ============================================================================

// Properly typed Window interface for jsdom
interface WindowWithResizeObserver extends Window {
  ResizeObserver: typeof ResizeObserver
}

// Fixed ResizeObserver mock - properly typed constructor
const setupResizeObserverMock = (): void => {
  const MockResizeObserver = vi.fn().mockImplementation(() => ({
    observe: vi.fn(),
    unobserve: vi.fn(),
    disconnect: vi.fn(),
  })) as unknown as typeof ResizeObserver

  // Fix: Use window (jsdom browser context) instead of global (Node.js)
  ;(window as WindowWithResizeObserver).ResizeObserver = MockResizeObserver
}

// Portal mock
vi.mock('react-dom', () => ({
  createPortal: vi.fn((children: ReactNode): ReactNode => children),
}))

// cn mock
vi.mock('../../lib/cn', () => ({
  cn: vi.fn((...classes: Array<string | undefined | null | false | 0>): string =>
    classes.filter(Boolean).join(' ')
  ),
}))

// Framer Motion mock
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: React.HTMLAttributes<HTMLDivElement>) => 
      <div {...props}>{children}</div>,
  },
  AnimatePresence: ({ children }: { children: ReactNode | boolean }) => 
    children ? <>{children}</> : null,
}))

// Theme hook mock
vi.mock('../../hooks/useTheme', () => ({
  useThemePortal: vi.fn((): HTMLElement => document.createElement('div')),
}))

// ============================================================================
// TEST SETUP
// ============================================================================

beforeEach(() => {
  vi.clearAllMocks()
  setupResizeObserverMock()
  document.body.innerHTML = ''
})

afterEach(() => {
  vi.restoreAllMocks()
  document.body.style.overflow = ''
})

// ============================================================================
// TEST UTILITIES
// ============================================================================

const renderPopover = (props: TestPopoverProps = {}): ReturnType<typeof render> => {
  const {
    open = false,
    modal = false,
    side = 'bottom' as PopoverSide,
    align = 'center' as PopoverAlign,
    size = 'md' as PopoverSize,
    ...rest
  } = props

  return render(
    <Popover open={open} modal={modal}>
      <PopoverTrigger data-testid="popover-trigger">Trigger</PopoverTrigger>
      <PopoverContent
        data-testid="popover-content"
        side={side}
        align={align}
        size={size}
        {...rest}
      >
        <PopoverHeader data-testid="popover-header">
          <PopoverTitle data-testid="popover-title">Title</PopoverTitle>
        </PopoverHeader>
        <PopoverBody data-testid="popover-body">Body content</PopoverBody>
        <PopoverFooter data-testid="popover-footer">
          <PopoverClose data-testid="popover-close">Close</PopoverClose>
        </PopoverFooter>
      </PopoverContent>
    </Popover>
  )
}

// Error component for ErrorBoundary
const ErrorProneContent = (): never => {
  throw new Error('Test error')
}

// ============================================================================
// CORE TESTS
// ============================================================================

describe('Popover', () => {
  it('renders trigger correctly', () => {
    renderPopover()
    
    const trigger = screen.getByTestId('popover-trigger')
    expect(trigger).toBeInTheDocument()
    expect(trigger).toHaveAttribute('aria-haspopup', 'dialog')
    expect(trigger).toHaveAttribute('aria-expanded', 'false')
  })

  it('toggles on click', async () => {
    renderPopover()
    const trigger = screen.getByTestId('popover-trigger')
    
    act(() => fireEvent.click(trigger))
    
    await waitFor(() => {
      expect(screen.getByTestId('popover-content')).toBeInTheDocument()
    })
  })
})

// ============================================================================
// POSITIONING
// ============================================================================

describe('Positioning', () => {
  let mockRect: DOMRect

  beforeEach(() => {
    mockRect = {
      top: 100,
      left: 100,
      right: 200,
      bottom: 150,
      width: 100,
      height: 50,
      x: 100,
      y: 100,
    } as DOMRect

    Object.defineProperty(HTMLDivElement.prototype, 'getBoundingClientRect', {
      value: () => mockRect,
      configurable: true,
    })

    Object.defineProperties(window, {
      innerWidth: { value: 1920, configurable: true },
      innerHeight: { value: 1080, configurable: true },
      scrollX: { value: 0, configurable: true },
      scrollY: { value: 0, configurable: true },
    })
  })

  it('positions content correctly', async () => {
    renderPopover({ open: true })
    
    await waitFor(() => {
      const content = screen.getByTestId('popover-content')
      expect(content).toHaveStyle({ position: 'fixed' })
    })
  })
})

// ============================================================================
// INTERACTIONS
// ============================================================================

describe('Interactions', () => {
  it('closes on outside click', async () => {
    renderPopover()
    const trigger = screen.getByTestId('popover-trigger')
    
    act(() => fireEvent.click(trigger))
    await waitFor(() => screen.getByTestId('popover-content'))
    
    act(() => fireEvent.click(document.body))
    await waitFor(() => {
      expect(screen.queryByTestId('popover-content')).not.toBeInTheDocument()
    })
  })

  it('closes on Escape', async () => {
    renderPopover()
    const trigger = screen.getByTestId('popover-trigger')
    
    act(() => fireEvent.click(trigger))
    await waitFor(() => screen.getByTestId('popover-content'))
    
    act(() => {
      fireEvent.keyDown(document.body, { key: 'Escape', bubbles: true })
    })
    
    await waitFor(() => {
      expect(screen.queryByTestId('popover-content')).not.toBeInTheDocument()
    })
  })

  it('handles keyboard triggers', async () => {
    renderPopover()
    const trigger = screen.getByTestId('popover-trigger')
    
    act(() => {
      fireEvent.keyDown(trigger, { key: 'Enter', bubbles: true })
    })
    
    await waitFor(() => screen.getByTestId('popover-content'))
  })
})

// ============================================================================
// MODAL
// ============================================================================

describe('Modal', () => {
  it('locks scroll when modal', async () => {
    const originalOverflow = document.body.style.overflow
    
    renderPopover({ open: true, modal: true })
    
    await waitFor(() => {
      expect(document.body.style.overflow).toBe('hidden')
    })
    
    document.body.style.overflow = originalOverflow
  })
})

// ============================================================================
// ERROR BOUNDARY
// ============================================================================

describe('ErrorBoundary', () => {
  const originalConsoleError = console.error
  console.error = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()
  })

  afterEach(() => {
    console.error = originalConsoleError
  })

  it('shows fallback on error', async () => {
    render(
      <Popover open errorFallback={<div data-testid="error-fallback">Error!</div>}>
        <PopoverTrigger />
        <PopoverContent>
          <ErrorProneContent />
        </PopoverContent>
      </Popover>
    )
    
    await waitFor(() => {
      expect(screen.getByTestId('error-fallback')).toBeInTheDocument()
    })
  })
})

// ============================================================================
// SUBCOMPONENTS
// ============================================================================

describe('Subcomponents', () => {
  it('renders all subcomponents', async () => {
    renderPopover({ open: true })
    
    await waitFor(() => {
      expect(screen.getByTestId('popover-header')).toBeInTheDocument()
      expect(screen.getByTestId('popover-body')).toBeInTheDocument()
      expect(screen.getByTestId('popover-footer')).toBeInTheDocument()
      expect(screen.getByTestId('popover-title')).toBeInTheDocument()
      expect(screen.getByTestId('popover-close')).toBeInTheDocument()
    })
  })

  it('close button works', async () => {
    renderPopover()
    const trigger = screen.getByTestId('popover-trigger')
    
    act(() => fireEvent.click(trigger))
    await waitFor(() => screen.getByTestId('popover-content'))
    
    act(() => fireEvent.click(screen.getByTestId('popover-close')))
    await waitFor(() => {
      expect(screen.queryByTestId('popover-content')).not.toBeInTheDocument()
    })
  })
})

// ============================================================================
// ACCESSIBILITY
// ============================================================================

describe('A11y', () => {
  it('has correct ARIA attributes', async () => {
    renderPopover()
    const trigger = screen.getByTestId('popover-trigger')
    
    expect(trigger).toHaveAttribute('aria-haspopup', 'dialog')
    
    act(() => fireEvent.click(trigger))
    
    await waitFor(() => {
      expect(trigger).toHaveAttribute('aria-expanded', 'true')
      const content = screen.getByTestId('popover-content')
      expect(content).toHaveAttribute('role', 'dialog')
    })
  })
})

// ============================================================================
// EDGE CASES
// ============================================================================

describe('matches snapshot', () => {
  it('supports asChild', () => {
    interface CustomTriggerProps {
      children: ReactNode
    }

    const CustomTrigger = ({ children }: CustomTriggerProps) => (
      <div data-testid="custom-trigger">{children}</div>
    )

    render(
      <Popover open>
        <PopoverTrigger asChild>
          <CustomTrigger>Custom</CustomTrigger>
        </PopoverTrigger>
        <PopoverContent>Content</PopoverContent>
      </Popover>
    )
    
    expect(screen.getByTestId('custom-trigger')).toHaveAttribute('aria-haspopup')
  })
})
