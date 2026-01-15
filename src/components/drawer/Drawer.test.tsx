// src/components/ui/Drawer.test.tsx
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { 
  Drawer, 
  DrawerHeader, 
  DrawerTitle, 
  DrawerDescription, 
  DrawerBody, 
  DrawerFooter 
} from "./Drawer";

describe("Drawer", () => {
  beforeEach(() => {
    // Reset body styles before each test
    document.body.style.overflow = "";
    document.body.style.paddingRight = "";
  });

  afterEach(() => {
    // Cleanup after each test
    document.body.style.overflow = "";
    document.body.style.paddingRight = "";
  });

  it("renders children when open", () => {
    render(
      <Drawer open={true}>
        <div>Drawer Content</div>
      </Drawer>
    );
    expect(screen.getByText("Drawer Content")).toBeInTheDocument();
  });

  it("applies data-state='open' when open prop is true", () => {
    render(
      <Drawer open={true}>
        <div>Content</div>
      </Drawer>
    );
    const drawer = screen.getByRole("dialog");
    expect(drawer).toHaveAttribute("data-state", "open");
  });

  it("applies data-state='closed' when open prop is false", () => {
    render(
      <Drawer open={false}>
        <div>Content</div>
      </Drawer>
    );
    const drawer = screen.getByRole("dialog");
    expect(drawer).toHaveAttribute("data-state", "closed");
  });

  it("applies right variant classes by default", () => {
    render(
      <Drawer open={true}>
        <div>Content</div>
      </Drawer>
    );
    const drawer = screen.getByRole("dialog");
    expect(drawer).toHaveAttribute("data-variant", "right");
    expect(drawer.className).toContain("right-0");
    expect(drawer.className).toContain("border-l");
  });

  it("applies left variant classes", () => {
    render(
      <Drawer open={true} variant="left">
        <div>Content</div>
      </Drawer>
    );
    const drawer = screen.getByRole("dialog");
    expect(drawer).toHaveAttribute("data-variant", "left");
    expect(drawer.className).toContain("left-0");
    expect(drawer.className).toContain("border-r");
  });

  it("applies bottom variant classes", () => {
    render(
      <Drawer open={true} variant="bottom">
        <div>Content</div>
      </Drawer>
    );
    const drawer = screen.getByRole("dialog");
    expect(drawer).toHaveAttribute("data-variant", "bottom");
    expect(drawer.className).toContain("bottom-0");
    expect(drawer.className).toContain("border-t");
  });

  it("applies top variant classes", () => {
    render(
      <Drawer open={true} variant="top">
        <div>Content</div>
      </Drawer>
    );
    const drawer = screen.getByRole("dialog");
    expect(drawer).toHaveAttribute("data-variant", "top");
    expect(drawer.className).toContain("top-0");
    expect(drawer.className).toContain("border-b");
  });

  it("applies size md (default) for right variant", () => {
    render(
      <Drawer open={true} variant="right">
        <div>Content</div>
      </Drawer>
    );
    const drawer = screen.getByRole("dialog");
    expect(drawer.className).toContain("w-[478px]");
  });

  it("applies size lg for left variant", () => {
    render(
      <Drawer open={true} variant="left" size="lg">
        <div>Content</div>
      </Drawer>
    );
    const drawer = screen.getByRole("dialog");
    expect(drawer.className).toContain("w-[720px]");
  });

  it("applies size xl for bottom variant", () => {
    render(
      <Drawer open={true} variant="bottom" size="xl">
        <div>Content</div>
      </Drawer>
    );
    const drawer = screen.getByRole("dialog");
    expect(drawer.className).toContain("h-[600px]");
  });

  it("applies translate-x-full when closed (right variant)", () => {
    render(
      <Drawer open={false} variant="right">
        <div>Content</div>
      </Drawer>
    );
    const drawer = screen.getByRole("dialog");
    expect(drawer.className).toContain("translate-x-full");
  });

  it("applies -translate-x-full when closed (left variant)", () => {
    render(
      <Drawer open={false} variant="left">
        <div>Content</div>
      </Drawer>
    );
    const drawer = screen.getByRole("dialog");
    expect(drawer.className).toContain("-translate-x-full");
  });

  it("applies translate-y-full when closed (bottom variant)", () => {
    render(
      <Drawer open={false} variant="bottom">
        <div>Content</div>
      </Drawer>
    );
    const drawer = screen.getByRole("dialog");
    expect(drawer.className).toContain("translate-y-full");
  });

  it("applies translate-x-0 translate-y-0 when open", () => {
    render(
      <Drawer open={true} variant="right">
        <div>Content</div>
      </Drawer>
    );
    const drawer = screen.getByRole("dialog");
    expect(drawer.className).toContain("translate-x-0");
    expect(drawer.className).toContain("translate-y-0");
  });

  it("supports className override", () => {
    render(
      <Drawer open={true} className="custom-class">
        <div>Content</div>
      </Drawer>
    );
    const drawer = screen.getByRole("dialog");
    expect(drawer.className).toContain("custom-class");
  });

  it("renders backdrop when showBackdrop is true and drawer is open", () => {
    const { container } = render(
      <Drawer open={true} showBackdrop={true}>
        <div>Content</div>
      </Drawer>
    );
    const backdrop = container.querySelector(".bg-black\\/50");
    expect(backdrop).toBeInTheDocument();
  });

  it("does not render backdrop when showBackdrop is false", () => {
    const { container } = render(
      <Drawer open={true} showBackdrop={false}>
        <div>Content</div>
      </Drawer>
    );
    const backdrop = container.querySelector(".bg-black\\/50");
    expect(backdrop).not.toBeInTheDocument();
  });

  it("calls onOpenChange when backdrop is clicked", () => {
    const handleOpenChange = vi.fn();
    const { container } = render(
      <Drawer open={true} onOpenChange={handleOpenChange} closeOnBackdropClick={true}>
        <div>Content</div>
      </Drawer>
    );
    const backdrop = container.querySelector(".bg-black\\/50") as HTMLElement;
    fireEvent.click(backdrop);
    expect(handleOpenChange).toHaveBeenCalledWith(false);
  });

  it("does not call onOpenChange when closeOnBackdropClick is false", () => {
    const handleOpenChange = vi.fn();
    const { container } = render(
      <Drawer open={true} onOpenChange={handleOpenChange} closeOnBackdropClick={false}>
        <div>Content</div>
      </Drawer>
    );
    const backdrop = container.querySelector(".bg-black\\/50") as HTMLElement;
    fireEvent.click(backdrop);
    expect(handleOpenChange).not.toHaveBeenCalled();
  });

  it("calls onOpenChange when Escape key is pressed", () => {
    const handleOpenChange = vi.fn();
    render(
      <Drawer open={true} onOpenChange={handleOpenChange} closeOnEscape={true}>
        <div>Content</div>
      </Drawer>
    );
    fireEvent.keyDown(document, { key: "Escape" });
    expect(handleOpenChange).toHaveBeenCalledWith(false);
  });

  it("does not call onOpenChange when closeOnEscape is false", () => {
    const handleOpenChange = vi.fn();
    render(
      <Drawer open={true} onOpenChange={handleOpenChange} closeOnEscape={false}>
        <div>Content</div>
      </Drawer>
    );
    fireEvent.keyDown(document, { key: "Escape" });
    expect(handleOpenChange).not.toHaveBeenCalled();
  });

  it("sets body overflow hidden when drawer is open", () => {
    render(
      <Drawer open={true}>
        <div>Content</div>
      </Drawer>
    );
    expect(document.body.style.overflow).toBe("hidden");
  });

  it("restores body overflow when drawer is closed", () => {
    const { rerender } = render(
      <Drawer open={true}>
        <div>Content</div>
      </Drawer>
    );
    expect(document.body.style.overflow).toBe("hidden");

    rerender(
      <Drawer open={false}>
        <div>Content</div>
      </Drawer>
    );
    expect(document.body.style.overflow).toBe("");
  });

  it("sets aria-modal to true when open", () => {
    render(
      <Drawer open={true}>
        <div>Content</div>
      </Drawer>
    );
    const drawer = screen.getByRole("dialog");
    expect(drawer).toHaveAttribute("aria-modal", "true");
  });

  it("sets aria-hidden to false when open", () => {
    render(
      <Drawer open={true}>
        <div>Content</div>
      </Drawer>
    );
    const drawer = screen.getByRole("dialog");
    expect(drawer).toHaveAttribute("aria-hidden", "false");
  });

  it("sets aria-hidden to true when closed", () => {
    render(
      <Drawer open={false}>
        <div>Content</div>
      </Drawer>
    );
    const drawer = screen.getByRole("dialog");
    expect(drawer).toHaveAttribute("aria-hidden", "true");
  });

  it("works with asChild prop using Slot", () => {
    render(
      <Drawer open={true} asChild>
        <article data-testid="custom-element">Custom drawer content</article>
      </Drawer>
    );
    const customElement = screen.getByTestId("custom-element");
    expect(customElement.tagName).toBe("ARTICLE");
    expect(customElement).toHaveAttribute("data-state", "open");
  });
});

