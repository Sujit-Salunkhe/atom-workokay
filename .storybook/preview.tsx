// .storybook/preview.tsx
import type { Preview } from "@storybook/react";
import "../src/styles/tailwind.css"; // 👈 MUST exist & be valid
import "../src/styles/tokens.css"; // 👈 MUST exist & be valid
import "../src/styles/ripple.css"; // 👈 MUST exist & be valid

export const globalTypes = {
  theme: {
    name: "Theme",
    description: "Light/Dark theme",
    defaultValue: "light",
    toolbar: { icon: "circlehollow", items: ["light", "dark"] },
  },
};

const withTheme = (Story, ctx) => {
  const theme = ctx.globals.theme ?? "light";
  return (
    <div className="atom-theme" data-theme={theme} style={{ minHeight: "100vh", padding: 16 }}>
      <Story />
    </div>
  );
};

const preview: Preview = {
  decorators: [withTheme],
  parameters: { layout: "padded", controls: { expanded: true } },
};

export default preview;
