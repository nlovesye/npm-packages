import peerDepsExternal from "rollup-plugin-peer-deps-external";
import commonjs from "@rollup/plugin-commonjs";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import { terser } from "rollup-plugin-terser";
import { typescriptPaths } from "rollup-plugin-typescript-paths";
import pkg from "./package.json";

const plugins = [
  peerDepsExternal(),
  typescriptPaths({ preserveExtensions: true }),
  nodeResolve({
    preferBuiltins: true,
    browser: true,
  }),
  commonjs(),
  terser({
    output: {
      beautify: false,
    },
  }),
];

const moduleBuildConfig = {
  input: "src/index.ts",
  output: [
    {
      file: pkg.main,
      format: "cjs",
    },
    {
      file: pkg.module,
      format: "esm",
    },
  ],
  plugins,
};

export default moduleBuildConfig;
