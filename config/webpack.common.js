const webpack = require('webpack');
const paths = require("./paths");
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin'); // Webpack友好的错误提示插件
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin'); // 引入另一个tsconfig.json文件，该文件使用esnext的模块方式。
const MiniCssExtractPlugin = require("mini-css-extract-plugin") // 提取css的 这样就可以把js和css分开，然后在加载的时候 并行加载
const { CleanWebpackPlugin } = require("clean-webpack-plugin"); //打包前清空build目录文件

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
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            sourceType: 'unambiguous',
                            presets: [
                                '@babel/preset-env',
                                '@babel/preset-react',	// 编译react
                                '@babel/preset-typescript',	// 编译ts
                            ],
                            plugins: [
                                [
                                    'module-resolver',	// 模块处理
                                    {
                                        extensions: ['.js', '.jsx', '.ts', '.tsx', '.less', '.css'],	// 自动填充后缀，例如写'./index' 就会按着数组顺序去路径下找对应的文件
                                        alias: {},	// 这里可以申明一些路径别名
                                    },
                                ],
                                ['@babel/plugin-transform-runtime'],
                                ['@babel/plugin-proposal-class-properties', { loose: true }],
                                [
                                    '@babel/plugin-proposal-decorators', // 支持装饰器
                                    {
                                        legacy: true,
                                    },
                                ],
                                '@babel/plugin-syntax-dynamic-import', // 动态导入
                                '@babel/plugin-proposal-optional-chaining', // 这两个是用来处理 a && a.b => a.?b的 避免多层对象写的过于复杂
                            ],
                        },
                    },
                ],
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
                                patterns: paths.appGlobalStyles
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
                        use: [
                            {
                                loader: 'image-webpack-loader',
                                options: {
                                    mozjpeg: {
                                        progressive: true,
                                        quality: 65,
                                    },
                                    optipng: {
                                        enabled: false,
                                    },
                                    pngquant: {
                                        quality: [0.65, 0.90],
                                        speed: 4
                                    },
                                    gifsicle: {
                                        interlaced: false,
                                    },
                                    webp: {
                                        quality: 75,
                                    },
                                },
                            },
                        ],
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
        extensions: ['.tsx', '.ts', '.js', '.css', '.less'],
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
        new FriendlyErrorsWebpackPlugin(),
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