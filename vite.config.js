import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/holi-ujala/",
  build: {
    chunkSizeWarningLimit: 5000, // base64 images are large
  },
});
