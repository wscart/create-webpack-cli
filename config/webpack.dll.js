const paths = require("./paths");
const webpack = require('webpack');
module.exports = {
    entry: {
        /*
            vendor最终生成的名字，要打的包['moment']
        */
        react: ['react', 'react-dom'],
    },
    output: {
        filename: 'vendor.js',
        library: "[name]_[hash]",
        path: paths.appDll,
    },
    plugins: [
        //作用生成一个manifest.json --> 提供与包的映射关系
        new webpack.DllPlugin({
            context: __dirname,
            name: '[name]_[hash]',
            path: paths.appDllMainfest
        })
    ],
    mode: 'production'
}
