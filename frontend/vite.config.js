import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 3000,
  },
  base: "./", // Ensures correct base path
  build: {
    outDir: "dist", // Vercel expects the output in "dist"
  },
});
