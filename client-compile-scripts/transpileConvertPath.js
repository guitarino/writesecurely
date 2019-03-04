const replaceExt = require('replace-ext');
const path = require('path');
const { options } = require('./transpileOptions');

module.exports.transpileConvertPath = function transpileConvertPath(fullPath) {
    const relativePath = path.relative(options.root, fullPath);
    const outFullPath = path.join(options.outDir, relativePath);
    const transpiledPath = replaceExt(outFullPath, '.js');
    const transpiledMapPath = replaceExt(outFullPath, '.js.map');
    const transpiledFolder = path.dirname(transpiledPath);
    const transpiledMapPathBaseName = path.basename(transpiledMapPath);
    const sourceMapData = {
        sources: [path.relative(options.projectRoot, fullPath).replace(/\\/g, '/')],
        file: path.basename(transpiledPath)
    };
    return {
        transpiledFolder,
        transpiledPath,
        transpiledMapPath,
        transpiledMapPathBaseName,
        sourceMapData
    }
}

module.exports.isFileExtensionSatisfied = function isFileExtensionSatisfied(fullPath) {
    return options.extensions.indexOf(path.extname(fullPath)) >= 0;
}