import { describe, it, expect, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { Text, type TextProps } from "./Text";

describe("Text", () => {
  beforeEach(() => {
    // RTL auto-cleanup
  });

  const renderText = (props: Partial<TextProps> = {}) => {
    return render(
      <Text data-testid="text" {...props}>Test Text</Text>
    );
  };

  const getText = () => screen.getByTestId("text") as HTMLElement;

  // 🎯 CORE

  it("renders with data-slot", () => {
    renderText();
    expect(getText()).toHaveAttribute("data-slot", "text");
  });

  it("renders as span", () => {
    renderText();
    expect(getText().tagName).toBe("SPAN");
  });

  // 🎨 VARIANTS (All 9)

  const variants = [
    "primary", "secondary", "tertiary", "neutral", "success", 
    "error", "info", "warning", "disabled"
  ] as const;

  variants.forEach(variant => {
    it(`variant ${variant}`, () => {
      renderText({ variant });
      expect(getText()).toHaveClass(/text-/); // ✅ Generic match
    });
  });

  // 📐 SIZES (Fixed undefined!)

  it.each([
    { size: "xs" as const, expectClass: true },
    { size: "sm" as const, expectClass: true },
    { size: "md" as const, expectClass: true },
    { size: "lg" as const, expectClass: true },
    { size: "xl" as const, expectClass: true },
    { size: "none" as const, expectClass: false }, // ✅ Fixed!
  ])("size $size", ({ size, expectClass }) => {
    renderText({ size });
    const element = getText();
    
    if (expectClass) {
      expect(element).toHaveClass(/text-\[calc/);
    } else {
      expect(element).not.toHaveClass(/text-\[calc/);
    }
  });

  // ⚖️ WEIGHTS (Fixed undefined!)

  it.each([
    { weight: "normal" as const, expectClass: true },
    { weight: "medium" as const, expectClass: true },
    { weight: "bold" as const, expectClass: true },
    { weight: "none" as const, expectClass: false }, // ✅ Fixed!
  ])("weight $weight", ({ weight, expectClass }) => {
    renderText({ weight });
    const element = getText();
    
    if (expectClass) {
      expect(element).toHaveClass(/font-\[var/);
    } else {
      expect(element).not.toHaveClass(/font-\[var/);
    }
  });

  // 🔄 COMBINATIONS

  it("combines all variants", () => {
    renderText({ variant: "success", size: "lg", weight: "bold" });
    const text = getText();
    expect(text).toHaveClass("leading-tight");
    expect(text).toHaveClass("tracking-tight");
  });

  // ♿ asChild

  it("works with asChild", () => {
    const Child = ({ className }: { className?: string }) => (
      <span data-testid="text" className={className}>Child</span>
    );
    
    render(<Text asChild><Child /></Text>);
    expect(screen.getByTestId("text")).toHaveAttribute("data-slot", "text");
  });

  // 🔧 PROPS

  it("forwards props", () => {
    renderText({ id: "test", title: "tooltip" });
    expect(getText()).toHaveAttribute("id", "test");
  });

  it("merges className", () => {
    renderText({ className: "underline" });
    expect(getText()).toHaveClass("underline");
  });

  it("uses defaults", () => {
    renderText();
    expect(getText()).toHaveClass(/text-/);
  });
});
