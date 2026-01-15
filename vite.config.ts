
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "node:path";
import svgr from "vite-plugin-svgr";
 
export default defineConfig({
  publicDir: false,
  plugins: [react(), svgr()],
  resolve: { alias: { "@": resolve(__dirname, "src") } },
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "AtomUI",
      formats: ["es", "cjs"],
      fileName: (format) => (format === "es" ? "index.js" : "index.cjs"),
    },
    cssCodeSplit: false, // ✅ force single CSS output
    rollupOptions: {
      external: ["react", "react-dom"],
      output: {
        globals: { react: "React", "react-dom": "ReactDOM" },
        assetFileNames: (assetInfo) => {
          if (assetInfo.name?.endsWith(".css")) return "atom.css";
          return assetInfo.name ?? "[name][extname]";
        },
      },
    },
    sourcemap: true,
    emptyOutDir: false
  },
});
 
 