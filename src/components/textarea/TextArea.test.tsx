// src/components/ui/Textarea.test.tsx
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import * as React from "react";
import { Textarea } from "./TextArea";

describe("Textarea", () => {
  beforeEach(() => {
    // RTL auto-cleanup handles DOM
  });

  const renderTextarea = (props: any) => {
    return render(
      <Textarea data-testid="textarea" {...props} />
    );
  };

  const getTextarea = () => screen.getByTestId("textarea") as HTMLTextAreaElement;

  it("renders Textarea with correct data-slot", () => {
    renderTextarea({ placeholder: "Enter text..." });
    expect(getTextarea()).toBeInTheDocument();
    expect(getTextarea()).toHaveAttribute("data-slot", "textarea");
  });

  it("applies default variants (variant=default, size=md)", () => {
    renderTextarea({});
    const textarea = getTextarea();
    expect(textarea).toHaveClass("min-h-16");
    expect(textarea).toHaveClass("px-3");
    expect(textarea).toHaveClass("py-2");
    expect(textarea).toHaveClass("text-sm");
  });

  it("applies size sm", () => {
    renderTextarea({ size: "sm" });
    const textarea = getTextarea();
    expect(textarea).toHaveClass("min-h-10");
    expect(textarea).toHaveClass("px-2");
    expect(textarea).toHaveClass("py-1");
    expect(textarea).toHaveClass("text-xs");
    expect(textarea).toHaveClass("w-64");
  });

  it("applies size md (default)", () => {
    renderTextarea({});
    const textarea = getTextarea();
    expect(textarea).toHaveClass("min-h-16");
    expect(textarea).toHaveClass("w-80");
  });

  it("applies size lg", () => {
    renderTextarea({ size: "lg" });
    const textarea = getTextarea();
    expect(textarea).toHaveClass("min-h-24");
    expect(textarea).toHaveClass("px-4");
    expect(textarea).toHaveClass("py-3");
    expect(textarea).toHaveClass("text-base");
    expect(textarea).toHaveClass("w-96");
  });

  it("applies variant default", () => {
    renderTextarea({});
    const textarea = getTextarea();
    expect(textarea).not.toHaveClass("bg-transparent");
  });

  it("applies variant outline", () => {
    renderTextarea({ variant: "outline" });
    const textarea = getTextarea();
    expect(textarea).toHaveClass("bg-transparent");
  });

  it("applies variant subtle", () => {
    renderTextarea({ variant: "subtle" });
    const textarea = getTextarea();
    expect(textarea).toHaveClass(/bg-input-background\/60/);
  });

  it("applies base styling", () => {
    renderTextarea({});
    const textarea = getTextarea();
    expect(textarea).toHaveClass("resize");
    expect(textarea).toHaveClass("w-full");
    expect(textarea).toHaveClass("rounded-md");
    expect(textarea).toHaveClass("outline-none");
  });

  it("applies border and placeholder styling", () => {
    renderTextarea({ placeholder: "Test placeholder" });
    const textarea = getTextarea();
    expect(textarea).toHaveClass(/border-atom-badge-archived-border/);
    expect(textarea).toHaveClass("placeholder:text-muted-foreground");
  });

  it("handles value and onChange", () => {
    const handleChange = vi.fn();
    renderTextarea({ value: "", onChange: handleChange });
    
    const textarea = getTextarea();
    fireEvent.change(textarea, { target: { value: "Hello World" } });
    
    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(textarea).toHaveValue("Hello World");
  });

  it("handles controlled state", () => {
    const { rerender } = renderTextarea({ value: "" });
    expect(getTextarea()).toHaveValue("");

    rerender(<Textarea data-testid="textarea" value="Updated" />);
    expect(getTextarea()).toHaveValue("Updated");
  });

  it("handles disabled state", () => {
    renderTextarea({ disabled: true });
    const textarea = getTextarea();
    expect(textarea).toBeDisabled();
    expect(textarea).toHaveClass("disabled:cursor-not-allowed");
    expect(textarea).toHaveClass("disabled:opacity-50");
  });

  it("handles readOnly state", () => {
    renderTextarea({ readOnly: true });
    const textarea = getTextarea();
    expect(getTextarea()).toHaveAttribute("readonly");
  });

  it("applies invalid state styling with aria-invalid", () => {
    renderTextarea({ "aria-invalid": true });
    const textarea = getTextarea();
    expect(textarea).toHaveClass("aria-invalid:border-destructive");
    expect(textarea).toHaveClass(/aria-invalid:ring-destructive/);
  });

  it("handles focus-visible styling", () => {
    renderTextarea({});
    const textarea = getTextarea();
    expect(textarea).toHaveClass("focus-visible:ring-1");
    expect(textarea).toHaveClass("focus-visible:ring-offset-0");
  });

  it("forwards ref", () => {
    const ref: React.RefObject<HTMLTextAreaElement | null> = React.createRef();
    renderTextarea({ ref });
    expect(ref.current).not.toBeNull();
    expect(ref.current).toBeInstanceOf(HTMLTextAreaElement);
  });

  it("merges custom className", () => {
    renderTextarea({ className: "shadow-lg ring-2 ring-blue-500" });
    const textarea = getTextarea();
    expect(textarea).toHaveClass("shadow-lg");
    expect(textarea).toHaveClass("ring-2");
    expect(textarea).toHaveClass("ring-blue-500");
  });

  it("forwards HTML attributes", () => {
    renderTextarea({ 
      id: "test-textarea",
      name: "description",
      rows: 5,
      maxLength: 500,
      required: true,
      title: "Description field"
    });
    const textarea = getTextarea();
    expect(textarea).toHaveAttribute("id", "test-textarea");
    expect(textarea).toHaveAttribute("name", "description");
    expect(textarea).toHaveAttribute("rows", "5");
    expect(textarea).toHaveAttribute("maxlength", "500");
    expect(textarea).toHaveAttribute("required");
  });

  it("uses provided placeholder", () => {
    renderTextarea({ placeholder: "Custom placeholder" });
    expect(getTextarea()).toHaveAttribute("placeholder", "Custom placeholder");
  });

  it("uses default placeholder when none provided", () => {
    renderTextarea({});
    expect(getTextarea()).toHaveAttribute("placeholder", " ");
  });

  it("applies hover styling", () => {
    renderTextarea({});
    const textarea = getTextarea();
    expect(textarea).toHaveClass(/hover:bg-color-mix/);
    expect(textarea).toHaveClass(/hover:border-color-mix/);
  });

  it("applies filled state styling", () => {
    renderTextarea({ value: "Filled content" });
    const textarea = getTextarea();
    expect(textarea).toHaveClass(/placeholder-shown:border-atom-badge-archived-border/);
  });

  it("applies dark mode styling", () => {
    renderTextarea({});
    const textarea = getTextarea();
    expect(textarea).toHaveClass("dark:bg-input/30");
  });

  it("applies transition styling", () => {
    renderTextarea({});
    const textarea = getTextarea();
    expect(textarea).toHaveClass("transition-[background-color,border-color,box-shadow,color]");
  });

  it("combines all variants", () => {
    renderTextarea({ variant: "outline", size: "lg", className: "mb-4" });
    const textarea = getTextarea();
    expect(textarea).toHaveClass("bg-transparent");
    expect(textarea).toHaveClass("min-h-24");
    expect(textarea).toHaveClass("mb-4");
  });

  it("handles empty value gracefully", () => {
    renderTextarea({ value: "" });
    expect(getTextarea()).toHaveValue("");
  });
});
