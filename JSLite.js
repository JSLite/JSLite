;(function(window, undefined) {
	"use strict";
	var ess,emptyArray = [],slice = emptyArray.slice,filter = emptyArray.filter,elementTypes = [1, 9, 11],P={},handlers = {},_zid = 1,
	WCJ = (function(){
		var WCJ = function( selector ) {
		    return new WCJ.fn.init(selector);
		};
		WCJ.fn = WCJ.prototype = {
			init:function( selector ){
				var dom ;
    			if (!selector) 
    				dom = emptyArray,dom.selector = selector || '',dom.__proto__ = WCJ.fn.init.prototype;
    			else if (typeof selector == 'string' && (selector = selector.trim()) && selector[0] == '<'  && /^\s*<(\w+|!)[^>]*>/.test(selector))
        			dom = P.fragment(selector),selector=null;
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
				        ((found = document.getElementById(RegExp.$1)) ? [found] : [] ):
					    slice.call(
						    /^\.([\w-]+)$/.test(selector) ? document.getElementsByClassName(RegExp.$1) :
						    /^[\w-]+$/.test(selector) ? document.getElementsByTagName(selector) :
						    document.querySelectorAll(selector)
					    );
					})();
    			}
				dom = dom || emptyArray;
				WCJ.extend(dom, WCJ.fn);
				dom.selector = selector || '';
    			return dom;
			},
			size:function(){return this.length;}
		}
		WCJ.fn.init.prototype = WCJ.fn;
        WCJ.extend = WCJ.fn.extend = function () {
            var options, name, src, copy,
			target = arguments[0],i = 1,
			length = arguments.length,
			deep = false;
            //处理深拷贝的情况
            if (typeof (target) === "boolean")
            	deep = target,target = arguments[1] || {},i = 2;
            //处理时，目标是一个字符串或（深拷贝可能的情况下）的东西
            if (typeof (target) !== "object" && !WCJ.isFunction(target)) 
            	target = {};
            //扩展WCJ的本身，如果只有一个参数传递
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
		return WCJ;
	})();

	WCJ.fn.extend({
		forEach: emptyArray.forEach,
		concat: emptyArray.concat,
		indexOf: emptyArray.indexOf,
		ready: function(callback){
			if (/complete|loaded|interactive/.test(document.readyState) && document.body) callback(WCJ)
			else document.addEventListener('DOMContentLoaded', function(){callback(WCJ) }, false)
			return this
		},
	    each: function(callback){
	    	return WCJ.each(this,callback);
	    },
	    map: function(fn){
	    	return WCJ(WCJ.map(this, function(el, i){ return fn.call(el, i, el) }));
	    },
	    get: function(index){
	      return index === undefined ? slice.call(this) : this[index >= 0 ? index : index + this.length];
	    },
	    empty: function(){ return this.each(function(){ this.innerHTML = '' }) },
	    remove: function(){
			return this.each(function(){
				if (this.parentNode != null) this.parentNode.removeChild(this)
			})
	    },
	    text: function(text){
	      return text === undefined ?
	        (this.length > 0 ? this[0].textContent : null) :
	        this.each(function(){this.textContent = funcArg(this, text)});
	    },
	    html:function(html){
			return 0 in arguments ? this.each(function(idx){
				WCJ(this).empty().append(funcArg(this, html))
			}) : (0 in this ? this[0].innerHTML : null)
	    },
	    val:function(value){
			return 0 in arguments ?
			this.each(function(idx){this.value = funcArg(this, value, idx, this.value)}) :
			(this[0] && (this[0].multiple ? 
				WCJ(this[0]).find('option').filter(function(){ return this.selected }).pluck('value') :
				this[0].value))
	    },
	    css:function(property, value){
	    	if (!this[0]) return [];
	    	var computedStyle = getComputedStyle(this[0], '')
			if(value === undefined && typeof property == 'string') return computedStyle.getPropertyValue(property);
			var css="",k;
			for(k in property) css += k+':'+property[k]+';';
			if(typeof property == 'string') css = property+":"+value;
			return this.each(function(el){
				css ? this.style.cssText += ';' + css :"";
			});
	    },
	    hide:function(){ return this.css("display", "none")},
	    show:function(){
		    return this.each(function(){
		      	this.style.display == "none" && (this.style.display = '');
				var CurrentStyle = function(e){
			        return e.currentStyle || document.defaultView.getComputedStyle(e, null);
			    }
				function defaultDisplay(nodeName) {
					var elm=document.createElement(nodeName),display
					WCJ('body').append(WCJ(elm));
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
		      var el = $(this);(setting === undefined ? el.css("display") == "none" : setting) ? el.show() : el.hide()
		    })
	    },
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
	    attr: function(name,value){
	    	var result,k;
	    	return (typeof name == 'string' && !(1 in arguments)) ?
		        (!this.length || this[0].nodeType !== 1 ? undefined :
		          (!(result = this[0].getAttribute(name)) && name in this[0]) ? this[0][name] : result
		        ) : this.each(function(n){
		    		if (WCJ.isObject(name)) for(k in name) this.setAttribute(k, name[k]);
		    		else this.setAttribute(name,funcArg(this, value));
		    	});
	    },
	    removeAttr:function(name){
      		return this.each(function(){ this.nodeType === 1 && this.removeAttribute(name)});
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
					if (!WCJ(this).hasClass(k)) classList.push(k);
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
	    		var w=WCJ(this),names=funcArg(this, name);
	    		names.split(/\s+/g).forEach(function(cls){
	    			w.hasClass(cls)?w.removeClass(cls):w.addClass(cls);
	    		})
	    	})
	    },
        bind: function(event, func) {return this.on(event,func)},
		unbind:function(event, func) {return this.off(event,func)},
		on:function(event, func){
			return this.each(function(){ add(this, event,func) })
		},
		off:function(event, func){
		    return this.each(function(){ remove(this, event, func) })
		},
		trigger:function(event, data){
			var type = event,specialEvents={}
        	specialEvents.click = specialEvents.mousedown = specialEvents.mouseup = specialEvents.mousemove = 'MouseEvents';
		    if (typeof type == 'string') {
				event = document.createEvent(specialEvents[type] || 'Events');
				event.initEvent(type,true, true);
		    }else return;
		    event._data = data;
		    return this.each(function(){
      			if('dispatchEvent' in this) this.dispatchEvent(event);
		    });
		},
		filter:function(selector){
			return WCJ(filter.call(this, function(element){
        		return WCJ.matches(element, selector)
		    }))
		},
	    not:function(selector){
	    	var nodes = [];
	    	if (WCJ.isFunction(selector)&& selector.call !== undefined){
	    		this.each(function(idx){
	    			if (!selector.call(this,idx)) nodes.push(this);
	    		});
	    	}else {
	    		var excludes = typeof selector == 'string' ? this.filter(selector):
			    (WCJ.likeArray(selector) && WCJ.isFunction(selector.item)) ? slice.call(selector) : WCJ(selector)  		
		        this.forEach(function(el){
		        	if (excludes.indexOf(el) < 0) nodes.push(el)
		        })
	    	}
	    	return WCJ(nodes)
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
				WCJ.map(item,function(els){ if (els&&els.nodeType == 1) e.push(els) })
			});
			return WCJ(e).filter(selector || '*');
		},
		parent: function(selector){
			var arr=this.pluck('parentNode'),e=[];
			filter.call(arr, function(els, idx){ 
				 if (els&&els.nodeType == 1) e.push(els)
			});
			return WCJ(e).filter(selector || '*');
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
			var n=[];this.map(function(i,el){
				filter.call(el.parentNode.children, function(els, idx){ 
					 if (els&&els.nodeType == 1&&els!=el) n.push(els)
				});
			})
			return WCJ(n).filter(selector || '*');
		}
	});

	WCJ.extend({
		isDocument:function (obj) { return obj = obj ? obj != null && obj.nodeType ? obj.nodeType == obj.DOCUMENT_NODE : false : undefined;},
		isFunction:function (value) { return ({}).toString.call(value) == "[object Function]" },
		isObject:function (value) { return value instanceof Object },
		isArray:function (value) { return value instanceof Array },
		isString:function(obj){ return typeof obj == 'string' },
		isWindow:function(obj){ return obj != null && obj == obj.window },
		isPlainObject:function(obj){
			return this.isObject(obj) && !this.isWindow(obj) && Object.getPrototypeOf(obj) == Object.prototype
		},
		isContainsNode:function(parent,node){
	    	return document.documentElement.isContainsNode ?
		    parent !== node && parent.isContainsNode(node):
		    (function(){
		    	while (node && (node = node.parentNode))
		    	if (node === parent) return true
		    	return false
			})();
	    },
	    isJson: function (obj) {
			var isjson = typeof(obj) == "object" && 
			Object.prototype.toString.call(obj).toLowerCase() == "[object object]" && !obj.length;
			return isjson;
        },
		likeArray:function (obj) {return obj? typeof obj.length == 'number' :null },
        type: function (obj) {
        	if(!obj) return undefined;
        	var type="";
			WCJ.each("Boolean Number HTMLDivElement String Function Array Date RegExp Object Error".split(" "), function(i, name) {
			  if(toString.call(obj).indexOf(name) > -1) type = name == "HTMLDivElement"?"Object":name;
			})
			return type;
        },
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
	    },
		noConflict: function( deep ) {
			if ( window.$$ === JSLite )
				window.$$ = _$;
			if ( deep && window.JSLite === JSLite )
				window.JSLite = _JSLite;
			return JSLite;
		}
	});

	WCJ.extend({
		ajaxSettings:{
			// 默认请求类型
			type: 'GET',
			// 如果请求成功时执行回调
			success: function(){},
			// 如果请求失败时执行回调
			error: function(){},
			xhr: function () {
			  return new window.XMLHttpRequest();
			},
			async:true,
			// MIME类型的映射
			accepts: {
			  script: 'text/javascript, application/javascript',
			  json:   'application/json',
			  xml:    'application/xml, text/xml',
			  html:   'text/html',
			  text:   'text/plain'
			}
		},
		param:function(obj,traditional,scope){
	        if(WCJ.type(obj) == "String") return obj;
	        var params = [];
        	params.add=function(key, value){
  				this.push(escape(key) + '=' + escape(value== null?"":value))
        	};
			if(scope==true&&WCJ.type(obj)=='Object') params.add(traditional,obj)
	        else for(var p in obj) {
	            var v = obj[p];
	            var k = (function(){
	            	if (traditional) {
	            		if (traditional==true) {
	            			return p
	            		}else{
		            		if(scope&&WCJ.type(obj)=='Array'){
		            			return traditional
		            		}
		            		return traditional + "[" + (WCJ.type(obj)=='Array'?"":p) + "]";
	            		};
	            	};
	            	return p
	            })();
	            params.push(typeof v=="object"?this.param(v, k ,traditional):params.add(k,v));
	        };
	        var dd = params.join("&");
	        return unescape(dd);
		},
		get:function(url, success){ WCJ.ajax({type:'GET',url: url, success: success}) },
		post:function(url, data, success, dataType){
			if (data instanceof Function) dataType = dataType || success, success = data, data = null;
			WCJ.ajax({type: 'POST', url: url, data: data, success: success, dataType: dataType });
		},
    	ajax:function(options){
    		var key,settings,
				setHeader = function(name, value) { headers[name.toLowerCase()] = [name, value] };
				options = options || {};
    			if (WCJ.isString(options)) {
    				if (arguments[0]=="GET") {
    					var  urls=arguments[1];
    					if (arguments[2]&&WCJ.isFunction(arguments[2])) {
    						WCJ.get(urls,arguments[2])
    					}else if(arguments[2]&&WCJ.isJson(arguments[2])){
    						WCJ.get(urls.indexOf('?')>-1?urls+'&'+this.param(arguments[2]):urls+'?'+this.param(arguments[2]),arguments[3])
    					};
    				}else if(arguments[0]=="POST"){
    					WCJ.post(arguments[1],arguments[2],arguments[3],arguments[4])
    				};
    				return;
    			};
    			settings=$.extend({}, options || {});
		    	for (key in $.ajaxSettings) if (settings[key] === undefined) settings[key] = $.ajaxSettings[key];
    			//{ type, url, data, success, dataType, contentType }
			var data = settings.data,
			    callback = settings.success || function(){},
			    errback = settings.error || function(){},
			    mime = $.ajaxSettings.accepts[settings.dataType],
			    content = settings.contentType,
			    xhr = new XMLHttpRequest(),
        		nativeSetHeader = xhr.setRequestHeader,
			    headers={};
    			if (!settings.crossDomain) setHeader('X-Requested-With', 'XMLHttpRequest'),setHeader('Accept', mime || '*/*');
				if (settings.headers) for (name in settings.headers) setHeader(name, settings.headers[name]);
			    if (settings.contentType || (settings.contentType !== false && settings.data && settings.type.toUpperCase() != 'GET'))
			    	setHeader('Content-Type', settings.contentType || 'application/x-www-form-urlencoded');
			xhr.onreadystatechange = function(){
				if (xhr.readyState == 4) {
					if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 0) {
						if (mime == 'application/json'&&!(/^\s*$/.test(xhr.responseText))) {
							var result, error = false;
								result = xhr.responseText
							try {
								if (settings.dataType == 'script')    (1,eval)(result)
								else if (settings.dataType == 'xml')  result = xhr.responseXML
								else if (settings.dataType == 'json') result = /^\s*$/.test(result) ? null : JSON.parse(result)
							} catch (e) { error = e }

							if (error) errback(error, 'parsererror', xhr, settings);
							else callback(result, 'success', xhr);
						} else {
							callback(xhr.responseText, 'success', xhr)
						};
					} else {
						errback(xhr, 'error');
					}
				}
			};
			data=this.param(data);
			if (data&&data instanceof Object&&settings.type=='GET'){
				data?settings.url =(settings.url.indexOf('?')>-1?settings.url +'&'+ data:settings.url +'?'+ data) :null;
			}
			xhr.open(settings.type || 'GET', settings.url || window.location, settings.async);
			if (mime) xhr.setRequestHeader('Accept', mime);
			if (data instanceof Object && mime == 'application/json' ) data = JSON.stringify(data), content = content || 'application/json';
    		for (name in headers) nativeSetHeader.apply(xhr, headers[name]);

			xhr.send(data);

    	}
	});

	//修复IE，增加方法getComputedStyle为对象的窗口和getPropertyValue方法的对象，它返回的getComputedStyle
	if (!window.getComputedStyle) {
	    window.getComputedStyle = function(el, pseudo) {
	        this.el = el;
	        this.getPropertyValue = function(prop) {
	            var re = /(\-([a-z]){1})/g;
	            if (prop == 'float') prop = 'styleFloat';
	            if (re.test(prop)) {
	                prop = prop.replace(re, function () {
	                    return arguments[2].toUpperCase();
	                });
	            }
	            return el.currentStyle[prop] ? el.currentStyle[prop] : null;
	        }
	        return this;
	    }
	}
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

	P = {
		singleTagRE:/^<(\w+)\s*\/?>(?:<\/\1>|)$/,
		fragmentRE:/^\s*<(\w+|!)[^>]*>/,
		tagExpanderRE:/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/ig,
	    table: document.createElement('table'),
	    tableRow: document.createElement('tr'),
		containers:{
			'*': document.createElement('div'),
			'tr': document.createElement('tbody'),
			'tbody': P.table,'thead': P.table,'tfoot': P.table,
			'td': P.tableRow,'th': P.tableRow
		},
		fragment:function(html,name){
    		var dom, container
    		if (this.singleTagRE.test(html)) dom = WCJ(document.createElement(RegExp.$1));
    		if (!dom) {
				if (html.replace) html = html.replace(this.tagExpanderRE, "<$1></$2>")
      			if (name === undefined) name = this.fragmentRE.test(html) && RegExp.$1
      			if (!(name in this.containers)) name = '*'
      			container = this.containers[name]
      			container.innerHTML = '' + html
				dom = WCJ.each(slice.call(container.childNodes), function(){
					container.removeChild(this)
				});
    		}
    		return dom;
		}
	};
	;['width', 'height'].forEach(function(dimension){
		var dimensionProperty = dimension.replace(/./,dimension[0].toUpperCase())
		WCJ.fn[dimension]=function(value){
			var offset, el = this[0]
			if (value === undefined) return WCJ.isWindow(el) ? el['inner' + dimensionProperty] :
			WCJ.isDocument(el) ? el.documentElement['scroll' + dimensionProperty] :
			(offset = this.offset()) && offset[dimension]
			else return this.each(function(idx){
				el = $(this)
				el.css(dimension, funcArg(this, value, idx, el[dimension]()))
			})
		}
	})
	;['after','prepend','before','append'].forEach(function(operator, operatorIndex) {
    	var inside = operatorIndex % 2;
	    WCJ.fn[operator] = function(){
	    	var argType, nodes = WCJ.map(arguments, function(arg) {
	    	    	argType = WCJ.type(arg)
	    	    	return argType == "Object" || argType == "Array" || arg == null ? arg : P.fragment(arg)
	    	    }),parent,script,copyByClone = this.length > 1
	    	if (nodes.length < 1) return this
	    	return this.each(function(_, target){
    			parent = inside ? target : target.parentNode
		        target = operatorIndex == 0 ? target.nextSibling :
		                 operatorIndex == 1 ? target.firstChild :
		                 operatorIndex == 2 ? target :
		                 null;

    			var parentInDocument = WCJ.isContainsNode(document.documentElement, parent)

		        nodes.forEach(function(node){
		        	var txt
		        	if (copyByClone) node = node.cloneNode(true)
      				parent.insertBefore(node, target);
		        	if(parentInDocument && node.nodeName != null && node.nodeName.toUpperCase() === 'SCRIPT' &&
              			(!node.type || node.type === 'text/javascript') && !node.src) txt=node.innerHTML;
              		else if(parentInDocument &&node.children && node.children.length>0&&WCJ(node)&&(script=WCJ(node).find("script")))
              			if(script.length>0) script.each(function(_,item){
              				txt=item.innerHTML
          				});
              			txt?window['eval'].call(window, txt):undefined;
		        });
	    	})
	    }
		WCJ.fn[inside ? operator+'To' : 'insert'+(operatorIndex ? 'Before' : 'After')] = function(html){
			WCJ(html)[operator](this)
			return this
	    }
	});
	
	function funcArg(context, arg, idx, payload) {
		return WCJ.isFunction(arg) ? arg.call(context, idx, payload) : arg;
	}

	/* 绑定事件 start */
	WCJ.event={add:add,remove:remove};
	function add(element,events,func){
		var self=this,id=zid(element),set=(handlers[id] || (handlers[id] = []));
		events.split(/\s/).forEach(function(event){
			var handler = parse(event);handler.fn = func;handler.i = set.length;
			var proxyfn = handler.proxy = function (e) {
				var result = func.apply(element,e._data == undefined ? [e] : [e].concat(e._data));
				if (result === false) e.preventDefault(), e.stopPropagation();
				return result;
			};
        	set.push(handler)
			if (element.addEventListener) element.addEventListener(handler.e,proxyfn, false);
		})
	}
	function remove(element, events, func){
		;(events || '').split(/\s/).forEach(function(event){
			WCJ.event = parse(event)
			findHandlers(element, event, func).forEach(function(handler){
				delete handlers[zid(element)][handler.i]
				if (element.removeEventListener) element.removeEventListener(handler.e, handler.proxy, false);
			})
		})
	}
	function zid(element) {
		return element._zid || (element._zid = _zid++)
	}
	function parse(event) {
		var parts = ('' + event).split('.');
		return {e: parts[0], ns: parts.slice(1).sort().join(' ')};
	}
	function findHandlers(element, event, func){
		var self=this,event = parse(event),id = zid(element);
		return (handlers[zid(element)] || []).filter(function(handler) {
			return handler 
			&& (!event.e  || handler.e == event.e) 
			&& (!func || handler.fn.toString()===func.toString())
		})
	}
	/* 绑定事件 start */

	;("blur focus focusin focusout load resize scroll unload click dblclick " +
	"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
	"change select submit keydown keypress keyup error paste").split(' ').forEach(function(event) {
		WCJ.fn[event] = function(callback) {
		  return callback ? this.bind(event, callback) : this.trigger(event);
		}
	});

	//字符串处理
    WCJ.extend(String.prototype,{
        trim: function () {return this.replace(/(^\s*)|(\s*$)/g, "");},
        leftTrim: function () {return this.replace(/(^\s*)/g, "");}
    })
    window.JSLite = window.WCJ = WCJ
    window.$ === undefined && (window.$ = JSLite)
    window.$$ === undefined && (window.$$ = JSLite)
    window._$ === undefined && (window._$ = JSLite)
})(window);