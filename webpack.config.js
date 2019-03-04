const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const projectRoot = path.join(__dirname);

module.exports = {
    entry: {
        'main': path.resolve(projectRoot, 'client-transpiled', 'main.js'),
        // 'crypto-worker': path.join(projectRoot, 'src', 'crypto-worker', 'crypto-worker.js')
    },
    mode: 'development',
    output: {
        publicPath: './src/',
        path: path.resolve(projectRoot, 'client-build', 'src'),
        filename: '[name].js',
        chunkFilename: '[id].js',
    },
    resolve: {
        modules: [
            path.resolve(projectRoot, 'client-src', 'node_modules')
        ],
        extensions: ['.js', '.jsx', '.json']
    },
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.(jsx|js)$/,
                use: ["source-map-loader"],
                enforce: "pre"
            },
            {
                test: /\.(sc|sa|c)ss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader'
                ]
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin([
            path.resolve(projectRoot, 'client-build')
        ]),
        new CopyWebpackPlugin([{
            from:
                path.resolve(projectRoot, 'static'),
            to:
                path.resolve(projectRoot, 'client-build')
        }]),
        new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: '[id].css'
        })
    ]
};