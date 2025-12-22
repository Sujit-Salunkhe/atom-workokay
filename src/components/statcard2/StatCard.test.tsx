// src/components/ui/StatCard.test.tsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import * as React from "react";
import { StatCard } from "./StatCard";
import { cn } from "../../lib/cn";

describe("StatCard", () => {
  const renderStatCard = (props: any) => {
    return render(
      <StatCard data-testid="stat-card" {...props} />
    );
  };

  const getStatCard = () => screen.getByTestId("stat-card") as HTMLDivElement;

  it("renders basic StatCard with required props", () => {
    renderStatCard({ label: "Validated", value: "42" });
    expect(getStatCard()).toBeInTheDocument();
    expect(screen.getByText("Validated")).toBeInTheDocument();
    expect(screen.getByText("42")).toBeInTheDocument();
  });

  it("applies default variants", () => {
    renderStatCard({ label: "Total", value: "100" });
    const card = getStatCard();
    expect(card).toHaveClass("flex");
    expect(card).toHaveClass("flex-col");
    expect(card).toHaveClass("h-[84px]"); // md height
    expect(card).toHaveClass("w-[200px]"); // md width
    expect(card).toHaveClass("shadow-sm"); // elevated
  });

  it("applies variant neutral (default)", () => {
    renderStatCard({ label: "Metrics", value: "25" });
    const card = getStatCard();
    expect(card).toHaveClass("text-[var(--atom-text)]");
  });

  it("applies variant primary", () => {
    renderStatCard({ variant: "primary", label: "Primary", value: "50" });
    const card = getStatCard();
    expect(card).toHaveClass("text-[var(--atom-primary)]");
  });

  it("applies variant success", () => {
    renderStatCard({ variant: "success", label: "Success", value: "100%" });
    const card = getStatCard();
    expect(card).toHaveClass("text-[var(--atom-success)]");
  });

  it("applies variant warning", () => {
    renderStatCard({ variant: "warning", label: "Warning", value: "8" });
    const card = getStatCard();
    expect(card).toHaveClass("text-[var(--atom-warning)]");
  });

  it("applies variant danger", () => {
    renderStatCard({ variant: "danger", label: "Errors", value: "3" });
    const card = getStatCard();
    expect(card).toHaveClass("text-[var(--atom-error)]");
  });

  it("applies variant info", () => {
    renderStatCard({ variant: "info", label: "Info", value: "12" });
    const card = getStatCard();
    expect(card).toHaveClass("text-[var(--atom-info)]");
  });

  it("applies variant accent", () => {
    renderStatCard({ variant: "accent", label: "Accent", value: "99" });
    const card = getStatCard();
    expect(card).toHaveClass("text-[var(--atom-accent)]");
  });

  it("applies size sm", () => {
    renderStatCard({ size: "sm", label: "Small", value: "10" });
    const card = getStatCard();
    expect(card).toHaveClass("h-[72px]");
    expect(card).toHaveClass("w-[160px]");
    expect(card).toHaveClass("gap-1");
  });

  it("applies size md (default)", () => {
    renderStatCard({ label: "Medium", value: "25" });
    const card = getStatCard();
    expect(card).toHaveClass("h-[84px]");
    expect(card).toHaveClass("gap-1.5");
  });

  it("applies size lg", () => {
    renderStatCard({ size: "lg", label: "Large", value: "50" });
    const card = getStatCard();
    expect(card).toHaveClass("h-[96px]");
    expect(card).toHaveClass("w-[240px]");
    expect(card).toHaveClass("gap-2");
  });

  it("applies appearance elevated (default)", () => {
    renderStatCard({ label: "Elevated", value: "42" });
    const card = getStatCard();
    expect(card).toHaveClass("shadow-sm");
  });

  it("applies appearance outlined", () => {
    renderStatCard({ appearance: "outlined", label: "Outlined", value: "15" });
    const card = getStatCard();
    expect(card).toHaveClass("shadow-none");
    expect(card).toHaveClass("bg-transparent");
  });

  it("applies appearance ghost", () => {
    renderStatCard({ appearance: "ghost", label: "Ghost", value: "7" });
    const card = getStatCard();
    expect(card).toHaveClass("shadow-none");
    expect(card).toHaveClass("bg-transparent");
    expect(card).toHaveClass("border-transparent");
  });

  it("applies appearance soft", () => {
    renderStatCard({ appearance: "soft", label: "Soft", value: "33" });
    const card = getStatCard();
    expect(card).toHaveClass("shadow-none");
    expect(card).toHaveClass("border-none");
  });

  it("applies fullWidth true", () => {
    renderStatCard({ fullWidth: true, label: "Full", value: "100%" });
    const card = getStatCard();
    expect(card).toHaveClass("w-full");
  });

  it("renders icon correctly", () => {
    const TestIcon = <span data-testid="test-icon">⭐</span>;
    renderStatCard({ label: "With Icon", value: "42", icon: TestIcon });
    expect(screen.getByTestId("test-icon")).toBeInTheDocument();
    expect(screen.getByText("⭐")).toBeInTheDocument();
  });

  it("applies correct icon styling", () => {
    renderStatCard({ 
      label: "Icon Test", 
      value: "42", 
      icon: <span data-testid="icon">⚡</span> 
    });
    const icon = screen.getByTestId("icon");
    expect(icon).toHaveClass("shrink-0");
    expect(icon).toHaveClass("text-[11px]");
    expect(icon).toHaveClass("opacity-80");
  });

  it("renders label with correct container structure", () => {
    renderStatCard({ label: "Test Label", value: "123" });
    const labelSpan = screen.getByText("Test Label").closest("span");
    expect(labelSpan).toHaveClass(/text-xs/);
    expect(labelSpan).toHaveClass(/font-medium/);
  });

  it("renders value with correct styling", () => {
    renderStatCard({ label: "Value", value: <span data-testid="value">999</span> });
    const value = screen.getByTestId("value");
    const valueContainer = value.closest("div");
    expect(valueContainer).toHaveClass("text-2xl");
    expect(valueContainer).toHaveClass("font-semibold");
  });

  it("handles ReactNode value", () => {
    const ComplexValue = <span data-testid="complex-value">$1,234</span>;
    renderStatCard({ label: "Revenue", value: ComplexValue });
    expect(screen.getByTestId("complex-value")).toBeInTheDocument();
  });

  it("forwards ref", () => {
    const ref: React.RefObject<HTMLDivElement | null> = React.createRef();
    renderStatCard({ ref, label: "Ref Test", value: "42" });
    expect(ref.current).not.toBeNull();
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it("merges custom className", () => {
    renderStatCard({ 
      className: "ring-2 ring-blue-500 hover:scale-105", 
      label: "Custom", 
      value: "50" 
    });
    const card = getStatCard();
    expect(card).toHaveClass("ring-2");
    expect(card).toHaveClass("ring-blue-500");
  });

  it("forwards HTML attributes", () => {
    renderStatCard({ 
      id: "test-stat",
      title: "Stat card",
      "data-metric": "users",
      style: { margin: "12px" },
      label: "Users",
      value: "1,234"
    });
    const card = getStatCard();
    expect(card).toHaveAttribute("id", "test-stat");
    expect(card).toHaveAttribute("title", "Stat card");
    expect(card).toHaveStyle("margin: 12px");
  });

  it("renders with asChild=false (default div)", () => {
    renderStatCard({ label: "Default", value: "42" });
    const card = getStatCard();
    expect(card.tagName).toBe("DIV");
  });

  it("renders with asChild=true using Slot", () => {
    const TestLink = React.forwardRef<
      HTMLAnchorElement, 
      React.AnchorHTMLAttributes<HTMLAnchorElement>
    >(({ className, children, ...props }, ref) => (
      <a 
        ref={ref} 
        className={cn("test-link", className)} 
        href="#" 
        role="link" 
        {...props}
      >
        {children}
      </a>
    ));
    TestLink.displayName = "TestLink";

    render(
      <TestLink>
        <StatCard asChild label="Clickable" value="42" />
      </TestLink>
    );
    
    const link = screen.getByRole("link");
    expect(link).toHaveTextContent("Clickable");
    expect(link).toHaveTextContent("42");
    expect(link).toHaveAttribute("href", "#");
  });

  it("applies data-slot attribute", () => {
    renderStatCard({ label: "Slot Test", value: "99" });
    const card = getStatCard();
    expect(card).toHaveAttribute("data-slot", "stat-card");
  });
});
