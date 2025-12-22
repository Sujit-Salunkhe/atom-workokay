// src/components/ui/Heading.test.tsx
import { describe, it, expect, beforeEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import { Heading } from "./Heading";

describe("Heading", () => {
  beforeEach(() => {
    cleanup(); // ✅ Correct cleanup
  });

  it("renders children correctly", () => {
    render(<Heading>Heading Text</Heading>);
    expect(screen.getByText("Heading Text")).toBeInTheDocument();
  });

  it("sets data-slot=heading attribute", () => {
    render(<Heading>Heading</Heading>);
    const heading = screen.getByText("Heading").closest("[data-slot='heading']");
    expect(heading).toBeInTheDocument();
  });

  it("renders as span by default", () => {
    render(<Heading>Default</Heading>);
    const heading = screen.getByText("Default").closest("[data-slot='heading']") as HTMLElement;
    expect(heading?.tagName.toLowerCase()).toBe("span");
  });

  it("applies default classes", () => {
    render(<Heading>Default</Heading>);
    const heading = screen.getByText("Default").closest("[data-slot='heading']") as HTMLElement;
    expect(heading).toHaveClass("text-[var(--atom-text)]");
    expect(heading).toHaveClass("leading-tight");
  });

  it("renders as h1 semantic element", () => {
    render(<Heading as="h1">H1 Heading</Heading>);
    const heading = screen.getByText("H1 Heading").closest("h1") as HTMLElement;
    expect(heading).toBeInTheDocument();
    expect(heading.tagName.toLowerCase()).toBe("h1");
  });

  it("renders as h2 semantic element (default)", () => {
    render(<Heading>H2 Default</Heading>);
    const heading = screen.getByText("H2 Default").closest("h2") as HTMLElement;
    expect(heading).toBeInTheDocument();
    expect(heading.tagName.toLowerCase()).toBe("h2");
  });

  it("applies size xs variant", () => {
    render(<Heading size="xs">XS Size</Heading>);
    const heading = screen.getByText("XS Size").closest("[data-slot='heading']") as HTMLElement;
    expect(heading).toHaveClass("text-[calc(var(--atom-text-xs))]");
  });

  it("applies size xl variant", () => {
    render(<Heading size="xl">XL Size</Heading>);
    const heading = screen.getByText("XL Size").closest("[data-slot='heading']") as HTMLElement;
    expect(heading).toHaveClass("text-[calc(var(--atom-text-xl))]");
  });

  it("applies weight normal variant", () => {
    render(<Heading weight="normal">Normal Weight</Heading>);
    const heading = screen.getByText("Normal Weight").closest("[data-slot='heading']") as HTMLElement;
    expect(heading).toHaveClass("font-[var(--atom-font-weight-normal)]");
  });

  it("applies weight bold variant", () => {
    render(<Heading weight="bold">Bold Weight</Heading>);
    const heading = screen.getByText("Bold Weight").closest("[data-slot='heading']") as HTMLElement;
    expect(heading).toHaveClass("font-[var(--atom-font-weight-bold)]");
  });

  it("supports asChild and forwards props", () => {
    render(
      <Heading asChild>
        <h1 className="custom-h1 bg-blue-500 text-white p-4">Custom H1</h1>
      </Heading>
    );
    const customHeading = screen.getByText("Custom H1") as HTMLElement;
    expect(customHeading).toHaveAttribute("data-slot", "heading");
    expect(customHeading).toHaveClass("custom-h1");
    expect(customHeading.tagName.toLowerCase()).toBe("h1");
  });

  it("merges custom className", () => {
    render(
      <Heading className="shadow-2xl text-red-500 underline">
        Custom Styled
      </Heading>
    );
    const heading = screen.getByText("Custom Styled").closest("[data-slot='heading']") as HTMLElement;
    expect(heading).toHaveClass("shadow-2xl");
    expect(heading).toHaveClass("text-red-500");
  });

  it("forwards HTML attributes", () => {
    render(<Heading id="test-id" title="tooltip">Props Test</Heading>);
    const heading = screen.getByText("Props Test").closest("[data-slot='heading']") as HTMLElement;
    expect(heading).toHaveAttribute("id", "test-id");
    expect(heading).toHaveAttribute("title", "tooltip");
  });
});
