import * as React from 'react'

import { Calendar } from './../ui/calendar'
import { buttonVariants } from './../ui/button'
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronDownIcon,
} from 'lucide-react'

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
    <div className="w-[208px]">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className={cn(
          'relative flex w-[208px] h-[36px] items-center rounded-[calc(var(--atom-radius-2)-2px)] border',
          'bg-[var(--atom-input-bg)] px-3 py-2 text-left text-sm',
          'text-[var(--atom-badge-archived-text)] font-[var(--atom-font-weight-medium)] shadow-sm',
          'focus:outline-none leading-[calc(1.25 / .875)] whitespace-nowrap',
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

      {open && (
        <div className="absolute z-50 mt-2">
          <Calendar
            mode="single"
            selected={value}
            onSelect={(date) => {
              onChange?.(date)
              setOpen(false)
            }}
            showOutsideDays
            className="p-3 bg-[var(--atom-card-bg)] text-[var(--atom-info-card-jobstatus-primary-text)] rounded-[calc(var(--atom-radius-2)-2px)] border shadow-md"
            classNames={{
              months: 'flex flex-col',
              month: 'space-y-4',

              // Header container (holds caption + nav)
              
              month_caption: 'flex items-center justify-center pt-1',
              // caption_label: 'text-sm font-medium no-wrap text-center',
              nav: 'flex items-center justify-between px-1 h-8',
              
              button_previous: cn(
                buttonVariants({ variant: 'outline' }),
                'h-5 w-5 bg-transparent p-0 opacity-60 hover:opacity-100 cursor-pointer',
              ),
              button_next: cn(
                buttonVariants({ variant: 'outline' }),
                'h-5 w-5 bg-transparent p-0 opacity-60 hover:opacity-100 cursor-pointer',
              ),

              // keep rest...

              // Table: 7-column grid
              table: 'w-full border-collapse space-y-1',

              // Weekday header row
              weekdays: 'flex',
              weekday:
                'text-muted-foreground rounded-md w-9 font-normal text-[0.8rem] text-center',

              // Week row (7 days)
              week: 'flex w-full mt-1',

              // Day cell wrapper (contains the clickable button)
              day: cn(
                'h-9 w-9 text-center text-sm p-0 relative',
                '[&:has([aria-selected].day-range-end)]:rounded-r-md',
                '[&:has([aria-selected].day-outside)]:bg-accent/50',
                '[&:has([aria-selected])]:bg-accent  ',
                'first:[&:has([aria-selected])]:rounded-l-md',
                'last:[&:has([aria-selected])]:rounded-r-md',
                'focus-within:relative focus-within:z-20 font-[var(--atom-font-weight-normal)] ',
              ),

              day_range_end: 'day-range-end',
              day_selected:
                'bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground ',
              day_today: 'bg-red-600 text-accent-foreground',
              day_outside:
                'day-outside text-muted-foreground opacity-50 aria-selected:bg-accent/50 aria-selected:text-muted-foreground aria-selected:opacity-30',
              day_disabled: 'text-muted-foreground opacity-50',
              day_range_middle:
                'aria-selected:bg-accent aria-selected:text-accent-foreground',
              day_hidden: 'invisible',
            }}
            components={{
              Chevron: ({ className, orientation, ...props }) => {
                if (orientation === 'left') {
                  return (
                    <>
                      <ChevronLeftIcon
                        className={cn('', className)}
                        {...props}
                      />
                    </>
                  )
                }
                if (orientation === 'right') {
                  return (
                    <ChevronRightIcon
                      className={cn('', className)}
                      {...props}
                    />
                  )
                }
                return (
                  <ChevronDownIcon className={cn('', className)} {...props} />
                )
              },
            }}
          />
        </div>
      )}
    </div>
  )
}
