import { defineConfig } from "vite";

export default defineConfig({
  root: ".",
  build: {
    outDir: "../dist",
    rollupOptions: {
      input: {
        main: "Pages/ICO/ICO.html",
      },
    },
  },
  define: {
    global: "window",
  },
});
