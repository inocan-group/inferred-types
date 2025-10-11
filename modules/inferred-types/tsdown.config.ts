import { defineConfig } from "tsdown";


export default defineConfig({
    entry: ["src/index.ts"],
    format: ["esm", "cjs"],
    dts: true,
    sourcemap: true,
    clean: false,

    tsconfig: "./tsconfig.tsdown.json",

    // Don't mark workspace dependencies as external - bundle them
    external: [],

    // Ensure workspace dependencies are bundled, not left as imports
    noExternal: [
        "@inferred-types/constants",
        "@inferred-types/runtime",
        "@inferred-types/types"
    ]
});


