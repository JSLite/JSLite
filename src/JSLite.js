var emptyArray = [],
    slice = emptyArray.slice,
    filter = emptyArray.filter,
    some = emptyArray.some,
    emptyObject = {},
    toString = emptyObject.toString,
    elementTypes = [1, 9, 11],
    propMap = {
        'tabindex': 'tabIndex',
        'readonly': 'readOnly',
        'for': 'htmlFor',
        'class': 'className',
        'maxlength': 'maxLength',
        'cellspacing': 'cellSpacing',
        'cellpadding': 'cellPadding',
        'rowspan': 'rowSpan',
        'colspan': 'colSpan',
        'usemap': 'useMap',
        'frameborder': 'frameBorder',
        'contenteditable': 'contentEditable'
    },
    JSLite;


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
    trim:function(str){return str == null ? "" : String.prototype.trim.call(str)},
    intersect:function(a,b){
        var array=[];
        a.forEach(function(item){
            if(b.indexOf(item)>-1) array.push(item);
        })
        return array;
    },
    error:function(msg) {throw msg;},
    getUrlParam: function(name, searchStr) {
        // 兼容 ?id=22&name=%E4%B8%AD%E6%96%87&DEBUG 处理
        var url = searchStr || location.search;
        var params = {};

        if (url.indexOf('?') != -1) {
            var arr = url.substr(1).split('&');
            for(var i = 0, l = arr.length; i < l; i ++) {
                var kv = arr[i].split('=');
                params[kv[0]] = kv[1] && decodeURIComponent(kv[1]); // 有值解码，无值 undefined
            }
        }

        return name ? params[name] : params;
    },
    each:function(elements, callback){return each.apply(this,arguments);},
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
        if(nodes.length > 0) ancestors = JSLite.map(nodes, function(node){
            if ((node = node[ty]) && !isDocument(node) && ancestors.indexOf(node) < 0)
                ancestors.push(node)
                return node
        });
        return this.unique(ancestors);
    },
    contains:function(parent, node){
        if(parent&&!node) return document.documentElement.contains(parent)
        return parent !== node && parent.contains(node)
    },
    camelCase:function(string){
        // Support: IE9-11+
        return string.replace( /^-ms-/, "ms-" ).replace( /-([a-z])/g, function( all, letter ) {
            return letter.toUpperCase();
        });
    },
    now:Date.now
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
        return element ? (type(element) === 'string'?this.indexOf(this.parent().children(element)[0]):this.indexOf(element))
            : this.parent().children().indexOf(this[0])
    },
    is: function(selector){
        if (this.length > 0 && typeof selector !== 'string') return this.indexOf(selector)>-1?true:false;
        return this.length > 0 && JSLite.matches(this[0], selector);
    },
    add: function(selector){return JSLite(JSLite.unique(this.concat(JSLite(selector))) );},
    eq: function(idx){return idx === -1 ? JSLite(this.slice(idx)) : JSLite(this.slice(idx, + idx + 1))},
    first: function(){
        var el = this[0]
        return el && !isObject(el) ? el : JSLite(el)
    },
    slice:function(argument) { return JSLite(slice.apply(this, arguments));},
    size:function(){return this.length;},
    //遍历查找对象
    filter:function(selector){
        if (isFunction(selector)) return this.not(this.not(selector))
        return JSLite(filter.call(this, function(element){
            return JSLite.matches(element, selector)
        }))
    },
    not:function(selector){
        var nodes = [];
        if (isFunction(selector)&& selector.call !== undefined){
            this.each(function(idx){
                if (!selector.call(this,idx)) nodes.push(this);
            });
        }else {
            var excludes = typeof selector == 'string' ? this.filter(selector):
            (likeArray(selector) && isFunction(selector.item)) ? slice.call(selector) : JSLite(selector)
            this.forEach(function(el){
                if (excludes.indexOf(el) < 0) nodes.push(el)
            })
        }
        return JSLite(nodes)
    },
    children:function(selector){
        var e=[];
        filter.call(this.pluck('children'), function(item, idx){
            JSLite.map(item,function(els){ if (els&&els.nodeType == 1) e.push(els) })
        });
        return JSLite(e).filter(selector || '*');
    },
    contents: function(selector) {
        return this.map(function() { 
            return this.contentDocument || $.grep(this.childNodes,function(node){
                return selector? $.matches(node,selector):node
            }) 
        })
    },
    parent: function(selector){return JSLite(JSLite.unique(this.pluck('parentNode'))).filter(selector||'*')},
    parents: function(selector){return dir(this,selector,'parentNode')},
    closest: function(selector, context){
        var node = this[0], collection = false
        if (typeof selector == 'object') collection = JSLite(selector)
        while (node && !(collection ? collection.indexOf(node) >= 0 : JSLite.matches(node, selector)))
            node = node !== context && !isDocument(node) && node.parentNode
        return JSLite(node)
    },
    prev: function(selector){
        return JSLite(this.pluck('previousElementSibling')).filter(selector || '*')
    },
    next: function(selector){
        return JSLite(this.pluck('nextElementSibling')).filter(selector || '*')
    },
    nextAll: function (selector) { return dir(this,selector,'nextElementSibling')},
    prevAll: function (selector) { return dir(this,selector,'previousElementSibling')},
    siblings: function(selector){
        var n=[];this.map(function(i,el){
            filter.call(el.parentNode.children, function(els, idx){
                 if (els&&els.nodeType == 1&&els!=el) n.push(els)
            });
        })
        return JSLite(n).filter(selector || '*');
    },
    find: function(selector){
        var nodes = this.children(),ancestors=[];
        while (nodes.length > 0)
        nodes=JSLite.map(nodes, function(node,inx){
            if (ancestors.indexOf(node)<0) ancestors.push(node);
            if ((nodes = JSLite(node).children())&&nodes.length>0 ) return nodes;
        });
        return JSLite(ancestors).filter(selector || '*');
    },
    //DOM 操作
    replaceWith: function(newContent){
        return this.before(newContent).remove()
    },
    unwrap: function(){
        this.parent().each(function(){
            JSLite(this).replaceWith(JSLite(this).html());
        })
        return this
    },
    remove: function(selector){
        var elm = selector?JSLite(this.find(funcArg(this, selector))):this;
        return elm.each(function(){
            if (this.parentNode != null) this.parentNode.removeChild(this)
        })
    },
    detach: function(){return this.remove();},
    empty: function(){ return this.each(function(){ this.innerHTML = '' }) },
    clone: function(){return this.map(function(){ return this.cloneNode(true)})},
    text: function(text){
        return text === undefined ?
            (this.length > 0 ? this[0].textContent : null) :
            this.each(function(){this.textContent = funcArg(this, text)});
    },
    html:function(html){
        return 0 in arguments ? this.each(function(idx){
            JSLite(this).empty().append(funcArg(this, html))
        }) : (0 in this ? this[0].innerHTML : null)
    },
    //效果
    hide:function(){ return this.css("display", "none")},
    show:function(){
        return this.each(function(){
            this.style.display == "none" && (this.style.display = '');
            var CurrentStyle = function(e){
                return e.currentStyle || document.defaultView.getComputedStyle(e, null);
            }
            function defaultDisplay(nodeName) {
                var elm=document.createElement(nodeName),display
                JSLite('body').append(JSLite(elm));
                display = CurrentStyle(elm)['display'];
                elm.parentNode.removeChild(elm)
                return display
            }
            if (CurrentStyle(this)['display']=='none') {
                this.style.display = defaultDisplay(this.nodeName)
            }
        })
    },
    toggle:function(setting){
        return this.each(function(){
            var el = JSLite(this);(setting === undefined ? el.css("display") == "none" : setting) ? el.show() : el.hide()
        })
    },
    //尺寸规格
    offset:function(){
        if(this.length==0) return null;
        var obj = this[0].getBoundingClientRect();
        return {
            left: obj.left + window.pageXOffset,
            top: obj.top + window.pageYOffset,
            width: obj.width,
            height: obj.height
        };
    },
    //操控CSS
    css:function(property, value){
        var elem = this[0];
        if(arguments.length < 2){
            if (!elem) return [];
            if(!value && typeof property == 'string') return elem.style[property];
            if(isArray(property)){
                var props = {}
                $.each(property, function(_, prop){
                    props[prop] = elem.style[camelCase(prop)]
                })
                return props
            }
        }

        var css={},k;
        if (typeof property == 'string') {
            //当value的值为非零的 空不存在，删掉property样式
            if (!value && value !== 0) this.each(function(){ this.style.removeProperty(dasherize(property)) });
            else css[dasherize(property)] = value
        } else {
            for(k in property){
                if(!property[k] && property[k] !== 0){
                    this.each(function(){ this.style.removeProperty(dasherize(k)) });
                }else{
                    css[dasherize(k)] = property[k];
                }
            } 
        }
        // 设置样式
        return this.each(function(){ for(var a in css) this.style[a] = css[a];});
    },
    hasClass:function(name){
        if (!name) return false
        return emptyArray.some.call(this, function(el){
            return this.test(el.className)
        }, new RegExp('(^|\\s)' + name + '(\\s|$)'));
    },
    addClass:function(name){
        if (!name) return this;
        var classList,cls,newName;
        return this.each(function(idx){
            classList=[],cls = this.className,newName=funcArg(this, name).trim();
            newName.split(/\s+/).forEach(function(k){
                if (!JSLite(this).hasClass(k)) classList.push(k);
            },this);
            if (!newName) return this;
            classList.length ? this.className = cls + (cls ? " " : "") + classList.join(" "):null;
        })
    },
    removeClass:function(name){
        var cls;
        if (name === undefined) return this.removeAttr('class');
        return this.each(function(idx){
            cls = this.className;
            funcArg(this, name, idx, cls).split(/\s+/).forEach(function(k){
                cls=cls.replace(new RegExp('(^|\\s)'+k+'(\\s|$)')," ").trim();
            },this);
            cls?this.className = cls:this.className = "";
        })
    },
    toggleClass:function(name){
        if(!name) return this;
        return this.each(function(idx){
            var w=JSLite(this),names=funcArg(this, name);
            names.split(/\s+/g).forEach(function(cls){
                w.hasClass(cls)?w.removeClass(cls):w.addClass(cls);
            })
        })
    },
    //属性
    pluck: function(property){ return JSLite.map(this, function(el){ return el[property] })},
    prop: function(name, value){
        name = propMap[name] || name
        return (1 in arguments) ? this.each(function(idx){
          this[name] = funcArg(this, value, idx, this[name])
        }) :(this[0] && this[0][name])
    },
    removeProp: function(name) {
        name = propMap[name] || name;
        return this.each(function() {
            // 在IE中处理window属性可能报错
            try {
                this[name] = undefined;
                delete this[name];
            } catch(e) {}
        });
    },
    attr: function(name,value){
        var result,k;
        return (typeof name == 'string' && !(1 in arguments)) ?
            (!this.length || this[0].nodeType !== 1 ? undefined :
                (!(result = this[0].getAttribute(name)) && name in this[0]) ? this[0][name] : result
            ) : this.each(function(n){
                if (isObject(name)) for(k in name) this.setAttribute(k, name[k]);
                else this.setAttribute(name,funcArg(this, value));
            });
    },
    removeAttr:function(name){
        return this.each(function(){ this.nodeType === 1 && this.removeAttribute(name)});
    },
    val:function(value){
        return 0 in arguments ?
        this.each(function(idx){this.value = funcArg(this, value, idx, this.value)}) :
        (this[0] && (this[0].multiple ?
            JSLite(this[0]).find('option').filter(function(){ return this.selected }).pluck('value') :
            this[0].value))
    },
    data: function(name, value){
        var attrName = 'data-' + name,data,a
        if(!name) return this[0].dataset;
        if(name&&isJson(name)){
            for(a in name) this.attr('data-' + a, name[a])
            return this
        }
        if(value&&(isArray(value) || isJson(value))) value = JSON.stringify(value);

        data = (1 in arguments) ? this.attr(attrName, value) : this.attr(attrName);
        try{data = JSON.parse(data);}catch(e){}
        return data;
    }
});

