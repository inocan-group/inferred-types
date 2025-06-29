import { defineConfig } from "tsdown";


export default defineConfig([
    {
        entry: ["src/index.ts"],
        format: ["esm","cjs"],
        dts: true,
        sourcemap: true,
        tsconfig: "./tsconfig.tsdown.json",
    }

]);

