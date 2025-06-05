import { defineConfig } from "tsdown";

export default defineConfig({
    entry: ["src/globals/globals.ts"],
    dts: true,
    tsconfig: "./tsconfig.tsdown.json"
});
