import { defineConfig } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import tsconfigPaths from "vite-tsconfig-paths";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [
    // 1. TanStack Start MUST be first
    tanstackStart({
      spa: { enabled: true },
    }),
    // 2. CSS and JSX transformations come next
    tailwindcss(),
    react(),
    // 3. Path resolution
    tsconfigPaths(),
  ],
  // 4. Local Development Dev Proxies for API streams
  server: {
    port: 5175,
    proxy: {
      "/api-products": {
        target: "https://nisilagro.com",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api-products/, "/products.php"),
      },
      "/api-locations": {
        target: "https://nisilagro.com",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api-locations/, "/locations.php"),
      },
      "/api-order": {
        target: "https://nisilagro.com",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api-order/, "/order.php"),
      },
    },
  },
});
