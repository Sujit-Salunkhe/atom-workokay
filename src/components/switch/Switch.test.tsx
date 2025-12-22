// src/components/ui/Switch.test.tsx
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import * as React from "react";
import { Switch } from "./Switch";

describe("Switch", () => {
  const renderSwitch = (props: any) => {
    return render(
      <Switch data-testid="switch" {...props} />
    );
  };

  const getSwitch = () => screen.getByTestId("switch") as HTMLButtonElement;
  const getThumb = () => screen.getByTestId("switch-thumb") as HTMLSpanElement;

  it("renders Switch with correct structure", () => {
    renderSwitch({});
    expect(getSwitch()).toBeInTheDocument();
    expect(getThumb()).toBeInTheDocument();
    expect(getSwitch()).toHaveAttribute("data-slot", "switch");
    expect(getThumb()).toHaveAttribute("data-slot", "switch-thumb");
  });

  it("applies default variants", () => {
    renderSwitch({});
    const switchEl = getSwitch();
    expect(switchEl).toHaveClass("h-5"); // md height
    expect(switchEl).toHaveClass("w-9"); // md width
    expect(switchEl).toHaveClass("peer");
    expect(switchEl).toHaveClass("inline-flex");
  });

  it("applies size sm", () => {
    renderSwitch({ size: "sm" });
    const switchEl = getSwitch();
    expect(switchEl).toHaveClass("h-4");
    expect(switchEl).toHaveClass("w-7");
    expect(getThumb()).toHaveClass("h-3");
    expect(getThumb()).toHaveClass("w-3");
  });

  it("applies size md (default)", () => {
    renderSwitch({});
    const switchEl = getSwitch();
    expect(switchEl).toHaveClass("h-5");
    expect(switchEl).toHaveClass("w-9");
    expect(getThumb()).toHaveClass("h-4");
    expect(getThumb()).toHaveClass("w-4");
  });

  it("applies size lg", () => {
    renderSwitch({ size: "lg" });
    const switchEl = getSwitch();
    expect(switchEl).toHaveClass("h-6");
    expect(switchEl).toHaveClass("w-11");
    expect(getThumb()).toHaveClass("h-5");
    expect(getThumb()).toHaveClass("w-5");
  });

  it("applies variant primary (default)", () => {
    renderSwitch({});
    const switchEl = getSwitch();
    expect(switchEl).toHaveClass(/data-\[state=checked\]:bg-\[var\(--atom-primary\)\]/);
  });

  it("applies variant success", () => {
    renderSwitch({ variant: "success" });
    const switchEl = getSwitch();
    expect(switchEl).toHaveClass(/data-\[state=checked\]:bg-\[var\(--atom-success\)\]/);
  });

  it("applies variant warning", () => {
    renderSwitch({ variant: "warning" });
    const switchEl = getSwitch();
    expect(switchEl).toHaveClass(/data-\[state=checked\]:bg-\[var\(--atom-warning\)\]/);
  });

  it("applies variant danger", () => {
    renderSwitch({ variant: "danger" });
    const switchEl = getSwitch();
    expect(switchEl).toHaveClass(/data-\[state=checked\]:bg-\[var\(--atom-error\)\]/);
  });

  it("applies variant info", () => {
    renderSwitch({ variant: "info" });
    const switchEl = getSwitch();
    expect(switchEl).toHaveClass(/data-\[state=checked\]:bg-\[var\(--atom-info\)\]/);
  });

  it("applies variant neutral", () => {
    renderSwitch({ variant: "neutral" });
    const switchEl = getSwitch();
    expect(switchEl).toHaveClass(/data-\[state=checked\]:bg-\[var\(--atom-text-muted\)\]/);
  });

  it("applies unchecked state styling", () => {
    renderSwitch({});
    const switchEl = getSwitch();
    expect(switchEl).toHaveClass("data-[state=unchecked]:bg-[var(--atom-border)]");
    expect(switchEl).toHaveClass("data-[state=unchecked]:border-[var(--atom-border)]");
    expect(getThumb()).toHaveClass("data-[state=unchecked]:translate-x-0");
  });

  it("handles checked state", () => {
    renderSwitch({ defaultChecked: true });
    const switchEl = getSwitch();
    expect(switchEl).toHaveAttribute("data-state", "checked");
    expect(getThumb()).toHaveClass("data-[state=checked]:translate-x-4"); // md size
  });

  it("handles controlled checked state", () => {
    const { rerender } = renderSwitch({ checked: false });
    expect(getSwitch()).toHaveAttribute("data-state", "unchecked");

    rerender(<Switch data-testid="switch" checked={true} />);
    expect(getSwitch()).toHaveAttribute("data-state", "checked");
  });

  it("handles toggle onClick", () => {
    const onCheckedChange = vi.fn();
    renderSwitch({ onCheckedChange });
    
    const switchEl = getSwitch();
    expect(switchEl).toHaveAttribute("data-state", "unchecked");
    
    fireEvent.click(switchEl);
    expect(onCheckedChange).toHaveBeenCalledWith(true);
  });

  it("applies thumb movement for different sizes", () => {
    renderSwitch({ size: "sm", defaultChecked: true });
    expect(getThumb()).toHaveClass("data-[state=checked]:translate-x-3");

    expect(getThumb()).toHaveClass("data-[state=checked]:translate-x-5");
  });

  it("applies fullWidth true", () => {
    renderSwitch({ fullWidth: true });
    const switchEl = getSwitch();
    expect(switchEl).toHaveClass("w-full");
  });

  it("handles disabled state", () => {
    renderSwitch({ disabled: true });
    const switchEl = getSwitch();
    expect(switchEl).toHaveClass("disabled:opacity-50");
    expect(switchEl).toHaveClass("disabled:cursor-not-allowed");
    expect(switchEl).toBeDisabled();
  });

  it("forwards ref", () => {
    const ref: React.RefObject<HTMLButtonElement | null> = React.createRef();
    renderSwitch({ ref });
    expect(ref.current).not.toBeNull();
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });

  it("merges custom className", () => {
    renderSwitch({ className: "mr-2 scale-110" });
    const switchEl = getSwitch();
    expect(switchEl).toHaveClass("mr-2");
    expect(switchEl).toHaveClass("scale-110");
  });

  it("forwards HTML attributes", () => {
    renderSwitch({ 
      id: "test-switch",
      title: "Toggle option",
      "data-category": "settings",
      style: { margin: "8px" }
    });
    const switchEl = getSwitch();
    expect(switchEl).toHaveAttribute("id", "test-switch");
    expect(switchEl).toHaveAttribute("title", "Toggle option");
    expect(switchEl).toHaveStyle("margin: 8px");
  });

  it("applies focus-visible styles", () => {
    renderSwitch({});
    const switchEl = getSwitch();
    expect(switchEl).toHaveClass("focus-visible:ring-2");
    expect(switchEl).toHaveClass("focus-visible:outline-none");
  });

  it("renders with defaultChecked true", () => {
    renderSwitch({ defaultChecked: true });
    expect(getSwitch()).toHaveAttribute("data-state", "checked");
    expect(getThumb()).toHaveClass("translate-x-4"); // md thumb position
  });

  it("includes all base styling", () => {
    renderSwitch({});
    const switchEl = getSwitch();
    expect(switchEl).toHaveClass("shrink-0");
    expect(switchEl).toHaveClass("cursor-pointer");
    expect(switchEl).toHaveClass("rounded-full");
    expect(switchEl).toHaveClass("transition-colors");
  });

  it("thumb has correct base styling", () => {
    renderSwitch({});
    const thumb = getThumb();
    expect(thumb).toHaveClass("block");
    expect(thumb).toHaveClass("rounded-full");
    expect(thumb).toHaveClass("bg-[var(--atom-bg)]");
    expect(thumb).toHaveClass("shadow-sm");
    expect(thumb).toHaveClass("transition-transform");
  });
});
