// src/components/stat-card/StatCardPriority.test.tsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import * as React from "react";
import { StatCardPriority } from "./StatCard3";
import { cn } from "../../lib/cn";

describe("StatCardPriority", () => {
  const renderStatCardPriority = (props: any) => {
    return render(
      <StatCardPriority data-testid="stat-card-priority" {...props} />
    );
  };

  const getStatCardPriority = () => screen.getByTestId("stat-card-priority") as HTMLDivElement;
  const getPill = () => screen.getByTestId("priority-pill");

  it("renders basic StatCardPriority with required props", () => {
    renderStatCardPriority({ label: "High Priority", value: "6" });
    expect(getStatCardPriority()).toBeInTheDocument();
    expect(screen.getByText("High Priority")).toBeInTheDocument();
    expect(screen.getByText("6")).toBeInTheDocument();
  });

  it("applies default variants", () => {
    renderStatCardPriority({ label: "Medium Priority", value: "12" });
    const card = getStatCardPriority();
    expect(card).toHaveClass("flex");
    expect(card).toHaveClass("items-center");
    expect(card).toHaveClass("justify-between");
    expect(card).toHaveClass("h-12"); // md height
    expect(card).toHaveClass("shadow-sm"); // elevated
  });

  it("applies variant neutral (default)", () => {
    renderStatCardPriority({ label: "Neutral", value: "5" });
    const card = getStatCardPriority();
    expect(card).toHaveClass("text-[var(--atom-text)]");
  });

  it("applies variant primary", () => {
    renderStatCardPriority({ variant: "primary", label: "Primary", value: "10" });
    const card = getStatCardPriority();
    expect(card).toHaveClass("text-[var(--atom-primary)]");
  });

  it("applies variant high", () => {
    renderStatCardPriority({ variant: "high", label: "High", value: "8" });
    const card = getStatCardPriority();
    expect(card).toHaveClass("text-[var(--atom-error)]");
  });

  it("applies variant medium", () => {
    renderStatCardPriority({ variant: "medium", label: "Medium", value: "15" });
    const card = getStatCardPriority();
    expect(card).toHaveClass("text-[var(--atom-warning)]");
  });

  it("applies variant low", () => {
    renderStatCardPriority({ variant: "low", label: "Low", value: "22" });
    const card = getStatCardPriority();
    expect(card).toHaveClass("text-[var(--atom-success)]");
  });

  it("applies size sm", () => {
    renderStatCardPriority({ size: "sm", label: "Small", value: "3" });
    const card = getStatCardPriority();
    expect(card).toHaveClass("h-10");
    expect(card).toHaveClass("text-sm");
    expect(card).toHaveClass("gap-2");
    expect(card).toHaveClass("max-w-[320px]");
  });

  it("applies size md (default)", () => {
    renderStatCardPriority({ label: "Medium", value: "12" });
    const card = getStatCardPriority();
    expect(card).toHaveClass("h-12");
    expect(card).toHaveClass("gap-3");
    expect(card).toHaveClass("max-w-[400px]");
  });

  it("applies size lg", () => {
    renderStatCardPriority({ size: "lg", label: "Large", value: "25" });
    const card = getStatCardPriority();
    expect(card).toHaveClass("h-14");
    expect(card).toHaveClass("text-base");
    expect(card).toHaveClass("gap-4");
    expect(card).toHaveClass("max-w-[480px]");
  });

  it("applies appearance elevated (default)", () => {
    renderStatCardPriority({ label: "Elevated", value: "7" });
    const card = getStatCardPriority();
    expect(card).toHaveClass("shadow-sm");
  });

  it("applies appearance outlined", () => {
    renderStatCardPriority({ appearance: "outlined", label: "Outlined", value: "9" });
    const card = getStatCardPriority();
    expect(card).toHaveClass("shadow-none");
    expect(card).toHaveClass("bg-transparent");
  });

  it("applies appearance ghost", () => {
    renderStatCardPriority({ appearance: "ghost", label: "Ghost", value: "4" });
    const card = getStatCardPriority();
    expect(card).toHaveClass("shadow-none");
    expect(card).toHaveClass("bg-transparent");
    expect(card).toHaveClass("border-transparent");
  });

  it("applies appearance soft", () => {
    renderStatCardPriority({ appearance: "soft", label: "Soft", value: "11" });
    const card = getStatCardPriority();
    expect(card).toHaveClass("shadow-none");
    expect(card).toHaveClass("border-none");
  });

  it("renders pill with correct base styling", () => {
    renderStatCardPriority({ 
      label: "Test", 
      value: "6",
      "data-testid": "priority-pill"
    });
    const pill = getPill();
    expect(pill).toHaveClass("inline-flex");
    expect(pill).toHaveClass("items-center");
    expect(pill).toHaveClass("rounded-md");
    expect(pill).toHaveClass("px-2.5");
    expect(pill).toHaveClass("text-xs");
    expect(pill).toHaveClass("font-medium");
  });

  it("applies high variant pill styling", () => {
    renderStatCardPriority({ 
      variant: "high", 
      label: "High Priority", 
      value: "6",
      "data-testid": "priority-pill"
    });
    const pill = getPill();
    expect(pill).toHaveClass(/bg-color-mix.*atom-error/);
    expect(pill).toHaveClass(/text-atom-error/);
  });

  it("applies medium variant pill styling", () => {
    renderStatCardPriority({ 
      variant: "medium", 
      label: "Medium Priority", 
      value: "12",
      "data-testid": "priority-pill"
    });
    const pill = getPill();
    expect(pill).toHaveClass(/bg-color-mix.*atom-warning/);
    expect(pill).toHaveClass(/text-atom-warning/);
  });

  it("applies low variant pill styling", () => {
    renderStatCardPriority({ 
      variant: "low", 
      label: "Low Priority", 
      value: "20",
      "data-testid": "priority-pill"
    });
    const pill = getPill();
    expect(pill).toHaveClass(/bg-color-mix.*atom-success/);
    expect(pill).toHaveClass(/text-atom-success/);
  });

  it("applies neutral variant pill styling", () => {
    renderStatCardPriority({ 
      variant: "neutral", 
      label: "Neutral", 
      value: "5",
      "data-testid": "priority-pill"
    });
    const pill = getPill();
    expect(pill).toHaveClass(/bg-color-mix.*atom-border/);
    expect(pill).toHaveClass(/text-atom-text-muted/);
  });

  it("renders pillIcon correctly", () => {
    const TestIcon = <span data-testid="pill-icon">📈</span>;
    renderStatCardPriority({ 
      label: "With Icon", 
      value: "15", 
      pillIcon: TestIcon 
    });
    expect(screen.getByTestId("pill-icon")).toBeInTheDocument();
    expect(screen.getByText("📈")).toBeInTheDocument();
  });

  it("applies pillIcon margin styling", () => {
    renderStatCardPriority({ 
      label: "Icon Test", 
      value: "10", 
      pillIcon: <span data-testid="icon">⬆️</span> 
    });
    const icon = screen.getByTestId("icon");
    expect(icon).toHaveClass("mr-1");
    expect(icon).toHaveClass("flex");
    expect(icon).toHaveClass("items-center");
  });

  it("handles ReactNode value", () => {
    const ComplexValue = <span data-testid="complex-value">1.2k</span>;
    renderStatCardPriority({ label: "Priority", value: ComplexValue });
    expect(screen.getByTestId("complex-value")).toBeInTheDocument();
  });

  it("forwards ref", () => {
    const ref: React.RefObject<HTMLDivElement | null> = React.createRef();
    renderStatCardPriority({ ref, label: "Ref Test", value: "42" });
    expect(ref.current).not.toBeNull();
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it("merges custom className", () => {
    renderStatCardPriority({ 
      className: "hover:shadow-lg ring-1 ring-blue-200", 
      label: "Custom", 
      value: "8" 
    });
    const card = getStatCardPriority();
    expect(card).toHaveClass("hover:shadow-lg");
    expect(card).toHaveClass("ring-1");
  });

  it("forwards HTML attributes", () => {
    renderStatCardPriority({ 
      id: "priority-1",
      title: "Priority card",
      "data-priority": "high",
      style: { marginBottom: "8px" },
      label: "High Priority",
      value: "6"
    });
    const card = getStatCardPriority();
    expect(card).toHaveAttribute("id", "priority-1");
    expect(card).toHaveAttribute("title", "Priority card");
    expect(card).toHaveStyle("margin-bottom: 8px");
  });

  it("renders with asChild=false (default div)", () => {
    renderStatCardPriority({ label: "Default", value: "42" });
    const card = getStatCardPriority();
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
        href="/priority" 
        role="link" 
        {...props}
      >
        {children}
      </a>
    ));
    TestLink.displayName = "TestLink";

    render(
      <TestLink>
        <StatCardPriority asChild label="Clickable Priority" value="42" />
      </TestLink>
    );
    
    const link = screen.getByRole("link");
    expect(link).toHaveTextContent("Clickable Priority");
    expect(link).toHaveTextContent("42");
    expect(link).toHaveAttribute("href", "/priority");
  });

  it("applies data-slot attribute", () => {
    renderStatCardPriority({ label: "Slot Test", value: "99" });
    const card = getStatCardPriority();
    expect(card).toHaveAttribute("data-slot", "stat-card-priority");
  });
});
