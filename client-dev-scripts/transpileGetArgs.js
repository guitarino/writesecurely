module.exports.getDirArgs = function getDirArgs() {
    let rootDir;
    let outDir;

    const rootDirArgId = process.argv.indexOf('--root-dir') + 1;
    const outDirArgId = process.argv.indexOf('--out-dir') + 1;

    if (rootDirArgId) {
        rootDir = process.argv[rootDirArgId]
    }

    if (outDirArgId) {
        outDir = process.argv[outDirArgId]
    }

    if (process.env['ROOT_DIR']) {
        rootDir = process.env['ROOT_DIR'];
    }

    if (process.env['OUT_DIR']) {
        outDir = process.env['OUT_DIR'];
    }

    if (!rootDir || !outDir) {
        throw new Error('Please provide --root-dir and --out-dir arguments');
    }

    return {
        rootDir,
        outDir
    }
}