import { fileURLToPath, URL } from "url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  server: {
    host: true,
    proxy: {
      "/v1": {
        target: "http://127.0.0.1:8088/", //backend URL
        // target: "http://192.168.0.12:9002/",
        // target: "http://10.17.0.220:9002/",
        
        changeOrigin: true,
      },
    },
    cors: true,
  },
});
