import commonjs from "@rollup/plugin-commonjs";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import { terser } from "rollup-plugin-terser";
import { typescriptPaths } from "rollup-plugin-typescript-paths";
import { babel } from "@rollup/plugin-babel";
import esbuild from "rollup-plugin-esbuild";
import dts from "rollup-plugin-dts";

const moduleBuildConfig = {
  input: "src/index.ts",
  output: [
    {
      file: "dist/index.cjs.js",
      format: "cjs",
    },
    {
      file: "dist/index.esm.js",
      format: "esm",
    },
  ],
  plugins: [
    typescriptPaths({ preserveExtensions: true }),
    nodeResolve({
      preferBuiltins: true,
      browser: true,
    }),
    commonjs(),
    esbuild({
      include: /\.ts$/,
      exclude: /node_modules/,
      tsconfig: "tsconfig.json", // default
    }),
    babel({
      extensions: [".ts"],
      include: ["src"], // 只编译我们的源代码
      // babelHelpers: "runtime",
      // plugins: [["@babel/plugin-transform-runtime", { useESModules: true }]],
    }),
    terser({
      output: {
        beautify: false,
      },
    }),
  ],
};

const dtsBuildConfig = {
  input: "src/index.ts",
  output: [
    {
      file: "dist/index.d.ts",
      format: "es",
    },
  ],
  plugins: [typescriptPaths({ preserveExtensions: true }), dts()],
};

export default [moduleBuildConfig, dtsBuildConfig];
