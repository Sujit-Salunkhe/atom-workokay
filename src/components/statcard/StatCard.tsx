import { cva } from 'class-variance-authority'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../../components/ui/card'
import { cn } from '../../lib/utils'
import * as React from 'react'

const statCardVariants = cva(
  'rounded-lg border p-4 transition',

  {
    variants: {
      variant: {
        default: '', // your Total Files / Validated
        soft: '', // your Total Jobs / Ready / In Progress
        status: '', // your High, Medium, Low cards
      },

      status: {
        info: '',
        success: '',
        warning: '',
        danger: '',
        high: '',
        medium: '',
        low: '',
      },

      hover: {
        none: '',
        subtle: '',
        strong: '',
      },
    },
  },
)

export type cardvariants = 'default' | 'status' | 'hover'

export interface StatCardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant: cardvariants
  value?: number
  label?: string
  className?: string
}

export function StatCard({ value, label, className, ...props }: StatCardProps) {
  return (
    <Card
      {...props}
      className={cn('flex flex-col items-center text-center p-4', className)}
    >
      <CardHeader className="p-0">
        <CardTitle>{label}</CardTitle>
      </CardHeader>

      <CardContent className="p-0">
        <div className="text-4xl font-bold">{value}</div>
      </CardContent>
    </Card>
  )
}

export interface StatCardProps extends React.HTMLAttributes<HTMLDivElement> {}

export function StatCard2({ className, ...props }: StatCardProps) {
  return (
    <Card
      className={cn(
        'flex flex-col items-center text-center gap-2 rounded-lg bg-[var(--atom-surface)] p-4 shadow',
        className,
      )}
      {...props}
    />
  )
}

export interface StatCardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}

export function StatCardHeader({ className, ...props }: StatCardHeaderProps) {
  return (
    <CardHeader
      className={cn('flex flex-col items-center gap-1', className)}
      {...props}
    />
  )
}

export interface StatCardTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {}

export function StatCardTitle({ className, ...props }: StatCardTitleProps) {
  return (
    <CardTitle
      className={cn('text-lg font-semibold text-[var(--atom-text)]', className)}
      {...props}
    />
  )
}

export interface StatCardContentProps extends React.HTMLAttributes<HTMLDivElement> {}

export function StatCardContent({ className, ...props }: StatCardContentProps) {
  return (
    <CardContent
      className={cn('text-4xl font-bold text-[var(--atom-text)]', className)}
      {...props}
    />
  )
}

export interface StatCardFooterProps extends React.HTMLAttributes<HTMLDivElement> {}

export function StatCardFooter({ className, ...props }: StatCardFooterProps) {
  return (
    <CardFooter
      className={cn('text-sm text-[var(--atom-muted)]', className)}
      {...props}
    />
  )
}

{
  /* <StatCard>

  <StatCardHeader>
    <StatCardTitle>Total Users</StatCardTitle>
  </StatCardHeader>

  <StatCardContent>
    1,245
  </StatCardContent>

  <StatCardFooter>
    +12% from last month
  </StatCardFooter>

</StatCard> */
}
