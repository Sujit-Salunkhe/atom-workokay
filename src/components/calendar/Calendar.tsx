import * as React from 'react'
import { CalendarTest } from './CalendarTest'

type Props = {
  value?: Date
  onChange?: (date: Date | undefined) => void
  placeholder?: string
  icon?: boolean
}

function cn(...classes: Array<string | undefined | false>) {
  return classes.filter(Boolean).join(' ')
}

export function DobDatePicker({
  value,
  onChange,
  placeholder = 'Select Start date',
  icon,
}: Props) {
  const [open, setOpen] = React.useState(false)

  return (
    <div className="relative w-52">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className={cn(
          'relative flex w-52 h-9 items-center rounded-[calc(var(--atom-radius-2)-2px)] border',
          'bg-(--atom-input-bg) px-3 py-2 text-left text-sm',
          'text-(--atom-badge-archived-text) font-(--atom-font-weight-medium) shadow-sm',
          'focus:outline-none leading-[calc(1.25 / .875)] whitespace-nowrap',
          'hover:bg-[color-mix(in_srgb,var(--atom-badge-archived-border)_75%,transparent)] hover:text-(--atom-info-card-jobstatus-primary-text)',
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
            value && `text-(--atom-info-card-jobstatus-primary-text)`,
            'opacity-70 px-3 py-2',
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

      {open && (
        <div className="absolute z-50 mt-2 left-0 w-52">
          <CalendarTest
            mode="single"
            selected={value}
            onSelect={(date) => {
              onChange?.(date)
              setOpen(false)
            }}
            captionLayout='label'
            className='w-55'
          />
        </div>
      )}
    </div>
  )
}
