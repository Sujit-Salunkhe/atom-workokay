import { cva } from 'class-variance-authority'
import React from 'react'
import { cn } from '../../lib/cn'



const InfoCardVariants = cva('flex ', {
  variants: {
    infoStatus: {
      primary:
        'text-[var(--atom-info-card-jobstatus-primary-text)]  text-[calc(var(--atom-text-2xl))] font-[600] leading-[var(--atom-info-card-jobstatus-line-height)]',

      secondary:
        'text-[var(--atom-info-card-jobstatus-secondary-text)] font-[600] text-[calc(var(--atom-text-2xl))] leading-[var(--atom-info-card-jobstatus-line-height)]',

      success:
        'text-[var(--atom-info-card-jobstatus-success-text)] font-[600] text-[calc(var(--atom-text-2xl))] leading-[var(--atom-info-card-jobstatus-line-height)] ',
    },

    labelStatus: {
      primary:
        'text-[var(--atom-info-card-jobstatus-label-text)] leading-[var(--atom-info-card-jobstatus-label-line-height)] font-[var(--atom-text-xs)]',

      secondary:
        'text-[var(--atom-info-card-jobstatus-label-text)] leading-[var(--atom-info-card-jobstatus-label-line-height)] font-[var(--atom-text-xs)]',

      success:
        'text-[var(--atom-info-card-jobstatus-label-text)] leading-[var(--atom-info-card-jobstatus-label-line-height)] font-[var(--atom-text-xs)]',
    },
    order: {
      col: 'flex-col items-center justify-center bg-[color-mix(in_oklab,var(--atom-muted)_50%,transparent)] border-none shadow-none',
      colR: 'flex-col-reverse items-center  justify-center bg-[color-mix(in_oklab,var(--atom-muted)_50%,transparent)] border-none shadow-none',
      row: 'flex-row items-center justify-between  bg-[color-mix(in_oklab,var(--atom-muted)_50%,transparent)] border-none shadow-none',
      rowR: 'flex-row-reverse items-center justify-between  bg-[color-mix(in_oklab,var(--atom-muted)_50%,transparent)] border-none shadow-none',
    },

    size: {
      xs: `text-center  py-[calc(var(--spacing)*2)] px-[calc(var(--spacing)*3)] rounded-[var(--atom-radius-2)] h-[64px] w-[112px]`,
      sm: `text-center py-[calc(var(--spacing)*2)] px-[calc(var(--spacing)*4)] rounded-[var(--atom-radius-2)] h-[80px] w-[128px] `,
      md: `text-center p-[calc(var(--atom-space-1)*4)] border-[var(--atom-border)] border-[var(--atom-border-style)] rounded-[var(--atom-radius-2)] h-[96px] w-[160px]  `,
      lg: `text-center p-[calc(var(--atom-space-1)*5)] rounded-[var(--atom-radius-2)] h-[112px] w-[192px]`,
    },
  },
})

export type Infovariants = 'primary' | 'secondary' | 'success'

export interface InfoCardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: Infovariants
  label?: string
  info?: number | React.ReactNode
  size?: 'xs' | 'sm' | 'md' | 'lg'
  status?: 'high' | 'medium' | 'low'
  order?: 'row' | 'col' | 'rowR' | 'colR'
}

const InfoCard = React.forwardRef<HTMLDivElement, InfoCardProps>(
  ({ variant = 'primary', order = 'col', label, info, className, size = 'sm', status, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(InfoCardVariants({ order, size }), className)}
        {...props}
      >
        <div
          className={cn(InfoCardVariants({ infoStatus: variant }), className)}
        >
          {info}
        </div>
        <div
          className={cn(InfoCardVariants({ labelStatus: variant }), className)}
        >
          {label}
        </div>
      </div>
    )
  },
)

InfoCard.displayName = 'InfoCard'

export default InfoCard
