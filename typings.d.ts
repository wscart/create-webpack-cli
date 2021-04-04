// 这边申明了less文件 之后使用import styles from 'xxx.less'就不会有ts报错了
declare module '*.svg' {
    const value: string
    export = value
}
declare module '*.png'{
    const value: string
    export = value
}
declare module '*.jpg'{
    const value: string
    export = value
}
declare module '*.jpeg'{
    const value: string
    export = value
}
declare module '*.gif'{
    const value: string
    export = value
}
declare module '*.bmp'{
    const value: string
    export = value
}
declare module '*.tiff'{
    const value: string
    export = value
}
declare module '*.css' {
    const content:{[key:string]:string};
    export default content;
}
declare module '*.less' {
    const content:{[key:string]:string};
    export default content;
}

declare module "*.module.less" {
    const content:{[key:string]:string};
    export default content;
}
// 如果使用的第三方库没有ts，可以自己在这边申明