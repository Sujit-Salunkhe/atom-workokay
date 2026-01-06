// src/components/ui/InfoCard.test.tsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import * as React from "react";
import { InfoCard } from "./InfoCard";
import { cn } from "../../lib/cn"

describe("InfoCard", () => {
  const renderInfoCard = (props: any) => {
    return render(
      <InfoCard data-testid="info-card" {...props} />
    );
  };

  const getInfoCard = () => screen.getByTestId("info-card") as HTMLDivElement;
  const getInfoValue = () => screen.getByTestId("info-value");
  const getInfoLabel = () => screen.getByTestId("info-label");

  it("renders basic InfoCard with children", () => {
    renderInfoCard({ info: "42", label: "Users" });
    expect(getInfoCard()).toBeInTheDocument();
    expect(getInfoValue()).toHaveTextContent("42");
    expect(getInfoLabel()).toHaveTextContent("Users");
  });

  it("applies default order (col)", () => {
    renderInfoCard({ info: "100", label: "Sales" });
    const card = getInfoCard();
    expect(card).toHaveClass("flex-col");
    expect(card).toHaveClass("items-center");
    expect(card).toHaveClass("justify-center");
  });

  it("applies order col variant", () => {
    renderInfoCard({ order: "col", info: "100", label: "Sales" });
    const card = getInfoCard();
    expect(card).toHaveClass("flex-col");
    expect(card).toHaveClass("bg-[color-mix(in_oklab,var(--atom-muted)_50%,transparent)]");
  });

  it("applies order colR variant", () => {
    renderInfoCard({ order: "colR", info: "100", label: "Sales" });
    const card = getInfoCard();
    expect(card).toHaveClass("flex-col-reverse");
  });

  it("applies order row variant", () => {
    renderInfoCard({ order: "row", info: "100", label: "Sales" });
    const card = getInfoCard();
    expect(card).toHaveClass("flex-row");
    expect(card).toHaveClass("justify-between");
  });

  it("applies order rowR variant", () => {
    renderInfoCard({ order: "rowR", info: "100", label: "Sales" });
    const card = getInfoCard();
    expect(card).toHaveClass("flex-row-reverse");
  });

  it("applies default size (sm)", () => {
    renderInfoCard({ info: "42", label: "Count" });
    const card = getInfoCard();
    expect(card).toHaveClass("h-[80px]");
    expect(card).toHaveClass("w-[128px]");
  });

  it("applies size xs", () => {
    renderInfoCard({ size: "xs", info: "42", label: "Count" });
    const card = getInfoCard();
    expect(card).toHaveClass("h-[64px]");
    expect(card).toHaveClass("w-[112px]");
  });

  it("applies size md", () => {
    renderInfoCard({ size: "md", info: "42", label: "Count" });
    const card = getInfoCard();
    expect(card).toHaveClass("h-[96px]");
    expect(card).toHaveClass("w-[160px]");
    expect(card).toHaveClass("border-[var(--atom-border)]");
  });

  it("applies size lg", () => {
    renderInfoCard({ size: "lg", info: "42", label: "Count" });
    const card = getInfoCard();
    expect(card).toHaveClass("h-[112px]");
    expect(card).toHaveClass("w-[192px]");
  });

  it("applies default variant (primary) to infoValue", () => {
    renderInfoCard({ info: "999", label: "Total" });
    const infoValue = getInfoValue();
    expect(infoValue).toHaveClass("text-[var(--atom-info-card-jobstatus-primary-text)]");
    expect(infoValue).toHaveClass("font-[600]");
  });

  it("applies variant primary to infoValue", () => {
    renderInfoCard({ variant: "primary", info: "999", label: "Total" });
    const infoValue = getInfoValue();
    expect(infoValue).toHaveClass(/atom-info-card-jobstatus-primary-text/);
  });

  it("applies variant secondary to infoValue", () => {
    renderInfoCard({ variant: "secondary", info: "999", label: "Total" });
    const infoValue = getInfoValue();
    expect(infoValue).toHaveClass(/atom-info-card-jobstatus-secondary-text/);
  });

  it("applies variant success to infoValue", () => {
    renderInfoCard({ variant: "success", info: "999", label: "Total" });
    const infoValue = getInfoValue();
    expect(infoValue).toHaveClass(/atom-info-card-jobstatus-success-text/);
  });

  it("applies variant to both infoValue AND infoLabel", () => {
    renderInfoCard({ variant: "success", info: "100%", label: "Success Rate" });
    const infoValue = getInfoValue();
    const infoLabel = getInfoLabel();
    expect(infoValue).toHaveClass(/atom-info-card-jobstatus-success-text/);
    expect(infoLabel).toHaveClass(/atom-info-card-jobstatus-label-text/);
  });

  it("renders label and info as ReactNode", () => {
    const ComplexInfo = <span data-testid="complex-info">₹1,234.56</span>;
    const ComplexLabel = <strong data-testid="complex-label">Revenue</strong>;
    
    renderInfoCard({ info: ComplexInfo, label: ComplexLabel });
    expect(screen.getByTestId("complex-info")).toBeInTheDocument();
    expect(screen.getByTestId("complex-label")).toBeInTheDocument();
  });

  it("forwards ref", () => {
    const ref: React.RefObject<HTMLDivElement | null> = React.createRef();
    renderInfoCard({ ref, info: "42", label: "Test" });
    expect(ref.current).not.toBeNull();
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it("merges custom className", () => {
    renderInfoCard({ 
      className: "ring-2 ring-blue-500 shadow-xl", 
      info: "42", 
      label: "Custom" 
    });
    const card = getInfoCard();
    expect(card).toHaveClass("ring-2");
    expect(card).toHaveClass("ring-blue-500");
    expect(card).toHaveClass("shadow-xl");
  });

  it("forwards HTML attributes", () => {
    renderInfoCard({ 
      id: "test-card",
      title: "Info card",
      "data-category": "metrics",
      style: { margin: "8px" },
      info: "42",
      label: "Count"
    });
    const card = getInfoCard();
    expect(card).toHaveAttribute("id", "test-card");
    expect(card).toHaveAttribute("title", "Info card");
    expect(card).toHaveStyle("margin: 8px");
  });

  it("renders with asChild=false (default div)", () => {
    renderInfoCard({ info: "42", label: "Test" });
    const card = getInfoCard();
    expect(card.tagName).toBe("DIV");
  });

  it("renders with asChild=true using Slot", () => {
    const TestButton = React.forwardRef<
      HTMLButtonElement, 
      React.ButtonHTMLAttributes<HTMLButtonElement>
    >(({ className, children, ...props }, ref) => (
      <button 
        ref={ref} 
        className={cn("test-button", className)} 
        role="button" 
        {...props}
      >
        {children}
      </button>
    ));
    TestButton.displayName = "TestButton";

    render(
      <TestButton>
        <InfoCard asChild info="42" label="Slot test" />
      </TestButton>
    );
    
    const button = screen.getByRole("button");
    expect(button).toHaveTextContent("42");
    expect(button).toHaveTextContent("Slot test");
    expect(button).toHaveClass(/flex-col/); // InfoCard classes merged
  });

  it("handles empty label/info gracefully", () => {
    renderInfoCard({ info: "", label: "" });
    expect(getInfoValue()).toBeInTheDocument();
    expect(getInfoLabel()).toBeInTheDocument();
  });
});
