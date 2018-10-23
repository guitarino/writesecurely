const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    entry: path.join(__dirname, 'src', 'main.ts'),
    mode: "development",
    output: {
        publicPath: './src/',
        path: path.join(__dirname, './build/src'),
        filename: 'main.js',
        chunkFilename: '[id].js',
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx', '.json']
    },
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                exclude: /(node_modules|bower_components)/,
                use: [{
                    loader: 'awesome-typescript-loader',
                    options: {
                        useBabel: true,
                        babelOptions: {
                            babelrc: true
                        },
                        babelCore: "@babel/core"
                    }
                }]
            },
            {
                test: /\.m?jsx?$/,
                exclude: /(node_modules|bower_components)/,
                use: [{
                    loader: 'babel-loader',
                    options:  {
                        babelrc: true
                    }
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
            "build"
        ], {
            root: __dirname
        }),
        new CopyWebpackPlugin([{
            from: './static',
            to: '../'
        }]),
        new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: '[id].css'
        })
    ]
};