import { defineConfig } from "tsdown";
import { Format } from "tsup";

function config(format: Format) {
    return defineConfig({
        entry: ["src/index.ts"],
        format,
        dts: format === "cjs" ? true : false,
        sourcemap: true,
        clean: false,
        // outExtension: ({ format }) => {
        //     return {
        //         js: format === "cjs" ? ".cjs" : ".js",
        //         dts: ".ts",
        //     };
        // },
        tsconfig: "./tsconfig.tsdown.json",
    });
}

export default [config("esm"), config("cjs")];
