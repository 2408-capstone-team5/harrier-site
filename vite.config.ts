import path from "path";
import react from "@vitejs/plugin-react";
// const mdPlugin,
//   // eslint-disable-next-line @typescript-eslint/no-require-imports
//   { Mode } = require("vite-plugin-markdown");
// import { Mode, plugin as mdPlugin } from "vite-plugin-markdown";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [
    react(),
    // mdPlugin({
    //   mode: [Mode.TOC, Mode.HTML, Mode.MARKDOWN, Mode.REACT],
    // }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  assetsInclude: ["**/*.md", "**/*.png", "**/*.svg"],
});
