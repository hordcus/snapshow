import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// base "./" makes every asset path relative, so the build works at any
// GitHub Pages subpath (username.github.io/<repo>/) without per-repo config.
export default defineConfig({
  base: "./",
  plugins: [react()],
});
