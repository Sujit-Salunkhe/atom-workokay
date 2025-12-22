// src/components/ui/Input.test.tsx
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import { Input } from "./Input";

describe("Input", () => {
  beforeEach(() => {
    cleanup();
  });

  const getInput = () => screen.getByRole("textbox") as HTMLInputElement;

  it("renders input correctly", () => {
    render(<Input placeholder="Enter text" />);
    const input = getInput();
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute("placeholder", "Enter text");
  });

  it("applies default size classes (md)", () => {
    render(<Input placeholder="Default size" />);
    const input = getInput();
    expect(input).toHaveClass("h-10");
    expect(input).toHaveClass("px-3.5");
    expect(input).toHaveClass("text-sm");
  });

  it("applies size sm variant", () => {
    render(<Input size="sm" placeholder="Small" />);
    const input = getInput();
    expect(input).toHaveClass("h-9");
    expect(input).toHaveClass("px-3");
  });

  it("applies size lg variant", () => {
    render(<Input size="lg" placeholder="Large" />);
    const input = getInput();
    expect(input).toHaveClass("h-11");
    expect(input).toHaveClass("px-4");
    expect(input).toHaveClass("text-base");
  });

  it("applies default styling classes", () => {
    render(<Input placeholder="Default" />);
    const input = getInput();
    expect(input).toHaveClass("rounded-md");
    expect(input).toHaveClass("bg-[var(--atom-input-bg)]");
    expect(input).toHaveClass("border-[var(--atom-badge-archived-border)]");
  });

  it("renders leftIcon with correct positioning and padding", () => {
    render(
      <Input 
        leftIcon={<span>🔍</span>} 
        placeholder="Search"
      />
    );
    const input = getInput();
    expect(input).toHaveClass("pl-9");
    expect(screen.getByText("🔍")).toBeInTheDocument();
  });

  it("renders rightIcon with correct positioning and padding", () => {
    render(
      <Input 
        rightIcon={<span>✓</span>} 
        placeholder="With right icon"
      />
    );
    const input = getInput();
    expect(input).toHaveClass("pr-9");
    expect(screen.getByText("✓")).toBeInTheDocument();
  });

  it("renders loading spinner when loading=true", () => {
    render(<Input loading placeholder="Loading..." />);
    const input = getInput();
    expect(input).toHaveClass("pr-9");
    const spinner = screen.getByLabelText(/loading/i);
    expect(spinner).toBeInTheDocument();
  });

  it("applies invalid tone styling", () => {
    render(<Input tone="invalid" placeholder="Invalid" />);
    const input = getInput();
    expect(input).toHaveClass(/atom-error/);
  });

  it("applies success tone styling", () => {
    render(<Input tone="success" placeholder="Success" />);
    const input = getInput();
    expect(input).toHaveClass(/atom-success/);
  });

  it("renders errorText with correct ARIA", () => {
    render(<Input errorText="Invalid email" placeholder="Email" />);
    const input = getInput();
    const error = screen.getByText("Invalid email");
    expect(input).toHaveAttribute("aria-invalid", "true");
    expect(input.getAttribute("aria-errormessage")).toBeTruthy();
    expect(error).toHaveClass(/atom-error/);
  });

  it("renders hint text", () => {
    render(<Input hint="Enter your email" placeholder="Email" />);
    const hint = screen.getByText("Enter your email");
    expect(hint).toHaveClass(/atom-text-muted/);
  });

  it("renders both error and hint", () => {
    render(
      <Input 
        errorText="Invalid format" 
        hint="Use example@domain.com" 
        placeholder="Email"
      />
    );
    expect(screen.getByText("Invalid format")).toBeInTheDocument();
    expect(screen.getByText("Use example@domain.com")).toBeInTheDocument();
  });

  it("generates auto ID when no id provided", () => {
    render(<Input placeholder="Auto ID" />);
    const input = getInput();
    expect(input.id).toMatch(/^inp_/);
  });

  it("uses provided ID", () => {
    render(<Input id="custom-id" placeholder="Custom ID" />);
    const input = getInput();
    expect(input).toHaveAttribute("id", "custom-id");
  });

  it("handles disabled state", () => {
    render(<Input disabled placeholder="Disabled" />);
    const input = getInput();
    expect(input).toBeDisabled();
    expect(input).toHaveClass("disabled:opacity-60");
  });

  it("handles readOnly state", () => {
    render(<Input readOnly placeholder="Read only" />);
    const input = getInput();
    expect(input).toHaveAttribute("readonly");
    expect(input).toHaveAttribute("aria-readonly", "true");
  });

  it("merges custom className", () => {
    render(<Input className="shadow-lg ring-2 ring-blue-500" placeholder="Custom" />);
    const input = getInput();
    expect(input).toHaveClass("shadow-lg");
    expect(input).toHaveClass("ring-2");
  });

  it("focus-visible applies correct ring", () => {
    render(<Input placeholder="Focus test" />);
    const input = getInput();
    expect(input).toHaveClass("focus-visible:ring-1");
    expect(input).toHaveClass("focus-visible:ring-offset-0");
  });

  it("handles value and onChange", () => {
    const handleChange = vi.fn();
    render(<Input value="" onChange={handleChange} placeholder="Type here" />);
    const input = getInput();
    fireEvent.change(input, { target: { value: 'test' } });
    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(input).toHaveValue('test');
  });
});
