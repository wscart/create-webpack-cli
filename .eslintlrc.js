module.exports = {
    root: true,
    env: {
        browser: true,
        es2021: true,
    },
    extends: [
        "plugin:react/recommended", // jsx 规范支持
        "airbnb-base", // 包含所欲ES6+ 规范
    ],
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 12,
        sourceType: "module",
    },
    plugins: [],
    rules: {
        "consistent-return": 0, // 箭头函数不强制return
        semi: 0,
        "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
        "react/jsx-uses-react": "error", // 防止react被错误地标记为未使用
        "react/jsx-uses-vars": "error",
        "react/jsx-filename-extension": [1, { extensions: [".js", ".jsx", "ts", "tsx"] }],
        "react/jsx-key": 2, // 在数组或迭代器中验证JSX具有key属性
        "import/no-dynamic-require": 0,
        "import/no-extraneous-dependencies": 0,
        "import/no-named-as-default": 0,
        // 'import/no-unresolved': 2,
        "import/no-webpack-loader-syntax": 0,
        "import/prefer-default-export": 0,
        "arrow-body-style": [2, "as-needed"], // 箭头函数
        "class-methods-use-this": 0, // 强制类方法使用 this
        // 缩进Indent with 4 spaces
        indent: ["error", 4, { SwitchCase: 1 }], // SwitchCase冲突 闪烁问题
        // Indent JSX with 4 spaces
        "react/jsx-indent": ["error", 4],
        // Indent props with 4 spaces
        "react/jsx-indent-props": ["error", 4],
        "no-console": 0, // 不禁用console
        "react/jsx-props-no-spreading": 0,
        "import/no-unresolved": [
            2,
            {
                ignore: ["^@/"], // @ 是设置的路径别名
            },
        ],
    },
    //如果在webpack.config.js中配置了alias 并且在import时使用了别名需要安装eslint-import-resolver-webpack
    settings: {
        "import/resolve": {
            webpack: {
                config: "config/webpack.dev.js",
            },
        },
    },
};
/*
"off"或者0    //关闭规则关闭
"warn"或者1    //在打开的规则作为警告（不影响退出代码）
"error"或者2    //把规则作为一个错误（退出代码触发时为1）
*/