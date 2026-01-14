import { Calendar } from '../calendar/Calendar'
import { Popover, PopoverTrigger, PopoverContent ,PopoverBody } from '../popover/Popover' 
// import { Button } from  '../button/Button'

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

export function PopUpCalendar({
  value,
  onChange,
  placeholder = 'Select Start date',
  icon,
  captionLayout = "label"
}: Props) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          type="button"
          className={cn(
            'relative flex w-52 h-9 items-center rounded-[calc(var(--atom-radius-2)-2px)] border',
            'bg-(--atom-input-bg) px-3 py-2 text-left text-sm',
            'text-(--atom-theme-text-secondary) font-(--atom-font-weight-medium) shadow-sm',
            'focus:outline-none leading-[calc(1.25 / .875)] whitespace-nowrap',
            'hover:bg-[color-mix(in_srgb,var(--atom-theme-border-primary)_95%,transparent)] cursor-pointer border-(--atom-theme-border-primary)',
          )}
          aria-haspopup="dialog"
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
              value && 'text-(--atom-theme-text-primary)',
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
      </PopoverTrigger>
      
      <PopoverContent className="p-0 w-[none] " side="bottom" sideOffset={4} size="sm">
        <PopoverBody>
        <Calendar
          mode="single"
          selected={value}
          onSelect={(date) => {
            onChange?.(date)
          }}
          captionLayout={captionLayout}
        />
        </PopoverBody>
      </PopoverContent>
    </Popover>
  )
}
