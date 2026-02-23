import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    {
      name: "ping",
      configureServer(server) {
        server.middlewares.use("/api/ping", (_req, res) => {
          res.statusCode = 200;
          res.end();
        });
      },
    },
  ],
});
