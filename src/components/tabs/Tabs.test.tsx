// src/components/ui/Tabs.test.tsx
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { Tabs, TabsList, TabTrigger, TabContent } from "./Tabs";

// Helper function to render basic tabs setup
const renderBasicTabs = (props = {}) => {
  return render(
    <Tabs defaultValue="tab1" {...props}>
      <TabsList aria-label="Test tabs">
        <TabTrigger value="tab1">Tab 1</TabTrigger>
        <TabTrigger value="tab2">Tab 2</TabTrigger>
        <TabTrigger value="tab3">Tab 3</TabTrigger>
      </TabsList>
      <TabContent value="tab1">Content 1</TabContent>
      <TabContent value="tab2">Content 2</TabContent>
      <TabContent value="tab3">Content 3</TabContent>
    </Tabs>
  );
};

describe("Tabs", () => {
  it("renders all tab triggers", () => {
    renderBasicTabs();
    expect(screen.getByText("Tab 1")).toBeInTheDocument();
    expect(screen.getByText("Tab 2")).toBeInTheDocument();
    expect(screen.getByText("Tab 3")).toBeInTheDocument();
  });

  it("displays default tab content", () => {
    renderBasicTabs();
    expect(screen.getByText("Content 1")).toBeInTheDocument();
    expect(screen.queryByText("Content 2")).not.toBeInTheDocument();
  });

  it("applies data-orientation='horizontal' by default", () => {
    const { container } = renderBasicTabs();
    const tabsRoot = container.firstChild as HTMLElement;
    expect(tabsRoot).toHaveAttribute("data-orientation", "horizontal");
  });

  it("applies data-orientation='vertical' when specified", () => {
    const { container } = render(
      <Tabs defaultValue="tab1" orientation="vertical">
        <TabsList aria-label="Vertical tabs">
          <TabTrigger value="tab1">Tab 1</TabTrigger>
        </TabsList>
        <TabContent value="tab1">Content 1</TabContent>
      </Tabs>
    );
    const tabsRoot = container.firstChild as HTMLElement;
    expect(tabsRoot).toHaveAttribute("data-orientation", "vertical");
  });

  it("supports className override on Tabs root", () => {
    const { container } = renderBasicTabs({ className: "custom-tabs" });
    const tabsRoot = container.firstChild as HTMLElement;
    expect(tabsRoot.className).toContain("custom-tabs");
  });

  it("switches content when tab is clicked", () => {
    renderBasicTabs();
    expect(screen.getByText("Content 1")).toBeInTheDocument();

    fireEvent.click(screen.getByText("Tab 2"));
    expect(screen.queryByText("Content 1")).not.toBeInTheDocument();
    expect(screen.getByText("Content 2")).toBeInTheDocument();
  });

  it("calls onValueChange when tab changes", () => {
    const handleChange = vi.fn();
    render(
      <Tabs defaultValue="tab1" onValueChange={handleChange}>
        <TabsList aria-label="Test tabs">
          <TabTrigger value="tab1">Tab 1</TabTrigger>
          <TabTrigger value="tab2">Tab 2</TabTrigger>
        </TabsList>
        <TabContent value="tab1">Content 1</TabContent>
        <TabContent value="tab2">Content 2</TabContent>
      </Tabs>
    );

    fireEvent.click(screen.getByText("Tab 2"));
    expect(handleChange).toHaveBeenCalledWith("tab2");
  });

  it("works in controlled mode with value prop", () => {
    const { rerender } = render(
      <Tabs value="tab1" defaultValue="tab1">
        <TabsList aria-label="Controlled tabs">
          <TabTrigger value="tab1">Tab 1</TabTrigger>
          <TabTrigger value="tab2">Tab 2</TabTrigger>
        </TabsList>
        <TabContent value="tab1">Content 1</TabContent>
        <TabContent value="tab2">Content 2</TabContent>
      </Tabs>
    );

    expect(screen.getByText("Content 1")).toBeInTheDocument();

    rerender(
      <Tabs value="tab2" defaultValue="tab1">
        <TabsList aria-label="Controlled tabs">
          <TabTrigger value="tab1">Tab 1</TabTrigger>
          <TabTrigger value="tab2">Tab 2</TabTrigger>
        </TabsList>
        <TabContent value="tab1">Content 1</TabContent>
        <TabContent value="tab2">Content 2</TabContent>
      </Tabs>
    );

    expect(screen.getByText("Content 2")).toBeInTheDocument();
  });

  it("throws error when TabsList used outside Tabs context", () => {
    const originalError = console.error;
    console.error = vi.fn();

    expect(() => {
      render(<TabsList aria-label="Orphan list" />);
    }).toThrow("Tabs compound components must be used within Tabs");

    console.error = originalError;
  });
});

