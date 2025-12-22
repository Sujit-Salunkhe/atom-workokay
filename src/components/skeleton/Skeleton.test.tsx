// src/components/ui/Skeleton.test.tsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Skeleton } from "./Skeleton";

describe("Skeleton", () => {
  // No beforeEach needed - RTL auto-cleanup

  const getSkeleton = () => screen.getByTestId("skeleton") as HTMLDivElement;

  it("renders skeleton with correct data attribute", () => {
    render(<Skeleton />);
    const skeleton = getSkeleton();
    expect(skeleton).toBeInTheDocument();
    expect(skeleton).toHaveAttribute("data-slot", "skeleton");
  });

  it("applies default styling (variant=default, size=md)", () => {
    render(<Skeleton />);
    const skeleton = getSkeleton();
    expect(skeleton).toHaveClass("rounded-md");
    expect(skeleton).toHaveClass("bg-[var(--atom-skeleton-bg-color)]");
    expect(skeleton).toHaveClass("h-4");  // md height
    expect(skeleton).toHaveClass("w-48"); // md width
  });

  it("applies variant default", () => {
    render(<Skeleton variant="default" />);
    const skeleton = getSkeleton();
    expect(skeleton).not.toHaveClass("rounded-full");
    expect(skeleton).not.toHaveClass("rounded-lg");
    expect(skeleton).not.toHaveClass("aspect-square");
  });

  it("applies variant rounded", () => {
    render(<Skeleton variant="rounded" />);
    const skeleton = getSkeleton();
    expect(skeleton).toHaveClass("rounded-full");
  });

  it("applies variant card", () => {
    render(<Skeleton variant="card" />);
    const skeleton = getSkeleton();
    expect(skeleton).toHaveClass("rounded-lg");
  });

  it("applies variant circle", () => {
    render(<Skeleton variant="circle" />);
    const skeleton = getSkeleton();
    expect(skeleton).toHaveClass("rounded-full");
    expect(skeleton).toHaveClass("aspect-square");
  });

  it("applies size sm", () => {
    render(<Skeleton size="sm" />);
    const skeleton = getSkeleton();
    expect(skeleton).toHaveClass("h-3");
    expect(skeleton).toHaveClass("w-24");
  });

  it("applies size md", () => {
    render(<Skeleton size="md" />);
    const skeleton = getSkeleton();
    expect(skeleton).toHaveClass("h-4");
    expect(skeleton).toHaveClass("w-48");
  });

  it("applies size lg", () => {
    render(<Skeleton size="lg" />);
    const skeleton = getSkeleton();
    expect(skeleton).toHaveClass("h-6");
    expect(skeleton).toHaveClass("w-72");
  });

  it("applies size full", () => {
    render(<Skeleton size="full" />);
    const skeleton = getSkeleton();
    expect(skeleton).toHaveClass("w-full");
  });

  it("combines variant + size variants", () => {
    render(<Skeleton variant="circle" size="lg" />);
    const skeleton = getSkeleton();
    expect(skeleton).toHaveClass("rounded-full");
    expect(skeleton).toHaveClass("aspect-square");
    expect(skeleton).toHaveClass("h-6");
    expect(skeleton).toHaveClass("w-72");
  });

  it("merges custom className", () => {
    render(<Skeleton className="animate-pulse shadow-lg border" />);
    const skeleton = getSkeleton();
    expect(skeleton).toHaveClass("animate-pulse");
    expect(skeleton).toHaveClass("shadow-lg");
    expect(skeleton).toHaveClass("border");
  });

  it("forwards HTML attributes", () => {
    render(
      <Skeleton 
        id="test-skeleton"
        aria-label="Loading content"
        data-testid="loading"
        style={{ margin: "8px" }}
      />
    );
    const skeleton = getSkeleton();
    expect(skeleton).toHaveAttribute("id", "test-skeleton");
    expect(skeleton).toHaveAttribute("aria-label", "Loading content");
    expect(skeleton).toHaveAttribute("data-testid", "loading");
    expect(skeleton).toHaveStyle("margin: 8px");
  });

  it("handles all variants combination", () => {
    render(<Skeleton variant="rounded" size="full" className="mx-auto" />);
    const skeleton = getSkeleton();
    expect(skeleton).toHaveClass("rounded-full");
    expect(skeleton).toHaveClass("w-full");
    expect(skeleton).toHaveClass("mx-auto");
  });
});
