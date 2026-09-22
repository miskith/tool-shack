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
      source: {
        entry: {
          index: './src/index.ts',
          'browser/index': './src/browser/index.ts',
          'dateTime/index': './src/dateTime/index.ts',
          'dom/index': './src/dom/index.ts',
          'general/index': './src/general/index.ts',
          'schedule/index': './src/schedule/index.ts',
          'storage/index': './src/storage/index.ts',
          'string/index': './src/string/index.ts',
        },
      },
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