describe("TabsList", () => {
  it("renders with role='tablist'", () => {
    render(
      <Tabs defaultValue="tab1">
        <TabsList aria-label="Test tabs">
          <TabTrigger value="tab1">Tab 1</TabTrigger>
        </TabsList>
        <TabContent value="tab1">Content 1</TabContent>
      </Tabs>
    );

    const tablist = screen.getByRole("tablist");
    expect(tablist).toBeInTheDocument();
  });

  it("applies aria-label attribute", () => {
    render(
      <Tabs defaultValue="tab1">
        <TabsList aria-label="Main navigation">
          <TabTrigger value="tab1">Tab 1</TabTrigger>
        </TabsList>
        <TabContent value="tab1">Content 1</TabContent>
      </Tabs>
    );

    const tablist = screen.getByRole("tablist");
    expect(tablist).toHaveAttribute("aria-label", "Main navigation");
  });

  it("applies aria-orientation for horizontal tabs", () => {
    render(
      <Tabs defaultValue="tab1" orientation="horizontal">
        <TabsList aria-label="Horizontal tabs">
          <TabTrigger value="tab1">Tab 1</TabTrigger>
        </TabsList>
        <TabContent value="tab1">Content 1</TabContent>
      </Tabs>
    );

    const tablist = screen.getByRole("tablist");
    expect(tablist).toHaveAttribute("aria-orientation", "horizontal");
  });

  it("applies default variant classes", () => {
    render(
      <Tabs defaultValue="tab1" variant="default">
        <TabsList aria-label="Default tabs">
          <TabTrigger value="tab1">Tab 1</TabTrigger>
        </TabsList>
        <TabContent value="tab1">Content 1</TabContent>
      </Tabs>
    );

    const tablist = screen.getByRole("tablist");
    expect(tablist.className).toContain("border-b");
    expect(tablist.className).toContain("flex-row");
  });

  it("applies pills variant classes", () => {
    render(
      <Tabs defaultValue="tab1" variant="pills">
        <TabsList aria-label="Pill tabs">
          <TabTrigger value="tab1">Tab 1</TabTrigger>
        </TabsList>
        <TabContent value="tab1">Content 1</TabContent>
      </Tabs>
    );

    const tablist = screen.getByRole("tablist");
    expect(tablist.className).toContain("rounded-lg");
    expect(tablist.className).toContain("p-1");
  });

  it("applies vertical orientation classes", () => {
    render(
      <Tabs defaultValue="tab1" orientation="vertical">
        <TabsList aria-label="Vertical tabs">
          <TabTrigger value="tab1">Tab 1</TabTrigger>
        </TabsList>
        <TabContent value="tab1">Content 1</TabContent>
      </Tabs>
    );

    const tablist = screen.getByRole("tablist");
    expect(tablist.className).toContain("flex-col");
    expect(tablist.className).toContain("border-r");
  });

  it("supports className override", () => {
    render(
      <Tabs defaultValue="tab1">
        <TabsList aria-label="Custom tabs" className="custom-list">
          <TabTrigger value="tab1">Tab 1</TabTrigger>
        </TabsList>
        <TabContent value="tab1">Content 1</TabContent>
      </Tabs>
    );

    const tablist = screen.getByRole("tablist");
    expect(tablist.className).toContain("custom-list");
  });
});

