// src/components/ui/ProgressBar.test.tsx
import { describe, it, expect, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { ProgressBar } from "./Progressbar";

describe("ProgressBar", () => {
  beforeEach(() => {
    // Clear DOM between tests
  });

  // Helper functions
  const getTrack = () => screen.getByRole("progressbar") as HTMLDivElement;
  const getIndicator = () => screen.getByTestId("progress-indicator") as HTMLDivElement;

  it("renders track with correct role and ARIA", () => {
    render(<ProgressBar value={50} ariaLabel="Test progress" />);
    const track = getTrack();
    
    // Role and ARIA attributes
    expect(track).toHaveAttribute("role", "progressbar");
    expect(track).toHaveAttribute("aria-valuemin", "0");
    expect(track).toHaveAttribute("aria-valuemax", "100");
    expect(track).toHaveAttribute("aria-valuenow", "50");
    expect(track).toHaveAttribute("aria-label", "Test progress");
    expect(track).toHaveAttribute("data-slot", "progress-track");
  });

  it("renders indicator inside track", () => {
    render(<ProgressBar value={25} />);
    const track = getTrack();
    const indicator = track.querySelector("[data-slot='progress-indicator']") as HTMLDivElement;
    expect(indicator).toBeInTheDocument();
    expect(indicator).toHaveAttribute("data-slot", "progress-indicator");
  });

  it("applies default track styling", () => {
    render(<ProgressBar value={50} />);
    const track = getTrack();
    expect(track).toHaveClass("w-full");
    expect(track).toHaveClass("overflow-hidden");
    expect(track).toHaveClass("rounded-[var(--atom-radius-1)]");
  });

  it("applies default size (sm)", () => {
    render(<ProgressBar value={50} />);
    const track = getTrack();
    expect(track).toHaveClass("h-3");
  });

  it("applies size md variant", () => {
    render(<ProgressBar size="md" value={50} />);
    const track = getTrack();
    expect(track).toHaveClass("h-3.5");
  });

  it("applies size lg variant", () => {
    render(<ProgressBar size="lg" value={50} />);
    const track = getTrack();
    expect(track).toHaveClass("h-4");
  });

  it("clamps value between 0-100", () => {
    render(<ProgressBar value={150} />);
    const track = getTrack();
    expect(track).toHaveAttribute("aria-valuenow", "100");

    render(<ProgressBar value={-10} />);
    expect(track).toHaveAttribute("aria-valuenow", "0");
  });

  it("sets correct indicator width based on value", () => {
    render(<ProgressBar value={25} />);
    const indicator = getIndicator();
    expect(indicator).toHaveStyle({ width: "25%" });

    render(<ProgressBar value={75} />);
    expect(indicator).toHaveStyle({ width: "75%" });
  });

  it("handles indeterminate state (no aria-valuenow)", () => {
    render(<ProgressBar indeterminate ariaLabel="Indeterminate" />);
    const track = getTrack();
    expect(track).not.toHaveAttribute("aria-valuenow");
    const indicator = getIndicator();
    expect(indicator).toHaveStyle({ width: "40%" });
    expect(indicator).toHaveStyle({ transform: "translateX(-60%)" });
  });

  it("applies default trackVariant styling", () => {
    render(<ProgressBar value={50} />);
    const track = getTrack();
    expect(track).toHaveClass("bg-[color-mix(in_srgb,var(--atom-badge-archived-border)_8%,transparent)]");
  });

  it("applies trackVariant outline", () => {
    render(<ProgressBar trackVariant="outline" value={50} />);
    const track = getTrack();
    expect(track).toHaveClass("bg-transparent");
  });

  it("applies trackVariant subtle", () => {
    render(<ProgressBar trackVariant="subtle" value={50} />);
    const track = getTrack();
    expect(track).toHaveClass("bg-[color-mix(in_srgb,var(--atom-badge-archived-border)_6%,var(--atom-bg))]");
  });

  it("applies indicatorVariant default", () => {
    render(<ProgressBar value={50} />);
    const indicator = getIndicator();
    expect(indicator).toHaveClass("bg-[var(--atom-progressbar-bg)]");
  });

  it("syncs indicatorVariant with trackVariant when variant omitted", () => {
    render(<ProgressBar trackVariant="outline" value={50} />);
    const indicator = getIndicator();
    expect(indicator).toHaveClass("bg-[var(--atom-primary)]"); // outline variant
  });

  it("overrides indicatorVariant with explicit variant prop", () => {
    render(<ProgressBar trackVariant="subtle" variant="default" value={50} />);
    const indicator = getIndicator();
    expect(indicator).toHaveClass("bg-[var(--atom-progressbar-bg)]"); // default, not subtle
  });

  it("handles fullWidth false", () => {
    render(<ProgressBar fullWidth={false} value={50} style={{ width: "200px" }} />);
    const track = getTrack();
    expect(track).not.toHaveClass("w-full");
  });

  it("merges custom className", () => {
    render(<ProgressBar className="shadow-lg border-2 border-blue-500" value={50} />);
    const track = getTrack();
    expect(track).toHaveClass("shadow-lg");
    expect(track).toHaveClass("border-2");
    expect(track).toHaveClass("border-blue-500");
  });

  it("forwards all HTML attributes", () => {
    render(
      <ProgressBar 
        id="test-progress" 
        title="50% complete"
        data-test="progress"
        value={50}
      />
    );
    const track = getTrack();
    expect(track).toHaveAttribute("id", "test-progress");
    expect(track).toHaveAttribute("title", "50% complete");
    expect(track).toHaveAttribute("data-test", "progress");
  });
});
