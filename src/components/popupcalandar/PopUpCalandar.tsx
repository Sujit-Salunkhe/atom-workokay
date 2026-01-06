import * as React from 'react'
import { Calendar } from '../calendar/Calendar'
import { motion, AnimatePresence } from 'framer-motion'

type Props = {
  value?: Date
  onChange?: (date: Date | undefined) => void
  placeholder?: string
  icon?: boolean
  captionLayout?: "label" | "dropdown" | "dropdown-months" | "dropdown-years" 
}

function cn(...classes: Array<string | undefined | false>) {
  return classes.filter(Boolean).join(' ')
}

export function PopUpCalandar({
  value,
  onChange,
  placeholder = 'Select Start date',
  icon,
  captionLayout = "label"
}: Props) {
  const [open, setOpen] = React.useState(false)
  const wrapperRef = React.useRef<HTMLDivElement | null>(null)

  React.useEffect(() => {
    if (!open) return

    function handleClickOutside(event: MouseEvent) {
      if (!wrapperRef.current) return
      const target = event.target as Node
      if (!wrapperRef.current.contains(target)) {
        setOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [open])

  return (
    <div ref={wrapperRef} className="relative w-52">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className={cn(
          'relative flex w-52 h-9 items-center rounded-[calc(var(--atom-radius-2)-2px)] border',
          'bg-(--atom-input-bg) px-3 py-2 text-left text-sm',
          'text-(--atom-badge-archived-text) font-(--atom-font-weight-medium) shadow-sm',
          'focus:outline-none leading-[calc(1.25 / .875)] whitespace-nowrap',
          'hover:bg-[color-mix(in_srgb,var(--atom-badge-archived-border)_95%,transparent)] cursor-pointer border-(--atom-theme-border)',
        )}
        aria-haspopup="dialog"
        aria-expanded={open}
      >
        {icon && (
          <svg
            viewBox="0 0 24 24"
            width="1em"
            height="1em"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.8}
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
            focusable="false"
          >
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
            <path d="M8 2v4M16 2v4" />
            <path d="M3 10h18" />
          </svg>
        )}

        <span
          className={cn(
            value && 'text-(--atom-info-card-jobstatus-primary-text)',
            'opacity-70 px-3 py-2 ',
          )}
        >
          {value
            ? new Intl.DateTimeFormat('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
              }).format(value)
            : placeholder}
        </span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            key="dob-popover"
            initial={{ opacity: 0, scale: 0.96, y: 4 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: 2 }}
            transition={{
              type: 'spring',
              stiffness: 180,
              damping: 22,
              mass: 0.9,
            }}
            className="absolute z-50 mt-2 left-0 w-55 origin-top-left  "
          >
            <Calendar
              mode="single"
              selected={value}
              onSelect={(date : any) => {
                onChange?.(date)
                setOpen(false)
              }}
              captionLayout={captionLayout}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
