// src/components/ui/skeleton.tsx
"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from '../../lib/cn'

const skeletonVariants = cva(
  "rounded-md bg-[var(--atom-skeleton-bg-color)]",
  {
    variants: {
      variant: {
        // simple gray block
        default: "",
        // more rounded, like pill/buttons
        rounded: "rounded-full",
        // card-like block
        card: "rounded-lg",
        // circular avatar
        circle: "rounded-full aspect-square",
      },
      size: {
        // generic sizes for small text lines etc.
        sm: "h-3 w-24",
        md: "h-4 w-48",
        lg: "h-6 w-72",
        full:'w-full'
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
)

export interface SkeletonProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof skeletonVariants> {}

export function Skeleton({
  className,
  variant,
  size,
  ...props
}: SkeletonProps) {
  return (
    <div
      data-slot="skeleton"
      className={cn(skeletonVariants({ variant, size }), className)}
      {...props}
    />
  )
}
