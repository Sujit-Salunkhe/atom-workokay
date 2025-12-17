"use client";

import * as React from "react";
import { format } from "date-fns";
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css"; // optional; you can remove if you fully style via Tailwind

type Props = {
  value?: Date;
  onChange?: (date: Date | undefined) => void;
  placeholder?: string;
};

function cn(...classes: Array<string | undefined | false>) {
  return classes.filter(Boolean).join(" ");
}

export function DobDatePicker({
  value,
  onChange,
  placeholder = "mm/dd/yyyy",
}: Props) {
  const [open, setOpen] = React.useState(false);
  const [month, setMonth] = React.useState<Date>(value ?? new Date());

  return (
    <div className="w-[280px]">
      <label className="mb-2 block text-sm font-medium text-[#626468]">
        Date of birth
      </label>

      {/* Trigger (looks like input) */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className={cn(
          "relative flex w-full items-center justify-between rounded-md border",
          "bg-white px-3 py-2 text-left text-sm",
          "text-[#626468] shadow-sm",
          "focus:outline-none focus:ring-2 focus:ring-[#b8e4e9]"
        )}
        aria-haspopup="dialog"
        aria-expanded={open}
      >
        <span className={cn(!value && "opacity-70")}>
          {value ? format(value, "M/d/yyyy") : placeholder}
        </span>
        <span className="ml-2 select-none">▾</span>
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
              "absolute z-50 mt-2 w-[320px] rounded-xl border p-3 shadow-lg",
              "bg-[#FFFFFF]"
            )}
          >
            <DayPicker
              mode="single"
              selected={value}
              onSelect={(d) => {
                if (d) onChange?.(d);
                setOpen(false);
              }}
              month={month}
              onMonthChange={setMonth}
              showOutsideDays
              className="p-0 text-[#626468]"
              classNames={{
                months: "flex flex-col",
                month: "space-y-3",
                caption: "flex items-center justify-between px-1",
                caption_label: "hidden", // we use dropdown-like look via custom caption below feel
                nav: "flex items-center gap-2",
                nav_button:
                  "h-8 w-8 rounded-md border bg-white text-[#626468] hover:bg-[#b8e4e9]",
                nav_button_previous: "",
                nav_button_next: "",
                table: "w-full border-collapse",
                head_row: "flex",
                head_cell:
                  "w-10 text-center text-xs font-medium text-[#626468] opacity-80",
                row: "mt-1 flex w-full",
                cell: "relative w-10 h-10 p-0 text-center",
                day: cn(
                  "h-10 w-10 rounded-md text-sm text-[#626468]",
                  "hover:bg-[#b8e4e9] hover:text-[#626468]",
                  "focus:outline-none focus:ring-2 focus:ring-[#b8e4e9]"
                ),
                day_selected:
                  "bg-[#626468] text-white hover:bg-[#626468] hover:text-white",
                day_today: "border border-[#b8e4e9]",
                day_outside: "opacity-40",
                day_disabled: "opacity-30 cursor-not-allowed",
              }}
              // Optional: limit DOB reasonable range
              // fromYear={1900}
              // toYear={new Date().getFullYear()}
            />

            {/* Caption replacement (simple, shadcn-like) */}
            <div className="mt-2 flex items-center justify-center text-sm font-medium text-[#626468] opacity-80">
              {format(month, "MMM yyyy")}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
