function likeArray(obj) {
    return obj ? typeof obj.length == 'number' : null;
}
function each(elements, callback) {
    var i, key;
    if (likeArray(elements)) {
        for (i = 0; i < elements.length; i++) {
            if (callback.call(elements[i], i, elements[i]) === false) {
                return elements;
            }
        }
    } else {
        for (key in elements) {
            if (callback.call(elements[key], key, elements[key]) === false) {
                return elements;
            }
        }
    }
    return elements;
}
function type(obj) {
    if (!obj) {
        return undefined;
    }

    var type = '';
    each('Boolean Number HTMLDivElement String Function Array Date RegExp Object Error'.split(' '), function(i, name) {
        if (toString.call(obj).indexOf(name) > -1) {
            type = name == 'HTMLDivElement' ? 'Object' : name;
        }
    });
    return type;
}

function isFunction(fn) {
    return type(fn) == 'Function';
}

function isObject(obj) {
    return type(obj) == 'Object';
}

function isArray(arr) {
    return Array.isArray ? Array.isArray(arr) : type(arr) === 'Array';
}

function isString(obj) {
    return typeof obj == 'string';
}
function isPlainObject(obj) {
    return isObject(obj) && !isWindow(obj) && Object.getPrototypeOf(obj) == Object.prototype;
}

function isJson(obj) {
    var isjson = typeof(obj) == "object" &&
        toString.call(obj).toLowerCase() == "[object object]" && !obj.length;
    return isjson;
}

function isWindow(win) {
    return win && win == win.window;
}
function isDocument(doc) {
    return doc && doc.nodeType == doc.DOCUMENT_NODE;
}


/**
 * fragment
 * 需要一个HTML字符串和一个可选的标签名
 * 生成DOM节点从给定的HTML字符串节点。
 * 生成的DOM节点作为一个数组返回。
 */
function fragment(html, name) {
    var dom, container;
    if (P.singleTagRE.test(html)) dom = JSLite(document.createElement(RegExp.$1));
    if (!dom) {
        if (html.replace) {
            html = html.replace(P.tagExpanderRE, "<$1></$2>");
        }
        if (name === undefined) {
            name = P.fragmentRE.test(html) && RegExp.$1;
        }
        if (!(name in P.containers)) {
            name = '*';
        }
        container = P.containers[name];
        container.innerHTML = '' + html;
        dom = each(slice.call(container.childNodes), function() {
            container.removeChild(this);
        });
    }
    return dom;
}

function funcArg(context, arg, idx, payload) {
    return isFunction(arg) ? arg.call(context, idx, payload) : arg;
}
