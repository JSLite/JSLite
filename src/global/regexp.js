// 匹配空格的正则表达式
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/Trim
let trimRE = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;
// 只写了便签的开始或者结束 如 <div> 或者 <div/>;
let singleTagRE = /^<(\w+)\s*\/?>(?:<\/\1>|)$/;
// HTML代码片断的正则;
let fragmentRE = /^\s*<(\w+|!)[^>]*>/;
// 匹配非单独一个闭合标签的标签，类似将<div></div>写成了<div/>;
let tagExpanderRE = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/ig;
// 正则匹配 id ，规则以 # 开头;
let idRE = /^#([\w-]+)$/;
// 正则匹配 class 只包括下划线，换行空格等不包括，包括中文,日文,英文,韩文.;
let classRE = /^\.([\w-]+)$/;
// 正则匹配 tag标签;
let tagRE = /^[\w-]+$/;
// 全文查找出现的匹配所有大写字母字符
let capitalRE = /([A-Z])/g;

export { 
    trimRE, 
    singleTagRE, 
    fragmentRE, 
    tagExpanderRE,
    classRE,
    tagRE,
    idRE,
    capitalRE 
};