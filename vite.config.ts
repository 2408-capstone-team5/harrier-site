import path from "path";
import react from "@vitejs/plugin-react";

import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  base: "/2408-capstone-team5.github.io/",
  build: {
    outDir: "dist",
    sourcemap: false,
    minify: "terser",
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  assetsInclude: ["**/*.md", "**/*.png", "**/*.svg"],
});
