;(function(window, undefined) {
	"use strict";
	var ess,emptyArray = [],slice = emptyArray.slice,filter = emptyArray.filter,elementTypes = [1, 9, 11],A={},
		WCJ = (function(){
		var WCJ = function( selector ) {
		    return new WCJ.fn.init(selector);
		};
		WCJ.fn = WCJ.prototype = {
			init:function( selector ){
				var dom ;
    			if (!selector) 
    				dom = emptyArray,dom.selector = selector || '',dom.__proto__ = WCJ.fn.init.prototype;
    			else if (WCJ.isFunction(selector)) return WCJ(document).ready(selector)
    			else {
    				if (WCJ.isArray(selector))
    					dom = selector;
				    else if (WCJ.isObject(selector))
				    	dom = [selector], selector = null
	                else if (elementTypes.indexOf(selector.nodeType) >= 0 || selector === window)
	                	dom = [selector], selector = null;
	                else dom = (function(){
				        var found;
				        return (document && /^#([\w-]+)$/.test(selector))?
				        ((found = document.getElementById(RegExp.$1)) ? [found] : emptyArray ):
					    slice.call(
						    /^\.([\w-]+)$/.test(selector) ? document.getElementsByClassName(RegExp.$1) :
						    /^[\w-]+$/.test(selector) ? document.getElementsByTagName(selector) :
						    document.querySelectorAll(selector)
					    );
					})();
					dom = dom || emptyArray;
					dom.__proto__ = WCJ.fn.init.prototype;
					dom.selector = selector || '';
    			}
    			return dom;
			},
			size:function(){return this.length;}
		}
		WCJ.fn.init.prototype = WCJ.fn;
        WCJ.extend = WCJ.fn.extend = function () {
            var options, name, src, copy,
			target = arguments[0],
			i = 1,
			length = arguments.length,
			deep = false;
            //处理深拷贝的情况
            if (typeof (target) === "boolean") { 
                deep = target;
                target = arguments[1] || {};
                i = 2;
            }
            //处理时，目标是一个字符串或（深拷贝可能的情况下）的东西
            if (typeof (target) !== "object" && !WCJ.isFunction(target)) {
                target = {};
            }
            //扩展WCJ的本身，如果只有一个参数传递
            if (length === i) {
                target = this;
                --i;
            }
            for (; i < length; i++) {
                if ((options = arguments[i]) != null) {
                    for (name in options) {
                        src = target[name];
                        copy = options[name];
                        if (target === copy) {
                            continue;
                        }
                        if (copy !== undefined) {
                            target[name] = copy;
                        }
                    }
                }
            }
            return target;
        };
		return WCJ;
	})();

	WCJ.fn.extend({
		forEach: emptyArray.forEach,
		concat: emptyArray.concat,
		ready: function(callback){
			if (/complete|loaded|interactive/.test(document.readyState) && document.body) callback(WCJ)
			else document.addEventListener('DOMContentLoaded', function(){callback(WCJ) }, false)
			return this
		},
	    each: function(callback){
	      this.forEach(function(el, idx){ callback.call(el, idx, el) });
	      return this;
	    },
	    map: function(fn){
	    	return WCJ(WCJ.map(this, function(el, i){ return fn.call(el, i, el) }));
	    },
	    get: function(index){
	      return index === undefined ? slice.call(this) : this[index >= 0 ? index : index + this.length];
	    },
	    empty: function(){ return this.each(function(){ this.innerHTML = '' }) },
	    text: function(text){
	      return text === undefined ?
	        (this.length > 0 ? this[0].textContent : null) :
	        this.each(function(){ this.textContent = text });
	    },
        bind: function(type, func) {
			this.each(function(){
				if (this.addEventListener) this.addEventListener(type, func, false);
				else if (this.attachEvent) this.attachEvent("on" + type, func);
				else this["on" + type] = func;
			})
			return this;
		},
		unbind:function(type, func) {
			this.each(function(ele,obj){
				if (this.removeEventListener) this.removeEventListener(type, func, false);
				else if (this[i].detachEvent) this.detachEvent("on" + type, func);
				else this["on" + type] = null;
			})
			return this;
		},
		filter:function(selector){
			return WCJ(filter.call(this, function(element){
        		return WCJ.matches(element, selector)
		    }))
		},
		pluck: function(property){ return WCJ.map(this, function(el){ return el[property] })},
		find: function(selector){
			var nodes = this.children(),ancestors=[];
			while (nodes.length > 0)
			nodes=WCJ.map(nodes, function(node,inx){
				if (ancestors.indexOf(node)<0) ancestors.push(node);
				if ((nodes = WCJ(node).children())&&nodes.length>0 ) return nodes;
			});
			return WCJ(ancestors).filter(selector || '*');
		},
		children:function(selector){
			var arr=this.pluck('children'),e=[];
			filter.call(arr, function(item, idx){ 
				WCJ.map(item,function(els){ if (els.nodeType == 1) e.push(els) })
			});
			return WCJ(e).filter(selector || '*');
		},
		parent: function(){
			var arr=this.pluck('parentNode');
			return filter.call(arr, function(item, idx){ 
				return arr.indexOf(item) == idx 
			});
		},
		parents: function(selector){
			var ancestors=WCJ.sibling(this,'parentNode');
    		return selector == null ? WCJ(ancestors) : WCJ(ancestors).filter(selector);
		},
		prev: function(selector){ 
			return WCJ(this.pluck('previousElementSibling')).filter(selector || '*') 
		},
		next: function(selector){
			return WCJ(this.pluck('nextElementSibling')).filter(selector || '*') 
		},
        nextAll: function (selector) {
      		return WCJ(WCJ.sibling(this,'nextElementSibling')).filter(selector || '*');
        },
		prevAll: function (selector) {
			return WCJ(WCJ.sibling(this,'previousElementSibling')).filter(selector || '*');
		},
		siblings: function(selector){
			var n=[];
			this.map(function(i, el){
				WCJ.map(el.childNodes,function(els){ if (els.nodeType == 1) n.push(els) })
			});
			return WCJ(n).filter(selector || '*');
		}
	});

	WCJ.extend({
		isDocument:function (obj) { return obj = obj ? obj != null && obj.nodeType ? obj.nodeType == obj.DOCUMENT_NODE : false : undefined;},
		isFunction:function (value) { return ({}).toString.call(value) == "[object Function]" },
		isObject:function (value) { return value instanceof Object },
		isArray:function (value) { return value instanceof Array },
		likeArray:function (obj) { return typeof obj.length == 'number' },
        type: function (obj) {
            switch (obj) {
                case null: return "Null";
                case (void 0): return "Undefined";
            }
            var type = typeof (obj);
            switch (type) {
                case 'boolean': return "Boolean";
                case 'number': return "Number";
                case 'string': return "String";
                case 'function': return "Function";
            }
            return "Object";
        },
        error:function(msg) {throw msg;},
        each:function(elements, callback){
			var i, key
			if (this.likeArray(elements)) {
				for (i = 0; i < elements.length; i++)
					if (callback.call(elements[i], i, elements[i]) === false) return elements
				} else {
				for (key in elements)
					if (callback.call(elements[key], key, elements[key]) === false) return elements
			}
			return elements
		},
		map:function(elements, callback){
			var value, values = [], i, key
			if (this.likeArray(elements))
			for (i = 0; i < elements.length; i++) {
				value = callback(elements[i], i)
				if (value != null) values.push(value)
			}
			else
			for (key in elements) {
				value = callback(elements[key], key)
				if (value != null) values.push(value)
			}
			return values.length > 0 ? WCJ.fn.concat.apply([], values) : values;
		},
		matches:function(element, selector){
			if (!selector || !element || element.nodeType !== 1) return false;
		    var matchesSelector = element.webkitMatchesSelector || element.mozMatchesSelector ||
		                          element.oMatchesSelector || element.msMatchesSelector || element.matchesSelector;
		    if (matchesSelector) return matchesSelector.call(element, selector);
		},
		inArray:function(elem, array, i){
			return emptyArray.indexOf.call(array, elem, i)
		},
	    sibling:function(nodes,ty){
			var ancestors = [];
			while (nodes.length > 0)
			nodes = WCJ.map(nodes, function(node){
				if ((node = node[ty]) && !WCJ.isDocument(node) && ancestors.indexOf(node) < 0) 
					ancestors.push(node)
					return node
			});
			return ancestors;
	    }
	});

	['after','prepend','before','append'].forEach(function(operator, operatorIndex) {
	    WCJ.fn[operator] = function(){
	    	var argType, nodes = WCJ.map(arguments, function(arg) {
	    	      argType = WCJ.type(arg)
	    	      return argType == "object" || argType == "array" || arg == null ?
	    	        arg : arguments[0]
	    	    }),position
	    	if (nodes.length < 1) return this
	    	return this.each(function(_, target){
	    		position = 	operatorIndex == 0 ? "afterEnd" : 
	    					operatorIndex == 1 ? "afterBegin":
	    					operatorIndex == 2 ? "beforeBegin":
	    					operatorIndex == 3 ? "beforeEnd":
	    					null
	    		nodes.forEach(function(node){
	                target.insertAdjacentHTML(position,node)
	    		})
	    	})
	    }
	});

	//解决低版本浏览器对filter方法的支持
	if (!Array.prototype.filter){
		Array.prototype.filter = function(fun /*, thisArg */){
			"use strict";
			if (this === void 0 || this === null)
				throw new TypeError();
			var t = Object(this);
			var len = t.length >>> 0;
			if (typeof fun !== "function")
				throw new TypeError();
			var res = [];
			var thisArg = arguments.length >= 2 ? arguments[1] : void 0;
			for (var i = 0; i < len; i++){
				if (i in t){
					var val = t[i];
					if (fun.call(thisArg, val, i, t))
					res.push(val);
				}
			}
			return res;
		};
	}
	//低版本IE对indexOf方法的支持
	if(!Array.indexOf){
	    Array.prototype.indexOf = function(obj){              
	        for(var i=0; i<this.length; i++){
	            if(this[i]==obj){
	                return i;
	            }
	        }
	        return -1;
	    }
	}
	//低版本IE对forEach方法的支持
	if (!Array.prototype.forEach) {  
	    Array.prototype.forEach = function(fun /*, thisp*/){  
	        var len = this.length;  
	        if (typeof fun != "function")  
	            throw new TypeError();  
	        var thisp = arguments[1];  
	        for (var i = 0; i < len; i++){  
	            if (i in this)  
	                fun.call(thisp, this[i], i, this);  
	        }  
	    };  
	} 

	//字符串处理
    WCJ.extend(String.prototype,{
        trim: function () {return this.replace(/(^\s*)|(\s*$)/g, "");},
        leftTrim: function () {return this.replace(/(^\s*)/g, "");}
    })
	window.WCJ = window.$$ = WCJ;
})(window);