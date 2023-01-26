/// <reference types="vitest" />
import { defineConfig } from "vite";
import { resolve } from "pathe";

// used for testing, library code uses TSUP to build exports
export default defineConfig({
  resolve: {
    alias: {
      src: resolve(__dirname, "./src/"),
      types: resolve(__dirname, "./src/types/"),
      runtime: resolve(__dirname, "./src/runtime/"),
      tests: resolve(__dirname, "./tests/"),
    },
  },
  test: {
    dir: "tests",
  },
  plugins: [],
});
