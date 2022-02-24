import autoprefixer from "autoprefixer";
import commonjs from "@rollup/plugin-commonjs";
import image from "@rollup/plugin-image";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import postcss from "rollup-plugin-postcss";
import resolve from "@rollup/plugin-node-resolve";
import typescript from "rollup-plugin-typescript2";

const packageJson = require("./package.json");

export default {
  input: "src/index.tsx",
  output: [
    {
      file: packageJson.main,
      format: "cjs",
      sourcemap: true,
    },
    {
      file: packageJson.module,
      format: "esm",
      sourcemap: true,
    },
  ],
  plugins: [
    peerDepsExternal(),
    resolve(),
    commonjs(),
    typescript({ useTsconfigDeclarationDir: true }),
    postcss({
      modules: {
        generateScopedName: "[hash:base64:8]",
      },
      autoModules: true,
      plugins: [autoprefixer()],
    }),
    image(),
  ],
};
