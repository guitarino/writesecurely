const path = require('path');
const fs = require('fs');
const mkdirp = require('mkdirp');
const babel = require('@babel/core');
const { transpileConvertPath } = require('./transpileConvertPath');
const { logError } = require('./transpileLogError');
const { options } = require('./transpileOptions');

module.exports.transpileFile = function transpileFile(fullPath) {
    const {
        transpiledFolder,
        transpiledPath,
        transpiledMapPath,
        transpiledMapPathBaseName,
        sourceMapData
    } = transpileConvertPath(fullPath);
    const babelrc = process.argv.indexOf('--source-map') > 0 ?
        {
            ...options.babelrc,
            sourceMaps: true,
            sourceFileName: transpiledMapPathBaseName
        } :
        options.babelrc
    ;
    babel.transformFile(fullPath, babelrc, (err, result) => {
        if (err) {
            logError(err)
        } else {
            const { code, map } = result;
            mkdirp(transpiledFolder, (err) => {
                if (err) {
                    logError(err)
                } else {
                    if (map) {
                        fs.writeFile(transpiledMapPath, JSON.stringify({
                            ...map,
                            ...sourceMapData
                        }), (err) => {
                            if (err) {
                                logError(err)
                            }
                            console.log(`[${+new Date()}] Saved source map ${transpiledMapPath}`);
                        });
                    }
                    fs.writeFile(transpiledPath, `${code}\n//# sourceMappingURL=${transpiledMapPathBaseName}`, (err) => {
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