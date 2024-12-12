import { defineConfig, type Format } from "tsup";

function config(format: Format) {
  return defineConfig({
    entry: ["src/index.ts"],
    format,
    dts: format === "cjs" ? { entry: ["src/index.ts"] } : false,
    sourcemap: true,
    clean: false,
    outExtension: () => {
      return {
        js: format === "cjs" ? ".cjs" : ".js",
        dts: ".ts",
      };
    },
    tsconfig: "./tsconfig.tsup.json",
  });
}

export default [config("cjs"), config("esm")];
