module.exports.getDirArgs = function getDirArgs() {
    const rootDirArgId = process.argv.indexOf('--root-dir') + 1;
    const outDirArgId = process.argv.indexOf('--out-dir') + 1;
    
    if (!rootDirArgId || !outDirArgId) {
        throw new Error('Please provide --root-dir and --out-dir arguments');
    }

    return {
        rootDir: process.argv[rootDirArgId],
        outDir: process.argv[outDirArgId]
    }
}