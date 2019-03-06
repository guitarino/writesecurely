const path = require('path');
const fs = require('fs');
const mkdirp = require('mkdirp');
const babel = require('@babel/core');
const { transpileConvertPath } = require('./transpileConvertPath');
const { logError } = require('./transpileLogError');
const { options } = require('./transpileOptions');

module.exports.transpileFile = function transpileFile(fullPath) {
    const {
        sourceRoot,
        sourceBaseName,
        transpiledFolder,
        transpiledPath,
        transpiledPathRelativeToProject
    } = transpileConvertPath(fullPath);
    const isSourceMapsAdded = process.argv.indexOf('--source-map') > 0;
    const babelrc = isSourceMapsAdded ?
        {
            ...options.babelrc,
            filename: transpiledPath,
            filenameRelative: transpiledPathRelativeToProject,
            sourceMaps: 'inline',
            sourceFileName: sourceBaseName,
            sourceRoot
        } :
        options.babelrc
    ;
    babel.transformFile(fullPath, babelrc, (err, result) => {
        if (err) {
            logError(err)
        } else {
            const { code } = result;
            mkdirp(transpiledFolder, (err) => {
                if (err) {
                    logError(err)
                } else {
                    fs.writeFile(transpiledPath, code, (err) => {
                        if (err) {
                            logError(err)
                        }
                        console.log(`[${+new Date()}] Transpiled ${transpiledPath}`);
                    });
                }
            });
        }
    });
}