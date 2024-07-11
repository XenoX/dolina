import { defineConfig } from "vite";
import { resolve } from "path";

export default {
  root: "",
  build: {
    rollupOptions: {
      input: {
        ico: resolve(__dirname, "src/Pages/ICO/index.html"),
      },
      output: {
        dir: resolve(__dirname, "dist"),
      },
    },
  },
};
