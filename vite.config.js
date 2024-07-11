import { defineConfig } from "vite";
import { resolve } from "path";

export default {
  root: "",
  build: {
    rollupOptions: {
      input: {
        index: resolve(__dirname, "/index.html"),
        ico: resolve(__dirname, "src/pages/ico/index.html"),
        footer: resolve(__dirname, "src/components/footer/footer.html"),
        navbar: resolve(__dirname, "src/components/navbar/navbar.html"),
      },
      output: {
        dir: resolve(__dirname, "dist"),
      },
    },
  },
};
