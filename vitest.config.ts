/// <reference types="vitest" />
import { defineConfig } from "vite";
import { join, resolve } from "pathe";
import { fileURLToPath } from "node:url";

const root = resolve(fileURLToPath(new URL(".", import.meta.url)));

// used for testing, library code uses TSUP to build exports
export default defineConfig({
    resolve: {
        alias: {
            "inferred-types/constants": join(root, "/modules/constants/src/index.ts"),
            "inferred-types/types": join(root, "/modules/types/src/index.ts"),
            "inferred-types/runtime": join(root, "/modules/runtime/src/index.ts"),
            "inferred-types/inferred-types": join(root, "/modules/inferred-types/src/index.ts"),
            "inferred-types/": new URL("./modules/inferred-types/src/", import.meta.url).pathname,
            "runtime/": new URL("./modules/runtime/src/", import.meta.url).pathname,
            "types/": new URL("./modules/types/src/", import.meta.url).pathname,
            "constants/": join(root, "/modules/constants/src/"),
            "transpiled/runtime": join(root, "/modules/runtime/dist/index.js"),
            "transpiled/types": join(root, "/modules/types/dist/index.js"),
            "transpiled/constants": join(root, "/modules/constants/dist/index.js"),
            "transpiled": join(root, "/modules/inferred-types/dist/index.js"),
        },
        conditions: ["import", "module", "node", "default"],
        mainFields: ["module", "main"],
        extensions: [".ts", ".tsx", ".js", ".jsx", ".json"],
        // Prevent circular dependency issues
        dedupe: ["inferred-types"],
    },
    test: {
        dir: "tests",
        globals: true,
        environment: "node",
        pool: "forks",
        deps: {
            interopDefault: true,
            moduleDirectories: ["node_modules", "modules"],
            optimizer: {
                ssr: {
                    // Force include to help with circular dependencies
                    include: ["inferred-types/**"],
                }
            }
        },
        // Clear module cache between test runs
        clearMocks: true,
        benchmark: {
            include: ['**/*.{bench,benchmark}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
            exclude: ['node_modules/**', 'dist/**'],
            reporters: ['default'],
        }
    },
    assetsInclude: [
        "app"
    ],
    plugins: [],
});
