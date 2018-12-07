const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    entry: path.join(__dirname, 'src', 'main.js'),
    mode: "development",
    output: {
        publicPath: './src/',
        path: path.join(__dirname, './build/src'),
        filename: 'main.js',
        chunkFilename: '[id].js',
    },
    resolve: {
        extensions: ['.js', '.jsx', '.json'],
        alias: {
            Config: path.resolve(__dirname, "./config/dev.config.json")
        }
    },
    devtool: 'source-map',
    module: {
        rules: [
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