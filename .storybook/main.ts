// .storybook/main.ts
import type { StorybookConfig } from "@storybook/react-vite";
import path from "path";

const config: StorybookConfig = {
  framework: "@storybook/react-vite",
  stories: ["../src/**/*.stories.@(tsx|mdx)"],
  addons: [
    "@storybook/addon-a11y",
  ],
  viteFinal: async (viteConfig) => {
    return {
      ...viteConfig,
      plugins: [
        ...(viteConfig.plugins || []),
      ],
      css: {
        ...viteConfig.css,
        // 👇 make Storybook use the SAME PostCSS config as your app
        postcss: path.resolve(__dirname, "../postcss.config.cjs"),
      },
      resolve: {
        ...viteConfig.resolve,
        alias: {
          ...(viteConfig.resolve?.alias ?? {}),
          "@": path.resolve(__dirname, "../src"),
        },
      },
    };
  },
};

export default config;
