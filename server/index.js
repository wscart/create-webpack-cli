const Webpack = require("webpack");
const WebpackDevServer = require("webpack-dev-server");
// webpack开发 配置文件
const webpackConfig = require("../config/webpack.dev");
// 自定义日志输出
const logger = require("./logger");
// 服务配置
const config = require("./config");

const { port, host } = config; // 监听的端口号
//编译器
const compiler = Webpack(webpackConfig);
//  devServer 参数
const devServerOptions = Object.assign({}, webpackConfig.devServer, {
    open: true, // 自动打开浏览器
    compress: true, // gzip 压缩
    stats: "minimal",
    hot: true, // 开启热更新
});
const server = new WebpackDevServer(compiler, devServerOptions);

server.listen(port, host, async (err) => {
    if (err) {
        return logger.error(err.message);
    }
    logger.appStarted(port, "localhost");
});