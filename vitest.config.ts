/// <reference types="vitest" />
import { defineConfig } from "vite";
import { resolve } from "pathe";
import { fileURLToPath } from "node:url";

// used for testing, library code uses TSUP to build exports
export default defineConfig({
  resolve: {
    alias: {
      "src/": `${resolve(fileURLToPath(new URL(".", import.meta.url)), "src")}/`,
    }
  },
  test: {
    dir: "tests",
  },
  plugins: [],
});
