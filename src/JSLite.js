JSLite = (function(){
    var JSLite = function(selector) {
        return new JSLite.fn.init(selector);
    };

    JSLite.fn = JSLite.prototype = {
        init: function(selector) {
            var dom ;
            if (!selector) {
                dom = emptyArray,dom.selector = selector || '',dom.__proto__ = JSLite.fn.init.prototype;
            } else if (typeof selector == 'string' && (selector = selector.trim()) && selector[0] == '<'  && /^\s*<(\w+|!)[^>]*>/.test(selector)) {
                dom = fragment(selector),selector=null;
            } else if (isFunction(selector)) {
                return JSLite(document).ready(selector);
            } else {
                if (isArray(selector)) {
                    dom = selector;
                } else if (isObject(selector)) {
                    dom = [selector], selector = null
                } else if (elementTypes.indexOf(selector.nodeType) >= 0 || selector === window) {
                    dom = [selector], selector = null;
                } else {
                    dom = (function(){
                        var found;
                        return (document && /^#([\w-]+)$/.test(selector))?
                        ((found = document.getElementById(RegExp.$1)) ? [found] : [] ):
                        slice.call(
                            /^\.([\w-]+)$/.test(selector) ? document.getElementsByClassName(RegExp.$1) :
                            /^[\w-]+$/.test(selector) ? document.getElementsByTagName(selector) :
                            document.querySelectorAll(selector)
                        );
                    })();
                }
            }
            dom = dom || emptyArray;
            JSLite.extend(dom, JSLite.fn);
            dom.selector = selector || '';
            return dom;
        }
    };

    JSLite.fn.init.prototype = JSLite.fn;

    return JSLite;
})();

JSLite.extend = JSLite.fn.extend = function () {
    var options, name, src, copy,
    target = arguments[0],i = 1,
    length = arguments.length,
    deep = false;
    //处理深拷贝的情况
    if (typeof (target) === "boolean")
        deep = target,target = arguments[1] || {},i = 2;
    //处理时，目标是一个字符串或（深拷贝可能的情况下）的东西
    if (typeof (target) !== "object" && !isFunction(target))
        target = {};
    //扩展JSLite的本身，如果只有一个参数传递
    if (length === i) target = this,--i;
    for (; i < length; i++) {
        if ((options = arguments[i]) != null) {
            for (name in options) {
                src = target[name],copy = options[name];
                if (target === copy) continue;
                if (copy !== undefined) target[name] = copy;
            }
        }
    }
    return target;
};

JSLite.extend({
    isDocument:isDocument,
    isFunction:isFunction,
    isObject:isObject,
    isArray:isArray,
    isString:isString,
    isWindow:isWindow,
    isPlainObject:isPlainObject,
    isJson:isJson,
    parseJSON:JSON.parse,
    type:type,
    likeArray:likeArray,
    trim:function(str){if(str) return str.trim();},
    intersect:function(a,b){
        var array=[];
        a.forEach(function(item){
            if(b.indexOf(item)>-1) array.push(item);
        })
        return array;
    },
    error:function(msg) {throw msg;},
    getUrlParam:function (name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"),
        r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]); return null;
    },
    each:function(elements, callback){each.apply(this,arguments);},
    map:function(elements, callback){
        var value, values = [], i, key
        if (likeArray(elements)) for (i = 0; i < elements.length; i++) {
            value = callback(elements[i], i)
            if (value != null) values.push(value)
        }
        else for (key in elements) {
            value = callback(elements[key], key)
            if (value != null) values.push(value)
         }
        return values.length > 0 ? JSLite.fn.concat.apply([], values) : values;
    },
    grep:function(elements, callback){
        return filter.call(elements, callback)
    },
    matches:function(element, selector){
        if (!selector || !element || element.nodeType !== 1) return false;
        var matchesSelector = element.webkitMatchesSelector || element.mozMatchesSelector ||
                            element.oMatchesSelector || element.msMatchesSelector || element.matchesSelector;
        if (matchesSelector) return matchesSelector.call(element, selector);
    },
    unique:function(array){return filter.call(array, function(item, idx){ return array.indexOf(item) == idx })},
    inArray:function(elem, array, i){
        return emptyArray.indexOf.call(array, elem, i)
    },
    sibling:function(nodes,ty){
        var ancestors = [];
        while (nodes.length > 0)
        nodes = JSLite.map(nodes, function(node){
            if ((node = node[ty]) && !isDocument(node) && ancestors.indexOf(node) < 0)
                ancestors.push(node)
                return node
        });
        return ancestors;
    },
    contains:function(parent, node){
        if(parent&&!node) return document.documentElement.contains(parent)
        return parent !== node && parent.contains(node)
    }
});

JSLite.fn.extend({
    forEach: emptyArray.forEach,
    concat: emptyArray.concat,
    indexOf: emptyArray.indexOf,
    each: function(callback){
        return JSLite.each(this,callback);
    },
    map: function(fn){
        return JSLite(JSLite.map(this, function(el, i){ return fn.call(el, i, el) }));
    },
    get: function(index){
        return index === undefined ? slice.call(this) : this[index >= 0 ? index : index + this.length];
    },
    index: function(element){
        return element ? this.indexOf(JSLite(element)[0]) : this.parent().children().indexOf(this[0])
    },
    is: function(selector){
        if (this.length > 0 && isObject(selector)) return this.indexOf(selector)>-1?true:false;
        return this.length > 0 && JSLite.matches(this[0], selector);
    },
    add: function(selector){return JSLite.unique(this.concat(JSLite(selector)));},
    eq: function(idx){return idx === -1 ? JSLite(this.slice(idx)) : JSLite(this.slice(idx, + idx + 1))},
    first: function(){
        var el = this[0]
        return el && !isObject(el) ? el : JSLite(el)
    },
    slice:function(argument) { return JSLite(slice.apply(this, arguments));},
    size:function(){return this.length;}
});
