// src/components/separator/Separator.test.tsx
import { describe, it, expect, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { Separator } from "./Separator";

describe("Separator", () => {
  beforeEach(() => {
    // Clear DOM between tests
  });

  const getSeparator = () => screen.getByRole("separator") as HTMLDivElement;

  it("renders with correct role", () => {
    render(<Separator />);
    const separator = getSeparator();
    expect(separator).toBeInTheDocument();
    expect(separator).toHaveAttribute("role", "separator");
  });

  it("applies default horizontal orientation", () => {
    render(<Separator />);
    const separator = getSeparator();
    expect(separator).toHaveClass("w-full");
    expect(separator).toHaveClass("border-t");
    expect(separator).toHaveAttribute("aria-orientation", "horizontal");
  });

  it("applies vertical orientation", () => {
    render(<Separator orientation="vertical" />);
    const separator = getSeparator();
    expect(separator).toHaveClass("h-full");
    expect(separator).toHaveClass("border-l");
    expect(separator).toHaveAttribute("aria-orientation", "vertical");
  });

  it("applies default styling (base border)", () => {
    render(<Separator />);
    const separator = getSeparator();
    expect(separator).toHaveClass(
      "border-[color-mix(in_srgb,var(--atom-border)_60%,white)]"
    );
  });

  it("applies inset none (default)", () => {
    render(<Separator />);
    const separator = getSeparator();
    expect(separator).not.toHaveClass("ml-2");
    expect(separator).not.toHaveClass("ml-4");
  });

  it("applies inset sm", () => {
    render(<Separator inset="sm" />);
    const separator = getSeparator();
    expect(separator).toHaveClass("ml-2");
  });

  it("applies inset md", () => {
    render(<Separator inset="md" />);
    const separator = getSeparator();
    expect(separator).toHaveClass("ml-4");
  });

  it("combines horizontal + inset variants", () => {
    render(<Separator orientation="horizontal" inset="md" />);
    const separator = getSeparator();
    expect(separator).toHaveClass("w-full");
    expect(separator).toHaveClass("border-t");
    expect(separator).toHaveClass("ml-4");
  });

  it("combines vertical + inset variants", () => {
    render(<Separator orientation="vertical" inset="sm" />);
    const separator = getSeparator();
    expect(separator).toHaveClass("h-full");
    expect(separator).toHaveClass("border-l");
    expect(separator).toHaveClass("ml-2");
  });

  it("merges custom className", () => {
    render(<Separator className="bg-red-500 opacity-75" />);
    const separator = getSeparator();
    expect(separator).toHaveClass("bg-red-500");
    expect(separator).toHaveClass("opacity-75");
  });

  it("forwards HTML attributes", () => {
    render(
      <Separator 
        id="test-separator"
        aria-label="Section divider"
        data-testid="divider"
        style={{ margin: "10px" }}
      />
    );
    const separator = getSeparator();
    expect(separator).toHaveAttribute("id", "test-separator");
    expect(separator).toHaveAttribute("aria-label", "Section divider");
    expect(separator).toHaveAttribute("data-testid", "divider");
    expect(separator).toHaveStyle("margin: 10px");
  });

  it("applies text color from variants", () => {
    render(<Separator orientation="horizontal" />);
    const separator = getSeparator();
    expect(separator).toHaveClass("text-[var(--atom-primary)]");
  });
});
