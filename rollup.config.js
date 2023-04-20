import typescript from '@rollup/plugin-typescript';
import commonjs from '@rollup/plugin-commonjs';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import json from '@rollup/plugin-json';
import terser from '@rollup/plugin-terser';

export default {
    input: "src/index.ts",
    output: {
        file: "dist/index.js",
        format: "es",
        banner: "#!/usr/bin/env node",
    },
    plugins: [typescript()],
};
