// 这边申明了less文件 之后使用import styles from 'xxx.less'就不会有ts报错了
declare module '*.png' {
    const content: any;
    export default content;
}
declare module '*.gif' {
    const content: any;
    export default content;
}
declare module '*.jpg' {
    const content: any;
    export default content;
}
declare module '*.jpeg' {
    const content: any;
    export default content;
}
declare module '*.svg' {
    const content: any;
    export default content;
}
declare module '*.css' {
    const content:{[className:string]:string};
    export default content;
}
declare module '*.less' {
    const content:{[className:string]:string};
    export default content;
}

declare module "*.module.less" {
    const content:{[className:string]:string};
    export default content;
}
// 如果使用的第三方库没有ts，可以自己在这边申明