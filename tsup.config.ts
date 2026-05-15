import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts", "src/react.tsx"],
  format: ["esm", "cjs"],
  dts: true,
  splitting: false,
  sourcemap: true,
  clean: true,
  treeshake: true,
  minify: false,
  target: "es2020",
  external: ["react", "three"],
  outDir: "dist",
  // Match package.json's exports map:
  //   ESM -> dist/<name>.js   (matches "import")
  //   CJS -> dist/<name>.cjs  (matches "require" / "main")
  outExtension({ format }) {
    return { js: format === "cjs" ? ".cjs" : ".js" };
  },
});
