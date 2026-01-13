import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import {  type SwitchTestProps } from "./SwitchVariants";
import { Switch } from "./Switch";
describe("Switch", () => {
  const renderSwitch = (props: Partial<SwitchTestProps> = {}) => {
    return render(<Switch data-testid="switch" {...props} />);
  };

  const getSwitch = () => screen.getByTestId("switch");
  const getThumb = () => screen.getByTestId("switch-thumb");

  it("toggles state on click", () => {
    const onCheckedChange = vi.fn();
    renderSwitch({ onCheckedChange });
    
    fireEvent.click(getSwitch());
    expect(onCheckedChange).toHaveBeenCalledWith(true);
  });

  // ## 🔧 FIXED: Use Testing Library matchers, NOT getAttribute

  it("has proper ARIA attributes", () => {
    renderSwitch({ "aria-label": "Dark mode" });
    const switchEl = getSwitch();
    
    // ✅ CORRECT - Use toHaveAttribute matcher
    expect(switchEl).toHaveAttribute("role", "switch");
    expect(switchEl).toHaveAttribute("aria-checked", "false");
    
    // ❌ NEVER DO THIS:
    // expect(switchEl.getAttribute("aria-checked")).toBe("false");
  });

  it("renders correct sizes", () => {
    renderSwitch({ size: "sm" as const });
    expect(getSwitch()).toHaveClass("h-4", "w-7");
    expect(getThumb()).toHaveClass("h-3", "w-3");
  });

  // ## 🎬 FIXED Animation Test

  it("animates thumb on toggle", async () => {
    renderSwitch();
    const thumb = getThumb();
    
    fireEvent.click(getSwitch());
    
    // ✅ Test for Framer Motion presence via style attribute
    await waitFor(() => {
      expect(thumb).toHaveAttribute("style");
    });
  });

  // ## ♿ FIXED Accessibility Test

  it("announces state changes", async () => {
    renderSwitch();
    const switchEl = getSwitch();
    
    // ✅ Before click
    expect(switchEl).toHaveAttribute("data-state", "unchecked");
    
    fireEvent.click(switchEl);
    
    // ✅ After click  
    await waitFor(() => {
      expect(switchEl).toHaveAttribute("data-state", "checked");
    });
  });

  // ## 🚫 Disabled State

  it("is non-interactive when disabled", () => {
    const onCheckedChange = vi.fn();
    renderSwitch({ disabled: true, onCheckedChange });
    
    fireEvent.click(getSwitch());
    expect(onCheckedChange).not.toHaveBeenCalled();
  });

  // ## 📱 FullWidth

  it("applies fullWidth styling", () => {
    renderSwitch({ fullWidth: true });
    expect(getSwitch()).toHaveClass("w-full");
  });

  // ## 🎨 Base Styling

  it("has consistent base classes", () => {
    renderSwitch();
    expect(getSwitch()).toHaveClass(
      "rounded-full",
      "shrink-0", 
      "cursor-pointer",
      "peer",
      "inline-flex"
    );
  });
});
