/*!
 * JSLite JavaScript Library v1.1.10
 * http://JSLite.io
 *
 * Copyright (c) 2015-2016 kenny.wang
 * Date:Mon Mar 21 2016 21:20:39 GMT+0800 (CST)
 */
!function(global, factory) {
    "object" === typeof exports && "undefined" !== typeof module ? module.exports = factory() : "function" === typeof define && define.amd ? define(factory) : global.JSLite = factory();
}(this, function() {
    "use strict";
    // 匹配空格的正则表达式
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/Trim
    var trimRE = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;
    // 只写了便签的开始或者结束 如 <div> 或者 <div/>
    var singleTagRE = /^<(\w+)\s*\/?>(?:<\/\1>|)$/;
    // HTML代码片断的正则
    var fragmentRE = /^\s*<(\w+|!)[^>]*>/;
    // 匹配非单独一个闭合标签的标签，类似将<div></div>写成了<div/>
    var tagExpanderRE = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi;
    // 正则匹配 id ，规则以 # 开头
    var idRE = /^#([\w-]+)$/;
    // 正则匹配 class 只包括下划线，换行空格等不包括，包括中文,日文,英文,韩文.
    var classRE = /^\.([\w-]+)$/;
    // 正则匹配 tag标签
    var tagRE = /^[\w-]+$/;
    var emptyArray = [];
    var slice = [].slice;
    var elementTypes = [ 1, 9, 11 ];
    var version = "1.1.10";
    var class2type = {};
    var table = document.createElement("table");
    var tableRow = document.createElement("tr");
    var containers = {
        "*": document.createElement("div"),
        tr: document.createElement("tbody"),
        tbody: table,
        thead: table,
        tfoot: table,
        td: tableRow,
        th: tableRow
    };
    var propMap = {
        tabindex: "tabIndex",
        readonly: "readOnly",
        "for": "htmlFor",
        "class": "className",
        maxlength: "maxLength",
        cellspacing: "cellSpacing",
        cellpadding: "cellPadding",
        rowspan: "rowSpan",
        colspan: "colSpan",
        usemap: "useMap",
        frameborder: "frameBorder",
        contenteditable: "contentEditable"
    };
    // 构造函数
    // 通过实例init函数，每次都构建新的init实例对象，来分隔this，避免交互混淆
    var JSLite = function JSLite(selector, context) {
        return new JSLite.prototype.init(selector, context);
    };
    // fragment
    // 需要一个HTML字符串和一个可选的标签名
    // 生成DOM节点从给定的HTML字符串节点。
    // 生成的DOM节点作为一个数组返回。
    function fragment(html, name) {
        var dom, container;
        if (singleTagRE.test(html)) dom = JSLite(document.createElement(RegExp.$1));
        if (!dom) {
            if (html.replace) html = html.replace(tagExpanderRE, "<$1></$2>");
            if (void 0 === name) name = fragmentRE.test(html) && RegExp.$1;
            if (!(name in containers)) name = "*";
            container = containers[name];
            container.innerHTML = "" + html;
            console.log(slice.call(container.childNodes));
            // 取容器的子节点，这样就直接把字符串转成DOM节点了
            dom = JSLite.each(slice.call(container.childNodes), function() {
                container.removeChild(this);
            });
        }
        return dom;
    }
    "Boolean Number String Function Array Date RegExp Object Error Symbol".split(" ").map(function(itm, idx) {
        class2type["[object " + itm + "]"] = itm.toLowerCase();
    });
    function type(obj) {
        // 不用 String(obj) 转字符串，为了兼容 Android <4.3 ，iOS < 8.4
        // http://caniuse.com/#search=String
        return null == obj ? obj + "" : class2type[toString.call(obj)] || "object";
    }
    function isObject(obj) {
        return "object" == type(obj);
    }
    function isArrayLike(obj) {
        return "number" == type(obj.length);
    }
    function isDocument(doc) {
        return doc && doc.nodeType == doc.DOCUMENT_NODE;
    }
    function isString(str) {
        return "string" === type(str);
    }
    function isWindow(win) {
        return win && win == win.window;
    }
    function isFunction(obj) {
        return "function" === type(obj);
    }
    function isPlainObject(obj) {
        return isObject(obj) && !isWindow(obj) && Object.getPrototypeOf(obj) == Object.prototype;
    }
    function inArray(elem, array, i) {
        return null == array ? -1 : emptyArray.indexOf.call(array, elem, i);
    }
    function isEmptyObject(obj) {
        for (var name in obj) return false;
        return true;
    }
    // 转换为驼峰式
    function camelCase(string) {
        return string.replace(/^-ms-/, "ms-").replace(/-([a-z])/g, function(all, letter) {
            return letter.toUpperCase();
        });
    }
    // 处理arg为函数的的情况
    // 为函数的时候执行函数返回，返回函数返回的字符串
    function funcArg(context, arg, idx, payload) {
        return isFunction(arg) ? arg.call(context, idx, payload) : arg;
    }
    function init(selector, context) {
        var dom;
        if (!selector) //没有参数，返回空数组
        dom = emptyArray, dom.selector = selector || "", dom.__proto__ = JSLite.fn.init.prototype; else if ("string" === type(selector) && (selector = selector.trim()) && "<" == selector[0] && fragmentRE.test(selector)) // 如果selector是一个 JSLite dome 实例，
        // 如果它是一个HTML片段，从它创建节点
        dom = fragment(selector, RegExp.$1, context), selector = null; else if (isFunction(selector)) //如果selector是个函数，则在DOM ready的时候执行它
        return JSLite(document).ready(selector); else if (JSLite.isArray(selector)) dom = selector; else if ("object" === type(selector)) dom = [ selector ], 
        selector = null; else if (elementTypes.indexOf(selector.nodeType) >= 0 || selector === window) dom = [ selector ], 
        selector = null; else dom = function() {
            var found;
            return document && idRE.test(selector) ? (found = document.getElementById(RegExp.$1)) ? [ found ] : [] : slice.call(classRE.test(selector) ? document.getElementsByClassName(RegExp.$1) : tagRE.test(selector) ? document.getElementsByTagName(selector) : document.querySelectorAll(selector));
        }();
        dom = dom || emptyArray;
        JSLite.extend(dom, JSLite.fn);
        dom.selector = selector || "";
        return dom;
    }
    function globalEval(code, doc) {
        doc = doc || document;
        var script = doc.createElement("script");
        script.text = code;
        doc.head.appendChild(script).parentNode.removeChild(script);
    }
    JSLite.fn = JSLite.prototype = {
        jslite: version,
        init: init
    };
    // 给init函数后实例化JSLite原型
    // JSLite.fn.init.prototype = JSLite.prototype;
    // 把对象合并为参数。
    // 对于一个深度的扩展，将第一个参数设置为“真”。
    JSLite.extend = JSLite.fn.extend = function() {
        var options, // 常见用法 JSLite.extend( obj1, obj2 )，此时，target为arguments[0]
        target = arguments[0] || {}, i = 1, length = arguments.length, deep = false;
        // 检查是否有深度合并
        // 如果第一个参数为true，即 JSLite.extend( true, obj1, obj2 ); 的情况
        if ("boolean" === typeof target) {
            // 此时target是true
            deep = target;
            // target改为 obj1
            target = arguments[1] || {};
            // 跳过 boolean 和 extended
            i = 2;
        }
        // 当目标是一个字符串或某个东西（可能在深拷贝）处理的情况下
        // 处理奇怪的情况，比如 JSLite.extend( 'hello' , {name: 'kkk'})
        if (isObject(target) && !isFunction(target)) target = {};
        // 处理这种情况 JSLite.extend(obj)，或 JSLite.fn.extend( obj )
        if (length === i) {
            target = this;
            // JSLite.extend时，this指的是JSLite；JSLite.fn.extend时，this指的是JSLite.fn
            --i;
        }
        for (;i < length; i++) // 只有处理非空/未定义的值
        if (null != (options = arguments[i])) // 比如 JSLite.extend( obj1, obj2, obj3, ojb4 )，
        // options则为 obj2、obj3...
        // 扩展基对象
        for (var prop in options) if (Object.prototype.hasOwnProperty.call(options, prop)) // 如果深度合并和属性是对象，合并属性
        if (deep && isPlainObject(target)) target[prop] = extend(true, target[prop], options[prop]); else target[prop] = options[prop];
        // 返回修改过的对象
        return target;
    };
    JSLite.extend({
        isArray: Array.isArray,
        isString: isString,
        isFunction: isFunction,
        isDocument: isDocument,
        isWindow: isWindow,
        isPlainObject: isPlainObject,
        isObject: isObject,
        inArray: inArray,
        isEmptyObject: isEmptyObject,
        type: type,
        // 转换为驼峰式
        camelCase: camelCase,
        // 执行一段js代码
        globalEval: globalEval,
        // 去掉字符串起始和结尾的空格
        trim: function(text) {
            return "" + (null == text ? "" : (text + "").replace(trimRE, ""));
        },
        each: function(elements, callback) {
            if (isArrayLike(elements)) {
                for (var i = 0; i < elements.length; i++) if (false === callback.call(elements[i], i, elements[i])) return elements;
            } else for (var key in elements) if (false === callback.call(elements[key], key, elements[key])) return elements;
            return elements;
        },
        // 默认将一个数组循环，处理之后成返回一个新的数组
        map: function(elems, callback, arg) {
            var value, i = 0, ret = [];
            // 如果是个数组，通过数组循环
            if (isArrayLike(elems)) for (;i < elems.length; i++) {
                value = callback(elems[i], i, arg);
                if (null != value) ret.push(value);
            } else for (i in elems) {
                value = callback(elems[i], i, arg);
                if (null != value) ret.push(value);
            }
            return emptyArray.concat.apply([], ret);
        },
        // 使用过滤函数过滤数组元素。
        grep: function(elems, callback, invert) {
            var callbackInverse, matches = [];
            invert = !invert;
            // 将循环到的值保存到 matches 数组中
            for (var i = 0; i < elems.length; i++) {
                // 返回 true 或者 false
                callbackInverse = !callback(elems[i], i, invert);
                if (callbackInverse !== invert) matches.push(elems[i]);
            }
            return matches;
        },
        // 合并两个数组内容到第一个数组。
        // 只做合并，不过滤
        merge: function(first, second) {
            var i = first.length;
            for (var j = 0; j < +second.length; j++) first[i++] = second[j];
            first.length = i;
            return first;
        },
        error: function(msg) {
            throw msg;
        },
        now: Date.now
    });
    JSLite.fn.extend({
        forEach: emptyArray.forEach,
        concat: emptyArray.concat,
        indexOf: emptyArray.indexOf,
        toArray: function() {
            return this.get();
        },
        each: function(callback) {
            return JSLite.each(this, callback);
        },
        map: function(callback) {
            return JSLite.map(this, function(elem, i) {
                return callback.call(elem, i, elem);
            });
        },
        slice: function() {
            return slice.apply(this, arguments);
        },
        get: function(num) {
            // 返回集合中的一个元素
            // 如果num不存在返回所有元素的原始数组
            return null != num ? num < 0 ? this[num + this.length] : this[num] : slice.call(this);
        },
        size: function() {
            return this.length;
        },
        eq: function(idx) {
            return idx === -1 ? JSLite(this.slice(idx)) : JSLite(this.slice(idx, +idx + 1));
        },
        ready: function(callback) {
            if (/complete|loaded|interactive/.test(document.readyState) && document.body) callback(JSLite); else document.addEventListener("DOMContentLoaded", function() {
                callback(JSLite);
            }, false);
            return this;
        },
        first: function() {
            return this.eq(0);
        },
        last: function() {
            return this.eq(-1);
        },
        nodeName: function(elem, name) {
            return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
        }
    });
    var _JSLite = window.JSLite;
    var _$ = window.$;
    // 放弃 JSLite 控制的$ 变量为 $ 符号冲突弄一个解决方法
    JSLite.noConflict = function(deep) {
        if (window.$ === JSLite) window.$ = _$;
        if (deep && window.JSLite === JSLite) window.JSLite = _JSLite;
        return JSLite;
    };
    JSLite.fn.extend({
        // 设置或返回被选元素的属性值。
        attr: function(name, value) {
            var result, k;
            return "string" == typeof name && !(1 in arguments) ? !this.length || 1 !== this[0].nodeType ? void 0 : !(result = this[0].getAttribute(name)) && name in this[0] ? this[0][name] : result : this.each(function(n) {
                if (isObject(name)) for (k in name) this.setAttribute(k, name[k]); else this.setAttribute(name, funcArg(this, value));
            });
        },
        // 从每一个匹配的元素中删除一个属性
        removeAttr: function(name) {
            return this.each(function() {
                1 === this.nodeType && this.removeAttribute(name);
            });
        },
        // 获取在匹配的元素集中的第一个元素的属性值。
        prop: function(name, value) {
            name = propMap[name] || name;
            return 1 in arguments ? this.each(function(idx) {
                this[name] = funcArg(this, value, idx, this[name]);
            }) : this[0] && this[0][name];
        },
        // 用来删除由.prop()方法设置的属性集
        removeProp: function(name) {
            name = propMap[name] || name;
            return this.each(function() {
                // 在IE中处理window属性可能报错
                try {
                    this[name] = void 0;
                    delete this[name];
                } catch (e) {}
            });
        }
    });
    window.JSLite = window.$ = JSLite;
    return JSLite;
});