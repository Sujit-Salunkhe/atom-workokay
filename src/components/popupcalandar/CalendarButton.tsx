import * as React from "react"
import { DayButton } from "react-day-picker"
import { Button } from "../ui/button"
import { cn } from "../../lib/utils"

export function ParentDayButton(props: React.ComponentProps<typeof DayButton>) {
  const { className, day, modifiers, ...rest } = props

  const ref = React.useRef<HTMLButtonElement>(null)
  React.useEffect(() => {
    if (modifiers.focused) ref.current?.focus()
  }, [modifiers.focused])

  const isSingleSelected =
    modifiers.selected &&
    !modifiers.range_start &&
    !modifiers.range_end &&
    !modifiers.range_middle

  return (
    <Button
      ref={ref}
      variant="ghost"
      size="icon"
      data-day={day.date.toLocaleDateString()}
      className={cn(
        "flex aspect-square h-auto w-full min-w-[--cell-size] rounded-md",
        "hover:bg-[#b8e4e9]",

        // ✅ YOUR SELECTED DAY STYLE (change here)
        isSingleSelected && "bg-[#111827] text-white hover:bg-[#111827]",

        // optional: today style if you want it here too
        modifiers.today && "border border-[#b8e4e9]",

        className
      )}
      {...rest}
    />
  )
}
