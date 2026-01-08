import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      app: path.resolve(__dirname, "./src/app"),
      components: path.resolve(__dirname, "./src/components"),
      context: path.resolve(__dirname, "./src/context"),
      hooks: path.resolve(__dirname, "./src/hooks"),
      utils: path.resolve(__dirname, "./src/utils"),
      src: path.resolve(__dirname, "./src"),
    },
  },
});
