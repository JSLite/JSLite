function isDocument(obj) { return obj = obj ? obj != null && obj.nodeType ? obj.nodeType == obj.DOCUMENT_NODE : false : undefined;}
function isFunction(value) { return ({}).toString.call(value) == "[object Function]" }
function isObject(value) { return value instanceof Object }
function isArray(value) { return value instanceof Array }
function isString(obj){ return typeof obj == 'string' }
function isWindow(obj){ return obj != null && obj == obj.window }
function isPlainObject(obj){
    return isObject(obj) && !isWindow(obj) && Object.getPrototypeOf(obj) == Object.prototype
}
function isJson(obj) {
    var isjson = typeof(obj) == "object" &&
    Object.prototype.toString.call(obj).toLowerCase() == "[object object]" && !obj.length;
    return isjson;
}
function type(obj) {
    if(!obj) return undefined;
    var type="";
    JSLite.each("Boolean Number HTMLDivElement String Function Array Date RegExp Object Error".split(" "), function(i, name) {
        if(Object.prototype.toString.call(obj).indexOf(name) > -1) type = name == "HTMLDivElement"?"Object":name;
    })
    return type;
}
function likeArray(obj) {return obj? typeof obj.length == 'number' :null }
/**
 * fragment
 * 需要一个HTML字符串和一个可选的标签名
 * 生成DOM节点从给定的HTML字符串节点。
 * 生成的DOM节点作为一个数组返回。
 */
function fragment(html,name){
    var dom, container
    if (P.singleTagRE.test(html)) dom = JSLite(document.createElement(RegExp.$1));
    if (!dom) {
        if (html.replace) html = html.replace(P.tagExpanderRE, "<$1></$2>")
        if (name === undefined) name = P.fragmentRE.test(html) && RegExp.$1
        if (!(name in P.containers)) name = '*'
        container = P.containers[name]
        container.innerHTML = '' + html
        dom = JSLite.each(slice.call(container.childNodes), function(){
            container.removeChild(this)
        });
    }
    return dom;
}
function funcArg(context, arg, idx, payload) {
    return isFunction(arg) ? arg.call(context, idx, payload) : arg;
}

