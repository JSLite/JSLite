import { JSLite, containers, class2type, emptyArray, slice } from '../global/var';
import { singleTagRE, tagExpanderRE, fragmentRE} from '../global/regexp'

"Boolean Number String Function Array Date RegExp Object Error Symbol".split(" ").map(function(itm,idx){
    class2type[ "[object " + itm + "]" ] = itm.toLowerCase();
})

function type(obj) {
    // 不用 String(obj) 转字符串，为了兼容 Android <4.3 ，iOS < 8.4 
    // http://caniuse.com/#search=String
    return obj == null 
        ? obj + "" 
        : class2type[toString.call(obj)] || "object"
}

function isObject(obj){ return type(obj) == "object" }
function isArrayLike(obj){
    return type(obj.length) == 'number';
}

function isDocument(doc){
    return doc && doc.nodeType == doc.DOCUMENT_NODE;
}

function isString(str){
    return type(str) === 'string';
}

function isWindow(win) {
    return win && win == win.window;
}

function isFunction( obj ) {
    return type( obj ) === "function";
}

function isPlainObject(obj) {
    return isObject(obj) && !isWindow(obj) && Object.getPrototypeOf(obj) == Object.prototype;
}

function inArray(elem, array, i){
    return array == null ? -1 : emptyArray.indexOf.call( array, elem, i );
}

function isEmptyObject(obj){
    for ( var name in obj ) {
        return false;
    }
    return true;
}

// 转换为驼峰式
function camelCase(string){
    return string.replace( /^-ms-/, "ms-" ).replace( /-([a-z])/g, ( all, letter ) => letter.toUpperCase() );
}

// 处理arg为函数的的情况
// 为函数的时候执行函数返回，返回函数返回的字符串
function funcArg(context, arg, idx, payload) {
    return isFunction(arg) ? arg.call(context, idx, payload) : arg;
}

// fragment
// 需要一个HTML字符串和一个可选的标签名
// 生成DOM节点从给定的HTML字符串节点。
// 生成的DOM节点作为一个数组返回。
function fragment(html, name) {
    var dom, container;
    if (singleTagRE.test(html)) dom = JSLite(document.createElement(RegExp.$1));
    if (!dom) {
        if (html.replace) {
            html = html.replace(tagExpanderRE, "<$1></$2>");
        }
        if (name === undefined) {
            name = fragmentRE.test(html) && RegExp.$1;
        }
        if (!(name in containers)) {
            name = '*';
        }
        container = containers[name];
        container.innerHTML = '' + html;
        // 取容器的子节点，这样就直接把字符串转成DOM节点了
        dom = JSLite.each(slice.call(container.childNodes), function() {
            container.removeChild(this);
        });
    }
    return dom;
}

// 将字符串格式化成 如border-width 样式上使用
// 例如：paddingTop 转换成 padding-top
function dasherize(str) {
    return str.replace(/::/g, '/')
       .replace(/([A-Z]+)([A-Z][a-z])/g, '$1_$2')
       .replace(/([a-z\d])([A-Z])/g, '$1_$2')
       .replace(/_/g, '-')
       .toLowerCase()
}

export { 
    type, 
    isObject, 
    isArrayLike, 
    isDocument, 
    isFunction, 
    isWindow, 
    isPlainObject, 
    isString,
    isEmptyObject,
    inArray,
    camelCase,
    funcArg,
    dasherize,
    fragment
}