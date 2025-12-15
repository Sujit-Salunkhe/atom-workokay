import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Badge } from "./Badge";

describe("Badge", () => {
  it("renders children", () => {
    render(<Badge>Incoming</Badge>);
    expect(screen.getByText("Incoming")).toBeInTheDocument();
  });

  it("applies variant + tone classes (token-driven)", () => {
    render(
      <Badge variant="success" tone="low">
        Validated
      </Badge>
    );

    const el = screen.getByText("Validated");
    // We assert token class fragments (stable contract)
    expect(el.className).toContain("bg-[var(--atom-badge-success-bg-low)]");
    expect(el.className).toContain("text-[var(--atom-badge-success-fg-low)]");
    expect(el.className).toContain("border-[var(--atom-badge-success-border-low)]");
  });
});