describe("DrawerHeader", () => {
  it("renders children", () => {
    render(<DrawerHeader>Header Content</DrawerHeader>);
    expect(screen.getByText("Header Content")).toBeInTheDocument();
  });

  it("applies default padding classes", () => {
    render(<DrawerHeader>Header</DrawerHeader>);
    const header = screen.getByText("Header");
    expect(header.className).toContain("p-6");
  });

  it("supports className override", () => {
    render(<DrawerHeader className="custom-header">Header</DrawerHeader>);
    const header = screen.getByText("Header");
    expect(header.className).toContain("custom-header");
  });
});

describe("DrawerTitle", () => {
  it("renders children", () => {
    render(<DrawerTitle>Title Text</DrawerTitle>);
    expect(screen.getByText("Title Text")).toBeInTheDocument();
  });

  it("renders as h2 element", () => {
    render(<DrawerTitle>Title</DrawerTitle>);
    const title = screen.getByText("Title");
    expect(title.tagName).toBe("H2");
  });

  it("has id 'drawer-title'", () => {
    render(<DrawerTitle>Title</DrawerTitle>);
    const title = screen.getByText("Title");
    expect(title).toHaveAttribute("id", "drawer-title");
  });

  it("applies font styling classes", () => {
    render(<DrawerTitle>Title</DrawerTitle>);
    const title = screen.getByText("Title");
    expect(title.className).toContain("text-lg");
    expect(title.className).toContain("font-semibold");
  });
});

