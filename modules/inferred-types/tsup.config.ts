import { defineConfig } from "tsup"

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["esm", "cjs"],
  dts: {entry: ["src/index.ts"]},
  splitting: false,
  sourcemap: true,
  clean: false,
  treeshake: true,
  outExtension: ({ format }) => {
    if (format === "esm") {
      return { js: ".js" };
    } else if (format === "cjs") {
      return { js: ".cjs" };
    }
    return { js: ".js" }; // default fallback
  },
  outDir: "dist",
  tsconfig: "./tsconfig.tsup.json",
})
