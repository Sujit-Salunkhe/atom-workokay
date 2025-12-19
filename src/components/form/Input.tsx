import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/cn";

const inputVariants = cva(
  "block w-full rounded-md outline-none leading-none " +
    "bg-[var(--atom-input-bg)] text-[var(--atom-input-fg)] " +
    "placeholder:text-[color-mix(in srgb, var(--atom-input-fg) 55%, transparent)] " +
    "border border-[var(--atom-input-border)] " +
    "transition-colors duration-150 ease-in-out " +
    "hover:bg-[color-mix(in srgb, var(--atom-primary) 6%, transparent)] " +
    "hover:border-[color-mix(in srgb, var(--atom-input-border) 70%, var(--atom-primary) 30%)] " +
    "focus:outline-none focus:border-[var(--atom-input-focus,var(--atom-primary))] " +
    "caret-[var(--atom-primary)] selection:bg-[color-mix(in srgb, var(--atom-primary) 30%, transparent)] " +
    "disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:bg-[var(--atom-input-bg)] disabled:hover:border-[var(--atom-input-border)] " +
    "read-only:bg-[color-mix(in srgb, var(--atom-input-bg) 90%, var(--atom-border) 10%)] read-only:cursor-default " +
    "read-only:hover:bg-[color-mix(in srgb, var(--atom-input-bg) 90%, var(--atom-border) 10%)]",
  {
    variants: {
      size: {
        sm: "h-9 px-3 text-sm",
        md: "h-10 px-3.5 text-sm",
        lg: "h-11 px-4 text-base",
      },
      tone: {
        default: "",
        invalid: "border-[var(--atom-error)]",
        success: "border-[var(--atom-success)]",
      },
      hasLeft: { true: "pl-9" },
      hasRight: { true: "pr-9" },
    },
    defaultVariants: { size: "md", tone: "default" },
  }
);

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">,
    VariantProps<typeof inputVariants> {
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  hint?: string;
  errorText?: string;
  loading?: boolean;
  id?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      size,
      tone = "default",
      leftIcon,
      rightIcon,
      hint,
      errorText,
      loading = false,
      id: idProp,
      ...props
    },
    ref
  ) => {
    const reactId = React.useId();
    const inputId = idProp ?? `inp_${reactId}`;
    const hasLeft = !!leftIcon;
    const hasRight = !!rightIcon || loading;

    const describedByIds: string[] = [];
    if (hint) describedByIds.push(`${inputId}__hint`);
    if (errorText) describedByIds.push(`${inputId}__err`);

    const wrapW = size === "lg" ? "w-10" : size === "sm" ? "w-8" : "w-9";
    const svgSize =
      size === "lg" ? "[&>svg]:w-5 [&>svg]:h-5"
      : size === "sm" ? "[&>svg]:w-4 [&>svg]:h-4"
      :                 "[&>svg]:w-5 [&>svg]:h-5";

    // Tone-aware hover/focus overrides
    const toneClass =
      tone === "invalid"
        ? "hover:bg-[color-mix(in srgb, var(--atom-error) 6%, transparent)] " +
          "hover:border-[color-mix(in srgb, var(--atom-input-border) 70%, var(--atom-error) 30%)] " +
          "focus:border-[var(--atom-error)]"
        : tone === "success"
        ? "hover:bg-[color-mix(in srgb, var(--atom-success) 6%, transparent)] " +
          "hover:border-[color-mix(in srgb, var(--atom-input-border) 70%, var(--atom-success) 30%)] " +
          "focus:border-[var(--atom-success)]"
        : "";

    return (
      <div>
        {/* Inner field wrapper: icons are centered relative to INPUT height only */}
        <div className="relative">
          {/* Left icon */}
          {hasLeft && (
            <span
              className={cn(
                "pointer-events-none absolute left-0 top-1/2 -translate-y-1/2 flex items-center justify-center",
                wrapW
              )}
              aria-hidden="true"
            >
              <span
                className={cn(
                  svgSize,
                  "text-(--atom-muted) [&>svg]:fill-current [&>svg]:stroke-current"
                )}
              >
                {leftIcon}
              </span>
            </span>
          )}

          {/* Right icon (can be interactive if you pass a button) */}
          {hasRight && (
            <span
              className={cn(
                "absolute right-0 top-1/2 -translate-y-1/2 flex items-center justify-center",
                wrapW
              )}
            >
              <span
                className={cn(
                  svgSize,
                  "text-(--atom-muted) [&>svg]:fill-current [&>svg]:stroke-current"
                )}
              >
                {loading ? (
                  <svg viewBox="0 0 24 24" className="animate-spin" fill="none" stroke="currentColor">
                    <circle cx="12" cy="12" r="9" strokeOpacity=".2" strokeWidth="3" />
                    <path d="M21 12a9 9 0 0 1-9 9" strokeWidth="3" strokeLinecap="round" />
                  </svg>
                ) : (
                  rightIcon
                )}
              </span>
            </span>
          )}

          <input
            id={inputId}
            ref={ref}
            className={cn(inputVariants({ size, tone, hasLeft, hasRight }), toneClass, className)}
            aria-invalid={tone === "invalid" || !!errorText || undefined}
            aria-readonly={props.readOnly || undefined}
            aria-busy={loading || undefined}
            aria-describedby={describedByIds.length ? describedByIds.join(" ") : undefined}
            {...props}
          />
        </div>

        {/* Hint / Error BELOW the field wrapper (no impact on icon centering) */}
        {(hint || errorText) && (
          <div className="mt-1 text-xs leading-snug">
            {errorText && (
              <p id={`${inputId}__err`} className="text-(--atom-error)">
                {errorText}
              </p>
            )}
            {hint && (
              <p id={`${inputId}__hint`} className="text-(--atom-error)">
                {hint}
              </p>
            )}
          </div>
        )}
      </div>
    );
  }
);
Input.displayName = "Input";
