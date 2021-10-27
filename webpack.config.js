const path = require('path');

let mode = 'development';
let target = 'web';
let outputFileJs = '[name].bundle.js';
let outputFileCss = '[name].css';

if (process.env.NODE_ENV === 'production') {
    mode = 'production';
    target = 'browserslist';
    outputFileJs = '[name].[contenthash].bundle.js';
    outputFileCss = '[name].[contenthash].css';
}

// plugins
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require("terser-webpack-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = {
    mode,
    entry: './src/index.js',
    output: {
        filename: outputFileJs,
        path: path.resolve(__dirname, 'dist'),
        assetModuleFilename: 'asset/[hash][ext][query]'
    },
    module: {
        rules: [
            {
                test: /\.html$/,
                use: 'html-loader',
            }, {
                test: /\.s?css$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader',
                    'sass-loader'
                ],
            }, {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                }
            }, {
                test: /\.(png|jpe?g|gif|svg)$/i,
                type: 'asset',
            },
        ],
    },
    optimization: {
        minimizer: [
            new OptimizeCssAssetsPlugin(),
            new TerserPlugin()
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/index.html"
        }),
        new MiniCssExtractPlugin({ filename: outputFileCss }),
        new CleanWebpackPlugin()
    ],
    devtool: false
};