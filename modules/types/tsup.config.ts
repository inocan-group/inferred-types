import type { Format } from "tsup";
import { defineConfig } from "tsup";

function config(format: Format) {
  return defineConfig({
    entry: ["src/index.ts"],
    format,
    dts: format === "cjs" ? { entry: ["src/index.ts"] } : false,
    sourcemap: true,
    clean: false,
    outExtension: ({ format }) => {
      return {
        js: format === "cjs" ? ".cjs" : ".js",
        dts: ".ts",
      };
    },
    tsconfig: "./tsconfig.tsup.json",
  });
}

export default [config("esm"), config("cjs")];
