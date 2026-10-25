import { build } from 'esbuild';

await Promise.all(['esm', 'cjs'].map(format => build({
    entryPoints: ['src/index.ts'], bundle: true,
    outfile: format === 'esm' ? 'dist/jsQR.js' : 'dist/jsQR.cjs',
    format, target: 'es2015', sourcemap: true,
    footer: format === 'cjs' ? { js: 'module.exports = module.exports.default;' } : undefined,
})));
