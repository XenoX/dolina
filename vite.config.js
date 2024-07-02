import { defineConfig } from "vite";

export default defineConfig({
  root: ".",
  build: {
    outDir: "../dist",
    assetsDir: "../assets",
    rollupOptions: {
      input: {
        main: "Pages/ICO/ICO.html",
      },
    },
  },
});
