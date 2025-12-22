// src/components/ui/Checkbox.test.tsx
import { describe, it, expect, beforeEach } from "vitest";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import { Checkbox } from "./Checkbox";

describe("Checkbox", () => {
  beforeEach(() => {
    cleanup();
  });

  it("renders checkbox input correctly", () => {
    render(<Checkbox />);
    const checkbox = screen.getByRole("checkbox") as HTMLInputElement;
    expect(checkbox).toBeInTheDocument();
    expect(checkbox).toHaveAttribute("type", "checkbox");
    expect(checkbox).toHaveAttribute("data-slot", "checkbox");
  });

  it("renders with label when provided", () => {
    render(<Checkbox label="Enable notifications" />);
    expect(screen.getByText("Enable notifications")).toBeInTheDocument();
  });

  it("applies default size classes (md)", () => {
    render(<Checkbox />);
    const checkbox = screen.getByRole("checkbox") as HTMLInputElement;
    expect(checkbox).toHaveClass("h-4");
    expect(checkbox).toHaveClass("w-4");
  });

  it("applies size sm variant", () => {
    render(<Checkbox size="sm" />);
    const checkbox = screen.getByRole("checkbox") as HTMLInputElement;
    expect(checkbox).toHaveClass("h-3.5");
  });

  it("applies size lg variant", () => {
    render(<Checkbox size="lg" />);
    const checkbox = screen.getByRole("checkbox") as HTMLInputElement;
    expect(checkbox).toHaveClass("h-5");
  });

  it("is unchecked by default", () => {
    render(<Checkbox />);
    const checkbox = screen.getByRole("checkbox") as HTMLInputElement;
    expect(checkbox).not.toBeChecked();
  });

  it("can be initially checked", () => {
    render(<Checkbox defaultChecked />);
    const checkbox = screen.getByRole("checkbox") as HTMLInputElement;
    expect(checkbox).toBeChecked();
  });

  it("handles disabled state", () => {
    render(<Checkbox disabled />);
    const checkbox = screen.getByRole("checkbox") as HTMLInputElement;
    expect(checkbox).toBeDisabled();
  });

  it("label click toggles checkbox", () => {
    render(<Checkbox label="Toggle me" />);
    const checkbox = screen.getByRole("checkbox") as HTMLInputElement;
    const label = screen.getByText("Toggle me");
    
    expect(checkbox).not.toBeChecked();
    fireEvent.click(label);
    expect(checkbox).toBeChecked();
  });

  it("applies custom className", () => {
    render(<Checkbox className="border-blue-500" />);
    const checkbox = screen.getByRole("checkbox") as HTMLInputElement;
    expect(checkbox).toHaveClass("border-blue-500");
  });

  it("forwards native input props", () => {
    render(<Checkbox name="test" required />);
    const checkbox = screen.getByRole("checkbox") as HTMLInputElement;
    expect(checkbox).toHaveAttribute("name", "test");
    expect(checkbox).toBeRequired();
  });

  it("renders without label correctly", () => {
    render(<Checkbox />);
    expect(screen.getByRole("checkbox")).toBeInTheDocument();
    expect(screen.queryByRole("label")).not.toBeInTheDocument();
  });
});
