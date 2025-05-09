import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // any request starting with /login or /register (etc)
      // will be forwarded to your Express server on port 4000
      "/login": {
        target: "http://localhost:4000",
        changeOrigin: true,
      },
      "/whoami": {
        target: "http://localhost:4000",
        changeOrigin: true,
      },
      // and if you want to proxy your stories/votes endpoints too:
      "/users": {
        target: "http://localhost:4000",
        changeOrigin: true,
      },
    },
  },
});
