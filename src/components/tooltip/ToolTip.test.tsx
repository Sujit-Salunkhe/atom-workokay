// src/components/tooltip/Tooltip.test.tsx
import { describe, it, expect } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react"; // ✅ Added within`
import * as React from "react";
import { Tooltip } from "./ToolTip"; 

describe("Tooltip", () => {
  const renderTooltip = (props: any) => {
    return render(
      <div data-testid="tooltip-wrapper">
        <Tooltip data-testid="tooltip" {...props} />
      </div>
    );
  };

  it("renders trigger children correctly", () => {
    renderTooltip({
      children: <button data-testid="trigger">Hover me</button>,
      content: "Tooltip content",
    });
    expect(screen.getByTestId("trigger")).toBeInTheDocument();
    expect(screen.getByTestId("trigger")).toHaveTextContent("Hover me");
  });

  it("does not render tooltip content initially", () => {
    renderTooltip({
      children: <span>Hover me</span>,
      content: "Hidden content",
    });
    expect(screen.queryByText("Hidden content")).not.toBeInTheDocument();
  });

  it("renders tooltip content on hover", async () => {
    renderTooltip({
      children: <button data-testid="trigger">Hover me</button>,
      content: "Tooltip content",
    });

    fireEvent.mouseEnter(screen.getByTestId("trigger"));
    await waitFor(() => {
      expect(screen.getByText("Tooltip content")).toBeInTheDocument();
    });
  });

  it("hides tooltip after hover ends", async () => {
    renderTooltip({
      children: <button data-testid="trigger">Hover me</button>,
      content: "Tooltip content",
    });

    fireEvent.mouseEnter(screen.getByTestId("trigger"));
    await waitFor(() => {
      expect(screen.getByText("Tooltip content")).toBeInTheDocument();
    });

    fireEvent.mouseLeave(screen.getByTestId("trigger"));
    await waitFor(() => {
      expect(screen.queryByText("Tooltip content")).not.toBeInTheDocument();
    });
  });

  it("applies default variant (primary)", () => {
    renderTooltip({
      children: <span>Hover</span>,
      content: "Primary tooltip",
    });

    fireEvent.mouseEnter(screen.getByText("Hover"));
    expect(screen.getByText("Primary tooltip")).toHaveClass(
      /bg-atom-info-card-jobstatus-secondary-text/
    );
  });

  it("applies variant soft", async () => {
    renderTooltip({
      variant: "soft",
      children: <span>Hover</span>,
      content: "Soft tooltip",
    });

    fireEvent.mouseEnter(screen.getByText("Hover"));
    await waitFor(() => {
      expect(screen.getByText("Soft tooltip")).toHaveClass(
        /bg-color-mix.*atom-muted/
      );
    });
  });

  it("applies variant solid", async () => {
    renderTooltip({
      variant: "solid",
      children: <span>Hover</span>,
      content: "Solid tooltip",
    });

    fireEvent.mouseEnter(screen.getByText("Hover"));
    await waitFor(() => {
      expect(screen.getByText("Solid tooltip")).toHaveClass(
        /bg-atom-primary/
      );
    });
  });

  it("applies variant outline", async () => {
    renderTooltip({
      variant: "outline",
      children: <span>Hover</span>,
      content: "Outline tooltip",
    });

    fireEvent.mouseEnter(screen.getByText("Hover"));
    await waitFor(() => {
      expect(screen.getByText("Outline tooltip")).toHaveClass("bg-transparent");
    });
  });

  it("applies size sm", async () => {
    renderTooltip({
      size: "sm",
      children: <span>Hover</span>,
      content: "Small",
    });

    fireEvent.mouseEnter(screen.getByText("Hover"));
    await waitFor(() => {
      const tooltip = screen.getByText("Small");
      expect(tooltip).toHaveClass("px-2");
      expect(tooltip).toHaveClass("py-1");
      expect(tooltip).toHaveClass("text-[11px]");
    });
  });

  it("applies size md (default)", async () => {
    renderTooltip({
      children: <span>Hover</span>,
      content: "Medium",
    });

    fireEvent.mouseEnter(screen.getByText("Hover"));
    await waitFor(() => {
      const tooltip = screen.getByText("Medium");
      expect(tooltip).toHaveClass("px-3");
      expect(tooltip).toHaveClass("py-1.5");
      expect(tooltip).toHaveClass("text-xs");
    });
  });

  it("applies size lg", async () => {
    renderTooltip({
      size: "lg",
      children: <span>Hover</span>,
      content: "Large",
    });

    fireEvent.mouseEnter(screen.getByText("Hover"));
    await waitFor(() => {
      const tooltip = screen.getByText("Large");
      expect(tooltip).toHaveClass("px-4");
      expect(tooltip).toHaveClass("py-2");
      expect(tooltip).toHaveClass("text-sm");
    });
  });

  it("renders arrow when showArrow=true", async () => {
    renderTooltip({
      showArrow: true,
      children: <span>Hover</span>,
      content: "With arrow",
    });

    fireEvent.mouseEnter(screen.getByText("Hover"));
    await waitFor(() => {
      const tooltipContainer = screen.getByText("With arrow").closest("[data-radix-popper-content-wrapper]");
      const arrow = tooltipContainer?.querySelector("[data-slot='tooltip-arrow']");
      expect(arrow).toBeInTheDocument();
    });
  });

  it("positions tooltip on top (default)", async () => {
    renderTooltip({
      children: <span>Hover</span>,
      content: "Top position",
    });

    fireEvent.mouseEnter(screen.getByText("Hover"));
    await waitFor(() => {
      expect(screen.getByText("Top position")).toHaveClass(
        /data-\[side=top\]:slide-in-from-bottom-1/
      );
    });
  });

  it("positions tooltip on bottom", async () => {
    renderTooltip({
      side: "bottom",
      children: <span>Hover</span>,
      content: "Bottom position",
    });

    fireEvent.mouseEnter(screen.getByText("Hover"));
    await waitFor(() => {
      expect(screen.getByText("Bottom position")).toHaveClass(
        /data-\[side=bottom\]:slide-in-from-top-1/
      );
    });
  });

  it("applies correct z-index", async () => {
    renderTooltip({
      children: <span>Hover</span>,
      content: "High z-index",
    });

    fireEvent.mouseEnter(screen.getByText("Hover"));
    await waitFor(() => {
      const tooltip = screen.getByText("High z-index");
      expect(tooltip).toHaveClass("z-50");
    });
  });

  it("supports ReactNode content", async () => {
    const ComplexContent = (
      <span>
        <strong>Bold</strong> text
      </span>
    );

    renderTooltip({
      children: <span>Hover</span>,
      content: ComplexContent,
    });

    fireEvent.mouseEnter(screen.getByText("Hover"));
    await waitFor(() => {
      expect(screen.getByText("Bold")).toBeInTheDocument();
      expect(screen.getByText("text")).toBeInTheDocument();
    });
  });

  it("forwards additional props to content", async () => {
    renderTooltip({
      id: "test-tooltip",
      role: "tooltip",
      children: <span>Hover</span>,
      content: "Props forwarded",
    });

    fireEvent.mouseEnter(screen.getByText("Hover"));
    await waitFor(() => {
      const tooltip = screen.getByText("Props forwarded");
      expect(tooltip).toHaveAttribute("id", "test-tooltip");
      expect(tooltip).toHaveAttribute("role", "tooltip");
    });
  });

  it("merges custom className", async () => {
    renderTooltip({
      className: "shadow-xl border-2 border-blue-500",
      children: <span>Hover</span>,
      content: "Custom styles",
    });

    fireEvent.mouseEnter(screen.getByText("Hover"));
    await waitFor(() => {
      const tooltip = screen.getByText("Custom styles");
      expect(tooltip).toHaveClass("shadow-xl");
      expect(tooltip).toHaveClass("border-2");
      expect(tooltip).toHaveClass("border-blue-500");
    });
  });

  it("handles trigger asChild correctly", async () => {
    const TriggerButton = React.forwardRef<
      HTMLButtonElement,
      React.ButtonHTMLAttributes<HTMLButtonElement>
    >((props, ref) => (
      <button ref={ref} {...props}>Custom trigger</button>
    ));

    renderTooltip({
      children: <TriggerButton>Hover me</TriggerButton>,
      content: "asChild works",
    });

    fireEvent.mouseEnter(screen.getByText("Hover me"));
    await waitFor(() => {
      expect(screen.getByText("asChild works")).toBeInTheDocument();
    });
  });

  it("applies animations", async () => {
    renderTooltip({
      children: <span>Hover</span>,
      content: "Animated",
    });

    fireEvent.mouseEnter(screen.getByText("Hover"));
    await waitFor(() => {
      const tooltip = screen.getByText("Animated");
      expect(tooltip).toHaveClass(/data-\[state=delayed-open\]:animate-in/);
      expect(tooltip).toHaveClass(/data-\[state=delayed-open\]:fade-in/);
    });
  });

  it("uses correct delay duration", async () => {
    renderTooltip({
      children: <button>Delayed</button>,
      content: "Delayed content",
    });

    fireEvent.mouseEnter(screen.getByText("Delayed"));
    await waitFor(() => {
      expect(screen.getByText("Delayed content")).toBeInTheDocument();
    }, { timeout: 500 });
  });
});
