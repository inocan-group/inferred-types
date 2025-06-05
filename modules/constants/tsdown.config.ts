import type { Format } from "tsup";
import { defineConfig } from "tsdown";

function config(format: Format) {
    return defineConfig({
        entry: ["src/index.ts"],
        format,
        dts: format === "cjs" ? true : false,
        sourcemap: true,
        clean: false,
        // outExtension: () => {
        //     return {
        //         js: format === "cjs" ? ".cjs" : ".js",
        //         dts: ".ts",
        //     };
        // },
        tsconfig: "./tsconfig.tsdown.json",
    });
}

export default [config("cjs"), config("esm")];
