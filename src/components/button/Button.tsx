import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "../../lib/cn";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap select-none " +
    "disabled:opacity-50 disabled:pointer-events-none " +
    "rounded-md font-medium leading-none focus:outline-none " +
    "focus-visible:ring-2 focus-visible:ring-offset-2 " +
    "focus-visible:ring-[var(--atom-ring-color)] focus-visible:ring-offset-[var(--atom-ring-offset)] " +
    "transition-colors transition-transform duration-150 ease-in-out " +
    "relative overflow-hidden isolate " +
    "[&>svg]:fill-current [&>svg]:stroke-current " +
    "motion-reduce:transform-none motion-reduce:transition-none",
  {
    variants: {
      variant: {
        primary:
          "text-[var(--atom-button-fg)] bg-[var(--atom-button-bg)] hover:bg-[var(--atom-button-bg-hover)]",
        ghost:
          "text-[var(--atom-button-ghost-fg)] bg-[var(--atom-button-ghost-bg)] hover:bg-[var(--atom-button-ghost-hover-bg)]",
        icon:
          "rounded-full p-0 text-[var(--atom-button-ghost-fg)] bg-transparent hover:bg-[var(--atom-button-ghost-hover-bg)]",
        iconGhost:
          "rounded-full p-0 text-[var(--atom-button-ghost-fg)] bg-transparent hover:bg-[var(--atom-button-ghost-hover-bg)]",
        iconSquare:
          "rounded-md p-0 text-[var(--atom-button-ghost-fg)] bg-transparent hover:bg-[var(--atom-button-ghost-hover-bg)]",
        iconSquareGhost:
          "rounded-md p-0 text-[var(--atom-button-ghost-fg)] bg-transparent hover:bg-[var(--atom-button-ghost-hover-bg)]",
        secondary:
          "border border-[var(--atom-border)] text-[var(--atom-primary)] bg-transparent " +
          "hover:border-[color-mix(in srgb, var(--atom-primary) 80%, black)] " +
          "hover:text-[color-mix(in srgb, var(--atom-primary) 90%, black)] " +
          "hover:bg-[color-mix(in srgb, var(--atom-primary) 8%, white)]",
      },
      size: {
        // Normal buttons keep padding + icon size mapping
        sm: "h-8 px-3 text-sm [&>svg]:size-4",
        md: "h-10 px-4 text-sm [&>svg]:size-5",
        lg: "h-12 px-5 text-base [&>svg]:size-6",
      },
      fullWidth: { true: "w-full" },
    },
    compoundVariants: [
      // Round icon buttons — square aspect, no horizontal padding
      { variant: "icon", size: "sm", class: "w-8 h-8 !px-0 aspect-square" },
      { variant: "icon", size: "md", class: "w-10 h-10 !px-0 aspect-square" },
      { variant: "icon", size: "lg", class: "w-12 h-12 !px-0 aspect-square" },

      { variant: "iconGhost", size: "sm", class: "w-8 h-8 !px-0 aspect-square" },
      { variant: "iconGhost", size: "md", class: "w-10 h-10 !px-0 aspect-square" },
      { variant: "iconGhost", size: "lg", class: "w-12 h-12 !px-0 aspect-square" },

      // NEW: Square icon buttons — same geometry as round ones, just not full-round
      { variant: "iconSquare", size: "sm", class: "w-8 h-8 !px-0 aspect-square" },
      { variant: "iconSquare", size: "md", class: "w-10 h-10 !px-0 aspect-square" },
      { variant: "iconSquare", size: "lg", class: "w-12 h-12 !px-0 aspect-square" },

      { variant: "iconSquareGhost", size: "sm", class: "w-8 h-8 !px-0 aspect-square" },
      { variant: "iconSquareGhost", size: "md", class: "w-10 h-10 !px-0 aspect-square" },
      { variant: "iconSquareGhost", size: "lg", class: "w-12 h-12 !px-0 aspect-square" },

      // Subtle micro-interaction for all icon-style buttons
      { variant: "icon", class: "hover:scale-105 active:scale-95 hover:opacity-90" },
      { variant: "iconGhost", class: "hover:scale-105 active:scale-95 hover:opacity-90" },
      { variant: "iconSquare", class: "hover:scale-105 active:scale-95 hover:opacity-90" },
      { variant: "iconSquareGhost", class: "hover:scale-105 active:scale-95 hover:opacity-90" },
    ],
    defaultVariants: { variant: "primary", size: "md" },
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

      const isGhostLike =
        (variant ?? "primary") === "ghost" || variant === "icon" || variant === "iconGhost" || variant === "secondary";
      const color = getComputedStyle(el)
        .getPropertyValue(isGhostLike ? "--atom-ripple-color-ghost" : "--atom-ripple-color-solid")
        .trim();
      span.style.background = color || "currentColor";

      el.appendChild(span);
      span.addEventListener("animationend", () => span.remove(), { once: true });
    };

    return (
      <Comp
        ref={(node: HTMLButtonElement | null) => {
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
