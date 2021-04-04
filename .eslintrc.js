module.exports = {
    //此项是用来指定eslint解析器的，解析器必须符合规则，babel-eslint解析器是对babel解析器的包装使其与ESLint解析
    "parser": "@typescript-eslint/parser",
    //此项是用来指定javaScript语言类型和风格，sourceType用来指定js导入的方式，默认是script，此处设置为module，指某块导入方式
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 12,
        "sourceType": "module"
    },
    // 此项指定环境的全局变量，下面的配置指定为浏览器环境
    "env": {
        "browser": true,
        "es2021": true
    },
    // 此项是用来配置标准的js风格，就是说写代码的时候要规范的写，如果你使用vs-code我觉得应该可以避免出错
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended",
        "plugin:@typescript-eslint/recommended"
    ],
    // 此项是用来提供插件的，插件名称省略了eslint-plugin-，下面这个配置是用来规范html的
    "plugins": [
        "react",
        "@typescript-eslint",
    ],
    // 下面这些rules是用来设置从插件来的规范代码的规则，使用必须去掉前缀eslint-plugin-
    // 主要有如下的设置规则，可以设置字符串也可以设置数字，两者效果一致
    // "off" -> 0 关闭规则
    // "warn" -> 1 开启警告规则
    //"error" -> 2 开启错误规则
    // 了解了上面这些，下面这些代码相信也看的明白了
    "rules": {
        '@typescript-eslint/no-var-requires': 0,
        "@typescript-eslint/no-explicit-any": ["off"],
        "no-unused-vars": "off",
        "@typescript-eslint/no-unused-vars": ["off"],
        "@typescript-eslint/explicit-module-boundary-types": "off", // ts每个函数都要显式声明返回值
        "no-undef": 0
    },
    "settings": {
        "react": {
            "version": "detect"
        },
    }
};