// 创建 scrollLeft 和 scrollTop 方法
JSLite.each( { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function( method, prop ) {
    var top = "pageYOffset" === prop;
    JSLite.fn[ method ] = function( value ) {
        var win = isWindow( this[0] );
        if ( value === undefined ) return win ? window[ prop ] : this[0][ method ];
        if ( win ) {
            window.scrollTo(
                !top ? value : window.pageXOffset,
                top ? value : window.pageYOffset
            );
            return this[0];
        } else return this.each(function(){
            this[ method ] = value;
        })
    };
});

;['after','prepend','before','append'].forEach(function(operator, operatorIndex) {
    var inside = operatorIndex % 2;
    JSLite.fn[operator] = function(){
        var argType, nodes = JSLite.map(arguments, function(arg) {
                argType = type(arg)
                if(argType=="function") arg = funcArg(this, arg)
                return argType == "object" || argType == "array" || arg == null ? arg : fragment(arg)
            }),parent,script,copyByClone = this.length > 1
        if (nodes.length < 1) return this
        return this.each(function(_, target){
            parent = inside ? target : target.parentNode
            target = operatorIndex == 0 ? target.nextSibling :
                    operatorIndex == 1 ? target.firstChild :
                    operatorIndex == 2 ? target :
                    null;

            var parentInDocument = JSLite.contains(document.documentElement, parent)

            nodes.forEach(function(node){
                var txt
                if (copyByClone) node = node.cloneNode(true)
                parent.insertBefore(node, target);
                if(parentInDocument && node.nodeName != null && node.nodeName.toUpperCase() === 'SCRIPT' &&
                    (!node.type || node.type === 'text/javascript') && !node.src) txt=node.innerHTML;
                else if(parentInDocument &&node.children && node.children.length>0&&JSLite(node)&&(script=JSLite(node).find("script")))
                    if(script.length>0) script.each(function(_,item){
                        txt=item.innerHTML
                    });
                    txt?window['eval'].call(window, txt):undefined;
            });
        })
    }
    JSLite.fn[inside ? operator+'To' : 'insert'+(operatorIndex ? 'Before' : 'After')] = function(html){
        JSLite(html)[operator](this)
        return this
    }
});


;['width', 'height'].forEach(function(dimension){
    var dimensionProperty = dimension.replace(/./,dimension[0].toUpperCase())
    JSLite.fn[dimension]=function(value){
        var offset, el = this[0]
        if (value === undefined) return isWindow(el) ? el['inner' + dimensionProperty] :
        isDocument(el) ? el.documentElement['scroll' + dimensionProperty] :
        (offset = this.offset()) && offset[dimension]
        else return this.each(function(idx){
            el = $(this)
            el.css(dimension, funcArg(this, value, idx, el[dimension]()))
        })
    }
});

var _JSLite = window.JSLite,
    _$ = window.$;

JSLite.noConflict = function( deep ) {
    if ( window.$ === JSLite ) {
        window.$ = _$;
    }

    if ( deep && window.JSLite === JSLite ) {
        window.JSLite = _JSLite;
    }

    return JSLite;
};

window.JSLite = window.$ = JSLite;