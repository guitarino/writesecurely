const { transpileConvertPath } = require('./transpileConvertPath');

require(
    transpileConvertPath(
        process.env['SOURCE_TEST_FILE']
    )
    .transpiledPath
);