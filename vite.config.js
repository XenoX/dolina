import { defineConfig } from "vite";

export default defineConfig({
  root: ".",
  build: {
    outDir: "dist",
    rollupOptions: {
      input: {
        main: "src/main.js",
      },
    },
  },
  define: {
    global: "window",
  },
});
