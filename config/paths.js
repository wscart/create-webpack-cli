const path = require("path");
const fs = require("fs");

// 获取当前工作目录
const appDirectory = fs.realpathSync(process.cwd());
// 从相对路径中解析绝对路径
const resolveApp = (relativePath) => path.resolve(appDirectory, relativePath);
// 默认的模块扩展名
const moduleFileExtensions = ["js", "jsx", "ts", "tsx", "json"];
// 解析模块路径
const resolveModule = (resolveFn, filePath) => {
    // 查看文件存不存在
    const extension = moduleFileExtensions.find((extension) =>
        fs.existsSync(resolveFn(`${filePath}.${extension}`))
    );
    if (extension) {
        return resolveFn(`${filePath}.${extension}`);
    }
    return resolveFn(`${filePath}.js`); // 如果没有默认就是js
};

module.exports = {
    appRoot: resolveApp("/"), // 根路径
    appBuild: resolveApp("build"), // 打包路径
    appPublic: resolveApp("public"), // 静态资源路径
    appHtml: resolveApp("public/index.html"), // html 模板路径
    appDll: resolveApp("dll"), // Dll动态链接库
    appDllMainfest: resolveApp("dll/mainfest.json"), // 提供与包的映射关系
    appDllVendor: resolveApp("dll/vendor.js"), // 在html中自动引入资源
    appIndexJs: resolveModule(resolveApp, "src/index"), // 打包入口路径
    appComponents: resolveModule(resolveApp, "src/components"), // 组件路径
    appUtils: resolveModule(resolveApp, "src/utils"), // 工具路径
    appPages: resolveModule(resolveApp, "src/pages"), // 页面路径
    appAssets: resolveModule(resolveApp, "src/assets"), // 资源路径
    appCommon: resolveModule(resolveApp, "src/common"), // 公共包路径
    appLib: resolveModule(resolveApp, "src/lib"), // 库路径
    appNodeModules: resolveApp("node_modules"), // node_modules 路径
    appSrc: resolveApp("src"), // 主文件入口路径
    moduleFileExtensions, // 模块扩展名
    appTsConfig: resolveApp("./tsconfig.json"), // TS配置
    appConfig: resolveModule(resolveApp, "src/config"), 
    appStore: resolveModule(resolveApp, "src/store"), 
    appServices: resolveModule(resolveApp, "src/services"), 
    appRoutes: resolveModule(resolveApp, "src/routes"),
    appMock: resolveModule(resolveApp, ("mock")),
    appGlobalStyles: path.resolve(appDirectory, "./src/global.less"), // Less 全局样式
};