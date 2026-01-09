"use client"
import * as React from "react"
import { motion } from "framer-motion"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from '../../lib/cn'

const skeletonVariants = cva(
  "relative rounded-sm bg-(--atom-skeleton-bg-color) overflow-hidden",
  {
    variants: {
      variant: {
        // simple gray block
        default: "",
        // more rounded, like pill/buttons
        rounded: "rounded-md",
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
        full: "w-full",
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
    VariantProps<typeof skeletonVariants> {
  /** Disable the shimmer animation */
  animate?: boolean
}

export function Skeleton({
  className,
  variant,
  size,
  animate = true,
  ...props
}: SkeletonProps) {
  return (
    <div
      data-slot="skeleton"
      className={cn(skeletonVariants({ variant, size }), className)}
      {...props}
    >
      {animate && (
        <motion.div
          className="absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-(--atom-skeleton-shimmer-color,rgba(255,255,255,0.2)) to-transparent"
          animate={{
            x: ['0%', '200%'],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      )}
    </div>
  )
}


Skeleton.displayName = 'Skeleton'
