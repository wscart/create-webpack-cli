const webpack = require('webpack');
const { merge } = require('webpack-merge')
const chalk = require("chalk");
const paths = require("./paths");  // 路径
const HtmlWebpackPlugin = require("html-webpack-plugin"); // 自动生成html
const ProgressBarPlugin = require("progress-bar-webpack-plugin"); // 打包进度条美化
const CompressionPlugin = require('compression-webpack-plugin'); // 提供带 Content-Encoding 编码的压缩版的资源
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin'); // 优化和压缩CSS资源的插件
const TerserPlugin = require('terser-webpack-plugin'); // 优化和压缩JS资源的插件，以前叫ugly-wepack-plugin
const WebpackBuildNotifierPlugin = require('webpack-build-notifier'); // 开启通知

const common = require('./webpack.common')

module.exports = merge(common, {
    mode: "production",
    devtool: false,
    //打包优化配置
    optimization: {
        minimize: true,
        minimizer: [
            new CssMinimizerPlugin({
                parallel: true,
            }),
            new TerserPlugin({
                parallel: true, // 开启多进程并发执行
            }),
        ],
        splitChunks: {
            chunks: 'all',
        },
    },
    plugins: [
        new HtmlWebpackPlugin(Object.assign(
            {},
            {
                inject: true,
                template: paths.appHtml,
            },
            {
                minify: {
                    removeComments: true,
                    collapseWhitespace: true,
                    removeRedundantAttributes: true,
                    useShortDoctype: true,
                    removeEmptyAttributes: true,
                    removeStyleLinkTypeAttributes: true,
                    keepClosingSlash: true,
                    minifyJS: true,
                    minifyCSS: true,
                    minifyURLs: true,
                },
            }
        )),
        new ProgressBarPlugin({
            format:
                `${chalk.green.bold("build[:bar]")} ` +
                chalk.green.bold(":percent") +
                " (:elapsed seconds)",
            clear: false,
            width: 60,
        }),
        // 启动gzip
        new CompressionPlugin({
            test: /.js$/, // 还可以扩展其他文件类型
        }),
        new webpack.IgnorePlugin(/^\.\/locale/, /moment$/),
        new WebpackBuildNotifierPlugin({
            title: "爸爸，打包成功了",
            suppressSuccess: true, // don't spam success notifications
        }),
    ],
    performance: {
        hints: 'warning',
        maxEntrypointSize: 512000,
        maxAssetSize: 512000
    },
    stats: "normal", //标准输出
});