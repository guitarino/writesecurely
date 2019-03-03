const fs = require('fs');
const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const babelrc = JSON.parse(fs.readFileSync(path.resolve(__dirname, '.babelrc')));

module.exports = {
    entry: {
        'main': path.resolve(__dirname, 'client-src', 'main.ts'),
        // 'crypto-worker': path.join(__dirname, 'src', 'crypto-worker', 'crypto-worker.js')
    },
    mode: 'development',
    output: {
        publicPath: './src/',
        path: path.resolve(__dirname, 'client-build', 'src'),
        filename: '[name].js',
        chunkFilename: '[id].js',
    },
    resolve: {
        modules: [
            path.resolve(__dirname, 'client-src', 'node_modules')
        ],
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.json']
    },
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.(js|jsx|ts|tsx)$/,
                exclude: /(node_modules|bower_components)/,
                use: [{
                    loader: 'babel-loader',
                    options: babelrc
                }]
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
            path.resolve(__dirname, 'client-build')
        ]),
        new CopyWebpackPlugin([{
            from:
                path.resolve(__dirname, 'static'),
            to:
                path.resolve(__dirname, 'client-build')
        }]),
        new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: '[id].css'
        })
    ]
};