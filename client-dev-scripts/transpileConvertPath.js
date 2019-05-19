const replaceExt = require('replace-ext');
const path = require('path');
const { options } = require('./transpileOptions');

module.exports.transpileConvertPath = function transpileConvertPath(fullPath) {
    const relativePath = path.relative(options.root, fullPath);
    const outFullPath = path.join(options.outDir, relativePath);
    const sourceRoot = path.dirname(fullPath);
    const sourceBaseName = path.basename(fullPath);
    const transpiledPath = replaceExt(outFullPath, '.js');
    const transpiledFolder = path.dirname(transpiledPath);
    const transpiledPathRelativeToProject = path.relative(options.projectRoot, transpiledPath);
    return {
        sourceRoot,
        sourceBaseName,
        transpiledFolder,
        transpiledPath,
        transpiledPathRelativeToProject
    }
}

module.exports.isFileExtensionSatisfied = function isFileExtensionSatisfied(fullPath) {
    return options.extensions.indexOf(path.extname(fullPath)) >= 0;
}