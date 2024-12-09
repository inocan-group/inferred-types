import { defineConfig } from "tsup"

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["esm", "cjs"],
  dts: {entry: ["src/index.ts"]},
  splitting: false,
  sourcemap: true,
  clean: false,
  treeshake: true,
  outDir: "dist",
  outExtension: ({ format }) => ({
    js: format === "cjs" ? ".cjs" : ".js",
    dts: format === "cjs" ? ".cts" : ".ts"
}),
  tsconfig: "./tsconfig.tsup.json"
})
