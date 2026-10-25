const { transformSync } = require('esbuild');

module.exports = {
    process(source, filename) {
        return transformSync(source, {
            loader: 'ts', format: 'cjs', target: 'node26',
            sourcefile: filename, sourcemap: 'inline',
        });
    },
};
