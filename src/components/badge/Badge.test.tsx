// src/components/badge/Badge.test.tsx
import { describe, it, expect, beforeEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import { Badge } from "./Badge";

// Helper function - TS safe
const getBadgeElement = (text: string): HTMLElement => 
  screen.getByText(text).closest("[data-slot='badge']")!;

describe("Badge", () => {
  beforeEach(() => {
    cleanup(); // Clean DOM between tests
  });

  it("renders children correctly", () => {
    render(<Badge>Active</Badge>);
    expect(screen.getByText("Active")).toBeInTheDocument();
  });

  it("sets data-slot=badge attribute", () => {
    render(<Badge>Badge</Badge>);
    expect(getBadgeElement("Badge")).toBeInTheDocument();
  });

  it("applies default classes (md size)", () => {
    render(<Badge>Default</Badge>);
    const badge = getBadgeElement("Default");
    expect(badge).toHaveClass("text-xs");
    expect(badge).toHaveClass("px-2");
    expect(badge).toHaveClass("py-0.5");
    expect(badge).toHaveClass("rounded-[calc(var(--atom-radius-2)-2px)]");
  });

  it("renders with priority high variant", () => {
    render(<Badge priority="high">High Priority</Badge>);
    const badge = getBadgeElement("High Priority");
    expect(badge).toHaveClass("bg-red-500/10");
  });

  it("renders with priority medium variant", () => {
    render(<Badge priority="medium">Medium Priority</Badge>);
    const badge = getBadgeElement("Medium Priority");
    expect(badge).toHaveClass("bg-amber-500/10");
  });

  it("renders with priority low variant", () => {
    render(<Badge priority="low">Low Priority</Badge>);
    const badge = getBadgeElement("Low Priority");
    expect(badge).toHaveClass("bg-green-500/10");
  });

  it("renders with status validated", () => {
    render(<Badge status="validated">Validated</Badge>);
    const badge = getBadgeElement("Validated");
    expect(badge).toHaveClass(/atom-info-card-jobstatus-success-text/);
  });

  it("renders with status incoming", () => {
    render(<Badge status="incoming">Incoming</Badge>);
    const badge = getBadgeElement("Incoming");
    expect(badge).toHaveClass(/atom-info-card-jobstatus-secondary-text/);
  });

  it("renders with status quarantined", () => {
    render(<Badge status="quarantined">Quarantined</Badge>);
    const badge = getBadgeElement("Quarantined");
    expect(badge).toHaveClass(/color-amber-500/);
  });

  it("renders with status failed", () => {
    render(<Badge status="failed">Failed</Badge>);
    const badge = getBadgeElement("Failed");
    expect(badge).toHaveClass(/atom-badge-failed-text/);
  });

  it("renders with status archieved", () => {
    render(<Badge status="archieved">Archived</Badge>);
    const badge = getBadgeElement("Archived");
    expect(badge).toHaveClass("atom-badge-archived-bg");
  });

  it("renders with status info", () => {
    render(<Badge status="info">Info</Badge>);
    const badge = getBadgeElement("Info");
    expect(badge).toHaveClass(/atom-info/);
  });

  it("applies size sm variant", () => {
    render(<Badge size="sm">Small</Badge>);
    const badge = getBadgeElement("Small");
    expect(badge).toHaveClass("text-[10px]");
    expect(badge).toHaveClass("px-1.5");
    expect(badge).toHaveClass("[&>svg]:size-[10px]");
  });

  it("applies size lg variant", () => {
    render(<Badge size="lg">Large</Badge>);
    const badge = getBadgeElement("Large");
    expect(badge).toHaveClass("text-sm");
    expect(badge).toHaveClass("px-2.5");
    expect(badge).toHaveClass("py-1");
    expect(badge).toHaveClass("[&>svg]:size-4");
  });

  it("applies withIcon classes", () => {
    render(
      <Badge withIcon size="md">
        <svg width="12" height="12" fill="currentColor" viewBox="0 0 24 24" />
        Icon Badge
      </Badge>
    );
    const badge = getBadgeElement("Icon Badge");
    expect(badge).toHaveClass("[&>svg]:mr-1");
    expect(badge).toHaveClass("[&>svg]:size-3");
  });

  it("applies fullWidth", () => {
    render(<Badge fullWidth>Full Width Badge</Badge>);
    const badge = getBadgeElement("Full Width Badge");
    expect(badge).toHaveClass("w-full");
  });

  it("supports asChild and forwards props", () => {
    render(
      <Badge asChild>
        <span className="custom-class bg-blue-500 text-white">Custom Badge</span>
      </Badge>
    );
    const element = screen.getByText("Custom Badge");
    expect(element).toHaveAttribute("data-slot", "badge");
    expect(element).toHaveClass("custom-class");
    expect(element).toHaveClass("bg-blue-500");
  });

  it("merges custom className with variants", () => {
    render(<Badge priority="high" className="shadow-lg ring-2 ring-red-200">Shadow High</Badge>);
    const badge = getBadgeElement("Shadow High");
    expect(badge).toHaveClass("bg-red-500/10");     // variant class
    expect(badge).toHaveClass("shadow-lg");         // custom class
    expect(badge).toHaveClass("ring-2");            // custom class
  });
});
