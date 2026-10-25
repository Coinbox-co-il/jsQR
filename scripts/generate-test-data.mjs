import { build } from 'esbuild';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';

const output = new URL('../node_modules/.cache/generate-test-data.cjs', import.meta.url);
await build({ entryPoints: ['tests/generate-test-data.ts'], bundle: true, platform: 'node',
    format: 'cjs', outfile: fileURLToPath(output) });
createRequire(import.meta.url)(fileURLToPath(output));
