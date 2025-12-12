import * as React from "react"
import { cva } from "class-variance-authority"
import { cn } from "../../lib/cn"
import { Slot } from "@radix-ui/react-slot"

/* ------------------------------------------------------
 * CVA VARIANTS (unchanged)
 * ------------------------------------------------------ */
const InfoCardVariants = cva("flex ", {
  variants: {
    infoStatus: {
      primary:
        "text-[var(--atom-info-card-jobstatus-primary-text)] text-[calc(var(--atom-text-2xl))] font-[600] leading-[var(--atom-info-card-jobstatus-line-height)]",

      secondary:
        "text-[var(--atom-info-card-jobstatus-secondary-text)] font-[600] text-[calc(var(--atom-text-2xl))] leading-[var(--atom-info-card-jobstatus-line-height)]",

      success:
        "text-[var(--atom-info-card-jobstatus-success-text)] font-[600] text-[calc(var(--atom-text-2xl))] leading-[var(--atom-info-card-jobstatus-line-height)]",
    },

    labelStatus: {
      primary:
        "text-[var(--atom-info-card-jobstatus-label-text)] leading-[var(--atom-info-card-jobstatus-label-line-height)] font-[var(--atom-text-xs)]",

      secondary:
        "text-[var(--atom-info-card-jobstatus-label-text)] leading-[var(--atom-info-card-jobstatus-label-line-height)] font-[var(--atom-text-xs)]",

      success:
        "text-[var(--atom-info-card-jobstatus-label-text)] leading-[var(--atom-info-card-jobstatus-label-line-height)] font-[var(--atom-text-xs)]",
    },

    order: {
      col: "flex-col items-center justify-center bg-[color-mix(in_oklab,var(--atom-muted)_50%,transparent)] border-none shadow-none",
      colR: "flex-col-reverse items-center justify-center bg-[color-mix(in_oklab,var(--atom-muted)_50%,transparent)] border-none shadow-none",
      row: "flex-row items-center justify-between bg-[color-mix(in_oklab,var(--atom-muted)_50%,transparent)] border-none shadow-none",
      rowR: "flex-row-reverse items-center justify-between bg-[color-mix(in_oklab,var(--atom-muted)_50%,transparent)] border-none shadow-none",
    },

    size: {
      xs: "text-center py-[calc(var(--spacing)*2)] px-[calc(var(--spacing)*3)] rounded-[var(--atom-radius-2)] h-[64px] w-[112px]",
      sm: "text-center py-[calc(var(--spacing)*2)] px-[calc(var(--spacing)*4)] rounded-[var(--atom-radius-2)] h-[80px] w-[128px]",
      md: "text-center p-[calc(var(--atom-space-1)*4)] border-[var(--atom-border)] border-[var(--atom-border-style)] rounded-[var(--atom-radius-2)] h-[96px] w-[160px]",
      lg: "text-center p-[calc(var(--atom-space-1)*5)] rounded-[var(--atom-radius-2)] h-[112px] w-[192px]",
    },
  },
})

/* ------------------------------------------------------
 * TYPES
 * ------------------------------------------------------ */
export type Infovariants = "primary" | "secondary" | "success"

export interface InfoCardProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /** Semantic color variant */
  variant?: Infovariants

  /** Label text */
  label?: string

  /** Info or number displayed */
  info?: number | React.ReactNode

  /** Size variant */
  size?: "xs" | "sm" | "md" | "lg"

  /** Priority indicator (currently unused but future-proof) */
  status?: "high" | "medium" | "low"

  /** Layout direction */
  order?: "row" | "col" | "rowR" | "colR"

  /** Render as child using Radix Slot (same as Button) */
  asChild?: boolean
}

/* ------------------------------------------------------
 * COMPONENT
 * ------------------------------------------------------ */
const InfoCard = React.forwardRef<HTMLDivElement, InfoCardProps>(
  (
    {
      variant = "primary",
      order = "col",
      label,
      info,
      size = "sm",
      asChild,
      className,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "div"

    return (
      <Comp
        ref={ref}
        className={cn(InfoCardVariants({ order, size }), className)}
        {...props}
      >
        <div className={cn(InfoCardVariants({ infoStatus: variant }))}>
          {info}
        </div>

        <div className={cn(InfoCardVariants({ labelStatus: variant }))}>
          {label}
        </div>
      </Comp>
    )
  }
)

InfoCard.displayName = "InfoCard"

export default InfoCard
