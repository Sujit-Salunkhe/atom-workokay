import { describe, it, expect, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor} from "@testing-library/react";
import * as React from "react";
import { Tooltip, type TooltipProps } from "./ToolTip";

describe("Tooltip", () => {
  beforeEach(() => {
    // RTL auto-cleanup
  });

  // ✅ PERFECTLY TYPE-SAFE - No unused props, no callable errors
  const renderTooltip = ({
    variant,
    size,
    showArrow,
    side,
    className,
    ...forwardedProps
  }: Partial<Pick<TooltipProps, "variant" | "size" | "showArrow" | "side" | "className" | "id" | "role">> = {}) => {
    return render(
      <Tooltip content="Tooltip content" {...{ variant, size, showArrow, side, className, ...forwardedProps }}>
        <button data-testid="trigger">Hover me</button>
      </Tooltip>
    );
  };

  const getTrigger = () => screen.getByTestId("trigger") as HTMLElement;
  const getTooltipContent = () => screen.getByText("Tooltip content");

  // 🎯 CORE FUNCTIONALITY

  it("renders trigger children correctly", () => {
    renderTooltip();
    expect(getTrigger()).toBeInTheDocument();
    expect(getTrigger()).toHaveTextContent("Hover me");
  });

  it("does not render content initially", () => {
    renderTooltip();
    expect(screen.queryByText("Tooltip content")).not.toBeInTheDocument();
  });

  it("shows content on hover", async () => {
    renderTooltip();
    fireEvent.mouseEnter(getTrigger());
    
    await waitFor(() => {
      expect(getTooltipContent()).toBeInTheDocument();
    }, { timeout: 300 });
  });

  it("hides content after mouse leave", async () => {
    renderTooltip();
    
    fireEvent.mouseEnter(getTrigger());
    await waitFor(() => expect(getTooltipContent()).toBeInTheDocument());
    
    fireEvent.mouseLeave(getTrigger());
    await waitFor(() => {
      expect(screen.queryByText("Tooltip content")).not.toBeInTheDocument();
    });
  });

  // 🎨 VARIANT STYLING - FIXED RegExp CALLABLE ERROR

  it("applies default variant styling", async () => {
    renderTooltip({ variant: "default" });
    fireEvent.mouseEnter(getTrigger());
    
    await waitFor(() => {
      expect(getTooltipContent()).toHaveClass("z-50");
      expect(getTooltipContent()).toHaveClass("rounded-lg");
    });
  });

  it("applies soft variant", async () => {
    renderTooltip({ variant: "soft" });
    fireEvent.mouseEnter(getTrigger());
    
    await waitFor(() => {
      const tooltip = getTooltipContent();
      expect(tooltip).toHaveClass("text-xs");
    });
  });

  it("applies solid variant", async () => {
    renderTooltip({ variant: "solid" });
    fireEvent.mouseEnter(getTrigger());
    
    await waitFor(() => {
      expect(getTooltipContent()).toHaveClass("text-[var(--atom-primary-contrast)]");
    });
  });

  // 📐 SIZE VARIANTS

  it("applies size variants", async () => {
    const sizes = [
      { size: "sm" as const, expected: "px-2 py-1" },
      { size: "md" as const, expected: "px-3 py-1.5" },
      { size: "lg" as const, expected: "px-4 py-2" },
    ] as const;

    for (const { size, expected } of sizes) {
      const { rerender } = renderTooltip({ size });
      fireEvent.mouseEnter(getTrigger());
      
      await waitFor(() => {
        expect(getTooltipContent()).toHaveClass(expected);
      });
      
      rerender(null);
    }
  });

  // 🎯 ARROW & POSITIONING

  it("renders arrow when showArrow=true", async () => {
    render(
      <Tooltip content="Arrow tooltip" showArrow>
        <button data-testid="trigger">Hover</button>
      </Tooltip>
    );
    
    fireEvent.mouseEnter(getTrigger());
    await waitFor(() => {
      const tooltip = screen.getByText("Arrow tooltip");
      expect(tooltip.closest("[data-radix-popper-content-wrapper]")?.querySelector("svg")).not.toBeNull();
    });
  });

  // ♿ ACCESSIBILITY & PROPS FORWARDING

  it("forwards props to content element", async () => {
    renderTooltip({ id: "test-tooltip", role: "tooltip" });
    fireEvent.mouseEnter(getTrigger());
    
    await waitFor(() => {
      const tooltip = getTooltipContent();
      expect(tooltip).toHaveAttribute("id", "test-tooltip");
      expect(tooltip).toHaveAttribute("role", "tooltip");
    });
  });

  it("merges custom className", async () => {
    renderTooltip({ className: "custom-class" });
    fireEvent.mouseEnter(getTrigger());
    
    await waitFor(() => {
      expect(getTooltipContent()).toHaveClass("custom-class");
      expect(getTooltipContent()).toHaveClass("z-50");
    });
  });

  // 🎬 ANIMATIONS & BASE STYLING

  it("applies base styling and animations", async () => {
    renderTooltip();
    fireEvent.mouseEnter(getTrigger());
    
    await waitFor(() => {
      const tooltip = getTooltipContent();
      expect(tooltip).toHaveClass("z-50");
      expect(tooltip).toHaveClass("rounded-lg");
      expect(tooltip).toHaveClass("shadow-md");
    });
  });

  // 🔄 asChild SUPPORT

  it("works with asChild trigger", async () => {
    const CustomTrigger = React.forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement>>(
      (props, ref) => (
        <button ref={ref} data-testid="trigger" {...props}>
          Custom Trigger
        </button>
      )
    );
    
    render(
      <Tooltip content="Custom trigger works">
        <CustomTrigger />
      </Tooltip>
    );
    
    fireEvent.mouseEnter(getTrigger());
    await waitFor(() => {
      expect(screen.getByText("Custom trigger works")).toBeInTheDocument();
    });
  });

  // 📱 COMPLEX CONTENT

  it("supports complex ReactNode content", async () => {
    render(
      <Tooltip content={
        <>
          <strong>Bold text</strong>
          <span>with spans</span>
        </>
      }>
        <button data-testid="trigger">Hover</button>
      </Tooltip>
    );
    
    fireEvent.mouseEnter(getTrigger());
    await waitFor(() => {
      expect(screen.getByText("Bold text")).toBeInTheDocument();
      expect(screen.getByText("with spans")).toBeInTheDocument();
    });
  });
});