describe("TabTrigger", () => {
  it("renders with role='tab'", () => {
    render(
      <Tabs defaultValue="tab1">
        <TabsList aria-label="Test tabs">
          <TabTrigger value="tab1">Tab 1</TabTrigger>
        </TabsList>
        <TabContent value="tab1">Content 1</TabContent>
      </Tabs>
    );

    const tab = screen.getByRole("tab", { name: "Tab 1" });
    expect(tab).toBeInTheDocument();
  });

  it("sets aria-selected='true' for active tab", () => {
    render(
      <Tabs defaultValue="tab1">
        <TabsList aria-label="Test tabs">
          <TabTrigger value="tab1">Tab 1</TabTrigger>
          <TabTrigger value="tab2">Tab 2</TabTrigger>
        </TabsList>
        <TabContent value="tab1">Content 1</TabContent>
        <TabContent value="tab2">Content 2</TabContent>
      </Tabs>
    );

    const activeTab = screen.getByRole("tab", { name: "Tab 1" });
    expect(activeTab).toHaveAttribute("aria-selected", "true");
  });

  it("sets aria-selected='false' for inactive tabs", () => {
    render(
      <Tabs defaultValue="tab1">
        <TabsList aria-label="Test tabs">
          <TabTrigger value="tab1">Tab 1</TabTrigger>
          <TabTrigger value="tab2">Tab 2</TabTrigger>
        </TabsList>
        <TabContent value="tab1">Content 1</TabContent>
        <TabContent value="tab2">Content 2</TabContent>
      </Tabs>
    );

    const inactiveTab = screen.getByRole("tab", { name: "Tab 2" });
    expect(inactiveTab).toHaveAttribute("aria-selected", "false");
  });

  it("sets data-state='active' for active tab", () => {
    render(
      <Tabs defaultValue="tab1">
        <TabsList aria-label="Test tabs">
          <TabTrigger value="tab1">Tab 1</TabTrigger>
        </TabsList>
        <TabContent value="tab1">Content 1</TabContent>
      </Tabs>
    );

    const tab = screen.getByRole("tab", { name: "Tab 1" });
    expect(tab).toHaveAttribute("data-state", "active");
  });

  it("sets data-state='inactive' for inactive tabs", () => {
    render(
      <Tabs defaultValue="tab1">
        <TabsList aria-label="Test tabs">
          <TabTrigger value="tab1">Tab 1</TabTrigger>
          <TabTrigger value="tab2">Tab 2</TabTrigger>
        </TabsList>
        <TabContent value="tab1">Content 1</TabContent>
        <TabContent value="tab2">Content 2</TabContent>
      </Tabs>
    );

    const tab = screen.getByRole("tab", { name: "Tab 2" });
    expect(tab).toHaveAttribute("data-state", "inactive");
  });

  it("sets tabIndex=0 for active tab", () => {
    render(
      <Tabs defaultValue="tab1">
        <TabsList aria-label="Test tabs">
          <TabTrigger value="tab1">Tab 1</TabTrigger>
        </TabsList>
        <TabContent value="tab1">Content 1</TabContent>
      </Tabs>
    );

    const tab = screen.getByRole("tab", { name: "Tab 1" });
    expect(tab).toHaveAttribute("tabIndex", "0");
  });

  it("sets tabIndex=-1 for inactive tabs", () => {
    render(
      <Tabs defaultValue="tab1">
        <TabsList aria-label="Test tabs">
          <TabTrigger value="tab1">Tab 1</TabTrigger>
          <TabTrigger value="tab2">Tab 2</TabTrigger>
        </TabsList>
        <TabContent value="tab1">Content 1</TabContent>
        <TabContent value="tab2">Content 2</TabContent>
      </Tabs>
    );

    const tab = screen.getByRole("tab", { name: "Tab 2" });
    expect(tab).toHaveAttribute("tabIndex", "-1");
  });

  it("has id matching pattern 'tab-{value}'", () => {
    render(
      <Tabs defaultValue="tab1">
        <TabsList aria-label="Test tabs">
          <TabTrigger value="tab1">Tab 1</TabTrigger>
        </TabsList>
        <TabContent value="tab1">Content 1</TabContent>
      </Tabs>
    );

    const tab = screen.getByRole("tab", { name: "Tab 1" });
    expect(tab).toHaveAttribute("id", "tab-tab1");
  });

  it("has aria-controls pointing to tabpanel", () => {
    render(
      <Tabs defaultValue="tab1">
        <TabsList aria-label="Test tabs">
          <TabTrigger value="tab1">Tab 1</TabTrigger>
        </TabsList>
        <TabContent value="tab1">Content 1</TabContent>
      </Tabs>
    );

    const tab = screen.getByRole("tab", { name: "Tab 1" });
    expect(tab).toHaveAttribute("aria-controls", "tabpanel-tab1");
  });

  it("sets data-value attribute", () => {
    render(
      <Tabs defaultValue="tab1">
        <TabsList aria-label="Test tabs">
          <TabTrigger value="tab1">Tab 1</TabTrigger>
        </TabsList>
        <TabContent value="tab1">Content 1</TabContent>
      </Tabs>
    );

    const tab = screen.getByRole("tab", { name: "Tab 1" });
    expect(tab).toHaveAttribute("data-value", "tab1");
  });

  it("applies type='button'", () => {
    render(
      <Tabs defaultValue="tab1">
        <TabsList aria-label="Test tabs">
          <TabTrigger value="tab1">Tab 1</TabTrigger>
        </TabsList>
        <TabContent value="tab1">Content 1</TabContent>
      </Tabs>
    );

    const tab = screen.getByRole("tab", { name: "Tab 1" });
    expect(tab).toHaveAttribute("type", "button");
  });

  it("respects disabled prop", () => {
    render(
      <Tabs defaultValue="tab1">
        <TabsList aria-label="Test tabs">
          <TabTrigger value="tab1">Tab 1</TabTrigger>
          <TabTrigger value="tab2" disabled>Tab 2</TabTrigger>
        </TabsList>
        <TabContent value="tab1">Content 1</TabContent>
        <TabContent value="tab2">Content 2</TabContent>
      </Tabs>
    );

    const disabledTab = screen.getByRole("tab", { name: "Tab 2" });
    expect(disabledTab).toBeDisabled();
  });

  it("applies default variant classes", () => {
    render(
      <Tabs defaultValue="tab1" variant="default">
        <TabsList aria-label="Test tabs">
          <TabTrigger value="tab1">Tab 1</TabTrigger>
        </TabsList>
        <TabContent value="tab1">Content 1</TabContent>
      </Tabs>
    );

    const tab = screen.getByRole("tab", { name: "Tab 1" });
    expect(tab.className).toContain("border-b-2");
    expect(tab.className).toContain("rounded-t-md");
  });

  it("applies pills variant classes", () => {
    render(
      <Tabs defaultValue="tab1" variant="pills">
        <TabsList aria-label="Test tabs">
          <TabTrigger value="tab1">Tab 1</TabTrigger>
        </TabsList>
        <TabContent value="tab1">Content 1</TabContent>
      </Tabs>
    );

    const tab = screen.getByRole("tab", { name: "Tab 1" });
    expect(tab.className).toContain("rounded-md");
  });

  it("applies underline variant classes", () => {
    render(
      <Tabs defaultValue="tab1" variant="underline">
        <TabsList aria-label="Test tabs">
          <TabTrigger value="tab1">Tab 1</TabTrigger>
        </TabsList>
        <TabContent value="tab1">Content 1</TabContent>
      </Tabs>
    );

    const tab = screen.getByRole("tab", { name: "Tab 1" });
    expect(tab.className).toContain("border-b-2");
    expect(tab.className).toContain("border-transparent");
  });

  it("supports className override", () => {
    render(
      <Tabs defaultValue="tab1">
        <TabsList aria-label="Test tabs">
          <TabTrigger value="tab1" className="custom-trigger">Tab 1</TabTrigger>
        </TabsList>
        <TabContent value="tab1">Content 1</TabContent>
      </Tabs>
    );

    const tab = screen.getByRole("tab", { name: "Tab 1" });
    expect(tab.className).toContain("custom-trigger");
  });
});

