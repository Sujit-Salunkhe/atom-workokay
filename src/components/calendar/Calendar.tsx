'use client'

import * as React from 'react'
import { format } from 'date-fns'
import { DayPicker } from 'react-day-picker'
import 'react-day-picker/style.css' // optional; you can remove if you fully style via Tailwind

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
  const [month, setMonth] = React.useState<Date>(value ?? new Date())

  return (
    <div className="w-[280px]">
      {/* Trigger (looks like input) */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className={cn(
          'relative flex w-[208px] h-[36px] items-center rounded-[calc(var(--atom-radius-2)-2px)] border',
          'bg-[var(--atom-input-bg)] px-3 py-2 text-left text-sm',
          'text-[var(--atom-badge-archived-text)] font-[var(--atom-font-weight-medium)] shadow-sm',
          'focus:outline-none leading-[calc(1.25 / .875)] whitespace-nowrap',
          // hover classes
          'hover:bg-[color-mix(in_srgb,var(--atom-badge-archived-border)_75%,transparent)] hover:text-[var(--atom-info-card-jobstatus-primary-text)]',
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
            value && `text-[var(--atom-info-card-jobstatus-primary-text)]`,
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
      {/* Popover */}

      {open && (
        <div className="relative">
          {/* click outside area */}
          <button
            aria-label="Close"
            className="fixed inset-0 cursor-default"
            onClick={() => setOpen(false)}
            tabIndex={-1}
          />

          <div
            role="dialog"
            aria-label="Choose date"
            className={cn(
              'absolute z-50 mt-2 w-[320px] rounded-xl border p-3 shadow-lg',
              'bg-[#FFFFFF]',
            )}
          >
            <div className="mt-2 flex items-center justify-center text-sm font-medium text-[#626468] opacity-80">
              {format(month, 'MMM yyyy')}
            </div>

            <DayPicker
              mode="single"
              selected={value}
              onSelect={(d) => {
                if (d) onChange?.(d)
                setOpen(false)
              }}
              month={month}
              onMonthChange={setMonth}
              showOutsideDays
              captionLayout="dropdown"
              className="p-0 text-[var(--atom-info-card-jobstatus-primary-text)]"
              classNames={{
                months: 'flex flex-col',
                month: 'space-y-3',
                caption: 'flex items-center justify-between px-1',
                // With captionLayout, DayPicker renders dropdowns/buttons; don't hide the label.
                caption_label: 'text-sm font-medium text-[#626468]',

                nav: 'flex items-center gap-2',
                nav_button:
                  'h-8 w-8 rounded-md border bg-white text-[#626468] hover:bg-[#b8e4e9]',
                nav_button_previous: '',
                nav_button_next: '',

                // Dropdowns (month/year)
                dropdowns: 'flex items-center gap-2',
                dropdown:
                  'h-8 rounded-md border bg-white px-2 text-sm text-[#626468]',
                dropdown_month: '',
                dropdown_year: '',
                caption_dropdowns: 'flex items-center gap-2',

                table: 'w-full border-collapse',
                head_row: 'flex',
                head_cell:
                  'w-10 text-center text-xs font-medium text-[#626468] opacity-80',
                row: 'mt-1 flex w-full',
                cell: 'relative h-10 w-10 p-0 text-center',

                day: 'h-10 w-10 rounded-md text-sm text-[#626468] hover:bg-[#b8e4e9] hover:text-[#626468] focus:outline-none focus:ring-2 focus:ring-[#b8e4e9]',
                day_selected:
                  'bg-[#626468] text-white hover:bg-[#626468] hover:text-white',
                day_today: 'border border-[#b8e4e9]',
                day_outside: 'opacity-40',
                day_disabled: 'opacity-30 cursor-not-allowed',
              }}
            />

            {/* Caption replacement (simple, shadcn-like) */}
          </div>
        </div>
      )}
    </div>
  )
}
