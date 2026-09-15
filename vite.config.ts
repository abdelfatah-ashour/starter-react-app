import path from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import stylex from "@stylexjs/unplugin";

const rootDir = path.dirname(fileURLToPath(import.meta.url));
const srcDir = path.join(rootDir, "src");

export default defineConfig({
  plugins: [
    // StyleX compiles away at build time; it needs to resolve the `@/` alias
    // itself to follow imports of `*.stylex.ts` variable files.
    stylex.vite({
      // The `reset` layer is declared ahead of StyleX's own layers so the
      // element reset in global.css loses to every component style.
      useCSSLayers: { before: ["reset"] },
      // Sorts media queries by width so a wider breakpoint always wins over a
      // narrower one. Without it the order is emission order, and a `lg`
      // override can silently lose to the `sm` rule it is meant to replace.
      enableMediaQueryOrder: true,
      unstable_moduleResolution: { type: "commonJS", rootDir },
      aliases: { "@/*": [path.join(srcDir, "*")] },
    }),
    react(),
  ],
  resolve: {
    alias: { "@": srcDir },
  },
  server: { port: 5173, strictPort: true },
});
