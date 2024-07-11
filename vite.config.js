import { defineConfig } from "vite";
import { resolve } from "path";
import preload from "vite-plugin-preload";

export default {
  root: "",
  plugins: [
    preload({
      match: "src/assets/images/down-arrow-img.png",
    }),
  ],
  build: {
    rollupOptions: {
      input: {
        ico: resolve(__dirname, "src/pages/ico/ico.html"),
        footer: resolve(__dirname, "src/components/footer/footer.html"),
        navbar: resolve(__dirname, "src/components/navbar/navbar.html"),
      },
      output: {
        dir: resolve(__dirname, "dist"),
      },
    },
  },
};
