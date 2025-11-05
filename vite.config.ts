import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { viteStaticCopy } from 'vite-plugin-static-copy';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 3100,
  },
  plugins: [react(), mode === "development" && componentTagger(), viteStaticCopy({
    targets: [
      {
        src: 'src/assets',
        dest: 'dist/assets',
      },
    ],
  })].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
