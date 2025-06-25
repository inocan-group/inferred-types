/// <reference types="vitest" />
import { defineConfig } from "vite";
import { join, resolve } from "pathe";
import { fileURLToPath } from "node:url";

const root = resolve(fileURLToPath(new URL(".", import.meta.url)));

// used for testing, library code uses TSUP to build exports
export default defineConfig({
  resolve: {
    alias: {
      "inferred-types/constants": join(root, "/modules/constants/src/index"),
      "inferred-types/types": join(root, "/modules/types/src/index"),
      "inferred-types/runtime": join(root, "/modules/runtime/src/index"),
      "inferred-types": join(root, "/modules/inferred-types/src/index"),
      "runtime/": join(root, "/modules/runtime/src/"),
      "types/": join(root, "/modules/types/src/"),
    },
  },
  test: {
    dir: "tests",
    // typecheck: {
    //   include: ["tests/**/*.{test,spec}.ts"]
    // },
  },
  plugins: [],
});