describe("DrawerDescription", () => {
  it("renders children", () => {
    render(<DrawerDescription>Description text</DrawerDescription>);
    expect(screen.getByText("Description text")).toBeInTheDocument();
  });

  it("renders as p element", () => {
    render(<DrawerDescription>Description</DrawerDescription>);
    const desc = screen.getByText("Description");
    expect(desc.tagName).toBe("P");
  });

  it("applies text styling classes", () => {
    render(<DrawerDescription>Description</DrawerDescription>);
    const desc = screen.getByText("Description");
    expect(desc.className).toContain("text-sm");
  });
});

describe("DrawerBody", () => {
  it("renders children", () => {
    render(<DrawerBody>Body content</DrawerBody>);
    expect(screen.getByText("Body content")).toBeInTheDocument();
  });

  it("applies flex-1 and overflow-auto classes", () => {
    render(<DrawerBody>Body</DrawerBody>);
    const body = screen.getByText("Body");
    expect(body.className).toContain("flex-1");
    expect(body.className).toContain("overflow-auto");
  });

  it("supports className override", () => {
    render(<DrawerBody className="custom-body">Body</DrawerBody>);
    const body = screen.getByText("Body");
    expect(body.className).toContain("custom-body");
  });
});

describe("DrawerFooter", () => {
  it("renders children", () => {
    render(<DrawerFooter>Footer content</DrawerFooter>);
    expect(screen.getByText("Footer content")).toBeInTheDocument();
  });

  it("applies flex and gap classes", () => {
    render(<DrawerFooter>Footer</DrawerFooter>);
    const footer = screen.getByText("Footer");
    expect(footer.className).toContain("flex");
    expect(footer.className).toContain("gap-2");
  });

  it("supports className override", () => {
    render(<DrawerFooter className="custom-footer">Footer</DrawerFooter>);
    const footer = screen.getByText("Footer");
    expect(footer.className).toContain("custom-footer");
  });
});

describe("Drawer - Composition", () => {
  it("renders complete drawer with all subcomponents", () => {
    const handleClose = vi.fn();
    render(
      <Drawer open={true} onOpenChange={handleClose}>
        <DrawerHeader>
          <DrawerTitle>Drawer Title</DrawerTitle>
          <DrawerDescription>Drawer description</DrawerDescription>
        </DrawerHeader>
        <DrawerBody>Main content goes here</DrawerBody>
        <DrawerFooter>
          <button onClick={() => handleClose(false)}>Close</button>
        </DrawerFooter>
      </Drawer>
    );

    expect(screen.getByText("Drawer Title")).toBeInTheDocument();
    expect(screen.getByText("Drawer description")).toBeInTheDocument();
    expect(screen.getByText("Main content goes here")).toBeInTheDocument();
    expect(screen.getByText("Close")).toBeInTheDocument();
  });
});
