import { defineConfig } from "tsup";

export default defineConfig({
    entry: ["src/globals/globals.ts"],
    dts: {
        entry: ["src/globals/globals.ts"],
        only: true
    },
    tsconfig: "./tsconfig.tsup.json"
});
