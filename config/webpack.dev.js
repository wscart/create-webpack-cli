const { merge } = require('webpack-merge')
const paths = require("./paths");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ESLintPlugin = require("eslint-webpack-plugin")

const common = require('./webpack.common')

module.exports = merge(common, {
    mode: "development",
    devtool: 'inline-source-map',
    target: "web",
    plugins: [
        new HtmlWebpackPlugin({
            template: paths.appHtml,
        }),
        new ESLintPlugin({
            fix: true, // 启用ESLint自动修复功能
            extensions: ['js', 'jsx', 'tsx', 'ts'],
            context: paths.appSrc, // 文件根目录
            exclude: '/node_modules/',// 指定要排除的文件/目录
            cache: true, //缓存
        }),
    ],
    stats: "errors-only", //只在发生错误或有新的编译时输出
});