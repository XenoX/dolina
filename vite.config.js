import { defineConfig } from "vite";

export default defineConfig({
  root: ".",
  build: {
    outDir: "/dist",
    rollupOptions: {
      input: {
        main: "src",
      },
    },
  },
  define: {
    global: "window",
  },
});
