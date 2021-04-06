const webpack = require('webpack');
const paths = require("./paths");
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin'); // Webpack友好的错误提示插件
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin'); // 引入另一个tsconfig.json文件，该文件使用esnext的模块方式。
const MiniCssExtractPlugin = require("mini-css-extract-plugin") // 提取css的 这样就可以把js和css分开，然后在加载的时候 并行加载
const { CleanWebpackPlugin } = require("clean-webpack-plugin"); //打包前清空build目录文件
const WebpackBuildNotifierPlugin = require('webpack-build-notifier'); // 开启通知

const cssRegex = /\.css$/;
const cssModuleRegex = /\.module\.css$/;
const lessRegex = /\.less$/;
const lessModuleRegex = /\.module\.(less|less)$/;
const imageInlineSizeLimit = 8 * 1024;

const { NODE_ENV = 'development', MOCK = 'false' } = process.env;
const shouldUseSourceMap = process.env.GENERATE_SOURCEMAP !== 'false';
const isEnvDevelopment = NODE_ENV === 'development';
const isEnvProduction = NODE_ENV === 'production';

module.exports = {
    entry: paths.appSrc,
    context: process.cwd(),
    output: {
        path: paths.appBuild,
        publicPath: "./",
        filename: 'scripts/[contenthash].bundle.js',
        chunkFilename: 'chunk/[chunkhash].js',
        assetModuleFilename: 'static/images/[hash][ext][query]'
    },
    cache: {
        // 使用持久化缓存
        type: "memory", //memory:使用内存缓存 filesystem：使用文件缓存
    },
    devtool: false,
    module: {
        rules: [
            {
                test: /\.(ts|tsx|js|jsx)?$/,
                exclude: /node_modules/,
                use: ['babel-loader'],
            },
            {
                oneOf: [
                    {
                        test: cssRegex,
                        exclude: cssModuleRegex,
                        use: [isEnvProduction ? MiniCssExtractPlugin.loader : 'style-loader', {
                            loader: 'css-loader',
                            options: {
                                importLoaders: 1, // 0 => 无 loader(默认); 1 => postcss-loader; 2 => postcss-loader, less-loader
                                modules: {
                                    localIdentName: '[local]'
                                },
                                sourceMap: isEnvProduction && shouldUseSourceMap,
                            }
                        }, 'postcss-loader'],
                    },
                    {
                        test: lessRegex,
                        exclude: lessModuleRegex,
                        use: [isEnvProduction ? MiniCssExtractPlugin.loader : 'style-loader', {
                            loader: 'css-loader',
                            options: {
                                importLoaders: 3, // 查询参数 importLoaders，用于配置「css-loader 作用于 @import 的资源之前」有多少个 loader
                                modules: {
                                    localIdentName: '[local]'
                                },
                                sourceMap: isEnvProduction && shouldUseSourceMap,
                            }
                        }, 'postcss-loader', {
                            loader: 'less-loader',
                            options: {
                                lessOptions: {
                                    javascriptEnabled: true
                                }
                            }
                        }, {
                            loader: 'style-resources-loader', // 此处为了公共的sass样式能够全局加载，而不用每个组件都单独引用。
                            options: {
                                patterns: paths.appGlobalVariable
                            }
                        }],
                        sideEffects: true,
                    },
                    {
                        test: /\.(gif|png|jpe?g|svg|webp)$/i,
                        type: 'asset',
                        parser: {
                            dataUrlCondition: {
                                maxSize: imageInlineSizeLimit
                            }
                        },
                    },
                    {
                        test: /\.(eot|svg|ttf|woff|woff2?)$/,
                        type: 'asset/resource'
                    },
                ]
            },
        ],
    },
    resolve: {
        modules: [paths.appNodeModules],
        extensions: [".ts", ".tsx", ".js", ".jsx", ".json"],
        mainFields: ['browser', 'jsnext:main', 'main'],
        alias: {
            moment$: 'moment/moment.js',
            '@src': paths.appSrc,
            '@assets': paths.appAssets,
            '@pages': paths.appPages,
            '@utils': paths.appUtils,
            '@components': paths.appComponents,
            '@common': paths.appCommon,
            '@public': paths.appPublic,
            '@lib': paths.appLib,
            '@config': paths.appConfig,
            '@store': paths.appStore,
            '@services': paths.appServices,
            '@routes': paths.appRoutes,
            '@mock': paths.appMock,
            '@': paths.appRoot
        },
        plugins: [
            new TsconfigPathsPlugin({
                configFile: paths.appTsConfig,
            }),
        ],
    },
    devServer: {},
    plugins: [
        new CleanWebpackPlugin(),
        new FriendlyErrorsWebpackPlugin({
            onErrors:(severity, errors)=>{
                const error = errors[0]
                new WebpackBuildNotifierPlugin({
                    title: "webpack编译失败",
                    message:severity+": "+error.name,
                    suppressWarning: true, // don't spam success notifications
                })
            }
        }),
        new MiniCssExtractPlugin({
            filename: isEnvDevelopment ? 'static/css/[name].css' : 'static/css/[name].[hash].css',
            chunkFilename: isEnvDevelopment ? 'static/css/[id].css' : 'static/css/[id].[hash].css',
            ignoreOrder: true, // 忽略有关顺序冲突的警告
        }),
        new webpack.DefinePlugin({
            'process.env': {
                MOCK: JSON.stringify(MOCK) // 判断是否使用Mockjs
            }
        }),
        new webpack.ProvidePlugin({
            React: 'react'
        }),
    ],
}