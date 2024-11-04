/// <reference types="vitest" />
import { defineConfig } from "vite";
import { resolve } from "pathe";
import { fileURLToPath } from "node:url";

// used for testing, library code uses TSUP to build exports
export default defineConfig({
  resolve: {
    alias: {
      "app/": `${resolve(fileURLToPath(new URL(".", import.meta.url)), "app")}/`,
    },
  },
  test: {
    dir: "tests",
    typecheck: {
      include: ["tests/**/*.{test,spec}.ts"]
    }
  },
  assetsInclude: [
    "app"
  ],
  plugins: [],
});
