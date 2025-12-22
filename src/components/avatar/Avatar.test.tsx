// src/components/avatar/Avatar.test.tsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Avatar } from "./Avatar";

describe("Avatar", () => {
  it("renders initials when provided and no src", () => {
    render(<Avatar initials="AB" aria-label="User AB" />);
    expect(screen.getByText("AB")).toBeInTheDocument();
  });

  it("renders children over initials and src", () => {
    render(
      <Avatar initials="AB" src="avatar.png">
        <span>Custom Child</span>
      </Avatar>
    );
    expect(screen.getByText("Custom Child")).toBeInTheDocument();
    expect(screen.queryByText("AB")).not.toBeInTheDocument();
    expect(screen.queryByRole("img")).not.toBeInTheDocument();
  });

  it("renders img when src provided and no children", () => {
    render(<Avatar src="avatar.png" aria-label="John Doe" />);
    const img = screen.getByRole("img");
    expect(img).toHaveAttribute("src", "avatar.png");
    expect(img).toHaveAttribute("alt", "John Doe");
  });

  it("uses initials as img alt when aria-label missing", () => {
    render(<Avatar src="avatar.png" initials="JD" />);
    const img = screen.getByRole("img");
    expect(img).toHaveAttribute("alt", "JD");
  });

  it("falls back to 'AZ' as img alt when both missing", () => {
    render(<Avatar src="avatar.png" />);
    const img = screen.getByRole("img");
    expect(img).toHaveAttribute("alt", "AZ");
  });

  it("applies default classes (md circle neutral subtle)", () => {
    render(<Avatar initials="AB" />);
    const avatar = screen.getByText("AB").closest("[data-slot='avatar']");
    expect(avatar).toHaveClass("h-10");
    expect(avatar).toHaveClass("w-10");
    expect(avatar).toHaveClass("rounded-full");
  });

  it("applies variant classes (success)", () => {
    render(<Avatar initials="OK" variant="success" />);
    const avatar = screen.getByText("OK").closest("[data-slot='avatar']");
    expect(avatar).toHaveClass("atom-badge-success-bg-low");
  });

  it("applies appearance compound (solid + success = high tokens)", () => {
    render(<Avatar initials="OK" variant="success" appearance="solid" />);
    const avatar = screen.getByText("OK").closest("[data-slot='avatar']");
    expect(avatar).toHaveClass("atom-badge-success-bg-high");
  });

  it("applies shape classes (square)", () => {
    render(<Avatar initials="AB" shape="square" />);
    const avatar = screen.getByText("AB").closest("[data-slot='avatar']");
    expect(avatar).toHaveClass("rounded-md");
  });

  it("applies size classes (lg)", () => {
    render(<Avatar initials="AB" size="lg" />);
    const avatar = screen.getByText("AB").closest("[data-slot='avatar']");
    expect(avatar).toHaveClass("h-12");
    expect(avatar).toHaveClass("w-12");
  });

  it("applies fullWidth + pill (chip layout)", () => {
    render(<Avatar initials="AB" shape="pill" fullWidth />);
    const avatar = screen.getByText("AB").closest("[data-slot='avatar']");
    expect(avatar).toHaveClass("w-full");
    expect(avatar).toHaveClass("justify-start");
  });

  it("applies withRing classes", () => {
    render(<Avatar initials="AB" withRing />);
    const avatar = screen.getByText("AB").closest("[data-slot='avatar']");
    expect(avatar).toHaveClass("ring-2");
  });

  it("sets data-slot=avatar attribute", () => {
    render(<Avatar initials="AB" />);
    expect(screen.getByText("AB").closest("[data-slot='avatar']")).toBeInTheDocument();
  });

  it("supports asChild + forwards classes/attributes", () => {
    render(
      <Avatar asChild>
        <button>Click</button>
      </Avatar>
    );
    const btn = screen.getByRole("button", { name: "Click" });
    expect(btn).toHaveAttribute("data-slot", "avatar");
    expect(btn).toHaveClass("inline-flex");
  });

  it("merges custom className", () => {
    render(<Avatar initials="AB" className="border-red-500 shadow-lg" />);
    const avatar = screen.getByText("AB").closest("[data-slot='avatar']");
    expect(avatar).toHaveClass("border-red-500");
    expect(avatar).toHaveClass("shadow-lg");
  });
});
