const path = require('path');
const fs = require('fs');
const projectRoot = path.join(__dirname, '../');
const babelrc = JSON.parse(fs.readFileSync(path.join(projectRoot, '.babelrc')));

const options = {
    projectRoot,
    root: path.join(projectRoot, 'client-src'),
    outDir: path.join(projectRoot, 'client-transpiled'),
    extensions: [".ts", ".tsx", ".js", ".jsx"],
    babelrc
};

module.exports.options = options;