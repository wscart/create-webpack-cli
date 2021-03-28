<p align="center">
    <img alt="dva-boot-admin" src="https://camo.githubusercontent.com/b0573f87b0786eda63c76f2a9a1358e7a653783c25c03c6c908a00b70c713d78/68747470733a2f2f7765627061636b2e6a732e6f72672f6173736574732f69636f6e2d7371756172652d6269672e737667" width="140">
</p>
<h1 align="center">webpack-app-cli</h1>

# 配置 webpack 脚手架
- webpack for 5.27.1

> Webpack 是当下最热门的前端资源模块化管理和打包工具。它可以将许多松散的模块按照依赖和规则打包成符合生产环境部署的前端资源。还可以将按需加载的模块进行代码分隔，等到实际需要的时候再异步加载。通过 loader 的转换，任何形式的资源都可以视作模块，比如 CommonJs 模块、 AMD 模块、 ES6 模块、CSS、图片、 JSON、Coffeescript、 LESS 等。

#### 项目启动
`yarn start`

#### 项目打包
`yarn build`

# 环境变量

### 开发环境
> process.env.NODE_ENV === 'development'

### 正式环境
> process.env.NODE_ENV === 'production'

### mock环境
> process.env.MOCK === 'true'

# 目录结构
<pre>
.
├── config  // webpack配置文件
|   ├── paths.js  // 向外导出各种路径
│   ├── webpack.analyze.js // 观察各模块的占用情况
│   ├── webpack.common.js  // webpack 基础配置
|   ├── webpack.dev.js     // webpack开发配置
│   └── webpack.prod.js    // webpack正式配置
├── mock  // mock
│   └── index.js
├── public  // 静态资源
│   └── index.html // 入口html模板
├── server
|   ├── config.js  // dev配置
│   ├── index.js // webpack-service-dev服务配置
│   └── logger.js    // 自定义日志输出
├── src
│   ├── common  // 公共内容
│   │   ├── assets  // 图片、字体等静态资源
│   │   ├── styles.css  // 公共样式
│   │   └── type.ts	// 公共ts
│   ├── components  // 公共组件
│   ├── services // 接口相关
│   ├── index.tsx // 入口文件
│   ├── lib // 外部依赖
│   ├── pages // 页面
│   ├── store // store数据存储管理
│   ├── global.less // 全局样式
│   ├── index.less // 根节点样式
│   ├── variable.less // 全局变量样式
│   ├── index.tsx  // 根节点
│   ├── routes  // 路由
│   └── utils // 工具库
│   │   ├── index.ts  //  自定义工具
│   │   └── request.ts  //  http请求
├── .babelrc  // babel配置
├── .eslintrc.js  // eslint配置
├── .eslintlrc.js // eslint配置
├── .gitignore  // git配置
├── docker-compose.yml  // docker-compose配置
├── Dockerfile  // Dockerfile配置
├── global.d.ts // ts全局声明
├── package.json    // package配置
├── postcss.config.js  // postcss配置
├── README.md
├── tsconfig.json // ts配置
└── yarn.lock
</pre>

### 特别鸣谢
- 感谢 JasonJiang 提供的搭建webpack脚手架教程
https://juejin.cn/user/3491704662930871

### 参考资料
- webpack文档 https://webpack.docschina.org/

PS: 如有不当或错误之处恳请指正。