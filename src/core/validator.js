import { class2type,emptyArray } from '../global/var';

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
    funcArg
}