describe("TabTrigger - Keyboard Navigation", () => {
  it("navigates to next tab with ArrowRight in horizontal mode", () => {
    renderBasicTabs();

    const tab1 = screen.getByRole("tab", { name: "Tab 1" });
    const tab2 = screen.getByRole("tab", { name: "Tab 2" });

    tab1.focus();
    fireEvent.keyDown(tab1, { key: "ArrowRight" });

    expect(tab2).toHaveFocus();
    expect(screen.getByText("Content 2")).toBeInTheDocument();
  });

  it("navigates to previous tab with ArrowLeft in horizontal mode", () => {
    renderBasicTabs();

    const tab2 = screen.getByRole("tab", { name: "Tab 2" });
    fireEvent.click(tab2);
    tab2.focus();

    fireEvent.keyDown(tab2, { key: "ArrowLeft" });

    const tab1 = screen.getByRole("tab", { name: "Tab 1" });
    expect(tab1).toHaveFocus();
    expect(screen.getByText("Content 1")).toBeInTheDocument();
  });

  it("wraps to last tab when ArrowLeft on first tab", () => {
    renderBasicTabs();

    const tab1 = screen.getByRole("tab", { name: "Tab 1" });
    const tab3 = screen.getByRole("tab", { name: "Tab 3" });

    tab1.focus();
    fireEvent.keyDown(tab1, { key: "ArrowLeft" });

    expect(tab3).toHaveFocus();
  });

  it("wraps to first tab when ArrowRight on last tab", () => {
    renderBasicTabs();

    const tab3 = screen.getByRole("tab", { name: "Tab 3" });
    const tab1 = screen.getByRole("tab", { name: "Tab 1" });

    fireEvent.click(tab3);
    tab3.focus();
    fireEvent.keyDown(tab3, { key: "ArrowRight" });

    expect(tab1).toHaveFocus();
  });

  it("navigates with ArrowDown in vertical mode", () => {
    render(
      <Tabs defaultValue="tab1" orientation="vertical">
        <TabsList aria-label="Vertical tabs">
          <TabTrigger value="tab1">Tab 1</TabTrigger>
          <TabTrigger value="tab2">Tab 2</TabTrigger>
        </TabsList>
        <TabContent value="tab1">Content 1</TabContent>
        <TabContent value="tab2">Content 2</TabContent>
      </Tabs>
    );

    const tab1 = screen.getByRole("tab", { name: "Tab 1" });
    const tab2 = screen.getByRole("tab", { name: "Tab 2" });

    tab1.focus();
    fireEvent.keyDown(tab1, { key: "ArrowDown" });

    expect(tab2).toHaveFocus();
  });

  it("navigates with ArrowUp in vertical mode", () => {
    render(
      <Tabs defaultValue="tab2" orientation="vertical">
        <TabsList aria-label="Vertical tabs">
          <TabTrigger value="tab1">Tab 1</TabTrigger>
          <TabTrigger value="tab2">Tab 2</TabTrigger>
        </TabsList>
        <TabContent value="tab1">Content 1</TabContent>
        <TabContent value="tab2">Content 2</TabContent>
      </Tabs>
    );

    const tab1 = screen.getByRole("tab", { name: "Tab 1" });
    const tab2 = screen.getByRole("tab", { name: "Tab 2" });

    tab2.focus();
    fireEvent.keyDown(tab2, { key: "ArrowUp" });

    expect(tab1).toHaveFocus();
  });

  it("navigates to first tab with Home key", () => {
    renderBasicTabs();

    const tab3 = screen.getByRole("tab", { name: "Tab 3" });
    const tab1 = screen.getByRole("tab", { name: "Tab 1" });

    fireEvent.click(tab3);
    tab3.focus();
    fireEvent.keyDown(tab3, { key: "Home" });

    expect(tab1).toHaveFocus();
  });

  it("navigates to last tab with End key", () => {
    renderBasicTabs();

    const tab1 = screen.getByRole("tab", { name: "Tab 1" });
    const tab3 = screen.getByRole("tab", { name: "Tab 3" });

    tab1.focus();
    fireEvent.keyDown(tab1, { key: "End" });

    expect(tab3).toHaveFocus();
  });

  it("skips disabled tabs during navigation", () => {
    render(
      <Tabs defaultValue="tab1">
        <TabsList aria-label="Test tabs">
          <TabTrigger value="tab1">Tab 1</TabTrigger>
          <TabTrigger value="tab2" disabled>Tab 2</TabTrigger>
          <TabTrigger value="tab3">Tab 3</TabTrigger>
        </TabsList>
        <TabContent value="tab1">Content 1</TabContent>
        <TabContent value="tab2">Content 2</TabContent>
        <TabContent value="tab3">Content 3</TabContent>
      </Tabs>
    );

    const tab1 = screen.getByRole("tab", { name: "Tab 1" });
    const tab3 = screen.getByRole("tab", { name: "Tab 3" });

    tab1.focus();
    fireEvent.keyDown(tab1, { key: "ArrowRight" });

    expect(tab3).toHaveFocus();
  });
});

