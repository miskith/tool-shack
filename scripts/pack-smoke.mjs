import { execFileSync } from 'node:child_process';
import { mkdtempSync, readdirSync, rmSync, writeFileSync, existsSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const tscBin = join(root, 'node_modules', 'typescript', 'bin', 'tsc');

const run = (command, args, cwd) =>
  execFileSync(command, args, { cwd, encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] });

const packDir = mkdtempSync(join(tmpdir(), 'tool-shack-pack-'));
const consumerDir = mkdtempSync(join(tmpdir(), 'tool-shack-consumer-'));

try {
  if (!existsSync(join(root, 'dist', 'esm', 'index.js'))) {
    run('pnpm', ['build'], root);
  }

  run('pnpm', ['pack', '--pack-destination', packDir], root);
  const tarballName = readdirSync(packDir).find((name) => name.endsWith('.tgz'));
  if (!tarballName) {
    throw new Error('pnpm pack did not produce a tarball');
  }
  const tarball = join(packDir, tarballName);

  writeFileSync(
    join(consumerDir, 'package.json'),
    `${JSON.stringify({ name: 'tool-shack-pack-consumer', private: true, type: 'module' }, null, 2)}\n`,
  );
  run('npm', ['install', '--ignore-scripts', tarball], consumerDir);

  writeFileSync(
    join(consumerDir, 'esm-import.mjs'),
    `import { clamp, escapeHTML } from 'tool-shack';

if (escapeHTML('<') !== '&lt;') {
  throw new Error('ESM escapeHTML returned ' + JSON.stringify(escapeHTML('<')));
}
if (clamp(5, 0, 3) !== 3) {
  throw new Error('ESM clamp returned ' + String(clamp(5, 0, 3)));
}
`,
  );
  run('node', ['esm-import.mjs'], consumerDir);

  writeFileSync(
    join(consumerDir, 'cjs-require.cjs'),
    `const { clamp, escapeHTML } = require('tool-shack');

if (escapeHTML('<') !== '&lt;') {
  throw new Error('CJS escapeHTML returned ' + JSON.stringify(escapeHTML('<')));
}
if (clamp(5, 0, 3) !== 3) {
  throw new Error('CJS clamp returned ' + String(clamp(5, 0, 3)));
}
`,
  );
  run('node', ['cjs-require.cjs'], consumerDir);

  if (!existsSync(tscBin)) {
    throw new Error('TypeScript binary not found; cannot check packed type resolution');
  }
  writeFileSync(
    join(consumerDir, 'check-types.ts'),
    `import { clamp, escapeHTML } from 'tool-shack';

const clamped: number = clamp(1, 0, 2);
const escaped: string = escapeHTML('<');
void clamped;
void escaped;
`,
  );
  writeFileSync(
    join(consumerDir, 'tsconfig.json'),
    `${JSON.stringify(
      {
        compilerOptions: {
          strict: true,
          module: 'NodeNext',
          moduleResolution: 'NodeNext',
          noEmit: true,
          types: [],
        },
        files: ['check-types.ts'],
      },
      null,
      2,
    )}\n`,
  );
  run(tscBin, ['-p', 'tsconfig.json'], consumerDir);
} finally {
  rmSync(packDir, { recursive: true, force: true });
  rmSync(consumerDir, { recursive: true, force: true });
}
