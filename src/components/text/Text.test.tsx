// src/components/ui/Heading.test.tsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import * as React from "react";
import { Text } from "./Text";

describe("Heading (Text)", () => {
  const renderHeading = (props: any) => {
    return render(
      <Text data-testid="heading" {...props} />
    );
  };

  const getHeading = () => screen.getByTestId("heading") as HTMLElement;

  it("renders basic Heading with correct data-slot", () => {
    renderHeading({ children: "Test Heading" });
    expect(getHeading()).toBeInTheDocument();
    expect(getHeading()).toHaveAttribute("data-slot", "heading");
  });

  it("applies default variants", () => {
    renderHeading({ children: "Default Heading" });
    const heading = getHeading();
    expect(heading).toHaveClass(/text-atom-text/);
    expect(heading).toHaveClass("leading-tight");
    expect(heading).toHaveClass("tracking-tight");
  });

  it("applies variant primary (default)", () => {
    renderHeading({ children: "Primary" });
    const heading = getHeading();
    expect(heading).toHaveClass("text-[var(--atom-primary)]");
  });

  it("applies variant secondary", () => {
    renderHeading({ variant: "secondary", children: "Secondary" });
    const heading = getHeading();
    expect(heading).toHaveClass(/atom-info-card-jobstatus-secondary-text/);
  });

  it("applies variant tertiary", () => {
    renderHeading({ variant: "tertiary", children: "Tertiary" });
    const heading = getHeading();
    expect(heading).toHaveClass(/atom-info-card-jobstatus-success-text/);
  });

  it("applies variant neutral", () => {
    renderHeading({ variant: "neutral", children: "Neutral" });
    const heading = getHeading();
    expect(heading).toHaveClass("text-[var(--atom-text)]");
  });

  it("applies variant success", () => {
    renderHeading({ variant: "success", children: "Success" });
    const heading = getHeading();
    expect(heading).toHaveClass("text-[var(--atom-success)]");
  });

  it("applies variant error", () => {
    renderHeading({ variant: "error", children: "Error" });
    const heading = getHeading();
    expect(heading).toHaveClass("text-[var(--atom-error)]");
  });

  it("applies variant info", () => {
    renderHeading({ variant: "info", children: "Info" });
    const heading = getHeading();
    expect(heading).toHaveClass("text-[var(--atom-info)]");
  });

  it("applies variant warning", () => {
    renderHeading({ variant: "warning", children: "Warning" });
    const heading = getHeading();
    expect(heading).toHaveClass("text-[var(--atom-warning)]");
  });

  it("applies variant disabled", () => {
    renderHeading({ variant: "disabled", children: "Disabled" });
    const heading = getHeading();
    expect(heading).toHaveClass(/atom-badge-archived-text/);
  });

  it("applies size xs", () => {
    renderHeading({ size: "xs", children: "Extra Small" });
    const heading = getHeading();
    expect(heading).toHaveClass(/atom-text-xs/);
  });

  it("applies size sm", () => {
    renderHeading({ size: "sm", children: "Small" });
    const heading = getHeading();
    expect(heading).toHaveClass(/atom-text-sm/);
  });

  it("applies size md (default)", () => {
    renderHeading({ children: "Medium" });
    const heading = getHeading();
    expect(heading).toHaveClass(/atom-text-md/);
  });

  it("applies size lg", () => {
    renderHeading({ size: "lg", children: "Large" });
    const heading = getHeading();
    expect(heading).toHaveClass(/atom-text-lg/);
  });

  it("applies size xl", () => {
    renderHeading({ size: "xl", children: "Extra Large" });
    const heading = getHeading();
    expect(heading).toHaveClass(/atom-text-xl/);
  });

  it("applies size none", () => {
    renderHeading({ size: "none", children: "No Size" });
    const heading = getHeading();
    expect(heading).not.toHaveClass(/atom-text-/);
  });

  it("applies weight normal", () => {
    renderHeading({ weight: "normal", children: "Normal" });
    const heading = getHeading();
    expect(heading).toHaveClass(/atom-font-weight-normal/);
  });

  it("applies weight medium", () => {
    renderHeading({ weight: "medium", children: "Medium" });
    const heading = getHeading();
    expect(heading).toHaveClass(/atom-font-weight-medium/);
  });

  it("applies weight bold", () => {
    renderHeading({ weight: "bold", children: "Bold" });
    const heading = getHeading();
    expect(heading).toHaveClass(/atom-font-weight-bold/);
  });

  it("combines variant + size + weight", () => {
    renderHeading({ 
      variant: "success", 
      size: "lg", 
      weight: "bold", 
      children: "Combined" 
    });
    const heading = getHeading();
    expect(heading).toHaveClass("text-[var(--atom-success)]");
    expect(heading).toHaveClass(/atom-text-lg/);
    expect(heading).toHaveClass(/atom-font-weight-bold/);
  });

  it("renders as span (default)", () => {
    renderHeading({ children: "Default Span" });
    const heading = getHeading();
    expect(heading.tagName).toBe("SPAN");
  });

  it("renders with asChild=false using Slot", () => {
    renderHeading({ asChild: false, children: "Not Child" });
    const heading = getHeading();
    expect(heading.tagName).toBe("SPAN");
  });

  it("forwards ref", () => {
    const ref: React.RefObject<HTMLSpanElement | null> = React.createRef();
    renderHeading({ ref, children: "Ref Test" });
    expect(ref.current).not.toBeNull();
    expect(ref.current).toBeInstanceOf(HTMLSpanElement);
  });

  it("merges custom className", () => {
    renderHeading({ 
      className: "underline decoration-2 decoration-wavy", 
      children: "Custom Classes" 
    });
    const heading = getHeading();
    expect(heading).toHaveClass("underline");
    expect(heading).toHaveClass("decoration-2");
  });

  it("forwards HTML attributes", () => {
    renderHeading({ 
      id: "heading-1",
      title: "Main heading",
      "data-level": "h1",
      style: { marginBottom: "16px" },
      children: "HTML Props"
    });
    const heading = getHeading();
    expect(heading).toHaveAttribute("id", "heading-1");
    expect(heading).toHaveAttribute("title", "Main heading");
    expect(heading).toHaveStyle("margin-bottom: 16px");
  });
});
