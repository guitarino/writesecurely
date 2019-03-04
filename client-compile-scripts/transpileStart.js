const path = require('path');
const chokidar = require('chokidar');
const rimraf = require("rimraf");
const {
    transpileConvertPath,
    isFileExtensionSatisfied,
} = require('./transpileConvertPath')
const { transpileFile } = require('./transpileFile');
const { logError } = require('./transpileLogError');
const { options } = require('./transpileOptions');
const ignoreInitial = process.argv.indexOf('--ignore-initial') > 0;

function deleteCorrespondingTranspiledFile(fullPath) {
    const { transpiledPath, transpiledMapPath } = transpileConvertPath(fullPath);
    rimraf(transpiledMapPath, function (err) {
        if (err) {
            logError(err)
        } else {
            console.log(`[${+new Date()}] Deleted ${transpiledMapPath}`);
        }
    });
    rimraf(transpiledPath, function (err) {
        if (err) {
            logError(err)
        } else {
            console.log(`[${+new Date()}] Deleted ${transpiledPath}`);
        }
    });
}

function mountWatcher() {
    const watcher = chokidar.watch(options.root, {
        ignored: [
            path.join(options.root, 'node_modules')
        ],
        ignoreInitial,
        awaitWriteFinish: {
            stabilityThreshold: 300,
            pollInterval: 100
        }
    });
    watcher
        .on('add', fullPath => {
            if (isFileExtensionSatisfied(fullPath)) {
                transpileFile(fullPath);
            }
        })
        .on('change', fullPath => {
            if (isFileExtensionSatisfied(fullPath)) {
                transpileFile(fullPath);
            }
        })
        .on('unlink', fullPath => {
            if (isFileExtensionSatisfied(fullPath)) {
                deleteCorrespondingTranspiledFile(fullPath);
            }
        })
    ;
    if (process.argv.indexOf('--watch') < 0) {
        watcher
            .on('ready', () => {
                watcher.close();
            })
        ;
    }
}

module.exports.transpileStart = function() {
    if (ignoreInitial) {
        mountWatcher();
    }
    else {
        rimraf(options.outDir, function (err) {
            if (err) {
                logError(err)
            } else {
                mountWatcher();
            }
        });
    }
};