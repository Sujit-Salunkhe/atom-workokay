import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import * as React from "react";
import { TextArea, type TextAreaProps } from "./TextArea";

describe("TextArea", () => { // ✅ Single top-level describe
  beforeEach(() => {
    // RTL auto-cleanup handles DOM
  });

  const renderTextArea = (props: Partial<TextAreaProps> = {}) => {
    return render(<TextArea data-testid="TextArea" {...props} />);
  };

  const getTextArea = () => screen.getByTestId("TextArea"); // ✅ Remove type cast

  it("renders TextArea with correct data-slot", () => {
    renderTextArea({ placeholder: "Enter text..." });
    expect(getTextArea()).toBeInTheDocument();
    expect(getTextArea()).toHaveAttribute("data-slot", "TextArea");
  });

  it("applies default variants (variant=default, size=md)", () => {
    renderTextArea({});
    const TextArea = getTextArea();
    expect(TextArea).toHaveClass("min-h-16");
    expect(TextArea).toHaveClass("px-3");
    expect(TextArea).toHaveClass("py-2");
    expect(TextArea).toHaveClass("text-sm");
  });

  it("applies size sm", () => {
    renderTextArea({ size: "sm" });
    const TextArea = getTextArea();
    expect(TextArea).toHaveClass("min-h-10");
    expect(TextArea).toHaveClass("px-2");
    expect(TextArea).toHaveClass("py-1");
    expect(TextArea).toHaveClass("text-xs");
    expect(TextArea).toHaveClass("w-64");
  });

  it("applies size md (default)", () => {
    renderTextArea({});
    const TextArea = getTextArea();
    expect(TextArea).toHaveClass("min-h-16");
    expect(TextArea).toHaveClass("w-80");
  });

  it("applies size lg", () => {
    renderTextArea({ size: "lg" });
    const TextArea = getTextArea();
    expect(TextArea).toHaveClass("min-h-24");
    expect(TextArea).toHaveClass("px-4");
    expect(TextArea).toHaveClass("py-3");
    expect(TextArea).toHaveClass("text-base");
    expect(TextArea).toHaveClass("w-96");
  });

  it("applies variant default", () => {
    renderTextArea({});
    const TextArea = getTextArea();
    expect(TextArea).not.toHaveClass("bg-transparent");
  });

  it("applies variant outline", () => {
    renderTextArea({ variant: "outline" });
    const TextArea = getTextArea();
    expect(TextArea).toHaveClass("bg-transparent");
  });

  it("applies variant subtle", () => {
    renderTextArea({ variant: "subtle" });
    const TextArea = getTextArea();
    expect(TextArea).toHaveClass(/bg-input-background\/60/);
  });

  it("handles value and onChange", () => {
    const handleChange = vi.fn();
    renderTextArea({ value: "", onChange: handleChange });
    
    const TextArea = getTextArea();
    fireEvent.change(TextArea, { target: { value: "Hello World" } });
    
    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(TextArea).toHaveValue("Hello World");
  });

  it("handles controlled state", () => {
    const { rerender } = renderTextArea({ value: "" });
    expect(getTextArea()).toHaveValue("");

    rerender(<TextArea data-testid="TextArea" value="Updated" />);
    expect(getTextArea()).toHaveValue("Updated");
  });

  it("handles disabled state", () => {
    renderTextArea({ disabled: true });
    const TextArea = getTextArea();
    expect(TextArea).toBeDisabled();
    expect(TextArea).toHaveClass("disabled:cursor-not-allowed");
    expect(TextArea).toHaveClass("disabled:opacity-50");
  });

  it("handles readOnly state", () => {
    renderTextArea({ readOnly: true });
    expect(getTextArea()).toHaveAttribute("readonly");
  });

  it("applies invalid state styling", () => {
    renderTextArea({ "aria-invalid": true });
    const TextArea = getTextArea();
    expect(TextArea).toHaveClass("aria-invalid:border-destructive");
    expect(TextArea).toHaveClass(/aria-invalid:ring-destructive/);
  });

  it("forwards ref", () => {
    const ref: React.RefObject<HTMLTextAreaElement | null> = React.createRef();
     render(<TextArea ref={ref} data-testid="TextArea" />);
    expect(ref.current).not.toBeNull();
    expect(ref.current).toBeInstanceOf(HTMLTextAreaElement);
  });

  it("merges custom className", () => {
    renderTextArea({ className: "shadow-lg ring-2 ring-blue-500" });
    const TextArea = getTextArea();
    expect(TextArea).toHaveClass("shadow-lg");
    expect(TextArea).toHaveClass("ring-2");
    expect(TextArea).toHaveClass("ring-blue-500");
  });

  it("forwards HTML attributes", () => {
    renderTextArea({ 
      id: "test-TextArea",
      name: "description",
      rows: 5,
      maxLength: 500,
      required: true,
      title: "Description field"
    });
    const TextArea = getTextArea();
    expect(TextArea).toHaveAttribute("id", "test-TextArea");
    expect(TextArea).toHaveAttribute("name", "description");
    expect(TextArea).toHaveAttribute("rows", "5");
    expect(TextArea).toHaveAttribute("maxlength", "500");
    expect(TextArea).toHaveAttribute("required");
  });

  it("uses provided placeholder", () => {
    renderTextArea({ placeholder: "Custom placeholder" });
    expect(getTextArea()).toHaveAttribute("placeholder", "Custom placeholder");
  });

  it("uses default placeholder when none provided", () => {
    renderTextArea({});
    expect(getTextArea()).toHaveAttribute("placeholder", " ");
  });

  it("applies hover styling", () => {
    renderTextArea({});
    const TextArea = getTextArea();
    expect(TextArea).toHaveClass(/hover:bg-color-mix/);
    expect(TextArea).toHaveClass(/hover:border-color-mix/);
  });

  it("applies filled state styling", () => {
    renderTextArea({ value: "Filled content" });
    const TextArea = getTextArea();
    expect(TextArea).toHaveClass(/placeholder-shown:border-atom-badge-archived-border/);
  });

  it("applies dark mode styling", () => {
    renderTextArea({});
    const TextArea = getTextArea();
    expect(TextArea).toHaveClass("dark:bg-input/30");
  });

  it("applies transition styling", () => {
    renderTextArea({});
    const TextArea = getTextArea();
    expect(TextArea).toHaveClass("transition-[background-color,border-color,box-shadow,color]");
  });

  it("combines all variants", () => {
    renderTextArea({ variant: "outline", size: "lg", className: "mb-4" });
    const TextArea = getTextArea();
    expect(TextArea).toHaveClass("bg-transparent");
    expect(TextArea).toHaveClass("min-h-24");
    expect(TextArea).toHaveClass("mb-4");
  });

  it("handles empty value gracefully", () => {
    renderTextArea({ value: "" });
    expect(getTextArea()).toHaveValue("");
  });
})
