/// <reference types="vitest" />
import { defineConfig } from "vite";

// used for testing, library code uses TSUP to build exports
export default defineConfig({
  test: {
    dir: "tests",
    api: {
      host: "0.0.0.0",
    },
  },
  plugins: [],
});
