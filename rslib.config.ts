import { defineConfig } from '@rslib/core';

export default defineConfig({
  lib: [
    {
      format: 'esm',
      bundle: false,
      dts: true,
      output: {
        distPath: {
          root: './dist/esm',
        },
      },
    },
    {
      format: 'cjs',
      output: {
        distPath: {
          root: './dist/cjs',
        },
      },
    },
  ],
  syntax: 'es2022',
  output: {
    sourceMap: {
      js: 'source-map',
    },
  },
});
