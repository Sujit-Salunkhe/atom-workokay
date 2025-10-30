import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "../../lib/cn";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap select-none " +
    "transition-colors disabled:opacity-50 disabled:pointer-events-none " +
    "rounded-md font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 " +
    "focus-visible:ring-[var(--atom-ring-color)] focus-visible:ring-offset-[var(--atom-ring-offset)] " +
    // needed for ripple clipping
    "relative overflow-hidden isolate",
  {
    variants: {
      variant: {
        primary:
          "text-[var(--atom-button-fg)] bg-[var(--atom-button-bg)] hover:bg-[var(--atom-button-bg-hover)]",
        ghost:
          "text-[var(--atom-button-ghost-fg)] bg-[var(--atom-button-ghost-bg)] hover:bg-[var(--atom-button-ghost-hover-bg)]",
      },
      size: {
        sm: "h-8 px-3 text-sm",
        md: "h-10 px-4 text-sm",
        lg: "h-12 px-5 text-base",
      },
      fullWidth: { true: "w-full" },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  ripple?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, fullWidth, asChild, ripple = true, onPointerDown, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    const btnRef = React.useRef<HTMLButtonElement | null>(null);

    const handlePointerDown = (e: React.PointerEvent<HTMLButtonElement>) => {
      onPointerDown?.(e);
      if (!ripple || props.disabled || e.button !== 0) return;

      const el = btnRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const maxDim = Math.max(rect.width, rect.height);

      // 🔸 Add this size-based scaling factor
      const factor = size === "sm" ? 0.5 : size === "lg" ? 0.7 : 0.6;
      const radius = maxDim * factor;

      const x = e.clientX - rect.left - radius;
      const y = e.clientY - rect.top - radius;

      const span = document.createElement("span");
      span.className = "atom-ripple";
      span.style.width = `${radius * 2}px`;
      span.style.height = `${radius * 2}px`;
      span.style.left = `${x}px`;
      span.style.top = `${y}px`;

      const isGhost = variant === "ghost";
      const color = getComputedStyle(el).getPropertyValue(
        isGhost ? "--atom-ripple-color-ghost" : "--atom-ripple-color-solid"
      ).trim();
      span.style.background = color || "currentColor";

      el.appendChild(span);
      span.addEventListener("animationend", () => span.remove(), { once: true });
    };


    return (
      <Comp
        ref={(node: any) => {
          btnRef.current = node;
          if (typeof ref === "function") ref(node);
          else if (ref) (ref as React.MutableRefObject<HTMLButtonElement | null>).current = node;
        }}
        onPointerDown={handlePointerDown}
        className={cn(buttonVariants({ variant, size, fullWidth }), className)}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";