describe("TabContent", () => {
  it("renders with role='tabpanel'", () => {
    render(
      <Tabs defaultValue="tab1">
        <TabsList aria-label="Test tabs">
          <TabTrigger value="tab1">Tab 1</TabTrigger>
        </TabsList>
        <TabContent value="tab1">Content 1</TabContent>
      </Tabs>
    );

    const tabpanel = screen.getByRole("tabpanel");
    expect(tabpanel).toBeInTheDocument();
  });

  it("has id matching pattern 'tabpanel-{value}'", () => {
    render(
      <Tabs defaultValue="tab1">
        <TabsList aria-label="Test tabs">
          <TabTrigger value="tab1">Tab 1</TabTrigger>
        </TabsList>
        <TabContent value="tab1">Content 1</TabContent>
      </Tabs>
    );

    const tabpanel = screen.getByRole("tabpanel");
    expect(tabpanel).toHaveAttribute("id", "tabpanel-tab1");
  });

  it("has aria-labelledby pointing to tab trigger", () => {
    render(
      <Tabs defaultValue="tab1">
        <TabsList aria-label="Test tabs">
          <TabTrigger value="tab1">Tab 1</TabTrigger>
        </TabsList>
        <TabContent value="tab1">Content 1</TabContent>
      </Tabs>
    );

    const tabpanel = screen.getByRole("tabpanel");
    expect(tabpanel).toHaveAttribute("aria-labelledby", "tab-tab1");
  });

  it("sets tabIndex=0", () => {
    render(
      <Tabs defaultValue="tab1">
        <TabsList aria-label="Test tabs">
          <TabTrigger value="tab1">Tab 1</TabTrigger>
        </TabsList>
        <TabContent value="tab1">Content 1</TabContent>
      </Tabs>
    );

    const tabpanel = screen.getByRole("tabpanel");
    expect(tabpanel).toHaveAttribute("tabIndex", "0");
  });

  it("only renders active tab content", () => {
    renderBasicTabs();

    expect(screen.getByText("Content 1")).toBeInTheDocument();
    expect(screen.queryByText("Content 2")).not.toBeInTheDocument();
    expect(screen.queryByText("Content 3")).not.toBeInTheDocument();
  });

  it("applies default orientation classes", () => {
    render(
      <Tabs defaultValue="tab1" orientation="horizontal">
        <TabsList aria-label="Test tabs">
          <TabTrigger value="tab1">Tab 1</TabTrigger>
        </TabsList>
        <TabContent value="tab1">Content 1</TabContent>
      </Tabs>
    );

    const tabpanel = screen.getByRole("tabpanel");
    expect(tabpanel.className).toContain("mt-4");
  });

  it("applies vertical orientation classes", () => {
    render(
      <Tabs defaultValue="tab1" orientation="vertical">
        <TabsList aria-label="Test tabs">
          <TabTrigger value="tab1">Tab 1</TabTrigger>
        </TabsList>
        <TabContent value="tab1">Content 1</TabContent>
      </Tabs>
    );

    const tabpanel = screen.getByRole("tabpanel");
    expect(tabpanel.className).toContain("ml-4");
  });

  it("supports className override", () => {
    render(
      <Tabs defaultValue="tab1">
        <TabsList aria-label="Test tabs">
          <TabTrigger value="tab1">Tab 1</TabTrigger>
        </TabsList>
        <TabContent value="tab1" className="custom-content">Content 1</TabContent>
      </Tabs>
    );

    const tabpanel = screen.getByRole("tabpanel");
    expect(tabpanel.className).toContain("custom-content");
  });
});

describe("Tabs - Composition and Variants", () => {
  it("renders complete tabs with all variants", () => {
    const variants: Array<'default' | 'pills' | 'underline'> = ['default', 'pills', 'underline'];

    variants.forEach((variant) => {
      const { unmount } = render(
        <Tabs defaultValue="tab1" variant={variant}>
          <TabsList aria-label={`${variant} tabs`}>
            <TabTrigger value="tab1">Tab 1</TabTrigger>
            <TabTrigger value="tab2">Tab 2</TabTrigger>
          </TabsList>
          <TabContent value="tab1">Content 1</TabContent>
          <TabContent value="tab2">Content 2</TabContent>
        </Tabs>
      );

      expect(screen.getByRole("tablist")).toBeInTheDocument();
      expect(screen.getAllByRole("tab")).toHaveLength(2);
      expect(screen.getByRole("tabpanel")).toBeInTheDocument();

      unmount();
    });
  });
});
