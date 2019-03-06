const path = require('path');
const fs = require('fs');
const projectRoot = path.join(__dirname, '../');
const babelrc = JSON.parse(fs.readFileSync(path.join(projectRoot, '.babelrc')));
const { getDirArgs } = require('./transpileGetArgs');

const { rootDir, outDir } = getDirArgs();

const options = {
    projectRoot,
    root: path.join(projectRoot, rootDir),
    outDir: path.join(projectRoot, outDir),
    extensions: [".ts", ".tsx", ".js", ".jsx"],
    babelrc
};

module.exports.options = options;